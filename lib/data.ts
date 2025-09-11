// Single source of truth for all app data

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  language: string;
  avatarBg: string;
  avatarText: string;
  lastSeen: string;
  isAgent?: boolean;
  verified: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  messageInfo: {
    channel: string;
    page: string;
    received: string;
    sentTo?: string;
    cc?: string;
    source?: string;
  };
  messageStatus?: {
    status: 'sent' | 'delivered' | 'read';
    statusText: string;
  };
}

export interface SystemMessage {
  id: string;
  content: string;
  timestamp: string;
  type: 'agent_assigned' | 'agent_removed' | 'conversation_closed' | 'conversation_reopened';
}

export interface Conversation {
  id: string;
  userId: string;
  assignedAgents: string[];
  status: 'active' | 'closed';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  systemMessages: SystemMessage[];
}

// All users data
export const users: User[] = [
  {
    id: '1',
    name: 'Aisha Patel',
    initials: 'AP',
    email: 'aisha.patel@example.com',
    phone: '+44 1234 567890',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '2 hours ago',
    verified: true,
  },
  {
    id: '2',
    name: 'Matt Lanham',
    initials: 'ML',
    email: '',
    phone: '',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '1 hour ago',
    verified: false,
  },
  {
    id: '3',
    name: 'Marcus Thompson',
    initials: 'MT',
    email: 'marcus.thompson@example.com',
    phone: '+44 3456 789012',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '2 hours ago',
    verified: true,
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    initials: 'ER',
    email: 'elena.rodriguez@example.com',
    phone: '+44 4567 890123',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '3 hours ago',
    verified: true,
  },
  {
    id: '5',
    name: 'Dmitri Volkov',
    initials: 'DV',
    email: 'dmitri.volkov@example.com',
    phone: '+44 5678 901234',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '5 hours ago',
    verified: true,
  },
  {
    id: '6',
    name: 'Luna Chen',
    initials: 'LC',
    email: 'luna.chen@example.com',
    phone: '+44 6789 012345',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '1 day ago',
    verified: true,
  },
  {
    id: '7',
    name: 'Aria Singh',
    initials: 'AS',
    email: 'aria.singh@example.com',
    phone: '+44 7890 123456',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '2 days ago',
    verified: true,
  },
  {
    id: '8',
    name: 'Jasmine Kim',
    initials: 'JK',
    email: 'jasmine.kim@example.com',
    phone: '+44 8901 234567',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '2 days ago',
    verified: true,
  },
  {
    id: '9',
    name: 'Rafael Silva',
    initials: 'RS',
    email: 'rafael.silva@example.com',
    phone: '+44 9012 345678',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '3 days ago',
    verified: true,
  },
  {
    id: '10',
    name: 'Anastasia Petrov',
    initials: 'AP',
    email: 'anastasia.petrov@example.com',
    phone: '+44 0123 456789',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '3 days ago',
    verified: true,
  },
  {
    id: '11',
    name: 'Caleb Okafor',
    initials: 'CO',
    email: 'caleb.okafor@example.com',
    phone: '+44 1234 567890',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '4 days ago',
    verified: true,
  },
  {
    id: '12',
    name: 'Maya Nakamura',
    initials: 'MN',
    email: 'maya.nakamura@example.com',
    phone: '+44 2345 678901',
    language: 'English',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    lastSeen: '4 days ago',
    verified: true,
  },
];

// All conversations data
export const conversations: Conversation[] = [
  {
    id: '1',
    userId: '1',
    assignedAgents: [],
    status: 'active',
    lastMessage: "I'm really excited about the scholarship opportunities you mentioned! When is the application deadline?",
    lastMessageTime: '45m',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-001',
        senderId: '1',
        content: "Hi! I'm interested in the computer science program. What are the admission requirements?",
        timestamp: '2h',
        messageInfo: {
          channel: 'Admissions live chat',
          page: 'Computer Science Program',
          received: '08/01/2024 @ 16:30',
          sentTo: 'admissions@geckouniversity.ac.uk',
          cc: 'cs@geckouniversity.ac.uk'
        }
      },
      {
        id: 'msg-002',
        senderId: 'agent-1',
        content: "Hello! Great to hear you're interested in our Computer Science program. The main requirements are: High school diploma with strong math grades, SAT/ACT scores, and a personal statement. We also recommend some programming experience.",
        timestamp: '1h',
        messageInfo: {
          source: 'ChatGPT',
          channel: 'Admissions live chat',
          page: 'Computer Science Program',
          received: '08/01/2024 @ 16:31'
        },
        messageStatus: {
          status: 'read',
          statusText: 'Read'
        }
      },
      {
        id: 'msg-003',
        senderId: '1',
        content: "I'm really excited about the scholarship opportunities you mentioned! When is the application deadline?",
        timestamp: '45m',
        messageInfo: {
          channel: 'Admissions live chat',
          page: 'Computer Science Program',
          received: '08/01/2024 @ 16:45',
          sentTo: 'admissions@geckouniversity.ac.uk',
          cc: 'cs@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '2',
    userId: '2',
    assignedAgents: [],
    status: 'active',
    lastMessage: "Thank you! I'll check out the link. Just one more thing, could you provide me with information about the financial aid and tuition costs?",
    lastMessageTime: '1h',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-004',
        senderId: '2',
        content: 'Hey',
        timestamp: '4h',
        messageInfo: {
          channel: 'Admissions live chat',
          page: 'Undergraduate Admissions',
          received: '08/01/2024 @ 15:54',
          sentTo: 'info@geckouniversity.ac.uk',
          cc: 'finance@geckouniversity.ac.uk'
        }
      },
      {
        id: 'msg-005',
        senderId: '2',
        content: "I'm considering applying to Gecko University. Do you offer work-study programs?",
        timestamp: '3h',
        messageInfo: {
          channel: 'Admissions live chat',
          page: 'Undergraduate Admissions',
          received: '08/01/2024 @ 15:55',
          sentTo: 'info@geckouniversity.ac.uk',
          cc: 'finance@geckouniversity.ac.uk'
        }
      },
      {
        id: 'msg-006',
        senderId: 'agent-1',
        content: "Absolutely! We offer work-study opportunities aligned with your field of study. More info here: www.geckou.edu/work-study. If you need further assistance, feel free to ask. We're here to help!",
        timestamp: '2h',
        messageInfo: {
          source: 'ChatGPT',
          channel: 'Admissions live chat',
          page: 'Undergraduate Admissions',
          received: '08/01/2024 @ 15:56'
        },
        messageStatus: {
          status: 'read',
          statusText: 'Message has been read'
        }
      },
      {
        id: 'msg-007',
        senderId: '2',
        content: "Thank you! I'll check out the link. Just one more thing, could you provide me with information about the financial aid and tuition costs?",
        timestamp: '1h',
        messageInfo: {
          channel: 'Admissions live chat',
          page: 'Undergraduate Admissions',
          received: '08/01/2024 @ 15:58'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '3',
    userId: '3',
    assignedAgents: [],
    status: 'active',
    lastMessage: "Thanks for the quick response yesterday. The solution worked perfectly!",
    lastMessageTime: '2h',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-008',
        senderId: '3',
        content: "I'm having trouble accessing my student portal. Can you help?",
        timestamp: '3d',
        messageInfo: {
          channel: 'Support live chat',
          page: 'Student Portal',
          received: '07/01/2024 @ 14:20',
          sentTo: 'support@geckouniversity.ac.uk'
        }
      },
      {
        id: 'msg-009',
        senderId: 'agent-1',
        content: "Of course! I can help you with that. Can you tell me what error message you're seeing when you try to log in?",
        timestamp: '3d',
        messageInfo: {
          source: 'ChatGPT',
          channel: 'Support live chat',
          page: 'Student Portal',
          received: '07/01/2024 @ 14:22'
        },
        messageStatus: {
          status: 'read',
          statusText: 'Read'
        }
      },
      {
        id: 'msg-010',
        senderId: '3',
        content: "Thanks for the quick response yesterday. The solution worked perfectly!",
        timestamp: '2h',
        messageInfo: {
          channel: 'Support live chat',
          page: 'Student Portal',
          received: '08/01/2024 @ 10:30',
          sentTo: 'support@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '4',
    userId: '4',
    assignedAgents: [],
    status: 'active',
    lastMessage: "You: Can we schedule a call for next week? I'd like to discuss the project details.",
    lastMessageTime: '3h',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-011',
        senderId: '4',
        content: "Hi, I'm interested in your research collaboration program. Could you send me more information?",
        timestamp: '4h',
        messageInfo: {
          channel: 'Research live chat',
          page: 'Collaboration Program',
          received: '07/01/2024 @ 11:15',
          sentTo: 'research@geckouniversity.ac.uk'
        }
      },
      {
        id: 'msg-012',
        senderId: 'agent-1',
        content: "I'd be happy to help! I'll send you our collaboration program brochure and application form. What's your research area?",
        timestamp: '4h',
        messageInfo: {
          source: 'ChatGPT',
          channel: 'Research live chat',
          page: 'Collaboration Program',
          received: '07/01/2024 @ 11:18'
        },
        messageStatus: {
          status: 'read',
          statusText: 'Read'
        }
      },
      {
        id: 'msg-013',
        senderId: '4',
        content: "Can we schedule a call for next week? I'd like to discuss the project details.",
        timestamp: '3h',
        messageInfo: {
          channel: 'Research live chat',
          page: 'Collaboration Program',
          received: '08/01/2024 @ 13:45',
          sentTo: 'research@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '5',
    userId: '5',
    assignedAgents: [],
    status: 'active',
    lastMessage: "I've sent over the updated proposal. Let me know if you need any changes.",
    lastMessageTime: '5h',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-014',
        senderId: '5',
        content: "I've sent over the updated proposal. Let me know if you need any changes.",
        timestamp: '5h',
        messageInfo: {
          channel: 'Email',
          page: 'Proposal Review',
          received: '08/01/2024 @ 08:30',
          sentTo: 'partnerships@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '6',
    userId: '6',
    assignedAgents: [],
    status: 'closed',
    lastMessage: "You: The new dashboard looks amazing! Great work on the redesign.",
    lastMessageTime: '1d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-015',
        senderId: '6',
        content: "The new dashboard looks amazing! Great work on the redesign.",
        timestamp: '3d',
        messageInfo: {
          channel: 'Feedback live chat',
          page: 'Student Dashboard',
          received: '07/01/2024 @ 16:20',
          sentTo: 'feedback@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '7',
    userId: '7',
    assignedAgents: [],
    status: 'active',
    lastMessage: "You: Could you please send me the latest project update?",
    lastMessageTime: '2d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-016',
        senderId: '7',
        content: "Could you please send me the latest project update?",
        timestamp: '2d',
        messageInfo: {
          channel: 'Email',
          page: 'Project Updates',
          received: '06/01/2024 @ 09:15',
          sentTo: 'projects@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '8',
    userId: '8',
    assignedAgents: [],
    status: 'active',
    lastMessage: "I'm interested in learning more about your services.",
    lastMessageTime: '2d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-017',
        senderId: '8',
        content: "I'm interested in learning more about your services.",
        timestamp: '2d',
        messageInfo: {
          channel: 'General inquiry',
          page: 'Services Overview',
          received: '06/01/2024 @ 14:30',
          sentTo: 'info@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '9',
    userId: '9',
    assignedAgents: [],
    status: 'closed',
    lastMessage: "You: The meeting went well yesterday. Thanks for your time!",
    lastMessageTime: '3d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-018',
        senderId: '9',
        content: "The meeting went well yesterday. Thanks for your time!",
        timestamp: '2d',
        messageInfo: {
          channel: 'Follow-up email',
          page: 'Meeting Follow-up',
          received: '05/01/2024 @ 10:45',
          sentTo: 'meetings@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
},  
  {
    id: '10',
    userId: '10',
    assignedAgents: [],
    status: 'active',
    lastMessage: "You: I have some questions about the pricing structure.",
    lastMessageTime: '3d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-019',
        senderId: '10',
        content: "I have some questions about the pricing structure.",
        timestamp: '2d',
        messageInfo: {
          channel: 'Pricing inquiry',
          page: 'Pricing Information',
          received: '05/01/2024 @ 15:20',
          sentTo: 'pricing@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '11',
    userId: '11',
    assignedAgents: [],
    status: 'active',
    lastMessage: "Looking forward to our collaboration on this project.",
    lastMessageTime: '4d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-020',
        senderId: '11',
        content: "Looking forward to our collaboration on this project.",
        timestamp: '2d',
        messageInfo: {
          channel: 'Partnership email',
          page: 'Collaboration Agreement',
          received: '04/01/2024 @ 11:30',
          sentTo: 'partnerships@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  },
  {
    id: '12',
    userId: '12',
    assignedAgents: [],
    status: 'active',
    lastMessage: "You: Can we reschedule our call for next Tuesday?",
    lastMessageTime: '4d',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-021',
        senderId: '12',
        content: "Can we reschedule our call for next Tuesday?",
        timestamp: '2d',
        messageInfo: {
          channel: 'Scheduling email',
          page: 'Meeting Reschedule',
          received: '04/01/2024 @ 16:45',
          sentTo: 'scheduling@geckouniversity.ac.uk'
        }
      }
    ],
    systemMessages: []
  }
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getConversationById(id: string): Conversation | undefined {
  return conversations.find(conversation => conversation.id === id);
}

export function getAllUsers(): User[] {
  return users;
}

export function getAllConversations(): Conversation[] {
  return conversations;
}

export function getAgents(): User[] {
  return users.filter(user => user.isAgent);
}

export function getRegularUsers(): User[] {
  return users.filter(user => !user.isAgent);
}

// Helper function to get the actual last message timestamp from a conversation
export function getLastMessageTimestamp(conversation: Conversation): string {
  const allMessages = [...conversation.messages, ...conversation.systemMessages];
  if (allMessages.length === 0) return '0';
  
  // Sort by timestamp to get the most recent
  const sortedMessages = allMessages.sort((a, b) => {
    const getTimeValue = (timestamp: string) => {
      if (timestamp === 'now') return Date.now();
      if (timestamp.includes('m') && !timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 60 * 1000;
      if (timestamp.includes('h')) return Date.now() - parseInt(timestamp) * 60 * 60 * 1000;
      if (timestamp.includes('d')) return Date.now() - parseInt(timestamp) * 24 * 60 * 60 * 1000;
      if (timestamp.includes('w')) return Date.now() - parseInt(timestamp) * 7 * 24 * 60 * 60 * 1000;
      if (timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 30 * 24 * 60 * 60 * 1000;
      return 0;
    };
    
    return getTimeValue(a.timestamp) - getTimeValue(b.timestamp);
  });
  
  return sortedMessages[sortedMessages.length - 1].timestamp;
}

// System message helper functions
export function addSystemMessage(
  conversationId: string, 
  type: SystemMessage['type'], 
  content: string
): void {
  const conversation = getConversationById(conversationId);
  if (!conversation) return;
  
  // Use relative timestamp for system messages so they appear at the bottom
  const timestamp = 'now';
  
  const newSystemMessage: SystemMessage = {
    id: `sys-${Date.now()}`,
    content,
    timestamp,
    type
  };
  
  conversation.systemMessages.push(newSystemMessage);
}

export function formatSystemMessageTimestamp(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  // Add ordinal suffix to day
  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${day}${getOrdinalSuffix(day)} ${month} ${year} at ${hours}:${minutes}`;
}

export function createAgentAssignmentMessage(agentName: string, action: 'assigned' | 'removed'): string {
  return action === 'assigned' 
    ? `${agentName} was added to the conversation`
    : `${agentName} was removed from the conversation`;
}

export function updateUser(userId: string, updates: Partial<User>): boolean {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) return false;
  
  // Update the user with new data
  users[userIndex] = { ...users[userIndex], ...updates };
  
  // Recalculate verified status based on email/phone
  const user = users[userIndex];
  const hasEmail = Boolean(user.email && user.email.trim() !== '');
  const hasPhone = Boolean(user.phone && user.phone.trim() !== '');
  const wasVerified = user.verified;
  user.verified = hasEmail || hasPhone;
  
  // Debug logging
  if (wasVerified !== user.verified) {
    console.log(`User ${user.name} verification status changed: ${wasVerified} -> ${user.verified}`);
    console.log(`Email: "${user.email}", Phone: "${user.phone}"`);
  }
  
  return true;
}
