'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shield, Sparkles, Zap, Globe, Database, ChevronRight, Github } from 'lucide-react';
import { agents } from '@/lib/data';
import { StaggerContainer, StaggerItem } from '@/components/ui/Animations';

const NeuralScene = dynamic(() => import('@/components/three/NeuralScene'), { ssr: false });

const features = [
  { icon: Brain, title: 'Multi-Agent Intelligence', description: 'Seven specialized AI agents working in harmony to understand, learn, and act on your behalf.', color: '#00f0ff' },
  { icon: Shield, title: 'Privacy Guardian', description: 'Complete data sovereignty. You control what AURA remembers, with full encryption and audit trails.', color: '#a855f7' },
  { icon: Zap, title: 'Autonomous Reasoning', description: 'Advanced planning and reasoning engine that breaks complex goals into actionable steps.', color: '#f97316' },
  { icon: Database, title: 'Persistent Memory', description: 'Long-term AI memory that learns your preferences, tracks goals, and evolves with you.', color: '#ec4899' },
  { icon: Globe, title: 'Social Impact', description: 'Agents for Good — helping farmers, students, and communities with accessible AI tools.', color: '#10b981' },
  { icon: Sparkles, title: 'Multimodal AI', description: 'Understands text, voice, images, and documents. A true personal AI operating system.', color: '#3b82f6' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-aura-bg overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aura-cyan to-aura-purple flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-aura-bg" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-aura-cyan">AU</span><span className="text-aura-purple">RA</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-aura-muted hover:text-aura-text transition-colors">Features</a>
            <a href="#agents" className="text-sm text-aura-muted hover:text-aura-text transition-colors">Agents</a>
            <a href="#architecture" className="text-sm text-aura-muted hover:text-aura-text transition-colors">Architecture</a>
            <Link href="/dashboard" className="btn-primary text-sm !py-2 !px-5">Launch AURA</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center gradient-hero grid-pattern">
        {/* 3D Scene */}
        <div className="absolute inset-0 opacity-60">
          <NeuralScene />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <span className="status-dot status-active" />
              <span className="text-xs font-mono text-aura-cyan">AURA v7.0 — Active</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6">
              <span className="text-aura-text">Meet </span>
              <span className="bg-gradient-to-r from-aura-cyan via-aura-blue to-aura-purple bg-clip-text text-transparent">AURA</span>
            </h1>

            <h2 className="text-xl lg:text-2xl font-semibold text-aura-muted mb-4">
              Your Adaptive Universal Reasoning Assistant
            </h2>

            <p className="text-base text-aura-muted/80 max-w-lg mb-8 leading-relaxed">
              A personal AI ecosystem that learns, reasons, plans, and acts with you.
              Seven intelligent agents. One unified mind. Complete privacy.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard" className="btn-primary flex items-center gap-2">
                Start with AURA <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/agents" className="btn-secondary flex items-center gap-2">
                Explore AI Agents <Brain className="w-4 h-4" />
              </Link>
              <a href="#architecture" className="btn-ghost flex items-center gap-2">
                View Architecture <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-sm text-aura-muted">
              <div className="flex items-center gap-2">
                <span className="text-aura-cyan font-bold text-lg">7</span> AI Agents
              </div>
              <div className="w-px h-4 bg-aura-border" />
              <div className="flex items-center gap-2">
                <span className="text-aura-purple font-bold text-lg">99.7%</span> Privacy Score
              </div>
              <div className="w-px h-4 bg-aura-border" />
              <div className="flex items-center gap-2">
                <span className="text-aura-green font-bold text-lg">24/7</span> Active
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            {/* Floating agent preview cards */}
            <div className="relative h-[500px]">
              {agents.slice(0, 5).map((agent, i) => (
                <motion.div
                  key={agent.id}
                  className="absolute glass-card p-4 w-56"
                  style={{
                    top: `${15 + i * 18}%`,
                    left: `${10 + (i % 3) * 25}%`,
                    zIndex: 5 - i,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{agent.name}</p>
                      <div className="flex items-center gap-1.5">
                        <span className={`status-dot ${agent.status === 'active' ? 'status-active' : agent.status === 'analyzing' ? 'status-analyzing' : agent.status === 'synced' ? 'status-synced' : 'status-protected'}`} />
                        <span className="text-[10px] text-aura-muted uppercase">{agent.status}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-aura-muted line-clamp-2">{agent.lastAction}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-aura-border flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-aura-cyan" />
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            The Future of <span className="text-aura-cyan">Personal AI</span>
          </h2>
          <p className="text-aura-muted max-w-2xl mx-auto">
            AURA combines autonomous reasoning, multi-agent collaboration, and privacy-first design
            into a unified intelligence platform.
          </p>
        </motion.div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="glass-card p-6 h-full group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-aura-muted leading-relaxed">{f.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Agents Preview */}
      <section id="agents" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Meet the <span className="text-aura-purple">AI Agents</span>
          </h2>
          <p className="text-aura-muted max-w-2xl mx-auto">
            Seven specialized agents, each with unique capabilities, working together
            through AURA&apos;s orchestration engine.
          </p>
        </motion.div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <StaggerItem key={agent.id}>
              <div className="glass-card p-5 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{agent.icon}</span>
                  <div className="flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
                    <span className={`status-dot ${agent.status === 'active' ? 'status-active' : agent.status === 'analyzing' ? 'status-analyzing' : agent.status === 'synced' ? 'status-synced' : 'status-protected'}`} />
                    <span className="text-[10px] uppercase font-mono text-aura-muted">{agent.status}</span>
                  </div>
                </div>
                <h3 className="font-semibold mb-1">{agent.name}</h3>
                <p className="text-xs text-aura-muted leading-relaxed mb-3">{agent.description}</p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((c) => (
                    <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-aura-muted">{c}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-10">
          <Link href="/agents" className="btn-secondary inline-flex items-center gap-2">
            Explore All Agents <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            System <span className="text-aura-blue">Architecture</span>
          </h2>
          <p className="text-aura-muted max-w-2xl mx-auto">
            Enterprise-grade microservices architecture designed for scalability, security, and real-time performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 max-w-4xl mx-auto"
        >
          {/* Architecture Diagram */}
          <div className="space-y-6">
            {/* User Layer */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 glass rounded-xl px-6 py-3 neon-border">
                <span className="text-lg">👤</span>
                <span className="font-semibold">USER</span>
              </div>
              <p className="text-xs text-aura-muted mt-2">Voice / Text / Image / Sensor</p>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-aura-cyan to-aura-purple" />
            </div>

            {/* Core Engine */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-xl px-8 py-4" style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.1), rgba(168,85,247,0.1))', border: '1px solid rgba(0,240,255,0.2)' }}>
                <Sparkles className="w-5 h-5 text-aura-cyan" />
                <span className="font-bold text-lg">AURA CORE ENGINE</span>
              </div>
              <p className="text-xs text-aura-muted mt-2">Reasoning + Planning + Orchestration</p>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-aura-purple to-aura-blue" />
            </div>

            {/* Agent Layer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {agents.slice(0, 4).map((agent) => (
                <div key={agent.id} className="glass rounded-xl p-3 text-center">
                  <span className="text-xl">{agent.icon}</span>
                  <p className="text-xs font-medium mt-1">{agent.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`status-dot ${agent.status === 'active' ? 'status-active' : agent.status === 'analyzing' ? 'status-analyzing' : agent.status === 'synced' ? 'status-synced' : 'status-protected'}`} />
                    <span className="text-[9px] text-aura-muted uppercase">{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {agents.slice(4).map((agent) => (
                <div key={agent.id} className="glass rounded-xl p-3 text-center">
                  <span className="text-xl">{agent.icon}</span>
                  <p className="text-xs font-medium mt-1">{agent.name}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`status-dot ${agent.status === 'active' ? 'status-active' : agent.status === 'analyzing' ? 'status-analyzing' : agent.status === 'synced' ? 'status-synced' : 'status-protected'}`} />
                    <span className="text-[9px] text-aura-muted uppercase">{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <div className="w-px h-8 bg-gradient-to-b from-aura-blue to-aura-green" />
            </div>

            {/* Actions */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-xl px-6 py-3" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <Zap className="w-5 h-5 text-aura-green" />
                <span className="font-semibold">Smart Actions</span>
              </div>
              <p className="text-xs text-aura-muted mt-2">Execute • Learn • Report • Adapt</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center gradient-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Ready to meet your <span className="text-aura-cyan">AI companion</span>?
          </h2>
          <p className="text-aura-muted max-w-xl mx-auto mb-8">
            Join AURA and experience the future of personal AI. Privacy-first, agent-powered, always learning.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-lg !px-8 !py-3.5">
              Launch AURA <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://github.com/23A9MQ040/aura7_ai" target="_blank" className="btn-ghost flex items-center gap-2 text-lg !px-8 !py-3.5">
              <Github className="w-5 h-5" /> GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-aura-border/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aura-cyan to-aura-purple flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-aura-bg" />
            </div>
            <span className="font-bold">
              <span className="text-aura-cyan">AU</span><span className="text-aura-purple">RA</span>
            </span>
            <span className="text-xs text-aura-muted">Adaptive Universal Reasoning Assistant</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-aura-muted">
            <Link href="/privacy" className="hover:text-aura-text transition-colors">Privacy</Link>
            <Link href="/developers" className="hover:text-aura-text transition-colors">API</Link>
            <Link href="/docs" className="hover:text-aura-text transition-colors">Docs</Link>
            <a href="https://github.com/23A9MQ040/aura7_ai" target="_blank" className="hover:text-aura-text transition-colors">GitHub</a>
          </div>
          <p className="text-xs text-aura-muted">© 2026 AURA. Built for the future of AI.</p>
        </div>
      </footer>
    </div>
  );
}
