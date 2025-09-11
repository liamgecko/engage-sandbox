'use client'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { ChevronDown } from 'lucide-react'

export function Header() {
  return (
    <header className="h-14 border-b bg-blue-950 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image 
          src="/gecko-logo.svg" 
          alt="Gecko Logo" 
          width={88} 
          height={16}
          className="h-auto"
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
            <div className="flex items-center gap-2">
                <Avatar className="size-7">
                    <AvatarImage src="/avatar.jpg" alt="User avatar" />
                </Avatar>
                <span className="text-white font-medium text-sm">Liam Young</span>
                <ChevronDown className="w-4 h-4 text-white" />  
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}