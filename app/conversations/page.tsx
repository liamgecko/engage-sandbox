"use client";

import { useState, useMemo, useCallback } from "react";
import { Toolbar } from "@/components/conversation/conversation-toolbar";
import { ContactDetails } from "@/components/conversation/conversation-contact-details";
import { ConversationPanel } from "@/components/conversation/conversation-panel";
import { ConversationList } from "@/components/conversation/conversation-list";
import { getAllUsers } from "@/lib/data";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function ConversationsPage() {
  const [activeTab, setActiveTab] = useState("my-conversations");
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState("2");

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleFilterClick = useCallback(() => {
    // Handle filter click
    console.log("Filter clicked");
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  const handleCloseConversation = useCallback((id: string) => {
    // Handle closing conversation
    console.log("Close conversation", id);
  }, []);

  const handleCloseCurrentConversation = useCallback(() => {
    // Handle closing current conversation
    console.log("Close current conversation");
  }, []);

  const handleConversationSelect = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // Generate conversations from user data with memoization
  const conversations = useMemo(() => {
    // Sample conversation data with messages
    const conversationMessages = {
      "1": "I'm really excited about the scholarship opportunities you mentioned! When is the application deadline?",
      "2": "Thank you! I'll check out the link. Just one more thing, could you provide me with information about the financial aid and tuition costs?",
      "3": "Thanks for the quick response yesterday. The solution worked perfectly!",
      "4": "Can we schedule a call for next week? I'd like to discuss the project details.",
      "5": "I've sent over the updated proposal. Let me know if you need any changes.",
      "6": "The new dashboard looks amazing! Great work on the redesign.",
      "7": "Could you please send me the latest project update?",
      "8": "I'm interested in learning more about your services.",
      "9": "The meeting went well yesterday. Thanks for your time!",
      "10": "I have some questions about the pricing structure.",
      "11": "Looking forward to our collaboration on this project.",
      "12": "Can we reschedule our call for next Tuesday?"
    };

    const conversationSenders = {
      "1": "You",
      "2": "You",
      "3": "You",
      "4": "Elena",
      "5": "You",
      "6": "Luna",
      "7": "Aria",
      "8": "You",
      "9": "Rafael",
      "10": "Anastasia",
      "11": "You",
      "12": "Maya"
    };

    const conversationTimestamps = {
      "1": "45m",
      "2": "1h",
      "3": "2h",
      "4": "3h",
      "5": "5h",
      "6": "1d",
      "7": "2d",
      "8": "2d",
      "9": "3d",
      "10": "3d",
      "11": "4d",
      "12": "4d"
    };

    return getAllUsers().map(user => ({
      id: user.id,
      name: user.name,
      initials: user.initials,
      lastMessage: conversationMessages[user.id as keyof typeof conversationMessages] || "No recent messages",
      lastMessageSender: conversationSenders[user.id as keyof typeof conversationSenders] || "Unknown",
      timestamp: conversationTimestamps[user.id as keyof typeof conversationTimestamps] || "Unknown",
      avatarBg: user.avatarBg,
      avatarText: user.avatarText
    }));
  }, []);

  return (
    <ErrorBoundary>
      <div className="h-full">
        {/* Toolbar */}
        <Toolbar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onFilterClick={handleFilterClick}
        />
        
        <div className="h-[calc(100vh-106px)] flex overflow-hidden">
          {/* Left Panel - Conversations List */}
          <ErrorBoundary>
            <ConversationList 
              conversations={conversations}
              onCloseConversation={handleCloseConversation}
              onConversationSelect={handleConversationSelect}
              activeConversationId={activeConversationId}
            />
          </ErrorBoundary>
          
          {/* Middle Panel - Conversation */}
          <div className="flex-1 min-w-0">
            <ErrorBoundary>
              <ConversationPanel
                conversationId={activeConversationId}
                onToggleSidebar={handleToggleSidebar}
                onClose={handleCloseCurrentConversation}
                isSidebarCollapsed={isSidebarCollapsed}
              />
            </ErrorBoundary>
          </div>
          
          {/* Right Panel - Contact Details */}
          <div className={`transition-all duration-300 ease-in-out border-l border-border ${
            isSidebarCollapsed 
              ? 'w-0 min-w-0 max-w-0 overflow-hidden' 
              : 'w-1/4 min-w-80'
          }`}>
            <div className={`transition-all duration-300 ease-in-out h-full ${
              isSidebarCollapsed 
                ? 'opacity-0 transform translate-x-full' 
                : 'opacity-100 transform translate-x-0'
            }`}>
              <ErrorBoundary>
                <ContactDetails contactId={activeConversationId} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
