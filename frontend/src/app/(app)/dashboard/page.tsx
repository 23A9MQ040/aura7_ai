'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp, Target, Clock, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';
import { agents, dashboardMetrics, activityFeed } from '@/lib/data';
import PageTransition from '@/components/ui/Animations';

const statusColorMap: Record<string, string> = {
  active: 'status-active',
  analyzing: 'status-analyzing',
  synced: 'status-synced',
  protected: 'status-protected',
  idle: 'bg-gray-500',
  learning: 'status-analyzing',
};

const changeIcons = {
  up: <ArrowUpRight className="w-3.5 h-3.5 text-aura-green" />,
  down: <ArrowDownRight className="w-3.5 h-3.5 text-aura-red" />,
  neutral: <Minus className="w-3.5 h-3.5 text-aura-muted" />,
};

import { useState, useEffect } from 'react';

interface BackendStatus {
  status: string;
  message?: string;
  [key: string]: string | number | boolean | undefined;
}

import Link from 'next/link';

export default function DashboardPage() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/status')
      .then(res => res.json())
      .then(data => setBackendStatus(data))
      .catch(err => setBackendStatus({ status: 'offline', message: 'Cannot connect to backend' }));
  }, []);

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1">AI Command Center</h1>
          <p className="text-aura-muted">Your personal intelligence dashboard — all agents, all metrics, one view.</p>
        </div>

        {/* Insight Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 neon-border flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aura-cyan/20 to-aura-purple/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-aura-cyan" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold">AURA Insight</p>
            <p className="text-sm text-aura-muted">
              Your Agentic AI Engineer roadmap is <span className="text-aura-cyan font-semibold">78% complete</span>.
              Career Agent detected 3 new relevant job postings. Learning Agent suggests focusing on Multi-Agent Systems this week.
            </p>
          </div>
          <Link href="/learning" className="btn-primary text-xs !py-2 !px-4 flex-shrink-0 whitespace-nowrap">View Details</Link>
        </motion.div>

        {/* Metrics Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <GlowCard color={m.color === '#00f0ff' ? 'cyan' : m.color === '#a855f7' ? 'purple' : m.color === '#10b981' ? 'green' : 'pink'}>
                <div className="metric-card">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{m.icon}</span>
                    <div className="flex items-center gap-1">
                      {changeIcons[m.changeType]}
                      <span className={`text-xs ${m.changeType === 'up' ? 'text-aura-green' : m.changeType === 'down' ? 'text-aura-red' : 'text-aura-muted'}`}>
                        {m.change}
                      </span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-xs text-aura-muted">{m.label}</p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Agent Monitoring */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <div className="status-dot status-active" />
              Active Agent Monitoring
            </h2>
            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <StaggerItem key={agent.id}>
                  <Link href={`/agents?select=${agent.id}`} className="block">
                    <GlowCard 
                      color={agent.color === '#00f0ff' ? 'cyan' : agent.color === '#a855f7' ? 'purple' : agent.color === '#10b981' ? 'green' : agent.color === '#3b82f6' ? 'blue' : agent.color === '#ec4899' ? 'pink' : 'orange'}
                      className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <ProgressRing progress={agent.accuracy || 0} size={56} strokeWidth={4} color={agent.color}>
                          <span className="text-sm">{agent.icon}</span>
                        </ProgressRing>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm">{agent.name}</h3>
                            <div className="flex items-center gap-1.5">
                              <span className={`status-dot ${statusColorMap[agent.status]}`} />
                              <span className="text-[10px] uppercase font-mono text-aura-muted">{agent.status}</span>
                            </div>
                          </div>
                          <p className="text-xs text-aura-muted mb-2 truncate">{agent.lastAction}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: agent.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${agent.accuracy}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-aura-muted">{agent.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Activity Feed */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-aura-muted" />
              Activity Feed
            </h2>
            <div className="glass-card p-4 space-y-3">
              {activityFeed.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors"
                >
                  <span className="text-lg flex-shrink-0">{item.agentIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{item.agent}</p>
                    <p className="text-xs text-aura-muted mt-0.5 leading-relaxed">{item.message}</p>
                    <p className="text-[10px] text-aura-muted/60 mt-1">{item.timestamp}</p>
                  </div>
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-aura-green flex-shrink-0 mt-0.5" />}
                  {item.type === 'warning' && <TrendingUp className="w-4 h-4 text-aura-orange flex-shrink-0 mt-0.5" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="glass-card p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aura-cyan/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-aura-cyan" />
            </div>
            <div>
              <p className="text-xs text-aura-muted">Total Actions Today</p>
              <p className="font-bold text-lg">1,247</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aura-purple/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-aura-purple" />
            </div>
            <div>
              <p className="text-xs text-aura-muted">Goals on Track</p>
              <p className="font-bold text-lg">9 / 12</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aura-green/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-aura-green" />
            </div>
            <div>
              <p className="text-xs text-aura-muted">Tasks Completed</p>
              <p className="font-bold text-lg">34</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aura-pink/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-aura-pink" />
            </div>
            <div>
              <p className="text-xs text-aura-muted">Uptime</p>
              <p className="font-bold text-lg">99.97%</p>
            </div>
          </div>
        </div>

        {/* Backend Connection Status */}
        <div className="glass-card p-5">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <div className={`status-dot ${backendStatus?.status === 'operational' ? 'status-active' : 'bg-red-500'}`} />
            Backend Connection Status
          </h2>
          <div className="text-sm">
            {backendStatus ? (
              <pre className="text-aura-muted bg-black/20 p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(backendStatus, null, 2)}
              </pre>
            ) : (
              <p className="text-aura-muted">Pinging backend at localhost:8080...</p>
            )}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
