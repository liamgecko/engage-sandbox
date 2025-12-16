 'use client'

import { useState } from 'react'
import { CheckCheck, ChevronLeft, ChevronRight, EllipsisVertical, ListFilterPlus, Plus } from 'lucide-react'
import { ContentHeader } from '@/components/layout/content-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function WorkflowV1Page() {
  const [hideInactive, setHideInactive] = useState(false)
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Show queue position',
      trigger: 'During conversation',
      statusChecked: true,
      author: { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
    },
    {
      id: 2,
      name: 'Add contact to a broadcast',
      trigger: 'After conversation ends',
      statusChecked: false,
      author: { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
    },
    {
      id: 3,
      name: 'Engagement score',
      trigger: 'After conversation ends',
      statusChecked: true,
      author: { name: 'Amy Hart', initials: 'AH', avatar: '/sarah.jpg' },
    },
    {
      id: 4,
      name: 'Add message on close',
      trigger: 'After conversation ends',
      statusChecked: true,
      author: { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
    },
    {
      id: 5,
      name: 'Add label on close',
      trigger: 'After conversation ends',
      statusChecked: false,
      author: { name: 'Charlie Francis', initials: 'CF', avatar: '/emma.jpg' },
    },
    {
      id: 6,
      name: 'Send a pre-chat message',
      trigger: 'Before conversation starts',
      statusChecked: true,
      author: { name: 'Charlie Francis', initials: 'CF', avatar: '/emma.jpg' },
    },
    {
      id: 7,
      name: 'Send message from the bot',
      trigger: 'Before conversation starts',
      statusChecked: true,
      author: { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
    },
    {
      id: 8,
      name: 'Close conversations',
      trigger: 'After conversation ends',
      statusChecked: true,
      author: { name: 'Charlie Francis', initials: 'CF', avatar: '/emma.jpg' },
    },
    {
      id: 9,
      name: 'Hide chat widget during non-working hours',
      trigger: 'Before conversation starts',
      statusChecked: true,
      author: { name: 'Amy Hart', initials: 'AH', avatar: '/sarah.jpg' },
    },
    {
      id: 10,
      name: 'Add contact to an event',
      trigger: 'After conversation ends',
      statusChecked: false,
      author: { name: 'Amy Hart', initials: 'AH', avatar: '/sarah.jpg' },
    },
  ])

  const actionTypes = [
    'Add a label to contact',
    'Add contact to a campaign',
    'Add contact to an event',
  ]

  const labelOptions = ['Product', 'Engineering', 'Marketing']
  const chatbotOptions = ['Gecko Bot', 'Marketing Bot', 'Product Bot']
  const agentOptions = [
    { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
    { name: 'Amy Hart', initials: 'AH', avatar: '/sarah.jpg' },
    { name: 'Charlie Francis', initials: 'CF', avatar: '/emma.jpg' },
  ]
  const channelOptions = ['Gecko Live Chat', 'Gecko WhatsApp', 'Gecko Inbox']
  const triggerOptions = [
    'Before conversation starts',
    'During conversation',
    'After conversation ends',
  ]

  const visibleWorkflows = hideInactive
    ? workflows.filter((workflow) => workflow.statusChecked)
    : workflows
  const filteredWorkflows = selectedTrigger
    ? visibleWorkflows.filter((workflow) => workflow.trigger === selectedTrigger)
    : visibleWorkflows

  const handleToggleStatus = (id: number, checked: boolean) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, statusChecked: checked } : workflow
      )
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <ContentHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Settings', href: '/settings' },
          { label: 'Chat workflows' },
        ]}
        heading="Chat workflows"
        actions={
          <>
            <Button variant="outline">
              <Plus className="size-4" />
              Add new workflow
            </Button>
            <Button>
              <CheckCheck className="size-4" />
              Save workflows
            </Button>
          </>
        }
      />

      <div className="p-6">
        
        <div className="rounded-sm border bg-white">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Input placeholder="Search workflows" className="min-w-[280px]" size="sm"/>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ListFilterPlus className="size-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[260px]">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Action type</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Search action types" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {actionTypes.map((item) => (
                                <CommandItem key={item}>{item}</CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Trigger type</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Filter triggers" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {triggerOptions.map((item) => (
                                <CommandItem
                                  key={item}
                                  value={item}
                                  onSelect={(value) =>
                                    setSelectedTrigger((prev) =>
                                      prev === value ? null : value
                                    )
                                  }
                                >
                                  {item}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Channel</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Search channels" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {channelOptions.map((item) => (
                                <CommandItem key={item}>{item}</CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Agents and teams</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Search agents and teams" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {agentOptions.map((agent) => (
                                <CommandItem key={agent.name} value={agent.name}>
                                  <Avatar size="xs">
                                    <AvatarFallback>{agent.initials}</AvatarFallback>
                                    <AvatarImage src={agent.avatar} alt={agent.name} />
                                  </Avatar>
                                  <span>{agent.name}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Chatbots</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Search chatbots" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {chatbotOptions.map((item) => (
                                <CommandItem key={item}>{item}</CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-[260px] p-0">
                        <Command>
                          <CommandInput placeholder="Search labels" />
                          <CommandList>
                            <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                              No results found.
                            </CommandEmpty>
                            <CommandGroup>
                              {labelOptions.map((item) => (
                                <CommandItem key={item}>{item}</CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Hide inactive workflows</span>
                <Switch
                  checked={hideInactive}
                  onCheckedChange={setHideInactive}
                  aria-label="Hide inactive workflows"
                />
              </div>
            </div>
          </div>

          {/* Body */}
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Workflow name</TableHead>
                <TableHead>Trigger type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created by</TableHead>
                <TableHead className="w-[68px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell>{workflow.name}</TableCell>
                  <TableCell>{workflow.trigger}</TableCell>
                  <TableCell>
                    <Switch
                      checked={workflow.statusChecked}
                      onCheckedChange={(checked) => handleToggleStatus(workflow.id, checked)}
                      aria-label={`Set ${workflow.name} ${workflow.statusChecked ? 'active' : 'inactive'}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="xs">
                        <AvatarImage src={workflow.author.avatar} alt="User avatar" />
                        <AvatarFallback>
                          {workflow.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="">{workflow.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <EllipsisVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          Edit workflow
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Clone workflow
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Enable test mode
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Delete workflow
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{filteredWorkflows.length} results found.</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Showing</span>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={`${filteredWorkflows.length}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-xs text-muted-foreground">results per page.</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Page 1 of 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Page 1 of 2">Page 1</SelectItem>
                    <SelectItem value="Page 2 of 2">Page 2</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}
