'use client';

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Circle, Clock, Flame, Trophy, ArrowRight, Play, Star } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';
import { learningRoadmap } from '@/lib/data';

const dailyTasks = [
  { title: 'Read: Multi-Agent Orchestration Patterns', duration: '25 min', type: 'reading', done: true },
  { title: 'Build: Simple Agent Router in TypeScript', duration: '45 min', type: 'project', done: true },
  { title: 'Watch: LangGraph Deep Dive', duration: '30 min', type: 'video', done: false },
  { title: 'Practice: Agent Communication Protocol', duration: '20 min', type: 'exercise', done: false },
  { title: 'Review: Yesterday\'s Code Submission', duration: '15 min', type: 'review', done: false },
];

const resources = [
  { title: 'LangChain Documentation', type: 'Docs', url: '#', rating: 4.8 },
  { title: 'Building Multi-Agent Systems', type: 'Course', url: '#', rating: 4.9 },
  { title: 'Agentic AI Design Patterns', type: 'Article', url: '#', rating: 4.7 },
  { title: 'RAG Best Practices 2026', type: 'Guide', url: '#', rating: 4.6 },
];

const statusColors = {
  'completed': { bg: 'bg-aura-green/10', border: 'border-aura-green/30', text: 'text-aura-green', dot: '#10b981' },
  'in-progress': { bg: 'bg-aura-cyan/10', border: 'border-aura-cyan/30', text: 'text-aura-cyan', dot: '#00f0ff' },
  'upcoming': { bg: 'bg-white/5', border: 'border-white/10', text: 'text-aura-muted', dot: '#64748b' },
};

export default function LearningPage() {
  const totalModules = learningRoadmap.reduce((a, n) => a + n.modules.length, 0);
  const doneModules = learningRoadmap.reduce((a, n) => a + n.modules.filter(m => m.done).length, 0);
  const overallProgress = Math.round((doneModules / totalModules) * 100);

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-aura-cyan" />
              Learning Hub
            </h1>
            <p className="text-aura-muted">Your personalized AI-powered learning journey.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
              <Flame className="w-4 h-4 text-aura-orange" />
              <span className="text-sm font-semibold text-aura-orange">12 day streak</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
              <Trophy className="w-4 h-4 text-aura-yellow" />
              <span className="text-sm font-semibold text-aura-yellow">Level 7</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="glass-card p-6 neon-border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <ProgressRing progress={overallProgress} size={110} strokeWidth={8} color="#00f0ff">
              <div className="text-center">
                <span className="text-xl font-bold text-aura-cyan">{overallProgress}%</span>
                <p className="text-[8px] text-aura-muted">Complete</p>
              </div>
            </ProgressRing>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Agentic AI Engineer Roadmap</h2>
              <p className="text-sm text-aura-muted mb-3">
                Your personalized path to becoming an Agentic AI Engineer.{' '}
                <span className="text-aura-cyan">{doneModules}/{totalModules} modules</span> completed.
              </p>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-aura-cyan via-aura-blue to-aura-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Roadmap */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Learning Roadmap</h2>
            <div className="space-y-4">
              {learningRoadmap.map((node, i) => {
                const style = statusColors[node.status];
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`glass-card p-5 border ${style.border}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step indicator */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${style.dot}20`, color: style.dot }}>
                          {node.status === 'completed' ? '✓' : i + 1}
                        </div>
                        {i < learningRoadmap.length - 1 && <div className="w-px h-8 bg-aura-border/30" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{node.title}</h3>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full ${style.bg} ${style.text} uppercase font-mono`}>
                            {node.status}
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: style.dot }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${node.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <span className="text-xs font-mono" style={{ color: style.dot }}>{node.progress}%</span>
                        </div>

                        {/* Modules */}
                        <div className="grid grid-cols-2 gap-2">
                          {node.modules.map((mod) => (
                            <div key={mod.name} className="flex items-center gap-2 text-xs">
                              {mod.done ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-aura-green flex-shrink-0" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-aura-muted/40 flex-shrink-0" />
                              )}
                              <span className={mod.done ? 'text-aura-muted line-through' : 'text-aura-text'}>{mod.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Tasks */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-aura-muted" />
                Today&apos;s Tasks
              </h2>
              <div className="glass-card p-4 space-y-2">
                {dailyTasks.map((task, i) => (
                  <motion.div
                    key={task.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${task.done ? 'opacity-60' : 'hover:bg-white/3'}`}
                  >
                    {task.done ? (
                      <CheckCircle2 className="w-4 h-4 text-aura-green flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-aura-muted/40 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${task.done ? 'line-through text-aura-muted' : ''}`}>{task.title}</p>
                      <p className="text-[10px] text-aura-muted mt-0.5">{task.duration} • {task.type}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="pt-2 text-center">
                  <p className="text-xs text-aura-muted">
                    <span className="text-aura-green font-semibold">{dailyTasks.filter(t => t.done).length}</span>/{dailyTasks.length} completed
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-aura-yellow" />
                Recommended
              </h2>
              <div className="space-y-3">
                {resources.map((r) => (
                  <div key={r.title} className="glass-card p-4 group cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium group-hover:text-aura-cyan transition-colors">{r.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-aura-muted">{r.type}</span>
                          <span className="text-[10px] text-aura-yellow">★ {r.rating}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-aura-muted group-hover:text-aura-cyan transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
