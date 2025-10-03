"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleCheckBig, Flag } from "lucide-react"
import { toggleConversationImportant, isConversationImportant } from "@/lib/data"
import { useState, useEffect } from "react"

interface ChatHeadProps {
  id: string
  name: string
  initials: string
  lastMessage: string
  lastMessageSender: string
  timestamp: string
  onClose: (id: string) => void
  onClick: () => void
  isActive?: boolean
  avatarBg?: string
  avatarText?: string
  isSelected?: boolean
  onSelectionChange?: (id: string, selected: boolean) => void
}

export function ChatHead({
  id,
  name,
  initials,
  lastMessage,
  lastMessageSender,
  timestamp,
  onClose,
  onClick,
  isActive = false,
  avatarBg = "bg-gray-100",
  avatarText = "text-gray-700",
  isSelected = false,
  onSelectionChange
}: ChatHeadProps) {
  const [isImportant, setIsImportant] = useState(false)

  // Initialize important state
  useEffect(() => {
    setIsImportant(isConversationImportant(id))
  }, [id])

  const handleFlagImportant = () => {
    toggleConversationImportant(id)
    setIsImportant(!isImportant)
  }
  return (
    <li 
      className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
        isActive 
          ? 'bg-slate-50' 
          : isSelected
          ? 'bg-slate-50'
          : 'hover:bg-slate-100'
      }`}
      tabIndex={0}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0 max-w-[85%]">
        <div className="relative">
          <Avatar>
            <AvatarFallback className={`text-xs font-medium ${avatarBg} ${avatarText}`}>{initials}</AvatarFallback>
          </Avatar>
          {/* Checkbox that appears on hover */}
          {onSelectionChange && (
            <div className={`bg-slate-100 rounded-full border border-white absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}>
              <Checkbox
                checked={isSelected}
                className="border-gray-300"
                onCheckedChange={(checked) => onSelectionChange(id, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        <div className="overflow-hidden w-full">
          <h4 className="m-0 text-sm font-medium">{name}</h4>
          <div className="text-[13px] text-muted-foreground truncate">
            {lastMessageSender !== "You" && (
              <span className="font-medium">You: </span>
            )}
            {lastMessage}
          </div>
        </div>
      </div>
      <div className="text-xs font-medium text-muted-foreground">
        {timestamp}
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="iconXs" 
              onClick={(e) => {
                e.stopPropagation()
                handleFlagImportant()
              }}
              className={isImportant ? "bg-orange-50 border-orange-200 text-orange-600 hover:text-orange-500 hover:bg-orange-50" : ""}
            >
              <Flag className={`h-4 w-4 ${isImportant ? "fill-current" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isImportant ? "Remove from important" : "Flag as important"}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="iconXs" onClick={(e) => {
              e.stopPropagation()
              onClose(id)
            }}>
              <CircleCheckBig className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Close conversation</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </li>
  )
}
