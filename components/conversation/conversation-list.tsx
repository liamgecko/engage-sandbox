"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, UserPlus, CircleCheckBig, Flag, ShieldAlert } from "lucide-react"
import { ChatHead } from "./chat-head"
import { setConversationsImportant, isConversationImportant, subscribeToImportantChanges } from "@/lib/data"

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
  const [selectedConversations, setSelectedConversations] = useState<Set<string>>(new Set())
  const [importantConversations, setImportantConversations] = useState<Set<string>>(new Set())

  const handleSelectionChange = (id: string, selected: boolean) => {
    setSelectedConversations(prev => {
      const newSet = new Set(prev)
      if (selected) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all conversations
      const allIds = new Set(conversations.map(conv => conv.id))
      setSelectedConversations(allIds)
    } else {
      // Deselect all
      setSelectedConversations(new Set())
    }
  }

  const isAllSelected = selectedConversations.size === conversations.length && conversations.length > 0
  const isIndeterminate = selectedConversations.size > 0 && selectedConversations.size < conversations.length
  
  // Get the proper checked state for Radix UI
  const getCheckedState = () => {
    if (isAllSelected) return true
    if (isIndeterminate) return 'indeterminate'
    return false
  }

  const handleFlagImportant = () => {
    const selectedIds = Array.from(selectedConversations)
    if (selectedIds.length > 0) {
      // Check if all selected conversations are already important
      const allImportant = selectedIds.every(id => importantConversations.has(id))
      setConversationsImportant(selectedIds, !allImportant)
    }
  }

  // Check if all selected conversations are important
  const selectedImportantCount = Array.from(selectedConversations).filter(id => importantConversations.has(id)).length
  const allSelectedAreImportant = selectedConversations.size > 0 && selectedImportantCount === selectedConversations.size

  // Subscribe to important changes
  useEffect(() => {
    const unsubscribe = subscribeToImportantChanges(() => {
      const importantSet = new Set<string>()
      conversations.forEach(conv => {
        if (isConversationImportant(conv.id)) {
          importantSet.add(conv.id)
        }
      })
      setImportantConversations(importantSet)
    })
    return unsubscribe
  }, [conversations])

  // Separate conversations into important and regular
  const importantConvs = conversations.filter(conv => importantConversations.has(conv.id))
  const regularConvs = conversations.filter(conv => !importantConversations.has(conv.id))


  return (
    <div className="w-1/4 min-w-80 border-r border-border flex flex-col">
      <div className="border-b pl-2.5 py-3 pr-4 !h-[56px] flex items-center justify-between bg-white">
        <div className="flex items-center justify-between w-full">
          {selectedConversations.size > 0 ? (
            // Selection controls when items are selected
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-2 pl-2">
                <Checkbox
                  id="select-all"
                  checked={getCheckedState()}
                  onCheckedChange={handleSelectAll}
                />
                <Label 
                  htmlFor="select-all"
                >
                  {selectedConversations.size} selected
                </Label>
              </div>
            </div>
          ) : (
            // Dropdowns when nothing is selected
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
          )}
          {selectedConversations.size > 0 ? (
            // Icon tray when items are selected
            <div className="flex items-center gap-[1px] h-[32px]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconXs">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Assign conversations</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconXs">
                    <CircleCheckBig className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Close conversations</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="iconXs" 
                    onClick={handleFlagImportant}
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{allSelectedAreImportant ? "Remove from important" : "Flag as important"}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconXs">
                    <ShieldAlert className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Mark as spam</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="iconXs" className="hover:bg-red-50 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Delete conversations</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            // New conversation button when nothing is selected
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="iconSm">
                  <Edit className="size-4.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Start new conversation</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-56px-56px-48px)] p-2">
        <div className="space-y-4">
          {/* Important conversations section */}
          {importantConvs.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2">
                Conversations flagged as important
              </h3>
              <ul className="space-y-[1px]">
                {importantConvs.map((conversation) => (
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
                    isSelected={selectedConversations.has(conversation.id)}
                    onSelectionChange={handleSelectionChange}
                  />
                ))}
              </ul>
            </div>
          )}
          
          {/* All other conversations section - only show if there are important conversations */}
          {importantConvs.length > 0 && regularConvs.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground px-2 py-1 mb-2">
                All other conversations
              </h3>
              <ul className="space-y-[1px]">
                {regularConvs.map((conversation) => (
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
                    isSelected={selectedConversations.has(conversation.id)}
                    onSelectionChange={handleSelectionChange}
                  />
                ))}
              </ul>
            </div>
          )}
          
          {/* Show all conversations without sectioning if no important conversations */}
          {importantConvs.length === 0 && (
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
                  isSelected={selectedConversations.has(conversation.id)}
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
