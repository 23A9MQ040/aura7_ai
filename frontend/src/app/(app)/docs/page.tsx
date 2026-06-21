'use client';

import { motion } from 'framer-motion';
import { FileText, Server, Cloud, GitBranch, Shield, Monitor, ArrowRight, ExternalLink, Copy, Check, ChevronRight } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard } from '@/components/ui/Animations';
import { useState } from 'react';

const sections = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'architecture', label: 'Architecture', icon: Server },
  { id: 'docker', label: 'Docker Setup', icon: Cloud },
  { id: 'kubernetes', label: 'Kubernetes', icon: Server },
  { id: 'cicd', label: 'CI/CD', icon: GitBranch },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'monitoring', label: 'Monitoring', icon: Monitor },
];

const services = [
  { name: 'aura-api-gateway', port: 8080, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-auth-service', port: 8081, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-user-service', port: 8082, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-agent-core', port: 8083, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-memory-service', port: 8084, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-learning-agent', port: 8085, tech: 'Spring Boot', status: 'Beta' },
  { name: 'aura-career-agent', port: 8086, tech: 'Spring Boot', status: 'Beta' },
  { name: 'aura-privacy-service', port: 8087, tech: 'Spring Boot', status: 'Production' },
  { name: 'aura-notification-service', port: 8088, tech: 'Spring Boot', status: 'Production' },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copied, setCopied] = useState('');

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <PageTransition>
      <div className="flex gap-8">
        {/* Sidebar Nav */}
        <nav className="hidden lg:block w-48 flex-shrink-0 sticky top-20 self-start">
          <p className="text-[10px] uppercase tracking-widest text-aura-muted mb-3">Documentation</p>
          <div className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeSection === s.id ? 'text-aura-cyan bg-aura-cyan/8' : 'text-aura-muted hover:text-aura-text hover:bg-white/5'
                }`}
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-10 min-w-0">
          {/* Overview */}
          <section id="overview">
            <h1 className="text-3xl font-bold mb-2">Deployment Documentation</h1>
            <p className="text-aura-muted mb-6">Complete guide to deploying AURA in production environments.</p>

            <div className="glass-card p-6 neon-border mb-6">
              <h3 className="font-semibold mb-2">Quick Start</h3>
              <div className="space-y-3">
                {[
                  { step: '1', cmd: 'git clone https://github.com/23A9MQ040/aura7_ai.git', label: 'Clone the repository' },
                  { step: '2', cmd: 'cd aura7_ai && docker-compose up -d', label: 'Start all services' },
                  { step: '3', cmd: 'open http://localhost:3000', label: 'Access AURA' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-aura-cyan/15 text-aura-cyan text-xs flex items-center justify-center font-bold">{s.step}</span>
                    <div className="flex-1 glass rounded-lg px-4 py-2 font-mono text-sm flex items-center justify-between">
                      <span className="text-aura-text/80">{s.cmd}</span>
                      <button onClick={() => copyText(s.cmd, s.step)} className="p-1 hover:bg-white/10 rounded">
                        {copied === s.step ? <Check className="w-3.5 h-3.5 text-aura-green" /> : <Copy className="w-3.5 h-3.5 text-aura-muted" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture">
            <h2 className="text-2xl font-bold mb-4">System Architecture</h2>
            <p className="text-sm text-aura-muted mb-6">AURA uses a microservices architecture with 9 independent services.</p>

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-aura-border/20">
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Service</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Port</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Tech</th>
                      <th className="text-left px-5 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((s) => (
                      <tr key={s.name} className="border-b border-aura-border/10 hover:bg-white/2">
                        <td className="px-5 py-3 font-mono text-xs text-aura-cyan">{s.name}</td>
                        <td className="px-5 py-3 font-mono text-xs text-aura-muted">{s.port}</td>
                        <td className="px-5 py-3 text-xs text-aura-muted">{s.tech}</td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            s.status === 'Production' ? 'bg-aura-green/10 text-aura-green' : 'bg-aura-orange/10 text-aura-orange'
                          }`}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Docker */}
          <section id="docker">
            <h2 className="text-2xl font-bold mb-4">Docker Setup</h2>
            <div className="glass-card overflow-hidden">
              <div className="px-5 py-3 border-b border-aura-border/20 flex items-center justify-between">
                <span className="text-xs font-mono text-aura-muted">docker-compose.yml</span>
                <button onClick={() => copyText('docker-compose up -d', 'docker')} className="text-xs text-aura-cyan hover:underline">Copy command</button>
              </div>
              <pre className="p-5 text-sm font-mono text-aura-text/70 overflow-x-auto leading-relaxed">{`version: "3.9"
services:
  aura-web:
    build: ./frontend
    ports: ["3000:3000"]
    depends_on: [aura-api-gateway]

  aura-api-gateway:
    build: ./backend/aura-api-gateway
    ports: ["8080:8080"]
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on: [postgres, redis]

  aura-agent-core:
    build: ./backend/aura-agent-core
    ports: ["8083:8083"]
    depends_on: [aura-api-gateway]

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: aura_db
      POSTGRES_USER: aura
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes: [postgres_data:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  vector-db:
    image: chromadb/chroma:latest
    ports: ["8000:8000"]

volumes:
  postgres_data:`}</pre>
            </div>
          </section>

          {/* Kubernetes */}
          <section id="kubernetes">
            <h2 className="text-2xl font-bold mb-4">Kubernetes Deployment</h2>
            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'Namespace', desc: 'aura-system', icon: '📦' },
                { label: 'Pods', desc: '9 service pods + DB', icon: '🔷' },
                { label: 'HPA', desc: 'Auto-scaling enabled', icon: '📊' },
                { label: 'Ingress', desc: 'NGINX controller', icon: '🌐' },
                { label: 'Health Checks', desc: 'Liveness + Readiness', icon: '💚' },
                { label: 'Updates', desc: 'Rolling, zero-downtime', icon: '🔄' },
              ].map((k) => (
                <StaggerItem key={k.label}>
                  <div className="glass-card p-4 flex items-center gap-3">
                    <span className="text-xl">{k.icon}</span>
                    <div>
                      <p className="text-sm font-semibold">{k.label}</p>
                      <p className="text-xs text-aura-muted">{k.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* CI/CD */}
          <section id="cicd">
            <h2 className="text-2xl font-bold mb-4">CI/CD Pipeline</h2>
            <div className="glass-card p-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Code Push', 'Testing', 'Security Scan', 'Docker Build', 'Deploy', 'Monitoring'].map((stage, i) => (
                  <div key={stage} className="flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="glass rounded-xl px-4 py-2.5 text-center"
                    >
                      <p className="text-xs font-semibold">{stage}</p>
                    </motion.div>
                    {i < 5 && <ChevronRight className="w-4 h-4 text-aura-muted" />}
                  </div>
                ))}
              </div>
              <p className="text-xs text-aura-muted text-center mt-4">Powered by GitHub Actions — automated on every push to <code className="text-aura-cyan font-mono">main</code></p>
            </div>
          </section>

          {/* Security */}
          <section id="security">
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Authentication', items: ['OAuth 2.0 / JWT', 'API key rotation', 'Session management'] },
                { title: 'Infrastructure', items: ['API Gateway', 'Rate limiting', 'TLS everywhere'] },
                { title: 'AI Safety', items: ['Prompt injection protection', 'Tool permission control', 'Agent sandboxing'] },
              ].map((cat) => (
                <GlowCard key={cat.title}>
                  <Shield className="w-5 h-5 text-aura-purple mb-2" />
                  <h3 className="font-semibold text-sm mb-3">{cat.title}</h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="text-xs text-aura-muted flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-aura-purple" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* Monitoring */}
          <section id="monitoring">
            <h2 className="text-2xl font-bold mb-4">Monitoring</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Prometheus', desc: 'Metrics collection & alerting', color: '#f97316' },
                { name: 'Grafana', desc: 'Dashboards & visualization', color: '#00f0ff' },
                { name: 'OpenTelemetry', desc: 'Distributed tracing', color: '#a855f7' },
              ].map((tool) => (
                <GlowCard key={tool.name} color={tool.color === '#f97316' ? 'orange' : tool.color === '#00f0ff' ? 'cyan' : 'purple'}>
                  <Monitor className="w-5 h-5 mb-2" style={{ color: tool.color }} />
                  <h3 className="font-semibold text-sm">{tool.name}</h3>
                  <p className="text-xs text-aura-muted mt-1">{tool.desc}</p>
                </GlowCard>
              ))}
            </div>
            <div className="glass-card p-4 mt-4">
              <p className="text-xs text-aura-muted">
                <span className="font-semibold text-aura-text">Tracked metrics:</span> API latency • Agent performance • AI accuracy • Token usage • Error rates • Memory utilization
              </p>
            </div>
          </section>

          {/* Cloud Providers */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4">Cloud Deployment</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">☁️ Google Cloud</h3>
                <ul className="space-y-1 text-xs text-aura-muted">
                  <li>• Cloud Run (serverless containers)</li>
                  <li>• GKE (Kubernetes Engine)</li>
                  <li>• Cloud SQL (PostgreSQL)</li>
                  <li>• Cloud Storage (assets)</li>
                </ul>
              </div>
              <div className="glass rounded-xl p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">🟠 AWS</h3>
                <ul className="space-y-1 text-xs text-aura-muted">
                  <li>• ECS / EKS (containers)</li>
                  <li>• RDS (PostgreSQL)</li>
                  <li>• S3 (storage)</li>
                  <li>• CloudFront (CDN)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
