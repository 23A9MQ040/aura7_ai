'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Zap, X, ChevronRight } from 'lucide-react';
import { agents as defaultAgents, Agent } from '@/lib/data';
import PageTransition, { StaggerContainer, StaggerItem, ProgressRing } from '@/components/ui/Animations';

const categories = ['All', 'Intelligence', 'Career', 'Wellness', 'Finance', 'Impact', 'System', 'Security'];

const statusStyles: Record<string, string> = {
  active: 'status-active',
  analyzing: 'status-analyzing',
  synced: 'status-synced',
  protected: 'status-protected',
  idle: 'bg-gray-500',
  learning: 'status-analyzing',
};

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);

  useEffect(() => {
    fetch('http://localhost:8080/api/agents')
      .then(res => res.json())
      .then(data => {
        // Merge backend dynamic data with frontend static data (icons, capabilities, etc.)
        const mergedAgents = defaultAgents.map(def => {
          const liveAgent = data.find((a: any) => a.id === def.id || a.name === def.name);
          return liveAgent ? { ...def, ...liveAgent } : def;
        });
        setAgents(mergedAgents);
      })
      .catch(err => console.log('Failed to fetch live agents, using default data'));
  }, []);

  const filtered = agents.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  });

  const selected = agents.find((a) => a.id === selectedAgent);

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Agent Marketplace</h1>
            <p className="text-aura-muted">Explore, activate, and manage your AI agents.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 w-64">
              <Search className="w-4 h-4 text-aura-muted" />
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-sm flex-1 text-aura-text placeholder-aura-muted"
              />
            </div>
            <button className="glass rounded-xl p-2.5 hover:bg-white/5 transition-colors">
              <Filter className="w-4 h-4 text-aura-muted" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-aura-cyan/15 text-aura-cyan border border-aura-cyan/30'
                  : 'glass text-aura-muted hover:text-aura-text hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="glass-card p-4 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-aura-green" />
            <span className="text-sm"><span className="font-bold text-aura-green">{agents.filter(a => a.status === 'active').length}</span> Active</span>
          </div>
          <div className="w-px h-4 bg-aura-border" />
          <div className="text-sm"><span className="font-bold text-aura-cyan">{agents.length}</span> Total Agents</div>
          <div className="w-px h-4 bg-aura-border" />
          <div className="text-sm"><span className="font-bold text-aura-purple">{agents.reduce((a, b) => a + (b.accuracy || 0), 0) / agents.length | 0}%</span> Avg Accuracy</div>
        </div>

        {/* Agent Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((agent) => (
            <StaggerItem key={agent.id}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedAgent(agent.id)}
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, ${agent.color}, transparent)` }} />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${agent.color}15` }}>
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-aura-muted">{agent.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
                    <span className={`status-dot ${statusStyles[agent.status]}`} />
                    <span className="text-[10px] uppercase font-mono text-aura-muted">{agent.status}</span>
                  </div>
                </div>

                <p className="text-sm text-aura-muted mb-4 leading-relaxed">{agent.description}</p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 text-aura-muted border border-white/5">{cap}</span>
                  ))}
                </div>

                {/* Accuracy Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: agent.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${agent.accuracy}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <span className="text-xs font-mono" style={{ color: agent.color }}>{agent.accuracy}%</span>
                </div>

                {/* Last Action */}
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[11px] text-aura-muted truncate flex-1">{agent.lastAction}</p>
                  <ChevronRight className="w-4 h-4 text-aura-muted group-hover:text-aura-cyan transition-colors" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Agent Detail Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setSelectedAgent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-strong rounded-2xl p-8 max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: `${selected.color}15` }}>
                      {selected.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selected.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`status-dot ${statusStyles[selected.status]}`} />
                        <span className="text-xs uppercase text-aura-muted">{selected.status}</span>
                        <span className="text-xs text-aura-muted">•</span>
                        <span className="text-xs text-aura-muted">{selected.category}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAgent(null)} className="p-2 rounded-lg hover:bg-white/5 text-aura-muted">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-aura-muted leading-relaxed mb-6">{selected.description}</p>

                {/* Accuracy Ring */}
                <div className="flex items-center gap-6 mb-6">
                  <ProgressRing progress={selected.accuracy || 0} size={80} strokeWidth={6} color={selected.color}>
                    <span className="text-sm font-bold">{selected.accuracy}%</span>
                  </ProgressRing>
                  <div>
                    <p className="text-sm font-semibold">Accuracy Score</p>
                    <p className="text-xs text-aura-muted">Based on 10,000+ interactions</p>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-aura-muted mb-3">Capabilities</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.capabilities.map((cap) => (
                      <span key={cap} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-aura-text bg-white/5">{cap}</span>
                    ))}
                  </div>
                </div>

                {/* Last Action */}
                <div className="glass rounded-xl p-4 mb-6">
                  <p className="text-xs text-aura-muted mb-1">Last Action</p>
                  <p className="text-sm">{selected.lastAction}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="btn-primary flex-1">
                    {selected.status === 'active' ? 'Configure' : 'Activate Agent'}
                  </button>
                  <button className="btn-secondary flex-1">View Logs</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
