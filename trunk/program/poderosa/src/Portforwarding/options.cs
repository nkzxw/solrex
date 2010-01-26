/*
 Copyright (c) 2005 Poderosa Project, All Rights Reserved.

 $Id: options.cs,v 1.2 2005/04/20 09:06:03 okajima Exp $
*/
using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using System.Collections;
using System.Reflection;
using System.Diagnostics;

using Poderosa.Toolkit;
using Poderosa.Config;

namespace Poderosa.PortForwarding
{
	/// <summary>
	/// options �̊T�v�̐����ł��B
	/// </summary>
	internal class Options : ICloneable
	{
		//����͍ŏ��̃����o�ł��邱��
		[ConfigEnumElement(typeof(Language))]
		protected Language _language;

		protected Language _envLanguage; //������͕ۑ����ꂸ

		[ConfigEnumElement(typeof(FormWindowState), InitialAsInt=(int)FormWindowState.Normal)]
		                                   protected FormWindowState _frameState;
		/* Special Handling */             protected Rectangle _framePosition;
		[ConfigBoolElement(Initial=true)]  protected bool _showInTaskBar;
		[ConfigEnumElement(typeof(OptionPreservePlace), InitialAsInt=(int)OptionPreservePlace.InstalledDir)]
		                                   protected OptionPreservePlace _optionPreservePlace;

		//SSH
		[ConfigStringArrayElement(Initial=new string[]{ "AES128", "Blowfish", "TripleDES" })]
		                                   protected string[] _cipherAlgorithmOrder;
		[ConfigStringArrayElement(Initial=new string[]{ "DSA", "RSA" })]
		                                   protected string[] _hostKeyAlgorithmOrder;
		[ConfigIntElement(Initial=4096)]   protected int _sshWindowSize;
		[ConfigBoolElement(Initial=true)]  protected bool _sshCheckMAC;
		[ConfigBoolElement(Initial=false)] protected bool _retainsPassphrase;
		[ConfigBoolElement(Initial=false)] protected bool _warningOnExit;

		//SOCKS�֌W
		[ConfigBoolElement(Initial=false)] protected bool  _useSocks;
		[ConfigStringElement(Initial="")]  protected string _socksServer;
		[ConfigIntElement(Initial=1080)]   protected int _socksPort;
		[ConfigStringElement(Initial="")]  protected string _socksAccount;
		[ConfigStringElement(Initial="")]  protected string _socksPassword;
		[ConfigStringElement(Initial="")]  protected string _socksNANetworks;

		private static ArrayList _configAttributes;

		public Language Language {
			get {
				return _language;
			}
			set {
				_language = value;
			}
		}
		public Language EnvLanguage {
			get {
				return _envLanguage;
			}
			set {
				_envLanguage = value;
			}
		}

		public Rectangle FramePosition {
			get {
				return _framePosition;
			}
			set {
				_framePosition = value;
			}
		}
		public FormWindowState FrameState {
			get {
				return _frameState;
			}
			set {
				_frameState = value;
			}
		}


		public bool ShowInTaskBar {
			get {
				return _showInTaskBar;
			}
			set {
				_showInTaskBar = value;
			}
		}
		public OptionPreservePlace OptionPreservePlace {
			get {
				return _optionPreservePlace;
			}
			set {
				_optionPreservePlace = value;
			}
		}

		public string[] CipherAlgorithmOrder {
			get {
				return _cipherAlgorithmOrder;
			}
			set {
				_cipherAlgorithmOrder = value;
			}
		}
		
		public string[] HostKeyAlgorithmOrder {
			get {
				return _hostKeyAlgorithmOrder;
			}
			set {
				_hostKeyAlgorithmOrder = value;
			}
		}
		public int SSHWindowSize {
			get {
				return _sshWindowSize;
			}
			set {
				_sshWindowSize = value;
			}
		}
		public bool SSHCheckMAC {
			get {
				return _sshCheckMAC;
			}
			set {
				_sshCheckMAC = value;
			}
		}

		public bool RetainsPassphrase{
			get {
				return _retainsPassphrase;
			}
			set {
				_retainsPassphrase = value;
			}
		}
		public bool  UseSocks {
			get {
				return _useSocks;
			}
			set {
				_useSocks = value;
			}
		}
		public string SocksServer {
			get {
				return _socksServer;
			}
			set {
				_socksServer = value;
			}
		}
		public int SocksPort {
			get {
				return _socksPort;
			}
			set {
				_socksPort = value;
			}
		}
		public string SocksAccount {
			get {
				return _socksAccount;
			}
			set {
				_socksAccount = value;
			}
		}
		public string SocksPassword {
			get {
				return _socksPassword;
			}
			set {
				_socksPassword = value;
			}
		}
		public string SocksNANetworks {
			get {
				return _socksNANetworks;
			}
			set {
				_socksNANetworks = value;
			}
		}
		public bool WarningOnExit {
			get {
				return _warningOnExit;
			}
			set {
				_warningOnExit = value;
			}
		}

		public Options() {
			if(_configAttributes==null) InitConfigAttributes();
			_envLanguage = Util.CurrentLanguage;
		}
		
		public object Clone() {
			Options opt = new Options();
			opt._framePosition = _framePosition;
			opt._frameState = _frameState;
			opt._showInTaskBar = _showInTaskBar;
			opt._warningOnExit = _warningOnExit;
			opt._optionPreservePlace = _optionPreservePlace;
			opt._envLanguage = _envLanguage;
			opt._language = _language;

			opt._cipherAlgorithmOrder = (string[])_cipherAlgorithmOrder.Clone();
			opt._hostKeyAlgorithmOrder = (string[])_hostKeyAlgorithmOrder.Clone();
			opt._sshWindowSize = _sshWindowSize;
			opt._retainsPassphrase = _retainsPassphrase;
			opt._sshCheckMAC = _sshCheckMAC;
			
			opt._useSocks = _useSocks;
			opt._socksServer = _socksServer;
			opt._socksPort = _socksPort;
			opt._socksAccount = _socksAccount;
			opt._socksPassword = _socksPassword;
			opt._socksNANetworks = _socksNANetworks;
			
			return opt;
		}

		private static void InitConfigAttributes() {
			FieldInfo[] fields = typeof(Options).GetFields(BindingFlags.NonPublic|BindingFlags.Instance|BindingFlags.DeclaredOnly);
			_configAttributes = new ArrayList(fields.Length);
			bool language_found = false;
			foreach(FieldInfo field in fields) {
				object[] attrs = field.GetCustomAttributes(typeof(ConfigElementAttribute), true);
				if(attrs.Length!=0) {
					ConfigElementAttribute attr = (ConfigElementAttribute)attrs[0];
					attr.FieldInfo = field;
					if(!language_found) {
						Debug.Assert(field.Name=="_language");
						//Language�̏����l�͎��s���łȂ��ƌ��܂�Ȃ�
						(attr as ConfigEnumElementAttribute).InitialAsInt = (int)Util.CurrentLanguage;
						language_found = true;
					}
					_configAttributes.Add(attr);
				}
			}
		}

		public void Load(ConfigNode parent) {
			ConfigNode node = parent.FindChildConfigNode("options");
			if(node!=null) {
				//��{�̃A�g���r���[�g
				foreach(ConfigElementAttribute attr in _configAttributes) {
					attr.ImportFrom(this, node);
				}
			}

			//frame state�͕ʂ̈���
			string frame_pos = node==null? null : node.GetValue("framePosition", null);
			bool frame_filled = false;
			if(_frameState==FormWindowState.Normal && frame_pos!=null) {
				string[] t = frame_pos.Split(',');
				if(t.Length==4) {
					_framePosition.X = Util.ParseInt(t[0], 0);
					_framePosition.Y = Util.ParseInt(t[1], 0);
					_framePosition.Width = Util.ParseInt(t[2], 640);
					_framePosition.Height = Util.ParseInt(t[3], 480);

					frame_filled = true;
				}
			}
			
			if(!frame_filled) {
				if(_frameState==FormWindowState.Minimized) _frameState = FormWindowState.Normal; //�ŏ����ŋN�����Ă��d���Ȃ��̂Ńm�[�}���ɂ���
				Rectangle r = Screen.PrimaryScreen.Bounds;
				_framePosition.X = r.Width / 3;
				_framePosition.Y = r.Height / 3;
				_framePosition.Width = r.Width / 3;
				_framePosition.Height = r.Height / 3;
			}
		}

		public void Save(ConfigNode parent) {
			ConfigNode node = new ConfigNode("options");
			foreach(ConfigElementAttribute attr in _configAttributes) {
				attr.ExportTo(this, node);
			}
			node["framePosition"] = String.Format("{0},{1},{2},{3}", _framePosition.X, _framePosition.Y, _framePosition.Width, _framePosition.Height);
			parent.AddChild(node);
		}

		public void Init() {
			foreach(ConfigElementAttribute attr in _configAttributes) {
				attr.Reset(this);
			}
			Rectangle r = Screen.PrimaryScreen.Bounds;
			_framePosition.X = r.Width / 3;
			_framePosition.Y = r.Height / 3;
			_framePosition.Width = r.Width / 3;
			_framePosition.Height = r.Height / 3;
		}
	}

	[EnumDesc(typeof(OptionPreservePlace))]
	internal enum OptionPreservePlace {
		[EnumValue(Description="Enum.OptionPreservePlace.InstalledDir")] InstalledDir,
		[EnumValue(Description="Enum.OptionPreservePlace.AppData")] AppData
	}
	[EnumDesc(typeof(Language))]
	public enum Language {
		[EnumValue(Description="Enum.Language.English")] English,
		[EnumValue(Description="Enum.Language.Japanese")] Japanese
	}

	internal class InvalidOptionException : Exception {
		public InvalidOptionException(string msg) : base(msg) {}
	}
}
