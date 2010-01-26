/*
 Copyright (c) 2005 Poderosa Project, All Rights Reserved.

 $Id: connectionmanager.cs,v 1.2 2005/04/20 09:06:03 okajima Exp $
*/
using System;
using System.IO;
using System.Collections;
using System.Net;
using System.Diagnostics;
using System.Net.Sockets;
using System.Windows.Forms;

using Granados.SSHC;
using Poderosa.Toolkit;
using Poderosa.Communication;

namespace Poderosa.PortForwarding
{
	//�z�X�g��/IP�A�h���X����SSH�̃R�l�N�V�����ւ̃}�b�v���Ǘ�����
	internal class ConnectionManager {
		private Hashtable _profileToConnection;
		private ArrayList _manualClosingConnections;

		public ConnectionManager() {
			_profileToConnection = new Hashtable();
			_manualClosingConnections = new ArrayList();
		}

		//prof�ɑΉ�����SSHConnection��Ԃ��B�ڑ����Ȃ����parent��e�ɔF�؃_�C�A���O���o���ĔF�؂���
		public SSHConnection GetOrCreateConnection(ChannelProfile prof, Form parent) {
			//�z�X�g���ƃA�J�E���g�̃y�A����R�l�N�V���������L����d�g�݂�����Ƃ悢����
			SSHConnection c = (SSHConnection)_profileToConnection[prof];
			if(c!=null) return c;

			SSHShortcutLoginDialog dlg = new SSHShortcutLoginDialog(prof);
			if(Util.ShowModalDialog(parent, dlg)==DialogResult.OK) {
				c = dlg.Result.Connection;
				try {
					dlg.Result.WaitRequest();
				}
				catch(Exception ex) {
					Debug.WriteLine(ex.StackTrace);
					Util.Warning(parent, ex.Message);
					c.Close();
					return null;
				}
				_profileToConnection[prof] = c;
				Env.MainForm.RefreshProfileStatus(prof);
			}

			return c;
		}
		public bool IsConnected(ChannelProfile prof) {
			return _profileToConnection[prof] != null;
		}
		public bool HasConnection {
			get {
				return _profileToConnection.Count>0;
			}
		}

		public static SocketWithTimeout StartNewConnection(ISocketWithTimeoutClient client, ChannelProfile prof, string password, HostKeyCheckCallback keycheck) {
			
			SocketWithTimeout swt;
			swt = new SSHConnector(prof, password, keycheck);

			if(Env.Options.UseSocks)
				swt.AsyncConnect(client, CreateSocksParam(prof.SSHHost, prof.SSHPort));
			else
				swt.AsyncConnect(client, prof.SSHHost, prof.SSHPort);
			return swt;
		}
		private static Socks CreateSocksParam(string dest_host, int dest_port) {
			Socks s = new Socks();
			s.DestName = dest_host;
			s.DestPort = (short)dest_port;
			s.Account = Env.Options.SocksAccount;
			s.Password = Env.Options.SocksPassword;
			s.ServerName = Env.Options.SocksServer;
			s.ServerPort = (short)Env.Options.SocksPort;
			s.ExcludingNetworks = Env.Options.SocksNANetworks;
			return s;
		}

		public void ManualClose(ChannelProfile prof) {
			if(!IsConnected(prof)) {
				Debug.WriteLine("ManualClose - Not connected");
				return;
			}

			lock(this) {
				SSHConnection c = (SSHConnection)_profileToConnection[prof];
				_manualClosingConnections.Add(c);
				c.Disconnect("");
			}
		}
		public void CloseAll() {
			foreach(ChannelProfile prof in new ArrayList(_profileToConnection.Keys)) {
				if(IsConnected(prof)) ManualClose(prof);
			}
		}
		//�I���̃n���h�����O �񓯊��ɕʃX���b�h����Ă΂��̂Œ���
		public void ConnectionClosed(SSHConnection connection) {
			IDictionaryEnumerator e = _profileToConnection.GetEnumerator();
			while(e.MoveNext()) {
				if(connection==e.Value) {
					ChannelProfile prof = (ChannelProfile)e.Key;
					_profileToConnection.Remove(e.Key);
					bool manual = false;
					lock(this) {
						manual = _manualClosingConnections.Contains(connection);
						if(manual) _manualClosingConnections.Remove(connection);
					}

					if(!manual) {
						Util.InterThreadWarning(Env.Strings.GetString("Message.ConnectionManager.Disconnected"));
					}
					Env.MainForm.RefreshProfileStatus(prof); //!!�ق�Ƃ͂�����InterThread

					break;
				}
			}
		}
		public void ConnectionError(SSHConnection connection, Exception error, string msg) {
			if(msg==null && error!=null) msg = error.Message;

			Util.InterThreadWarning(msg);
			ConnectionClosed(connection);
		}

	}

	internal class SSHConnector : SocketWithTimeout {

		private ChannelProfile _profile;
		private string _password;
		private HostKeyCheckCallback _keycheck;
		private ChannelFactory _result;

		public SSHConnector(ChannelProfile prof, string password, HostKeyCheckCallback keycheck) {
			_profile = prof;
			_password = password;
			_keycheck = keycheck;
		}
		protected override string GetHostDescription() {
			return "";
		}

		protected override void Negotiate() {
			SSHConnectionParameter con = new SSHConnectionParameter();
			con.Protocol = SSHProtocol.SSH2;
			con.UserName = _profile.SSHAccount;
			con.Password = _password;
			con.AuthenticationType = _profile.AuthType;
			con.IdentityFile = _profile.PrivateKeyFile;
			con.PreferableCipherAlgorithms = SSHUtil.ParseCipherAlgorithm(Env.Options.CipherAlgorithmOrder);
			con.PreferableHostKeyAlgorithms = SSHUtil.ParsePublicKeyAlgorithm(Env.Options.HostKeyAlgorithmOrder);
			con.WindowSize = Env.Options.SSHWindowSize;
			con.CheckMACError = Env.Options.SSHCheckMAC;
			if(_keycheck!=null) con.KeyCheck += new HostKeyCheckCallback(this.CheckKey);
										
			_result = ChannelFactory.Create(_profile);
			SSHConnection c = SSHConnection.Connect(con, _result, _socket);
			c.AutoDisconnect = false;
			if(c!=null) {
				/*
				if(_profile.ProtocolType==ProtocolType.Udp)
					OpenUdpDestination(c, (UdpChannelFactory)_result);
				else
				*/
				_result.FixConnection(c);
				if(Env.Options.RetainsPassphrase)
					_profile.Passphrase = _password; //�ڑ��������̂݃Z�b�g
			}
			else {
				throw new IOException(Env.Strings.GetString("Message.ConnectionManager.ConnectionCancelled"));
			}
		}
		protected override object Result {
			get {
				return _result;
			}
		}

		private bool CheckKey(SSHConnectionInfo ci) {
			SetIgnoreTimeout(); //���ꂪ�Ă΂��Ƃ������Ƃ͓r���܂�SSH�̃l�S�V�G�[�g���ł��Ă���̂Ń^�C���A�E�g�͂��Ȃ��悤�ɂ���
			return _keycheck(ci);
		}

	}
}
