"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronDown, Maximize2, Minimize2, Paperclip, Bookmark, Smile, Wand2, StickyNote, SquareUser, SendHorizonal } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { validateMessage, safeSetTextareaHeight } from "@/lib/validation"

interface ReplyBoxProps {
  placeholder?: string
  onSend?: (message: string) => void
  disabled?: boolean
  selectedChannel?: string
  onChannelChange?: (channel: string) => void
  isMaximized?: boolean
  onMaximizeChange?: (maximized: boolean) => void
}

export function ReplyBox({ 
  placeholder = "Type your reply...", 
  onSend,
  disabled = false,
  selectedChannel = "live-chat",
  onChannelChange,
  isMaximized = false,
  onMaximizeChange
}: ReplyBoxProps) {
  const [message, setMessage] = useState("")
  const [channel, setChannel] = useState(selectedChannel)
  const [open, setOpen] = useState(false)

  const channels = [
    { value: "live-chat", label: "Admissions Live Chat" },
    { value: "email", label: "Admissions Inbox" },
    { value: "facebook", label: "Facebook Messenger" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "instagram", label: "Instagram" },
  ]

  const handleChannelChange = (value: string) => {
    setChannel(value)
    setOpen(false)
    onChannelChange?.(value)
  }

  const handleMaximize = () => {
    onMaximizeChange?.(!isMaximized)
  }

  const selectedChannelLabel = channels.find(c => c.value === channel)?.label || "Live Chat"

  const handleSend = () => {
    const validation = validateMessage(message);
    if (validation.isValid && onSend) {
      onSend(message.trim())
      setMessage("")
    } else if (!validation.isValid) {
      // Handle validation error - could show a toast or error message
      console.error("Message validation failed:", validation.error);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize textarea with safe height setting
    safeSetTextareaHeight(e.target, 120)
  }

  return (
    <div className={`bg-slate-50 border border-border rounded-lg shadow-lg ${
      isMaximized ? 'h-full flex flex-col' : ''
    }`}>

        <div className={`bg-white border border-border mt-[-1px] mx-[-1px] rounded-lg ${
            isMaximized ? 'flex-1 flex flex-col' : ''
        }`}>
            <div className="flex items-center justify-between px-2 py-2 border-b border-border">
                <div className="flex items-center gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="!text-[13px]"
                        role="combobox"
                        aria-expanded={open}
                    >
                        {selectedChannelLabel}
                        <ChevronDown />
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search channels..." />
                        <CommandList>
                        <CommandEmpty>No channel found.</CommandEmpty>
                        <CommandGroup>
                            {channels.map((channelOption) => (
                            <CommandItem
                                key={channelOption.value}
                                value={channelOption.value}
                                onSelect={() => handleChannelChange(channelOption.value)}
                            >
                                <div className="flex items-center gap-2 w-full">
                                <span>{channelOption.label}</span>
                                <Check
                                    className={`ml-auto h-4 w-4 text-foreground ${
                                    channelOption.value === channel ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                                </div>
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </CommandList>
                    </Command>
                    </PopoverContent>
                </Popover>
                </div>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm" onClick={handleMaximize}>
                    {isMaximized ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isMaximized ? "Minimise reply box" : "Maximize reply box"}</p>
                </TooltipContent>
                </Tooltip>
            </div>

            <div className={isMaximized ? "flex-1 flex flex-col min-h-0" : ""}>
                <textarea
                    name="replybox"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full p-4 text-sm resize-none focus:outline-none focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMaximized 
                        ? "flex-1 min-h-0" 
                        : "min-h-[80px] max-h-[160px]"
                    }`}
                    rows={1}
                />
            </div>
        </div>

        <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <StickyNote className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Enter note mode</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <Paperclip className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Upload attachment</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <Bookmark className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Use a saved reply</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <SquareUser className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Insert mail merge tag</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <Smile className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Add emoji</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                    <Button variant="ghost" size="iconSm">
                        <Wand2 className="size-3.5" />
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>Suggest a reply</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <Button 
                variant="default"
                size="iconSm" 
                className="size-7"
                onClick={handleSend}
                disabled={disabled || !message.trim()}
            >
                <SendHorizonal className="size-3.5" />
            </Button>
        </div>

    </div>
  )
}
