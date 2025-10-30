import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EmailCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  overflow: hidden;
  height: 700px;
  display: flex;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`;

const SidebarTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const FolderList = styled.div`
  flex: 1;
  padding: 20px 0;
`;

const FolderItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #495057;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(102, 126, 234, 0.1)' : 'transparent'};
  border-right: ${props => props.active ? '3px solid #667eea' : '3px solid transparent'};
  
  &:hover {
    background: rgba(102, 126, 234, 0.05);
  }
`;

const FolderIcon = styled.span`
  font-size: 1.1rem;
`;

const FolderName = styled.span`
  flex: 1;
`;

const EmailCount = styled.span`
  background: #667eea;
  color: white;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EmailHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EmailTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 500;
`;

const ComposeButton = styled.button`
  background: linear-gradient(135deg, #51cf66 0%, #40c057 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const EmailList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmailItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? 'rgba(102, 126, 234, 0.05)' : 'white'};
  
  &:hover {
    background: rgba(102, 126, 234, 0.03);
  }
`;

const EmailSender = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SenderName = styled.span`
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
`;

const EmailTime = styled.span`
  color: #7f8c8d;
  font-size: 12px;
`;

const EmailSubject = styled.div`
  font-size: 14px;
  color: #495057;
  margin-bottom: 6px;
  font-weight: 500;
`;

const EmailPreview = styled.div`
  font-size: 13px;
  color: #7f8c8d;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EmailStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const StatusBadge = styled.span`
  background: ${props => {
    switch (props.type) {
      case 'unread': return '#ff6b6b';
      case 'important': return '#ff9500';
      case 'work': return '#667eea';
      default: return '#51cf66';
    }
  }};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
`;

const ComposeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ComposeForm = styled.div`
  background: white;
  border-radius: 12px;
  width: 600px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
`;

const ComposeHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ComposeTitle = styled.h3`
  margin: 0;
  color: #2c3e50;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #7f8c8d;
  
  &:hover {
    color: #495057;
  }
`;

const ComposeBody = styled.div`
  padding: 20px;
`;

const FormField = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: #495057;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ComposeFooter = styled.div`
  padding: 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled.button`
  background: #f8f9fa;
  color: #495057;
  border: 2px solid #e9ecef;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: #e9ecef;
  }
`;

const EmailComponent = ({ Button: HostButton, Card: HostCard, Input: HostInput, isStandalone = false }) => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  
  const folders = [
    { id: 'inbox', name: 'Inbox', icon: '📥', count: 12 },
    { id: 'sent', name: 'Sent', icon: '📤', count: 0 },
    { id: 'drafts', name: 'Drafts', icon: '📝', count: 3 },
    { id: 'spam', name: 'Spam', icon: '🚫', count: 5 },
    { id: 'trash', name: 'Trash', icon: '🗑️', count: 0 },
  ];

  const emails = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Quarterly Report Review',
      preview: 'Hi team, I\'ve completed the quarterly report and would like your feedback on the sales figures and market analysis...',
      time: '10:30 AM',
      status: ['unread', 'work'],
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      subject: 'Team Meeting Reschedule',
      preview: 'Due to a scheduling conflict, we need to move tomorrow\'s team meeting from 2 PM to 3:30 PM. Please confirm...',
      time: '9:15 AM',
      status: ['important'],
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      subject: 'Project Update - Phase 2',
      preview: 'The second phase of the project is now complete. We\'re ahead of schedule and under budget. Here are the key deliverables...',
      time: '8:45 AM',
      status: ['work'],
    },
    {
      id: 4,
      sender: 'React Newsletter',
      subject: 'React 18 New Features',
      preview: 'Discover the latest features in React 18, including concurrent rendering, automatic batching, and new hooks...',
      time: 'Yesterday',
      status: [],
    },
    {
      id: 5,
      sender: 'LinkedIn',
      subject: 'Your Weekly Network Update',
      preview: 'See who\'s been viewing your profile this week, connect with colleagues, and discover new opportunities in your field...',
      time: 'Yesterday',
      status: [],
    },
    {
      id: 6,
      sender: 'GitHub',
      subject: 'Security Alert: New Login',
      preview: 'We detected a new sign-in to your GitHub account from a new device. If this was you, you can ignore this message...',
      time: '2 days ago',
      status: ['important'],
    },
  ];

  const handleSendEmail = () => {
    // Simulate sending email
    console.log('📧 Email sent successfully!');
    setShowCompose(false);
    // Here you could add the email to the sent folder
  };

  return (
    <>
      <EmailCard>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>📧 Email Client</SidebarTitle>
          </SidebarHeader>
          <FolderList>
            {folders.map(folder => (
              <FolderItem
                key={folder.id}
                active={selectedFolder === folder.id}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <FolderIcon>{folder.icon}</FolderIcon>
                <FolderName>{folder.name}</FolderName>
                {folder.count > 0 && <EmailCount>{folder.count}</EmailCount>}
              </FolderItem>
            ))}
          </FolderList>
        </Sidebar>

        <MainContent>
          <EmailHeader>
            <EmailTitle>
              {folders.find(f => f.id === selectedFolder)?.name || 'Inbox'}
            </EmailTitle>
            <ComposeButton onClick={() => setShowCompose(true)}>
              ✏️ Compose
            </ComposeButton>
          </EmailHeader>

          <EmailList>
            {emails.map(email => (
              <EmailItem
                key={email.id}
                selected={selectedEmail === email.id}
                onClick={() => setSelectedEmail(email.id)}
              >
                <EmailSender>
                  <SenderName>{email.sender}</SenderName>
                  <EmailTime>{email.time}</EmailTime>
                </EmailSender>
                <EmailSubject>{email.subject}</EmailSubject>
                <EmailPreview>{email.preview}</EmailPreview>
                {email.status.length > 0 && (
                  <EmailStatus>
                    {email.status.map(status => (
                      <StatusBadge key={status} type={status}>
                        {status}
                      </StatusBadge>
                    ))}
                  </EmailStatus>
                )}
              </EmailItem>
            ))}
          </EmailList>
        </MainContent>
      </EmailCard>

      {showCompose && (
        <ComposeModal onClick={(e) => e.target === e.currentTarget && setShowCompose(false)}>
          <ComposeForm>
            <ComposeHeader>
              <ComposeTitle>Compose New Email</ComposeTitle>
              <CloseButton onClick={() => setShowCompose(false)}>
                ×
              </CloseButton>
            </ComposeHeader>
            
            <ComposeBody>
              <FormField>
                <Label>To:</Label>
                <Input type="email" placeholder="recipient@example.com" />
              </FormField>
              
              <FormField>
                <Label>Subject:</Label>
                <Input type="text" placeholder="Enter subject" />
              </FormField>
              
              <FormField>
                <Label>Message:</Label>
                <TextArea placeholder="Type your message here..." />
              </FormField>
            </ComposeBody>
            
            <ComposeFooter>
              <CancelButton onClick={() => setShowCompose(false)}>
                Cancel
              </CancelButton>
              <SendButton onClick={handleSendEmail}>
                📤 Send Email
              </SendButton>
            </ComposeFooter>
          </ComposeForm>
        </ComposeModal>
      )}
    </>
  );
};

export default EmailComponent;