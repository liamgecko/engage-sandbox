"use client";

import { useState } from "react";
import { ChatHeads } from "@/components/chat/chat-heads";
import { ConversationPanel } from "@/components/conversation/conversation-panel";
import { ContactDetails } from "@/components/chat/contact-details";

export default function Home() {
  const [selectedConversationId, setSelectedConversationId] = useState<string>("1");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversationId(conversationId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Chat Heads Sidebar */}
      <ChatHeads 
        selectedConversationId={selectedConversationId}
        onConversationSelect={handleConversationSelect}
      />
      
      {/* Main Conversation Area */}
      <div className="flex-1 flex">
        <ConversationPanel 
          conversationId={selectedConversationId}
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        
        {/* Contact Details Sidebar */}
        {!isSidebarCollapsed && (
          <ContactDetails conversationId={selectedConversationId} />
        )}
      </div>
    </div>
  );
}