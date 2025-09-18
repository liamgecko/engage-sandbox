"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  getAllConversations, 
  getUserById,
  getLastMessageTimestamp
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { Search, Filter, MoreVertical } from "lucide-react";

interface ChatHeadsProps {
  selectedConversationId?: string;
  onConversationSelect?: (conversationId: string) => void;
}

export function ChatHeads({ 
  selectedConversationId, 
  onConversationSelect 
}: ChatHeadsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "closed">("all");
  
  const conversations = getAllConversations();

  const filteredConversations = conversations.filter(conv => {
    const user = getUserById(conv.userId);
    if (!user) return false;
    
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || conv.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    // Sort by actual last message timestamp
    const getTimeValue = (timestamp: string) => {
      if (timestamp === 'now') return Date.now();
      if (timestamp.includes('m') && !timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 60 * 1000;
      if (timestamp.includes('h')) return Date.now() - parseInt(timestamp) * 60 * 60 * 1000;
      if (timestamp.includes('d')) return Date.now() - parseInt(timestamp) * 24 * 60 * 60 * 1000;
      if (timestamp.includes('w')) return Date.now() - parseInt(timestamp) * 7 * 24 * 60 * 60 * 1000;
      if (timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 30 * 24 * 60 * 60 * 1000;
      return 0;
    };
    
    const aLastMessageTime = getLastMessageTimestamp(a);
    const bLastMessageTime = getLastMessageTimestamp(b);
    
    return getTimeValue(bLastMessageTime) - getTimeValue(aLastMessageTime);
  });

  const handleConversationClick = (conversationId: string) => {
    onConversationSelect?.(conversationId);
  };

  return (
    <div className="w-80 border-r bg-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Conversations</h2>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-1 mt-3">
          {[
            { key: "all", label: "All" },
            { key: "active", label: "Active" },
            { key: "closed", label: "Closed" }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filterStatus === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilterStatus(key as "all" | "active" | "closed")}
              className="flex-1"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conversation) => {
            const user = getUserById(conversation.userId);
            if (!user) return null;

            const isSelected = selectedConversationId === conversation.id;
            const hasUnread = conversation.unreadCount > 0;

            return (
              <div
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                  isSelected 
                    ? "bg-blue-50 border border-blue-200" 
                    : "hover:bg-slate-50"
                )}
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback 
                      className={cn(
                        "text-sm font-medium",
                        user.avatarBg,
                        user.avatarText
                      )}
                    >
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-medium truncate",
                      hasUnread ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {user.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {getLastMessageTimestamp(conversation)}
                    </span>
                  </div>
                  
                  <p className={cn(
                    "text-sm truncate mt-1",
                    hasUnread ? "text-foreground font-medium" : "text-muted-foreground"
                  )}>
                    {conversation.lastMessage}
                  </p>
                  
                  {/* Status and Unread Count */}
                  <div className="flex items-center justify-between mt-1">
                    <Badge 
                      variant={conversation.status === "active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {conversation.status}
                    </Badge>
                    
                    {hasUnread && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* More Options */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Show conversation options
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
