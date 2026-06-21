'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Brain, Shield, BookOpen, Briefcase,
  Globe, Database, Code2, FileText, Sparkles, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { agents } from '@/lib/data';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agents', label: 'AI Agents', icon: Brain },
  { href: '/memory', label: 'Memory Center', icon: Database },
  { href: '/privacy', label: 'Privacy Center', icon: Shield },
  { href: '/career', label: 'Career Intel', icon: Briefcase },
  { href: '/learning', label: 'Learning Hub', icon: BookOpen },
  { href: '/impact', label: 'Social Impact', icon: Globe },
  { href: '/developers', label: 'Developer API', icon: Code2 },
  { href: '/docs', label: 'Documentation', icon: FileText },
];

const statusColorMap: Record<string, string> = {
  active: 'status-active',
  analyzing: 'status-analyzing',
  synced: 'status-synced',
  protected: 'status-protected',
  idle: 'bg-gray-500',
  learning: 'status-analyzing',
};

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen glass-strong z-50 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-aura-border/30">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aura-cyan to-aura-purple flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-aura-bg" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-aura-cyan">AU</span>
              <span className="text-aura-purple">RA</span>
            </h1>
            <p className="text-[10px] text-aura-muted tracking-widest uppercase">AI Ecosystem</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Agent Status */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-aura-border/30 animate-fade-in">
          <p className="text-[10px] uppercase tracking-widest text-aura-muted mb-3">Agent Status</p>
          <div className="space-y-2">
            {agents.slice(0, 4).map((agent) => (
              <div key={agent.id} className="flex items-center gap-2.5">
                <span className={`status-dot ${statusColorMap[agent.status]}`} />
                <span className="text-xs text-aura-muted">{agent.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-4 p-2 rounded-lg hover:bg-white/5 transition-colors text-aura-muted hover:text-aura-text flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
