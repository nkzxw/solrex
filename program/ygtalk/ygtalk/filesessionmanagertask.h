/*
 * libjingle
 * Copyright 2004--2005, Google Inc.
 *
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice, 
 *     this list of conditions and the following disclaimer.
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *  3. The name of the author may not be used to endorse or promote products 
 *     derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
 * EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR 
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef _FILESESSIONMANAGERTASK_H_
#define _FILESESSIONMANAGERTASK_H_

#include "talk/p2p/base/sessionmanager.h"
#include "talk/p2p/client/sessionsendtask.h"
#include "talk/xmpp/xmppengine.h"
#include "talk/xmpp/xmpptask.h"
#include "talk/base/logging.h"

namespace cricket {

// This class handles sending and receiving XMPP messages on behalf of the
// SessionManager.  The sending part is handed over to SessionSendTask.

class FileSessionManagerTask : public buzz::XmppTask {
 public:
  FileSessionManagerTask(Task *parent, SessionManager *session_manager)
      : buzz::XmppTask(parent, buzz::XmppEngine::HL_SENDER) {
    session_manager_ = session_manager;
  }

  ~FileSessionManagerTask() {
  }

  // Turns on simple support for sending messages, using SessionSendTask.
  void EnableOutgoingMessages() {
    session_manager_->SignalOutgoingMessage.connect(
        this, &FileSessionManagerTask::OnOutgoingMessage);
    session_manager_->SignalRequestSignaling.connect(
        session_manager_, &SessionManager::OnSignalingReady);
  }

  virtual int ProcessStart() {
    const buzz::XmlElement *stanza = NextStanza();
    if (stanza == NULL)
      return STATE_BLOCKED;
    session_manager_->OnIncomingMessage(stanza);
    return STATE_START;
  }

 protected:
  virtual bool HandleStanza(const buzz::XmlElement *stanza) {
    
    LOG(LS_VERBOSE) << "HandleStanza()\n" << stanza->BodyText().c_str() << "\n";
    
    if (!session_manager_->IsSessionMessage(stanza))
      return false;

    // Responses are handled by the SessionSendTask that sent the request.
    //if (stanza->Attr(buzz::QN_TYPE) != buzz::STR_SET)
    //  return false;
    QueueStanza(stanza);
    return true;
  }

 private:
  SessionManager* session_manager_;

  void OnOutgoingMessage(const buzz::XmlElement* stanza) {
    cricket::SessionSendTask* sender =
        new cricket::SessionSendTask(GetParent(), session_manager_);
    sender->Send(stanza);
    sender->Start();
  }
};

}  // namespace cricket

#endif // _SESSIONMANAGERTASK_H_
