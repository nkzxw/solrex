/*
 Copyright (c) 2005 Poderosa Project, All Rights Reserved.

 $Id: commands.cs,v 1.2 2005/04/20 09:06:03 okajima Exp $
*/
using System;
using System.Windows.Forms;

using Granados.SSHC;

namespace Poderosa.PortForwarding
{
	internal class Commands {
		public void CreateNewProfile() {
			ProfileEdit dlg = new ProfileEdit(null);
			if(Util.ShowModalDialog(Env.MainForm, dlg)==DialogResult.OK) {
				Env.Profiles.AddProfile(dlg.ResultProfile);
				Env.MainForm.RefreshAllProfiles();
			}
		}
		public void EditProfile(ChannelProfile prof) {
			if(Env.Connections.IsConnected(prof)) {
				Util.Warning(Env.MainForm, Env.Strings.GetString("Message.Commands.CannotEditConnectedProfile"));
				return;
			}

			ProfileEdit dlg = new ProfileEdit(prof);
			if(Util.ShowModalDialog(Env.MainForm, dlg)==DialogResult.OK) {
				Env.Profiles.ReplaceProfile(prof, dlg.ResultProfile);
				Env.MainForm.RefreshAllProfiles();
			}
		}
		public void RemoveProfile(ChannelProfile prof) {
			if(Env.Connections.IsConnected(prof)) {
				Util.Warning(Env.MainForm, Env.Strings.GetString("Message.Commands.CannotDeleteConnectedProfile"));
				return;
			}
			Env.Profiles.RemoveProfile(prof);
			Env.MainForm.RefreshAllProfiles();
		}
		public void MoveProfileUp(ChannelProfile prof) {
			int index = Env.Profiles.IndexOf(prof);
			if(index>0) {
				Env.Profiles.RemoveProfile(prof);
				Env.Profiles.InsertAt(index-1, prof);
				Env.MainForm.RefreshAllProfiles();
				Env.MainForm.SetSelectedIndex(index-1);
			}
		}
		public void MoveProfileDown(ChannelProfile prof) {
			int index = Env.Profiles.IndexOf(prof);
			if(index<Env.Profiles.Count-1) {
				Env.Profiles.RemoveProfile(prof);
				Env.Profiles.InsertAt(index+1, prof);
				Env.MainForm.RefreshAllProfiles();
				Env.MainForm.SetSelectedIndex(index+1);
			}
		}
		public void ConnectProfile(ChannelProfile prof) {
			Env.Connections.GetOrCreateConnection(prof, Env.MainForm);
		}
		public void DisconnectProfile(ChannelProfile prof) {
			Env.Connections.ManualClose(prof);
		}
		public void ConnectAllProfiles() {
			foreach(ChannelProfile prof in Env.Profiles) {
				if(!Env.Connections.IsConnected(prof))
					Env.Connections.GetOrCreateConnection(prof, Env.MainForm);
			}
		}
		public void DisconnectAllProfiles() {
			foreach(ChannelProfile prof in Env.Profiles) {
				if(Env.Connections.IsConnected(prof))
					Env.Connections.ManualClose(prof);
			}
		}
		public void ShowOptionDialog() {
			OptionDialog dlg = new OptionDialog();
			Util.ShowModalDialog(Env.MainForm, dlg);
		}
		public void ShowAboutBox() {
			AboutBox dlg = new AboutBox();
			Util.ShowModalDialog(Env.MainForm, dlg);
		}
	}
}
