'use client';

import { Search, Bell, User, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopBar() {
  const [time, setTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      const h = now.getHours();
      if (h < 12) setGreeting('Good Morning');
      else if (h < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="glass-strong sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between border-b border-aura-border/20">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-aura-muted">{greeting}</p>
          <p className="text-base font-semibold">Welcome back, <span className="text-aura-cyan">User</span></p>
        </div>
      </div>

      {/* Center — Search */}
      <div className="hidden md:flex items-center gap-2 glass rounded-xl px-4 py-2.5 w-[380px]">
        <Search className="w-4 h-4 text-aura-muted" />
        <input
          type="text"
          placeholder="Ask AURA anything..."
          className="bg-transparent border-none outline-none text-sm text-aura-text placeholder-aura-muted flex-1 font-mono"
        />
        <kbd className="text-[10px] text-aura-muted bg-aura-border/40 px-1.5 py-0.5 rounded">⌘K</kbd>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-aura-muted">{time}</span>
        <div className="flex items-center gap-1 text-aura-green text-xs font-mono">
          <Zap className="w-3.5 h-3.5" />
          <span>Online</span>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-aura-muted hover:text-aura-text">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-aura-cyan rounded-full" />
        </button>
        <button className="w-9 h-9 rounded-xl bg-gradient-to-br from-aura-purple to-aura-blue flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
}
