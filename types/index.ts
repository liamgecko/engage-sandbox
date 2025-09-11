// Global type definitions

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  lastMessageSender: string;
  timestamp: string;
  avatarBg: string;
  avatarText: string;
}

export interface Message {
  id: string;
  sender: "user" | "agent" | "system";
  content: string;
  timestamp: string;
  senderName: string;
  senderInitials: string;
  isAgent?: boolean;
  messageInfo?: {
    source?: string;
    channel?: string;
    page?: string;
    received?: string;
    sentTo?: string;
    cc?: string;
  };
  messageStatus?: {
    status: "sending" | "delivered" | "read";
    statusText: string;
  };
}

export interface UserData {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  contactDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    dateOfBirth: string;
    language: string;
  };
}

export interface Agent {
  value: string;
  label: string;
  initials?: string;
  avatar?: string;
  avatarBg?: string;
  avatarText?: string;
  type?: "agent" | "team";
}

export type TabValue = 
  | "my-conversations" 
  | "unassigned" 
  | "open" 
  | "closed" 
  | "sent" 
  | "assigned-to-bot";

export interface Tab {
  value: TabValue;
  label: string;
  count: number;
  hasDot: boolean;
}

export interface Channel {
  value: string;
  label: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
