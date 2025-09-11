"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit } from "lucide-react"
import { ChatHead } from "./chat-head"

interface Conversation {
  id: string
  name: string
  initials: string
  lastMessage: string
  lastMessageSender: string
  timestamp: string
  avatarBg?: string
  avatarText?: string
}

interface ConversationListProps {
  conversations: Conversation[]
  onCloseConversation: (id: string) => void
  onConversationSelect: (id: string) => void
  activeConversationId: string
}

export function ConversationList({ conversations, onCloseConversation, onConversationSelect, activeConversationId }: ConversationListProps) {
  return (
    <div className="w-1/4 min-w-80 border-r border-border flex flex-col">
      <div className="border-b pl-2.5 py-3 pr-4 h-[56px] flex items-center justify-between bg-white">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <Select defaultValue="all">
              <SelectTrigger className="border-none !h-8 font-medium text-[13px] px-1.5">
                <div className="flex items-center gap-1">
                  <div className="min-w-0 flex-1 overflow-hidden truncate max-w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="pb-2">
                  <SelectItem value="all">All conversations</SelectItem>
                  <SelectItem value="team-assigned">Team assigned: awaiting agent</SelectItem>
                  <SelectItem value="waiting-response">Waiting for a response</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Your assignments</SelectLabel>
                  <SelectItem value="your-assignments">Your assignments</SelectItem>
                  <SelectItem value="directly-to-you">Directly to you</SelectItem>
                  <SelectItem value="admission-team">Admission team</SelectItem>
                  <SelectItem value="facebook-messenger-team">Facebook messenger team</SelectItem>
                  <SelectItem value="email-inbox">Email inbox</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
                                    
            <Select defaultValue="newest">
              <SelectTrigger className="border-none !h-8 font-medium text-[13px] px-1.5">
                <div className="flex items-center gap-1">
                  <div className="min-w-0 flex-1 overflow-hidden truncate max-w-[100px]">
                    <SelectValue placeholder="Sort" />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="iconSm">
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Start new conversation</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-56px-56px-48px)] p-2">
        <ul className="space-y-[1px]">
          {conversations.map((conversation) => (
            <ChatHead
              key={conversation.id}
              id={conversation.id}
              name={conversation.name}
              initials={conversation.initials}
              lastMessage={conversation.lastMessage}
              lastMessageSender={conversation.lastMessageSender}
              timestamp={conversation.timestamp}
              onClose={onCloseConversation}
              onClick={() => onConversationSelect(conversation.id)}
              isActive={conversation.id === activeConversationId}
              avatarBg={conversation.avatarBg}
              avatarText={conversation.avatarText}
            />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
