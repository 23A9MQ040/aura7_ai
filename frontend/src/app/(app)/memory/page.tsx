'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Download, Edit3, Clock, Tag, AlertCircle, Star, Plus, X } from 'lucide-react';
import { memoryItems as initialMemoryItems } from '@/lib/data';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard } from '@/components/ui/Animations';

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  goal: { bg: 'bg-aura-cyan/10', text: 'text-aura-cyan', label: '🎯 Goal' },
  preference: { bg: 'bg-aura-purple/10', text: 'text-aura-purple', label: '⚙️ Preference' },
  learning: { bg: 'bg-aura-green/10', text: 'text-aura-green', label: '📚 Learning' },
  behavior: { bg: 'bg-aura-orange/10', text: 'text-aura-orange', label: '🧩 Behavior' },
};

const importanceColors: Record<string, string> = {
  high: 'text-aura-red',
  medium: 'text-aura-yellow',
  low: 'text-aura-muted',
};

export default function MemoryPage() {
  const [memories, setMemories] = useState(initialMemoryItems);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('preference');
  const [importance, setImportance] = useState('medium');

  const filtered = memories.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || m.category === activeCategory;
    return matchSearch && matchCat;
  });

  const stats = {
    total: memories.length,
    goals: memories.filter(m => m.category === 'goal').length,
    preferences: memories.filter(m => m.category === 'preference').length,
    learning: memories.filter(m => m.category === 'learning').length,
    behavior: memories.filter(m => m.category === 'behavior').length,
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newMemory = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      category: category as 'goal' | 'preference' | 'learning' | 'behavior',
      importance: importance as 'high' | 'medium' | 'low',
      timestamp: 'Just now',
    };

    setMemories([newMemory, ...memories]);
    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to permanently clear all memories? This cannot be undone.')) {
      setMemories([]);
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(memories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'aura_memories.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Memory Center</h1>
            <p className="text-aura-muted">Manage what AURA remembers about you. Full control over your AI memory.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="btn-secondary text-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Export All
            </button>
            <button onClick={handleClearAll} className="btn-ghost text-sm flex items-center gap-2 !border-aura-red/30 !text-aura-red hover:!bg-aura-red/10">
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Total Memories', value: stats.total, color: '#00f0ff', icon: '💾' },
            { label: 'Goals', value: stats.goals, color: '#00f0ff', icon: '🎯' },
            { label: 'Preferences', value: stats.preferences, color: '#a855f7', icon: '⚙️' },
            { label: 'Learning', value: stats.learning, color: '#10b981', icon: '📚' },
            { label: 'Behavior', value: stats.behavior, color: '#f97316', icon: '🧩' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <span className="text-xl">{s.icon}</span>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-aura-muted uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters & Add Button */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-aura-muted" />
            <input
              type="text"
              placeholder="Search memories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm flex-1 text-aura-text placeholder-aura-muted"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {['all', 'goal', 'preference', 'learning', 'behavior'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-aura-cyan/15 text-aura-cyan border border-aura-cyan/30'
                    : 'glass text-aura-muted hover:text-aura-text'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-primary text-xs !py-2 !px-3 flex items-center gap-1.5 ml-auto md:ml-0"
            >
              <Plus className="w-3.5 h-3.5" /> Add Memory
            </button>
          </div>
        </div>

        {/* Add Memory Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleAddMemory} className="glass-card p-6 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h3 className="text-sm font-semibold">Store New Memory</h3>
                  <button type="button" onClick={() => setShowAddForm(false)} className="text-aura-muted hover:text-aura-text">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-aura-muted">Title / Context</label>
                    <input
                      type="text"
                      placeholder="e.g. Preferred Coding Style"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-aura-text focus:border-aura-cyan/50 outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-aura-muted">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-aura-text outline-none focus:border-aura-cyan/50"
                      >
                        <option value="preference">Preference</option>
                        <option value="goal">Goal</option>
                        <option value="learning">Learning</option>
                        <option value="behavior">Behavior</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-aura-muted">Importance</label>
                      <select
                        value={importance}
                        onChange={(e) => setImportance(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-aura-text outline-none focus:border-aura-cyan/50"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-aura-muted">Memory Details</label>
                  <textarea
                    placeholder="Describe what AURA should remember..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-aura-text focus:border-aura-cyan/50 outline-none transition-colors resize-none"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary text-xs !py-2 !px-4">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-xs !py-2 !px-4">
                    Save Memory
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memory Timeline */}
        <StaggerContainer className="space-y-4">
          {filtered.map((memory) => {
            const cat = categoryColors[memory.category] || { bg: 'bg-white/5', text: 'text-aura-muted', label: memory.category };
            return (
              <StaggerItem key={memory.id}>
                <GlowCard color={memory.category === 'goal' ? 'cyan' : memory.category === 'preference' ? 'purple' : memory.category === 'learning' ? 'green' : 'orange'}>
                  <div className="flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: memory.category === 'goal' ? '#00f0ff' : memory.category === 'preference' ? '#a855f7' : memory.category === 'learning' ? '#10b981' : '#f97316' }} />
                      <div className="w-px h-full bg-aura-border/30" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{memory.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${cat.bg} ${cat.text}`}>{cat.label}</span>
                            <span className="flex items-center gap-1 text-[10px]">
                              <Star className={`w-3 h-3 ${importanceColors[memory.importance]}`} />
                              <span className={importanceColors[memory.importance]}>{memory.importance}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(memory.id)} className="p-1.5 rounded-lg hover:bg-aura-red/10 text-aura-muted hover:text-aura-red transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-aura-muted leading-relaxed">{memory.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3 h-3 text-aura-muted/60" />
                        <span className="text-[10px] text-aura-muted/60">{memory.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <AlertCircle className="w-10 h-10 text-aura-muted mx-auto mb-3" />
            <p className="text-aura-muted">No memories found matching your criteria.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
