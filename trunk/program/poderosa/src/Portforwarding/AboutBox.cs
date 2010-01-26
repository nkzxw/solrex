/*
* Copyright (c) 2005 Poderosa Project, All Rights Reserved.
* $Id: AboutBox.cs,v 1.2 2005/04/20 09:06:03 okajima Exp $
*/
using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;

namespace Poderosa.PortForwarding
{
	/// <summary>
	/// AboutBox �̊T�v�̐����ł��B
	/// </summary>
	public class AboutBox : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Button _okButton;
		private System.Windows.Forms.Label _content;
		/// <summary>
		/// �K�v�ȃf�U�C�i�ϐ��ł��B
		/// </summary>
		private System.ComponentModel.Container components = null;

		public AboutBox()
		{
			//
			// Windows �t�H�[�� �f�U�C�i �T�|�[�g�ɕK�v�ł��B
			//
			InitializeComponent();

			//
			// TODO: InitializeComponent �Ăяo���̌�ɁA�R���X�g���N�^ �R�[�h��ǉ����Ă��������B
			//
			_content.Text = "Poderosa SSH Portforwarding Gateway\r\n" + Env.VERSION_STRING + "\r\n\r\nCopyright(c) 2005 Poderosa Project."; 
			this._okButton.Text = Env.Strings.GetString("Common.OK");
			this.Text = Env.Strings.GetString("Form.AboutBox.Text");
		}

		/// <summary>
		/// �g�p����Ă��郊�\�[�X�Ɍ㏈�������s���܂��B
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if(components != null)
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

		#region Windows �t�H�[�� �f�U�C�i�Ő������ꂽ�R�[�h 
		/// <summary>
		/// �f�U�C�i �T�|�[�g�ɕK�v�ȃ��\�b�h�ł��B���̃��\�b�h�̓��e��
		/// �R�[�h �G�f�B�^�ŕύX���Ȃ��ł��������B
		/// </summary>
		private void InitializeComponent()
		{
			this._okButton = new System.Windows.Forms.Button();
			this._content = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// _okButton
			// 
			this._okButton.DialogResult = System.Windows.Forms.DialogResult.Cancel;
			this._okButton.Location = new System.Drawing.Point(104, 72);
			this._okButton.Name = "_okButton";
			this._okButton.TabIndex = 0;
			this._okButton.FlatStyle = FlatStyle.System;
			// 
			// _content
			// 
			this._content.Location = new System.Drawing.Point(8, 8);
			this._content.Name = "_content";
			this._content.Size = new System.Drawing.Size(264, 56);
			this._content.TabIndex = 1;
			// 
			// AboutBox
			// 
			this.AcceptButton = this._okButton;
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 12);
			this.CancelButton = this._okButton;
			this.ClientSize = new System.Drawing.Size(282, 95);
			this.Controls.Add(this._content);
			this.Controls.Add(this._okButton);
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
			this.MaximizeBox = false;
			this.MinimizeBox = false;
			this.Name = "AboutBox";
			this.ShowInTaskbar = false;
			this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
			this.ResumeLayout(false);

		}
		#endregion
	}
}
