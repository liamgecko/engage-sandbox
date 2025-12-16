'use client'

import { useState, useMemo } from 'react'
import { AlertTriangle, Check, CheckCheck, CheckCircle2, ChevronDown, Copy, ListFilterPlus, Maximize2, Minimize2, Pause, Play, Plus, Search, Trash2, X } from 'lucide-react'

import { ContentHeader } from '@/components/layout/content-header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { InlineEdit } from '@/components/ui/inline-edit'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const actionTypes = [
  'Add a label to contact',
  'Add contact to a campaign',
  'Add contact to an event',
]

const triggerOptions = [
  'Before conversation starts',
  'During conversation',
  'After conversation ends',
]

const channelOptions = ['Gecko Live Chat', 'Gecko WhatsApp', 'Gecko Inbox']

const chatbotOptions = ['Gecko Bot', 'Marketing Bot', 'Product Bot']

const labelOptions = ['Product', 'Engineering', 'Marketing']

const sortOptions = ['Name (asc)', 'Name (desc)', 'Last edited']

const agentOptions = [
  { name: 'Liam Young', initials: 'LY', avatar: '/mike.jpg' },
  { name: 'Amy Hart', initials: 'AH', avatar: '/sarah.jpg' },
  { name: 'Charlie Francis', initials: 'CF', avatar: '/emma.jpg' },
]

export default function WorkflowV2Page() {
  const [hideInactive, setHideInactive] = useState(false)
  const [selectedSort, setSelectedSort] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [openRows, setOpenRows] = useState<string[]>([])
  const [selectedTrigger, setSelectedTrigger] = useState<string[]>([])
  const [selectedActionType, setSelectedActionType] = useState<string[]>([])
  const [selectedChannel, setSelectedChannel] = useState<string[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string[]>([])
  const [selectedChatbot, setSelectedChatbot] = useState<string[]>([])
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  const [filterOperators, setFilterOperators] = useState<Record<string, 'is' | 'is not' | 'is any of'>>({})
  const [filterSelectionOrder, setFilterSelectionOrder] = useState<string[]>([])
  const [recurringWorkflows, setRecurringWorkflows] = useState<Record<number, boolean>>({})
  const [workflowConditions, setWorkflowConditions] = useState<
    Record<
      number,
      Array<{
        logic: 'IF' | 'AND' | 'OR'
        conditionType: string | null
        operator: string | null
        value: string | null
      }>
    >
  >({})
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

  const sortedWorkflows = useMemo(() => {
    const visible = hideInactive
      ? workflows.filter((workflow) => workflow.statusChecked)
      : workflows

    const searched = searchTerm && searchTerm.length >= 3
      ? visible.filter((workflow) =>
          workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : visible

    if (!selectedSort) return searched

    const sorted = [...searched]
    if (selectedSort === 'Name (asc)') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    } else if (selectedSort === 'Name (desc)') {
      sorted.sort((a, b) => b.name.localeCompare(a.name))
    }
    return sorted
  }, [hideInactive, searchTerm, workflows, selectedSort])

  const handleToggleStatus = (id: number, checked: boolean) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, statusChecked: checked } : workflow
      )
    )
  }

  const allRowsExpanded = sortedWorkflows.length > 0 && openRows.length === sortedWorkflows.length

  const handleExpandAll = () => {
    if (allRowsExpanded) {
      setOpenRows([])
    } else {
      setOpenRows(sortedWorkflows.map((workflow) => workflow.id.toString()))
    }
  }

  const activeFilters = [
    selectedTrigger.length > 0 && {
      label: 'Trigger type',
      values: selectedTrigger,
      operator: filterOperators['Trigger type'] || (selectedTrigger.length === 1 ? 'is' : 'is any of'),
    },
    selectedActionType.length > 0 && {
      label: 'Action type',
      values: selectedActionType,
      operator: filterOperators['Action type'] || (selectedActionType.length === 1 ? 'is' : 'is any of'),
    },
    selectedChannel.length > 0 && {
      label: 'Channel',
      values: selectedChannel,
      operator: filterOperators['Channel'] || (selectedChannel.length === 1 ? 'is' : 'is any of'),
    },
    selectedAgent.length > 0 && {
      label: 'Agents and teams',
      values: selectedAgent,
      operator: filterOperators['Agents and teams'] || (selectedAgent.length === 1 ? 'is' : 'is any of'),
    },
    selectedChatbot.length > 0 && {
      label: 'Chatbots',
      values: selectedChatbot,
      operator: filterOperators['Chatbots'] || (selectedChatbot.length === 1 ? 'is' : 'is any of'),
    },
    selectedLabel.length > 0 && {
      label: 'Labels',
      values: selectedLabel,
      operator: filterOperators['Labels'] || (selectedLabel.length === 1 ? 'is' : 'is any of'),
    },
  ].filter(Boolean) as Array<{ label: string; values: string[]; operator: 'is' | 'is not' | 'is any of' }>

  // Sort filters by selection order
  const sortedActiveFilters = [...activeFilters].sort((a, b) => {
    const indexA = filterSelectionOrder.indexOf(a.label)
    const indexB = filterSelectionOrder.indexOf(b.label)
    // If a filter is not in the order array, put it at the end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  const getFilterDisplayText = (filter: { label: string; values: string[] }) => {
    if (filter.values.length === 1) {
      return filter.values[0]
    }
    
    const pluralMap: Record<string, string> = {
      'Trigger type': 'trigger types',
      'Action type': 'action types',
      'Channel': 'channels',
      'Agents and teams': 'agents and teams',
      'Chatbots': 'chatbots',
      'Labels': 'labels',
    }
    
    const pluralLabel = pluralMap[filter.label] || filter.label.toLowerCase()
    return `${filter.values.length} ${pluralLabel}`
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

      <div className="p-6 flex flex-col gap-4">
          
        {/* Header */}
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground" />
                <Input
                  placeholder="Search workflows"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="min-w-[200px] pl-9 pr-9"
                  size="sm"
                />
                {searchTerm && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="iconSm"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ListFilterPlus className="size-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[260px]">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-[260px] p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            {sortOptions.map((item) => (
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) =>
                                  setSelectedSort((prev) =>
                                    prev === value ? null : value
                                  )
                                }
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedSort === item && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
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
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) => {
                                  setSelectedActionType((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Action type')) {
                                          return [...order, 'Action type']
                                        }
                                        return order
                                      })
                                    } else if (!wasEmpty && newValue.length === 0) {
                                      setFilterSelectionOrder((order) => order.filter((label) => label !== 'Action type'))
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedActionType.includes(item) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
                              </CommandItem>
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
                        <CommandList>
                          <CommandGroup>
                            {triggerOptions.map((item) => (
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) => {
                                  setSelectedTrigger((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Trigger type')) {
                                          return [...order, 'Trigger type']
                                        }
                                        return order
                                      })
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedTrigger.includes(item) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
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
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) => {
                                  setSelectedChannel((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Channel')) {
                                          return [...order, 'Channel']
                                        }
                                        return order
                                      })
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedChannel.includes(item) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
                              </CommandItem>
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
                              <CommandItem
                                key={agent.name}
                                value={agent.name}
                                onSelect={(value) => {
                                  setSelectedAgent((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Agents and teams')) {
                                          return [...order, 'Agents and teams']
                                        }
                                        return order
                                      })
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <Avatar size="xs">
                                      <AvatarFallback>{agent.initials}</AvatarFallback>
                                      <AvatarImage src={agent.avatar} alt={agent.name} />
                                    </Avatar>
                                    <span>{agent.name}</span>
                                  </div>
                                  {selectedAgent.includes(agent.name) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
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
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) => {
                                  setSelectedChatbot((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Chatbots')) {
                                          return [...order, 'Chatbots']
                                        }
                                        return order
                                      })
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedChatbot.includes(item) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
                              </CommandItem>
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
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(value) => {
                                  setSelectedLabel((prev) => {
                                    const wasEmpty = prev.length === 0
                                    const newValue = prev.includes(value)
                                      ? prev.filter((v) => v !== value)
                                      : [...prev, value]
                                    if (wasEmpty && newValue.length > 0) {
                                      setFilterSelectionOrder((order) => {
                                        if (!order.includes('Labels')) {
                                          return [...order, 'Labels']
                                        }
                                        return order
                                      })
                                    }
                                    return newValue
                                  })
                                }}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{item}</span>
                                  {selectedLabel.includes(item) && (
                                    <Check className="size-4 text-foreground" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
              {activeFilters.length > 0 && (
                <>
                  <Separator orientation="vertical" className="!h-8" />
                  <div className="flex items-center flex-wrap gap-1">
                    {sortedActiveFilters.map((filter) => (
                      <div
                        key={filter.label}
                        className=" bg-white border border-border rounded h-8 flex items-center"
                      >
                        <span className="text-xs text-muted-foreground border-r border-border px-2 h-full flex items-center">{filter.label}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="text-xs text-foreground px-2 h-full flex items-center border-r border-border font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              {filter.operator}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            <DropdownMenuItem
                              onClick={() =>
                                setFilterOperators((prev) => ({
                                  ...prev,
                                  [filter.label]: 'is',
                                }))
                              }
                            >
                              is
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFilterOperators((prev) => ({
                                  ...prev,
                                  [filter.label]: 'is not',
                                }))
                              }
                            >
                              is not
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setFilterOperators((prev) => ({
                                  ...prev,
                                  [filter.label]: 'is any of',
                                }))
                              }
                            >
                              is any of
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="text-xs text-foreground px-2 h-full flex items-center border-r border-border font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                            >
                              {getFilterDisplayText(filter)}
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-[260px] p-0">
                            <Command>
                              {filter.label === 'Action type' && (
                                <>
                                  <CommandInput placeholder="Search action types" />
                                  <CommandList>
                                    <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {actionTypes.map((item) => (
                                        <CommandItem
                                          key={item}
                                          value={item}
                                          onSelect={(value) => {
                                            setSelectedActionType((prev) => {
                                              const wasEmpty = prev.length === 0
                                              const newValue = prev.includes(value)
                                                ? prev.filter((v) => v !== value)
                                                : [...prev, value]
                                              if (wasEmpty && newValue.length > 0) {
                                                setFilterSelectionOrder((order) => {
                                                  if (!order.includes('Action type')) {
                                                    return [...order, 'Action type']
                                                  }
                                                  return order
                                                })
                                              }
                                              return newValue
                                            })
                                          }}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span>{item}</span>
                                            {selectedActionType.includes(item) && (
                                              <Check className="size-4 text-foreground" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </>
                              )}
                              {filter.label === 'Trigger type' && (
                                <CommandList>
                                  <CommandGroup>
                                    {triggerOptions.map((item) => (
                                      <CommandItem
                                        key={item}
                                        value={item}
                                        onSelect={(value) => {
                                          setSelectedTrigger((prev) => {
                                            const wasEmpty = prev.length === 0
                                            const newValue = prev.includes(value)
                                              ? prev.filter((v) => v !== value)
                                              : [...prev, value]
                                            if (wasEmpty && newValue.length > 0) {
                                              setFilterSelectionOrder((order) => {
                                                if (!order.includes('Trigger type')) {
                                                  return [...order, 'Trigger type']
                                                }
                                                return order
                                              })
                                            }
                                            return newValue
                                          })
                                        }}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <span>{item}</span>
                                          {selectedTrigger.includes(item) && (
                                            <Check className="size-4 text-foreground" />
                                          )}
                                        </div>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              )}
                              {filter.label === 'Channel' && (
                                <>
                                  <CommandInput placeholder="Search channels" />
                                  <CommandList>
                                    <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {channelOptions.map((item) => (
                                        <CommandItem
                                          key={item}
                                          value={item}
                                          onSelect={(value) => {
                                            setSelectedChannel((prev) => {
                                              const wasEmpty = prev.length === 0
                                              const newValue = prev.includes(value)
                                                ? prev.filter((v) => v !== value)
                                                : [...prev, value]
                                              if (wasEmpty && newValue.length > 0) {
                                                setFilterSelectionOrder((order) => {
                                                  if (!order.includes('Channel')) {
                                                    return [...order, 'Channel']
                                                  }
                                                  return order
                                                })
                                              }
                                              return newValue
                                            })
                                          }}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span>{item}</span>
                                            {selectedChannel.includes(item) && (
                                              <Check className="size-4 text-foreground" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </>
                              )}
                              {filter.label === 'Agents and teams' && (
                                <>
                                  <CommandInput placeholder="Search agents and teams" />
                                  <CommandList>
                                    <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {agentOptions.map((agent) => (
                                        <CommandItem
                                          key={agent.name}
                                          value={agent.name}
                                          onSelect={(value) => {
                                            setSelectedAgent((prev) => {
                                              const wasEmpty = prev.length === 0
                                              const newValue = prev.includes(value)
                                                ? prev.filter((v) => v !== value)
                                                : [...prev, value]
                                              if (wasEmpty && newValue.length > 0) {
                                                setFilterSelectionOrder((order) => {
                                                  if (!order.includes('Agents and teams')) {
                                                    return [...order, 'Agents and teams']
                                                  }
                                                  return order
                                                })
                                              }
                                              return newValue
                                            })
                                          }}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center gap-2">
                                              <Avatar size="xs">
                                                <AvatarFallback>{agent.initials}</AvatarFallback>
                                                <AvatarImage src={agent.avatar} alt={agent.name} />
                                              </Avatar>
                                              <span>{agent.name}</span>
                                            </div>
                                            {selectedAgent.includes(agent.name) && (
                                              <Check className="size-4 text-foreground" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </>
                              )}
                              {filter.label === 'Chatbots' && (
                                <>
                                  <CommandInput placeholder="Search chatbots" />
                                  <CommandList>
                                    <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {chatbotOptions.map((item) => (
                                        <CommandItem
                                          key={item}
                                          value={item}
                                          onSelect={(value) => {
                                            setSelectedChatbot((prev) => {
                                              const wasEmpty = prev.length === 0
                                              const newValue = prev.includes(value)
                                                ? prev.filter((v) => v !== value)
                                                : [...prev, value]
                                              if (wasEmpty && newValue.length > 0) {
                                                setFilterSelectionOrder((order) => {
                                                  if (!order.includes('Chatbots')) {
                                                    return [...order, 'Chatbots']
                                                  }
                                                  return order
                                                })
                                              }
                                              return newValue
                                            })
                                          }}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span>{item}</span>
                                            {selectedChatbot.includes(item) && (
                                              <Check className="size-4 text-foreground" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </>
                              )}
                              {filter.label === 'Labels' && (
                                <>
                                  <CommandInput placeholder="Search labels" />
                                  <CommandList>
                                    <CommandEmpty className="px-3 py-2 text-sm text-muted-foreground">
                                      No results found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                      {labelOptions.map((item) => (
                                        <CommandItem
                                          key={item}
                                          value={item}
                                          onSelect={(value) => {
                                            setSelectedLabel((prev) => {
                                              const wasEmpty = prev.length === 0
                                              const newValue = prev.includes(value)
                                                ? prev.filter((v) => v !== value)
                                                : [...prev, value]
                                              if (wasEmpty && newValue.length > 0) {
                                                setFilterSelectionOrder((order) => {
                                                  if (!order.includes('Labels')) {
                                                    return [...order, 'Labels']
                                                  }
                                                  return order
                                                })
                                              }
                                              return newValue
                                            })
                                          }}
                                        >
                                          <div className="flex items-center justify-between w-full">
                                            <span>{item}</span>
                                            {selectedLabel.includes(item) && (
                                              <Check className="size-4 text-foreground" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </>
                              )}
                            </Command>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex items-center h-8">
                          <Button
                            type="button"
                            variant="ghost"
                            size="iconSm"
                            onClick={() => {
                              if (filter.label === 'Trigger type') {
                                setSelectedTrigger([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Trigger type']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Trigger type'))
                              }
                              if (filter.label === 'Action type') {
                                setSelectedActionType([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Action type']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Action type'))
                              }
                              if (filter.label === 'Channel') {
                                setSelectedChannel([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Channel']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Channel'))
                              }
                              if (filter.label === 'Agents and teams') {
                                setSelectedAgent([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Agents and teams']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Agents and teams'))
                              }
                              if (filter.label === 'Chatbots') {
                                setSelectedChatbot([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Chatbots']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Chatbots'))
                              }
                              if (filter.label === 'Labels') {
                                setSelectedLabel([])
                                setFilterOperators((prev) => {
                                  const updated = { ...prev }
                                  delete updated['Labels']
                                  return updated
                                })
                                setFilterSelectionOrder((order) => order.filter((label) => label !== 'Labels'))
                              }
                            }}
                            className="flex items-center justify-center w-[22px] h-[30px] p-0 rounded-l-none hover:bg-slate-100"
                            aria-label={`Remove ${filter.label} filter`}
                          >
                            <X className="size-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">Hide paused workflows</span>
                <Switch
                  checked={hideInactive}
                  onCheckedChange={setHideInactive}
                  aria-label="Hide inactive workflows"
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleExpandAll}>
                    {allRowsExpanded ? (
                      <Minimize2 className="size-4" />
                    ) : (
                      <Maximize2 className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end">
                  <span>{allRowsExpanded ? 'Collapse all workflows' : 'Expand all workflows'}</span>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col gap-2">
          {searchTerm && searchTerm.length >= 3 && sortedWorkflows.length === 0 && (
            <div className="rounded-sm border border-amber-200 bg-amber-50 p-3 flex items-center gap-2 text-amber-800">
              <AlertTriangle className="size-4 shrink-0" />
              <span className="text-sm">No search results found</span>
            </div>
          )}
          <Accordion
            type="multiple"
            value={openRows}
            onValueChange={(values) => setOpenRows(values as string[])}
            className="flex flex-col gap-2"
          >
            {sortedWorkflows.map((workflow) => (
              <AccordionItem
                key={workflow.id}
                value={workflow.id.toString()}
                className="workflow-row rounded-sm border bg-white"
              >
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <AccordionTrigger asChild className="w-auto p-0">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {openRows.includes(workflow.id.toString()) ? (
                          <Minimize2 className="size-4" />
                        ) : (
                          <Maximize2 className="size-4" />
                        )}
                      </Button>
                    </AccordionTrigger>
                    <InlineEdit initialValue={workflow.name} />
                  </div>
                  <div className="flex items-center">
                    {/* <Switch
                      checked={workflow.statusChecked}
                      onCheckedChange={(checked) => handleToggleStatus(workflow.id, checked)}
                      labelChecked="Active"
                      labelUnchecked="Paused"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="iconSm">
                          <Ellipsis className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                    </DropdownMenu> */}
                    <span className="text-xs text-muted-foreground mr-1">Last updated: 12/16/2025 10:00 AM</span>
                    <Separator orientation="vertical" className="!h-8 mx-2" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(workflow.id, !workflow.statusChecked)}
                          aria-label={workflow.statusChecked ? 'Pause workflow' : 'Activate workflow'}
                        >
                          {workflow.statusChecked ? (
                            <Pause className="size-4" />
                          ) : (
                            <Play className="size-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span>{workflow.statusChecked ? 'Pause workflow' : 'Activate workflow'}</span>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Clone workflow logic here
                          }}
                          aria-label="Clone workflow"
                        >
                          <Copy className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span>Clone workflow</span>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            // Delete workflow logic here
                          }}
                          aria-label="Delete workflow"
                          className="hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span>Delete workflow</span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <AccordionContent className="p-4 border-t border-border">
                  <div className="flex flex-col gap-4">
                    <div className="rounded border border-border text-sm">
                      <div className="p-3 border-b border-border">
                        {(() => {
                          const conditions = workflowConditions[workflow.id] || []
                          const hasValidCondition = conditions.some(
                            (c) => {
                              const hasConditionType = c.conditionType !== null && c.conditionType !== undefined
                              const hasOperator = c.operator !== null && c.operator !== undefined
                              const hasValue = c.value !== null && c.value !== undefined
                              return hasConditionType && hasOperator && hasValue
                            }
                          )
                          return (
                            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                              <CheckCircle2
                                className={`size-4 ${hasValidCondition ? 'text-emerald-500' : 'text-gray-400'}`}
                              />
                              Conditions
                            </h3>
                          )
                        })()}
                      </div>
                      <div className="p-3">
                      <p className="text-sm text-muted-foreground mb-4">Select the conditions that must be met in order for the workflow to run.</p>
                        <div className="flex flex-col gap-2">
                          {((workflowConditions[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]).map((condition, conditionIndex) => {
                            const conditionTypes = [
                              { value: 'condition1', label: 'Condition Type 1' },
                              { value: 'condition2', label: 'Condition Type 2' },
                              { value: 'condition3', label: 'Condition Type 3' },
                            ]
                            const operators = [
                              { value: 'is', label: 'is' },
                              { value: 'is-not', label: 'is not' },
                              { value: 'contains', label: 'contains' },
                              { value: 'does-not-contain', label: 'does not contain' },
                            ]
                            const values = [
                              { value: 'operator1', label: 'Operator 1' },
                              { value: 'operator2', label: 'Operator 2' },
                              { value: 'operator3', label: 'Operator 3' },
                            ]
                            
                            return (
                              <div key={conditionIndex} className="flex items-center gap-2 w-full">
                                {conditionIndex === 0 ? (
                                  <Button variant="ghost" className="font-medium text-xs shrink-0 w-[42px] px-2 justify-start disabled:opacity-100 disabled:cursor-not-allowed" disabled>
                                    IF
                                  </Button>
                                ) : (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="font-medium text-xs shrink-0 w-[42px] px-2 justify-start">
                                        {condition.logic}
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setWorkflowConditions((prev) => {
                                          const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                          return {
                                            ...prev,
                                            [workflow.id]: conditions.map((c, i) =>
                                              i === conditionIndex ? { ...c, logic: 'IF' } : c
                                            ),
                                          }
                                        })
                                      }}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>If</span>
                                        {condition.logic === 'IF' && (
                                          <Check className="size-4 text-foreground" />
                                        )}
                                      </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setWorkflowConditions((prev) => {
                                          const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                          return {
                                            ...prev,
                                            [workflow.id]: conditions.map((c, i) =>
                                              i === conditionIndex ? { ...c, logic: 'AND' } : c
                                            ),
                                          }
                                        })
                                      }}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>And</span>
                                        {condition.logic === 'AND' && (
                                          <Check className="size-4 text-foreground" />
                                        )}
                                      </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setWorkflowConditions((prev) => {
                                          const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                          return {
                                            ...prev,
                                            [workflow.id]: conditions.map((c, i) =>
                                              i === conditionIndex ? { ...c, logic: 'OR' } : c
                                            ),
                                          }
                                        })
                                      }}
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span>Or</span>
                                        {condition.logic === 'OR' && (
                                          <Check className="size-4 text-foreground" />
                                        )}
                                      </div>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                )}
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="flex-1 justify-between font-normal"
                                    >
                                      <span className={condition.conditionType ? 'text-foreground' : 'text-muted-foreground'}>
                                        {condition.conditionType
                                          ? conditionTypes.find((ct) => ct.value === condition.conditionType)?.label || 'Select condition type'
                                          : 'Select condition type'}
                                      </span>
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search..." />
                                      <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                          {conditionTypes.map((ct) => (
                                            <CommandItem
                                              key={ct.value}
                                              value={ct.value}
                                              onSelect={() => {
                                                setWorkflowConditions((prev) => {
                                                  const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                                  return {
                                                    ...prev,
                                                    [workflow.id]: conditions.map((c, i) =>
                                                      i === conditionIndex ? { ...c, conditionType: ct.value } : c
                                                    ),
                                                  }
                                                })
                                              }}
                                            >
                                              <div className="flex items-center justify-between w-full">
                                                <span>{ct.label}</span>
                                                {condition.conditionType === ct.value && (
                                                  <Check className="size-4 text-foreground" />
                                                )}
                                              </div>
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-[180px] justify-between font-normal"
                                    >
                                      <span className={condition.operator ? 'text-foreground' : 'text-muted-foreground'}>
                                        {condition.operator
                                          ? operators.find((op) => op.value === condition.operator)?.label || 'Select'
                                          : 'Select'}
                                      </span>
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="p-0" align="start">
                                    <Command>
                                      <CommandList>
                                        <CommandGroup>
                                          {operators.map((op) => (
                                            <CommandItem
                                              key={op.value}
                                              value={op.value}
                                              onSelect={() => {
                                                setWorkflowConditions((prev) => {
                                                  const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                                  return {
                                                    ...prev,
                                                    [workflow.id]: conditions.map((c, i) =>
                                                      i === conditionIndex ? { ...c, operator: op.value } : c
                                                    ),
                                                  }
                                                })
                                              }}
                                            >
                                              <div className="flex items-center justify-between w-full">
                                                <span>{op.label}</span>
                                                {condition.operator === op.value && (
                                                  <Check className="size-4 text-foreground" />
                                                )}
                                              </div>
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="flex-1 justify-between font-normal"
                                    >
                                      <span className={condition.value ? 'text-foreground' : 'text-muted-foreground'}>
                                        {condition.value
                                          ? values.find((v) => v.value === condition.value)?.label || 'Operator'
                                          : 'Operator'}
                                      </span>
                                      <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                    <Command>
                                      <CommandInput placeholder="Search..." />
                                      <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                          {values.map((v) => (
                                            <CommandItem
                                              key={v.value}
                                              value={v.value}
                                              onSelect={() => {
                                                setWorkflowConditions((prev) => {
                                                  const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                                  return {
                                                    ...prev,
                                                    [workflow.id]: conditions.map((c, i) =>
                                                      i === conditionIndex ? { ...c, value: v.value } : c
                                                    ),
                                                  }
                                                })
                                              }}
                                            >
                                              <div className="flex items-center justify-between w-full">
                                                <span>{v.label}</span>
                                                {condition.value === v.value && (
                                                  <Check className="size-4 text-foreground" />
                                                )}
                                              </div>
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                                <Button
                                  variant="ghost"
                                  aria-label="Delete condition"
                                  className="hover:bg-red-50 hover:text-red-700 shrink-0"
                                  onClick={() => {
                                    setWorkflowConditions((prev) => {
                                      const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                      const filtered = conditions.filter((_, i) => i !== conditionIndex)
                                      // If this was the last condition, keep one empty condition
                                      if (filtered.length === 0) {
                                        return {
                                          ...prev,
                                          [workflow.id]: [{ logic: 'IF', conditionType: null, operator: null, value: null }],
                                        }
                                      }
                                      return {
                                        ...prev,
                                        [workflow.id]: filtered,
                                      }
                                    })
                                  }}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            )
                          }))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="justify-start self-start mt-2"
                            onClick={() => {
                              setWorkflowConditions((prev) => {
                                const conditions = prev[workflow.id] || [{ logic: 'IF', conditionType: null, operator: null, value: null }]
                                return {
                                  ...prev,
                                  [workflow.id]: [...conditions, { logic: 'AND', conditionType: null, operator: null, value: null }],
                                }
                              })
                            }}
                          >
                            <Plus className="size-4" />
                            Add condition
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded border border-border text-sm">
                      <div className="p-3 border-b border-border">
                        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-gray-400" />
                          Actions
                        </h3>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground mb-3">Select the actions that will be performed when the conditions are met.</p>
                        <Button variant="outline" size="sm" className="justify-start self-start mt-2">
                          <Plus className="size-4" />
                          Add action
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 my-2">
                      <Switch
                        id={`recurring-${workflow.id}`}
                        checked={recurringWorkflows[workflow.id] || false}
                        onCheckedChange={(checked) => {
                          setRecurringWorkflows((prev) => ({
                            ...prev,
                            [workflow.id]: checked,
                          }))
                        }}
                      />
                      <div className="grid gap-1">
                        <Label htmlFor={`recurring-${workflow.id}`}>
                          Enable recurring workflow
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enabling this option will allow the workflow to run continuously.
                        </p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </div>
  )
}

