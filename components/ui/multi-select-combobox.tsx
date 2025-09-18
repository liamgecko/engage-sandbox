"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface MultiSelectComboboxProps {
  options: Array<{
    value: string
    label: string
    initials?: string
    avatar?: string
    avatarBg?: string
    avatarText?: string
    type?: "agent" | "team"
  }>
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  maxDisplay?: number
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  maxDisplay = 3,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Removed unused handleUnselect function

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((i) => i !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <div className={cn("w-full flex", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="justify-between !px-1.5 hover:bg-slate-50"
          >
            <div className="flex items-center gap-1">
              {selected.length === 0 ? (
                <span className="text-foreground text-[13px]">{placeholder}</span>
              ) : (
                <div className="flex items-center gap-2 -space-x-1">
                  {selectedOptions.slice(0, maxDisplay).map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center gap-1 text-xs whitespace-nowrap"
                    >
                        <Avatar className="size-7 ring-0.5 ring-white">
                          {option.avatar && (option.avatar.startsWith('http') || option.avatar.startsWith('/')) ? (
                            <AvatarImage 
                              src={option.avatar} 
                              alt={option.label}
                            />
                          ) : null}
                          <AvatarFallback className={cn(
                            "text-[9px] font-semibold",
                            option.avatarBg || "bg-blue-100",
                            option.avatarText || "text-blue-800"
                          )}>
                            {option.initials || option.label.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      <span className="text-[13px] font-medium text-foreground">{option.label}</span>
                    </div>
                  ))}
                  {selected.length > maxDisplay && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="h-5.5 w-5.5 flex items-center justify-center text-xs text-foreground font-medium text-[13px]">
                          +{selected.length - maxDisplay}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="space-y-1">
                          <p className="text-xs font-medium mb-2">Additional assignees:</p>
                          <div className="space-y-1">
                            {selectedOptions.slice(maxDisplay).map((option) => (
                              <div key={option.value} className="text-[13px]">
                                {option.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 text-foreground",
              open && "rotate-180"
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-48 p-0" align="end">
          <Command>
            <CommandInput placeholder="Search agents and teams..." className="h-9" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              
              {/* Assigned to conversation group */}
              {selected.length > 0 && (
                <CommandGroup heading="Assigned to conversation">
                  {selectedOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-5.5 w-5.5">
                          {option.avatar && (option.avatar.startsWith('http') || option.avatar.startsWith('/')) ? (
                            <AvatarImage 
                              src={option.avatar} 
                              alt={option.label}
                            />
                          ) : null}
                          <AvatarFallback className={cn(
                            "text-[8px] font-semibold",
                            option.avatarBg || "bg-slate-200",
                            option.avatarText || "text-foreground"
                          )}>
                            {option.initials || option.label.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-1">{option.label}</span>
                        <div className="relative">
                          <X className="absolute h-4 w-4 text-foreground bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          <Check
                            className={cn(
                              "h-4 w-4 text-foreground",
                              selected.includes(option.value) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {/* Agents group */}
              {options.filter(option => option.type !== "team" && !selected.includes(option.value)).length > 0 && (
                <CommandGroup heading="Agents">
                  {options.filter(option => option.type !== "team" && !selected.includes(option.value)).map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-5.5 w-5.5">
                          {option.avatar && (option.avatar.startsWith('http') || option.avatar.startsWith('/')) ? (
                            <AvatarImage 
                              src={option.avatar} 
                              alt={option.label}
                            />
                          ) : null}
                          <AvatarFallback className={cn(
                            "text-[8px] font-semibold",
                            option.avatarBg || "bg-slate-200",
                            option.avatarText || "text-foreground"
                          )}>
                            {option.initials || option.label.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-1">{option.label}</span>
                        <Check
                          className={cn(
                            "h-4 w-4 text-foreground",
                            selected.includes(option.value) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {/* Teams group */}
              {options.filter(option => option.type === "team" && !selected.includes(option.value)).length > 0 && (
                <CommandGroup heading="Teams">
                  {options.filter(option => option.type === "team" && !selected.includes(option.value)).map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                      className="cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-5.5 w-5.5">
                          <AvatarFallback className={cn(
                            "text-[8px] font-semibold",
                            option.avatarBg || "bg-blue-100",
                            option.avatarText || "text-blue-700"
                          )}>
                            {option.initials || option.label.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex-1">{option.label}</span>
                        <Check
                          className={cn(
                            "h-4 w-4 text-foreground",
                            selected.includes(option.value) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
