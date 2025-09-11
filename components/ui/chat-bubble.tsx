import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Info, Check, CheckCheck } from "lucide-react"
import { Message, User } from "@/lib/data"

interface ChatBubbleProps {
  message: Message;
  sender: User;
  isAgent?: boolean;
  className?: string;
}

export function ChatBubble({ message, sender, isAgent = false, className }: ChatBubbleProps) {
  const isUser = !isAgent;

  return (
    <div className={cn(
      "flex",
      isUser ? "justify-start" : "justify-end",
      className
    )}>
      <div className={cn(
        "flex gap-2 max-w-[80%]",
        isUser ? "flex-row" : "flex-row-reverse"
      )}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          {isAgent ? (
            <AvatarImage 
              src="https://images.unsplash.com/photo-1683029096295-7680306aa37d?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt={sender.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarFallback 
              className={cn(
                "text-xs font-medium",
                sender.avatarBg,
                sender.avatarText
              )}
            >
              {sender.initials}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className={cn(
          "flex flex-col",
          isUser ? "items-start" : "items-end"
        )}>
          <div
            className={cn(
              "rounded-lg",
              isUser
                ? "bg-slate-100 text-foreground"
                : "bg-slate-200 text-foreground"
            )}
          >
            <div className="p-3">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            
            <div className={cn(
              "flex items-center gap-1 pl-2 pr-3 pb-2",
              isUser ? "justify-start" : "justify-end"
            )}>
              {message.messageInfo && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="iconSm" className="hover:bg-slate-200 size-4.5 !hover:text-primary">
                      <Info className="size-3 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align={isUser ? "start" : "end"}>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                      {message.messageInfo.source && (
                        <>
                          <span className="text-sm text-muted-foreground">Source:</span>
                          <span className="text-sm">{message.messageInfo.source}</span>
                        </>
                      )}
                      {message.messageInfo.channel && (
                        <>
                          <span className="text-sm text-muted-foreground">Channel:</span>
                          <span className="text-sm">{message.messageInfo.channel}</span>
                        </>
                      )}
                      {message.messageInfo.page && (
                        <>
                          <span className="text-sm text-muted-foreground">Page:</span>
                          <a href="#" className="text-sm text-blue-600 underline hover:text-blue-800">
                            {message.messageInfo.page}
                          </a>
                        </>
                      )}
                      {message.messageInfo.received && (
                        <>
                          <span className="text-sm text-muted-foreground">Received:</span>
                          <span className="text-sm">{message.messageInfo.received}</span>
                        </>
                      )}
                      {message.messageInfo.sentTo && (
                        <>
                          <span className="text-sm text-muted-foreground">Sent to:</span>
                          <span className="text-sm">{message.messageInfo.sentTo}</span>
                        </>
                      )}
                      {message.messageInfo.cc && (
                        <>
                          <span className="text-sm text-muted-foreground">CC:</span>
                          <span className="text-sm">{message.messageInfo.cc}</span>
                        </>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              
              {/* Message Status for Agent Messages */}
              {isAgent && message.messageStatus && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm" className="hover:bg-slate-200 size-4.5">
                      {message.messageStatus.status === "read" ? (
                        <CheckCheck className="size-3 text-blue-500" />
                      ) : message.messageStatus.status === "delivered" ? (
                        <CheckCheck className="size-3 text-muted-foreground" />
                      ) : (
                        <Check className="size-3 text-muted-foreground" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{message.messageStatus.statusText}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {/* Timestamp */}
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}