'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Users,
  MessageSquare,
  Phone,
  MessagesSquare,
  Building2,
  LayoutDashboard,
  Settings,
  Download,
  Calendar,
  FileText,
  Radio,
  Bot,
  FileCode,
  PhoneCall,
  Inbox,
  Mail
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

const navigation = [
  { name: 'Overview', href: '/overview', icon: Home },
  { name: 'Contacts', href: '/contacts', icon: Users },
  { name: 'Responses', href: '/responses', icon: Inbox },
  { name: 'Messages', href: '/messages', icon: Mail },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Conversations', href: '/conversations', icon: MessagesSquare },
  { name: 'Organisations', href: '/organisations', icon: Building2, afterSeparator: true },
  { name: 'Dashboards', href: '/dashboards', icon: LayoutDashboard },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Download apps', href: '/download', icon: Download, afterSeparator: true },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Forms', href: '/forms', icon: FileText },
  { name: 'Broadcasts', href: '/broadcasts', icon: Radio },
  { name: 'AI agents', href: '/ai-agents', icon: Bot },
  { name: 'Landing pages', href: '/landing-pages', icon: FileText },
  { name: 'Call scripts', href: '/call-scripts', icon: FileCode },
  { name: 'Call campaigns', href: '/call-campaigns', icon: PhoneCall },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-16 border-r bg-white h-[calc(100vh-56px)]">
      <TooltipProvider delayDuration={0}>
        <ScrollArea className="h-full">
          <nav className="flex flex-col items-center py-4">
            <ul className="space-y-[1px]">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name} className="flex flex-col">
                    <div className="flex justify-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex p-3 items-center justify-center rounded-md transition-all duration-200',
                              isActive ? 'bg-slate-50 text-foreground' : 'text-slate-700 hover:text-foreground hover:bg-slate-100 hover:scale-110'
                            )}
                          >
                            <item.icon
                              className="size-4"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{item.name}</span>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-medium">
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {item.afterSeparator && (
                      <div className="h-[1px] w-6 bg-slate-200 my-3 mx-auto" />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </ScrollArea>
      </TooltipProvider>
    </div>
  )
}