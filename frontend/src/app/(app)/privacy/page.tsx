'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Trash2, Download, ToggleLeft, ToggleRight, AlertTriangle, CheckCircle2, Clock, Key } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';
import { useState } from 'react';

const permissions = [
  { id: 'learning', label: 'Learning History', description: 'Roadmaps, courses, progress data', enabled: true, icon: '📚' },
  { id: 'career', label: 'Career Data', description: 'Resume, skills, job preferences', enabled: true, icon: '💼' },
  { id: 'behavior', label: 'Behavior Patterns', description: 'Usage habits, preferences, schedules', enabled: false, icon: '🧩' },
  { id: 'health', label: 'Health Insights', description: 'Wellness metrics, fitness data', enabled: false, icon: '🏥' },
  { id: 'finance', label: 'Financial Data', description: 'Spending patterns, budget info', enabled: false, icon: '💰' },
  { id: 'location', label: 'Location Data', description: 'City-level, no precise tracking', enabled: true, icon: '📍' },
];

const auditLogs = [
  { time: '2 min ago', action: 'Memory sync completed', agent: 'Memory Agent', type: 'success' as const },
  { time: '15 min ago', action: 'Data encryption verified', agent: 'Privacy Guardian', type: 'success' as const },
  { time: '1 hr ago', action: 'Permission check passed', agent: 'Auth Service', type: 'success' as const },
  { time: '2 hr ago', action: 'New consent recorded', agent: 'Privacy Guardian', type: 'info' as const },
  { time: '6 hr ago', action: 'Scheduled security scan — all clear', agent: 'Privacy Guardian', type: 'success' as const },
  { time: '1 day ago', action: 'API key rotated automatically', agent: 'Auth Service', type: 'info' as const },
];

export default function PrivacyPage() {
  const [perms, setPerms] = useState(permissions);

  const togglePermission = (id: string) => {
    setPerms(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const enabledCount = perms.filter(p => p.enabled).length;
  const securityScore = 97;

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
            <Shield className="w-8 h-8 text-aura-blue" />
            Privacy Center
          </h1>
          <p className="text-aura-muted">Your Data Control Center — full sovereignty over what AURA knows.</p>
        </div>

        {/* Security Overview */}
        <div className="grid md:grid-cols-3 gap-5">
          <GlowCard color="cyan" className="flex items-center gap-5">
            <ProgressRing progress={securityScore} size={90} strokeWidth={6} color="#00f0ff">
              <span className="text-lg font-bold text-aura-cyan">{securityScore}</span>
            </ProgressRing>
            <div>
              <p className="font-semibold text-lg">Security Score</p>
              <p className="text-xs text-aura-muted">Excellent — all systems protected</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-aura-green" />
                <span className="text-xs text-aura-green">All checks passed</span>
              </div>
            </div>
          </GlowCard>

          <GlowCard color="purple">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-aura-purple" />
              <p className="font-semibold">Encryption</p>
            </div>
            <p className="text-2xl font-bold text-aura-purple mb-1">AES-256</p>
            <p className="text-xs text-aura-muted">End-to-end encryption active</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-aura-green animate-pulse" />
              <span className="text-[10px] text-aura-green">Encrypted at rest & in transit</span>
            </div>
          </GlowCard>

          <GlowCard color="green">
            <div className="flex items-center gap-3 mb-3">
              <Key className="w-5 h-5 text-aura-green" />
              <p className="font-semibold">Authentication</p>
            </div>
            <p className="text-2xl font-bold text-aura-green mb-1">OAuth 2.0</p>
            <p className="text-xs text-aura-muted">JWT token-based auth</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-2 h-2 rounded-full bg-aura-green animate-pulse" />
              <span className="text-[10px] text-aura-green">Session verified</span>
            </div>
          </GlowCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Data Permissions */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-aura-muted" />
              Data Permissions
              <span className="text-xs text-aura-muted ml-auto">{enabledCount}/{perms.length} enabled</span>
            </h2>
            <div className="space-y-3">
              {perms.map((perm) => (
                <motion.div
                  key={perm.id}
                  layout
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <span className="text-xl">{perm.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{perm.label}</p>
                    <p className="text-xs text-aura-muted">{perm.description}</p>
                  </div>
                  <button onClick={() => togglePermission(perm.id)} className="flex-shrink-0">
                    {perm.enabled ? (
                      <ToggleRight className="w-8 h-8 text-aura-green" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-aura-muted" />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-aura-muted" />
              Audit Log
            </h2>
            <div className="glass-card p-4 space-y-3">
              {auditLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors"
                >
                  {log.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-aura-green flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-aura-yellow flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{log.action}</p>
                    <p className="text-[10px] text-aura-muted mt-0.5">{log.agent}</p>
                  </div>
                  <span className="text-[10px] text-aura-muted/60 flex-shrink-0">{log.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border-aura-red/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-aura-red">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <p className="text-sm font-medium mb-1">Export All Data</p>
              <p className="text-xs text-aura-muted mb-3">Download a copy of everything AURA knows about you.</p>
              <button className="btn-secondary text-xs !py-2 flex items-center gap-2 w-full justify-center">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-sm font-medium mb-1">Delete Specific Data</p>
              <p className="text-xs text-aura-muted mb-3">Selectively remove memories and preferences.</p>
              <button className="btn-secondary text-xs !py-2 flex items-center gap-2 w-full justify-center !border-aura-orange/30 !text-aura-orange">
                <Trash2 className="w-3.5 h-3.5" /> Select & Delete
              </button>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-sm font-medium mb-1">Delete Everything</p>
              <p className="text-xs text-aura-muted mb-3">Permanently erase all data. This cannot be undone.</p>
              <button className="btn-secondary text-xs !py-2 flex items-center gap-2 w-full justify-center !border-aura-red/30 !text-aura-red hover:!bg-aura-red/10">
                <Trash2 className="w-3.5 h-3.5" /> Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
