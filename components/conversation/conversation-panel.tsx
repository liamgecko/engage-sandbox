"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MultiSelectCombobox } from "@/components/ui/multi-select-combobox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { ReplyBox } from "@/components/ui/reply-box";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { SystemMessage } from "@/components/ui/system-message";
import { CircleCheckBig, PanelRightClose, PanelRightOpen, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  getConversationById, 
  getUserById,
  addSystemMessage,
  createAgentAssignmentMessage,
  Message
} from "@/lib/data";
import { 
  getAllAgents,
  getAgentById
} from "@/lib/agent-data";

interface ConversationPanelProps {
  conversationId?: string;
  onClose?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export function ConversationPanel({ 
  conversationId = "2",
  onClose,
  onToggleSidebar,
  isSidebarCollapsed = false
}: ConversationPanelProps) {
  const [assignedAgents, setAssignedAgents] = useState<string[]>([]);
  const [isReplyBoxMaximized, setIsReplyBoxMaximized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Get conversation and user data
  const conversation = getConversationById(conversationId);
  const user = conversation ? getUserById(conversation.userId) : null;
  const allAgents = getAllAgents();
  
  // Initialize assigned agents from conversation data when conversation changes
  React.useEffect(() => {
    if (conversation) {
      setAssignedAgents(conversation.assignedAgents || []);
    }
  }, [conversationId, conversation]);

  // Auto-scroll to bottom when messages change
  useLayoutEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        // Try multiple selectors for the scrollable element
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') || 
                               scrollAreaRef.current.querySelector('.overflow-auto') ||
                               scrollAreaRef.current.querySelector('[data-scroll-area-viewport]');
        
        if (scrollContainer) {
          console.log('Scrolling to bottom, scrollHeight:', scrollContainer.scrollHeight);
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        } else {
          console.log('Scroll container not found, trying direct scroll');
          // Fallback: try to scroll the ref element directly
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      } else {
        console.log('ScrollArea ref not found');
      }
    };

    // Add a small delay to ensure DOM is fully updated
    const timeoutId = setTimeout(scrollToBottom, 10);
    return () => clearTimeout(timeoutId);
  }, [conversation?.messages?.length, conversation?.systemMessages?.length]);

  // Always show header and reply box, even if no conversation data
  const displayName = user?.name || "Unknown";
  const hasConversation = conversation && user;

  // Get agent options for assignment
  const agentOptions = allAgents.map(agent => ({
    value: agent.id,
    label: agent.name,
    initials: agent.initials,
    avatar: undefined,
    avatarBg: agent.avatarBg,
    avatarText: agent.avatarText,
    type: agent.type
  }));


  const handleAssignmentChange = (newAssignments: string[]) => {
    const previousAssignments = assignedAgents;
    const addedAgents = newAssignments.filter(id => !previousAssignments.includes(id));
    const removedAgents = previousAssignments.filter(id => !newAssignments.includes(id));
    
    // Add system messages for added agents
    addedAgents.forEach(agentId => {
      const agent = getAgentById(agentId);
      if (agent && conversationId) {
        const message = createAgentAssignmentMessage(agent.name, 'assigned');
        addSystemMessage(conversationId, 'agent_assigned', message);
      }
    });
    
    // Add system messages for removed agents
    removedAgents.forEach(agentId => {
      const agent = getAgentById(agentId);
      if (agent && conversationId) {
        const message = createAgentAssignmentMessage(agent.name, 'removed');
        addSystemMessage(conversationId, 'agent_removed', message);
      }
    });
    
    // Update conversation data
    if (conversation) {
      conversation.assignedAgents = newAssignments;
    }
    
    setAssignedAgents(newAssignments);
  };

  return (
    <div className="h-full bg-white flex flex-col min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border h-[56px] flex-shrink-0">
        <h3 className="text-md font-semibold text-foreground">{displayName}</h3>
        
        <div className="flex items-center gap-2">
          {/* Bot Avatar */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <Avatar className="size-6">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1683029096295-7680306aa37d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Bot Avatar" 
                        width={24}
                        height={24}
                      />
                    </Avatar>
                    <div className="absolute inset-0 bg-slate-950/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <MoreVertical className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Assigned to Botty McBotface</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                Botty McBotface
              </DropdownMenuLabel>
              <DropdownMenuItem>
                Pause chatbot
              </DropdownMenuItem>
              <DropdownMenuItem>
                Remove chatbot from conversation
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Separator orientation="vertical" className="!h-6 ml-1" />
          
          <MultiSelectCombobox
            options={agentOptions}
            selected={assignedAgents}
            onChange={handleAssignmentChange}
            placeholder="Add to conversation"
            maxDisplay={1}
          />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="iconSm"
                onClick={onClose}
              >
                <CircleCheckBig className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Close conversation</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="iconSm"
                onClick={onToggleSidebar}
              >
                {isSidebarCollapsed ? (
                  <PanelRightOpen className="h-4 w-4" />
                ) : (
                  <PanelRightClose className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isSidebarCollapsed ? "Open contact details" : "Collapse contact details"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Conversation Area - Scrollable */}
      {!isReplyBoxMaximized && (
        <div className="flex-1 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="h-full p-4 pb-0">
            <div className="space-y-4">
              {hasConversation ? (
                <>
                  {/* Combine and sort all messages by timestamp */}
                  {[...conversation!.messages, ...conversation!.systemMessages]
                    .sort((a, b) => {
                      // Convert timestamps to comparable values
                      const getTimeValue = (timestamp: string) => {
                        if (timestamp === 'now') return Date.now();
                        
                        // Handle relative timestamps (45m, 2h, 1d, etc.)
                        if (timestamp.includes('m') && !timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 60 * 1000;
                        if (timestamp.includes('h')) return Date.now() - parseInt(timestamp) * 60 * 60 * 1000;
                        if (timestamp.includes('d')) return Date.now() - parseInt(timestamp) * 24 * 60 * 60 * 1000;
                        if (timestamp.includes('w')) return Date.now() - parseInt(timestamp) * 7 * 24 * 60 * 60 * 1000;
                        if (timestamp.includes('mo')) return Date.now() - parseInt(timestamp) * 30 * 24 * 60 * 60 * 1000;
                        
                        // Handle full date timestamps (11th Sep 2025 at 11:46)
                        if (timestamp.includes('at')) {
                          try {
                            // Parse the full date format
                            const dateStr = timestamp.replace(/(\d+)(st|nd|rd|th)/, '$1'); // Remove ordinal suffix
                            const date = new Date(dateStr);
                            return date.getTime();
                          } catch {
                            return 0;
                          }
                        }
                        
                        return 0;
                      };
                      
                      return getTimeValue(a.timestamp) - getTimeValue(b.timestamp);
                    })
                    .map((item) => {
                      // Check if it's a system message
                      if ('type' in item) {
                        return <SystemMessage key={item.id} message={item} />;
                      }
                      
                      // Regular message
                      const message = item as Message;
                      const isAgentId = message.senderId.startsWith('agent-') || message.senderId.startsWith('team-');
                      const agentSender = isAgentId ? getAgentById(message.senderId) : null;
                      const userSender = !isAgentId ? getUserById(message.senderId) : null;
                      
                      if (!agentSender && !userSender) return null;
                      
                      // Convert agent to user format for ChatBubble
                      const sender = agentSender ? {
                        id: agentSender.id,
                        name: agentSender.name,
                        initials: agentSender.initials,
                        email: '', // Agent doesn't have email
                        phone: '', // Agent doesn't have phone
                        language: 'English', // Default language
                        avatarBg: agentSender.avatarBg,
                        avatarText: agentSender.avatarText,
                        lastSeen: 'Online',
                        verified: agentSender.verified,
                      } : userSender!;
                      
                      // Determine if this is an agent message
                      const isAgent = isAgentId || conversation!.assignedAgents.includes(message.senderId);
                      
                      return (
                        <ChatBubble
                          key={message.id}
                          message={message}
                          sender={sender}
                          isAgent={isAgent}
                        />
                      );
                    })}
                </>
              ) : (
                /* Empty State */
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No conversation selected</h3>
                    <p className="text-slate-500">Select a conversation from the sidebar to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Reply Box - Fixed at Bottom */}
      <div className={isReplyBoxMaximized ? "flex-1 p-4" : "flex-shrink-0 p-4"}>
        <ReplyBox 
          placeholder={hasConversation ? "Type your reply..." : "Select a conversation to start chatting"}
          onSend={(message) => {
            if (hasConversation) {
              console.log("Sending message:", message);
              // TODO: Implement message sending logic
            }
          }}
          isMaximized={isReplyBoxMaximized}
          onMaximizeChange={setIsReplyBoxMaximized}
          disabled={!hasConversation}
        />
      </div>
    </div>
  );
}