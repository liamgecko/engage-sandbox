"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CircleCheckBig } from "lucide-react"

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
  avatarText = "text-gray-700"
}: ChatHeadProps) {
  return (
    <li 
      className={`group relative flex justify-between items-center px-2 py-3 rounded cursor-pointer transition-colors duration-200 ${
        isActive 
          ? 'bg-slate-50' 
          : 'hover:bg-slate-100'
      }`}
      tabIndex={0}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 flex-1 min-w-0 max-w-[85%]">
        <Avatar>
          <AvatarFallback className={`text-xs font-medium ${avatarBg} ${avatarText}`}>{initials}</AvatarFallback>
        </Avatar>
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
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="iconSm" onClick={() => onClose(id)}>
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
