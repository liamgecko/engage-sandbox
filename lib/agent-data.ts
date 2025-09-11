// Agent data for conversation assignments

export interface Agent {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  type: 'agent' | 'team';
  status: 'online' | 'away' | 'offline';
  isAvailable: boolean;
  verified: boolean;
}

// All agents data
export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Sarah Johnson',
    initials: 'SJ',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'agent',
    status: 'online',
    isAvailable: true,
    verified: true
  },
  {
    id: 'agent-2',
    name: 'Mike Chen',
    initials: 'MC',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'agent',
    status: 'online',
    isAvailable: true,
    verified: true
  },
  {
    id: 'agent-3',
    name: 'Emma Wilson',
    initials: 'EW',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'agent',
    status: 'away',
    isAvailable: false,
    verified: true
  },
  {
    id: 'agent-4',
    name: 'David Brown',
    initials: 'DB',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'agent',
    status: 'offline',
    isAvailable: false,
    verified: true
  },
  {
    id: 'team-1',
    name: 'Undergrad Admissions',
    initials: 'UA',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'team',
    status: 'online',
    isAvailable: true,
    verified: true
  },
  {
    id: 'team-2',
    name: 'Postgrad Admissions',
    initials: 'PA',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'team',
    status: 'online',
    isAvailable: true,
    verified: true
  },
  {
    id: 'team-3',
    name: 'International Admissions',
    initials: 'IA',
    avatarBg: 'bg-slate-100',
    avatarText: 'text-slate-700',
    type: 'team',
    status: 'away',
    isAvailable: false,
    verified: true
  }
];

// Helper functions
export function getAllAgents(): Agent[] {
  return agents;
}

export function getAgentsByType(type: 'agent' | 'team'): Agent[] {
  return agents.filter(agent => agent.type === type);
}

export function getAvailableAgents(): Agent[] {
  return agents.filter(agent => agent.isAvailable);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find(agent => agent.id === id);
}

export function getAgentsOnly(): Agent[] {
  return agents.filter(agent => agent.type === 'agent');
}

export function getTeamsOnly(): Agent[] {
  return agents.filter(agent => agent.type === 'team');
}
