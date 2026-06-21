// AURA Agent definitions and mock data

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'analyzing' | 'synced' | 'protected' | 'idle' | 'learning';
  icon: string;
  color: string;
  category: string;
  capabilities: string[];
  lastAction?: string;
  accuracy?: number;
}

export const agents: Agent[] = [
  {
    id: 'learning',
    name: 'Learning Agent',
    description: 'Generates personalized learning roadmaps, tracks progress, and adapts to your learning style.',
    status: 'active',
    icon: '🧠',
    color: '#00f0ff',
    category: 'Intelligence',
    capabilities: ['Roadmap Generation', 'Daily Tasks', 'Progress Tracking', 'Adaptive Learning', 'Resource Curation'],
    lastAction: 'Updated your Agentic AI roadmap',
    accuracy: 94,
  },
  {
    id: 'career',
    name: 'Career Agent',
    description: 'Analyzes resumes, detects skill gaps, prepares interviews, and tracks job readiness.',
    status: 'analyzing',
    icon: '💼',
    color: '#a855f7',
    category: 'Career',
    capabilities: ['Resume Analysis', 'Skill Gap Detection', 'Interview Prep', 'Portfolio Review', 'Job Matching'],
    lastAction: 'Completed resume analysis',
    accuracy: 91,
  },
  {
    id: 'health',
    name: 'Health Agent',
    description: 'Monitors wellness patterns, suggests healthy habits, and tracks fitness goals.',
    status: 'idle',
    icon: '🏥',
    color: '#10b981',
    category: 'Wellness',
    capabilities: ['Wellness Monitoring', 'Habit Tracking', 'Fitness Goals', 'Nutrition Insights', 'Sleep Analysis'],
    lastAction: 'Analyzed weekly activity patterns',
    accuracy: 88,
  },
  {
    id: 'finance',
    name: 'Finance Agent',
    description: 'Tracks spending, manages budgets, and provides financial insights.',
    status: 'idle',
    icon: '💰',
    color: '#f97316',
    category: 'Finance',
    capabilities: ['Spending Analysis', 'Budget Management', 'Investment Insights', 'Tax Reminders', 'Savings Goals'],
    lastAction: 'Generated monthly spending report',
    accuracy: 96,
  },
  {
    id: 'social',
    name: 'Social Impact Agent',
    description: 'Focuses on agriculture assistance, education access, and accessibility solutions.',
    status: 'active',
    icon: '🌍',
    color: '#3b82f6',
    category: 'Impact',
    capabilities: ['Farmer Assistance', 'Student Guidance', 'Accessibility', 'Local Language', 'Community Connect'],
    lastAction: 'Processed 12 farmer queries',
    accuracy: 89,
  },
  {
    id: 'memory',
    name: 'Memory Agent',
    description: 'Manages long-term AI memory including preferences, goals, and learning history.',
    status: 'synced',
    icon: '💾',
    color: '#ec4899',
    category: 'System',
    capabilities: ['Preference Storage', 'Goal Tracking', 'History Management', 'Context Recall', 'Memory Export'],
    lastAction: 'Synced 847 memory entries',
    accuracy: 99,
  },
  {
    id: 'privacy',
    name: 'Privacy Guardian',
    description: 'Manages consent, encryption, permissions, and provides complete audit trails.',
    status: 'protected',
    icon: '🛡️',
    color: '#6366f1',
    category: 'Security',
    capabilities: ['Consent Management', 'Data Encryption', 'Permission Control', 'Audit Logs', 'Threat Detection'],
    lastAction: 'Security scan completed — all clear',
    accuracy: 99.7,
  },
];

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Learning Progress', value: '78%', change: '+5% this week', changeType: 'up', icon: '📈', color: '#00f0ff' },
  { label: 'Career Readiness', value: '85', change: '+12 points', changeType: 'up', icon: '🎯', color: '#a855f7' },
  { label: 'Active Goals', value: '12', change: '3 completing soon', changeType: 'neutral', icon: '🎪', color: '#10b981' },
  { label: 'Memory Entries', value: '847', change: '+23 today', changeType: 'up', icon: '💾', color: '#ec4899' },
];

export interface ActivityItem {
  id: string;
  agent: string;
  agentIcon: string;
  message: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning';
}

export const activityFeed: ActivityItem[] = [
  { id: '1', agent: 'Career Agent', agentIcon: '💼', message: 'Completed resume analysis — score: 85/100', timestamp: '2 min ago', type: 'success' },
  { id: '2', agent: 'Learning Agent', agentIcon: '🧠', message: 'Updated your Agentic AI roadmap — new module added', timestamp: '5 min ago', type: 'info' },
  { id: '3', agent: 'Privacy Guardian', agentIcon: '🛡️', message: 'Security scan completed — all clear', timestamp: '12 min ago', type: 'success' },
  { id: '4', agent: 'Memory Agent', agentIcon: '💾', message: 'Synced 23 new memory entries', timestamp: '18 min ago', type: 'info' },
  { id: '5', agent: 'Social Impact Agent', agentIcon: '🌍', message: 'Processed 12 farmer assistance queries', timestamp: '25 min ago', type: 'success' },
  { id: '6', agent: 'Finance Agent', agentIcon: '💰', message: 'Monthly spending alert — budget 92% utilized', timestamp: '1 hr ago', type: 'warning' },
];

export interface MemoryItem {
  id: string;
  category: 'preference' | 'goal' | 'learning' | 'behavior';
  title: string;
  content: string;
  timestamp: string;
  importance: 'high' | 'medium' | 'low';
}

export const memoryItems: MemoryItem[] = [
  { id: '1', category: 'goal', title: 'Become Agentic AI Engineer', content: 'User is pursuing a career in Agentic AI with focus on multi-agent systems and LLM orchestration.', timestamp: '2026-06-15', importance: 'high' },
  { id: '2', category: 'preference', title: 'Preferred Learning Style', content: 'User prefers hands-on project-based learning over video tutorials. Best focus time: 6-10 AM.', timestamp: '2026-06-10', importance: 'medium' },
  { id: '3', category: 'learning', title: 'Completed: LangChain Fundamentals', content: 'Finished LangChain course with 92% score. Key topics: chains, agents, tools, memory.', timestamp: '2026-06-08', importance: 'medium' },
  { id: '4', category: 'behavior', title: 'Coding Patterns', content: 'User writes TypeScript > Python. Prefers functional programming. Uses VS Code with dark themes.', timestamp: '2026-06-05', importance: 'low' },
  { id: '5', category: 'goal', title: 'Build AI Portfolio', content: '3 projects planned: Multi-agent chatbot, RAG system, AI code reviewer.', timestamp: '2026-06-01', importance: 'high' },
  { id: '6', category: 'learning', title: 'In Progress: Vector Databases', content: 'Currently learning Pinecone and ChromaDB. Progress: 45%.', timestamp: '2026-06-18', importance: 'medium' },
];

export interface RoadmapNode {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progress: number;
  modules: { name: string; done: boolean }[];
}

export const learningRoadmap: RoadmapNode[] = [
  {
    id: '1', title: 'AI Fundamentals', status: 'completed', progress: 100,
    modules: [
      { name: 'Machine Learning Basics', done: true },
      { name: 'Neural Networks', done: true },
      { name: 'NLP Foundations', done: true },
      { name: 'Computer Vision Intro', done: true },
    ]
  },
  {
    id: '2', title: 'LLM & Prompt Engineering', status: 'completed', progress: 100,
    modules: [
      { name: 'Transformer Architecture', done: true },
      { name: 'Prompt Engineering', done: true },
      { name: 'Fine-tuning Basics', done: true },
      { name: 'API Integration', done: true },
    ]
  },
  {
    id: '3', title: 'Agentic AI Architecture', status: 'in-progress', progress: 65,
    modules: [
      { name: 'LangChain Framework', done: true },
      { name: 'Agent Design Patterns', done: true },
      { name: 'Tool Calling & Function Calling', done: true },
      { name: 'Multi-Agent Systems', done: false },
      { name: 'Agent Orchestration', done: false },
    ]
  },
  {
    id: '4', title: 'RAG & Memory Systems', status: 'in-progress', progress: 45,
    modules: [
      { name: 'Vector Databases', done: true },
      { name: 'Embedding Models', done: true },
      { name: 'Retrieval Strategies', done: false },
      { name: 'Long-term Memory', done: false },
    ]
  },
  {
    id: '5', title: 'Production Deployment', status: 'upcoming', progress: 0,
    modules: [
      { name: 'Docker & Kubernetes', done: false },
      { name: 'CI/CD Pipelines', done: false },
      { name: 'Monitoring & Observability', done: false },
      { name: 'Security & Privacy', done: false },
    ]
  },
];

export const apiEndpoints = [
  { method: 'POST', path: '/api/v1/chat', description: 'Send a message to AURA', auth: true },
  { method: 'GET', path: '/api/v1/agents', description: 'List all available agents', auth: true },
  { method: 'POST', path: '/api/v1/agents/{id}/activate', description: 'Activate a specific agent', auth: true },
  { method: 'GET', path: '/api/v1/memory', description: 'Retrieve memory entries', auth: true },
  { method: 'POST', path: '/api/v1/memory', description: 'Create a memory entry', auth: true },
  { method: 'DELETE', path: '/api/v1/memory/{id}', description: 'Delete a memory entry', auth: true },
  { method: 'GET', path: '/api/v1/privacy/audit', description: 'Get privacy audit log', auth: true },
  { method: 'PUT', path: '/api/v1/privacy/permissions', description: 'Update data permissions', auth: true },
  { method: 'POST', path: '/api/v1/career/analyze', description: 'Analyze resume/portfolio', auth: true },
  { method: 'GET', path: '/api/v1/learning/roadmap', description: 'Get learning roadmap', auth: true },
  { method: 'POST', path: '/api/v1/documents/upload', description: 'Upload document for RAG', auth: true },
  { method: 'POST', path: '/api/v1/voice/transcribe', description: 'Transcribe voice input', auth: true },
];
