'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Key, Copy, Check, Zap, Lock, Clock, BookOpen, ArrowRight, Terminal, Webhook } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard } from '@/components/ui/Animations';
import { apiEndpoints } from '@/lib/data';

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: 'bg-aura-green/10', text: 'text-aura-green' },
  POST: { bg: 'bg-aura-blue/10', text: 'text-aura-blue' },
  PUT: { bg: 'bg-aura-orange/10', text: 'text-aura-orange' },
  DELETE: { bg: 'bg-aura-red/10', text: 'text-aura-red' },
};

const codeExamples: Record<string, string> = {
  curl: `curl -X POST https://api.aura7.ai/v1/chat \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Create a learning roadmap for AI",
    "agent": "learning",
    "context": { "user_level": "intermediate" }
  }'`,
  python: `import requests

response = requests.post(
    "https://api.aura7.ai/v1/chat",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "message": "Create a learning roadmap for AI",
        "agent": "learning",
        "context": {"user_level": "intermediate"}
    }
)

print(response.json())`,
  typescript: `const response = await fetch("https://api.aura7.ai/v1/chat", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Create a learning roadmap for AI",
    agent: "learning",
    context: { user_level: "intermediate" },
  }),
});

const data = await response.json();
console.log(data);`,
  java: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.aura7.ai/v1/chat"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString("""
        {
            "message": "Create a learning roadmap for AI",
            "agent": "learning",
            "context": {"user_level": "intermediate"}
        }
    """))
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString()
);`,
};

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState('curl');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
            <Code2 className="w-8 h-8 text-aura-green" />
            Developer API Portal
          </h1>
          <p className="text-aura-muted">Integrate AURA&apos;s intelligence into your applications.</p>
        </div>

        {/* Quick Stats */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Zap, label: 'Avg Latency', value: '45ms', color: '#00f0ff' },
            { icon: Clock, label: 'Uptime', value: '99.97%', color: '#10b981' },
            { icon: Lock, label: 'Auth', value: 'OAuth 2.0', color: '#a855f7' },
            { icon: Webhook, label: 'Endpoints', value: '12', color: '#f97316' },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <GlowCard>
                <s.icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-aura-muted">{s.label}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Authentication */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-aura-yellow" />
            Authentication
          </h2>
          <p className="text-sm text-aura-muted mb-4">
            All API requests require a Bearer token. Include it in the <code className="text-aura-cyan font-mono text-xs px-1.5 py-0.5 bg-white/5 rounded">Authorization</code> header.
          </p>
          <div className="glass rounded-xl p-4 font-mono text-sm">
            <span className="text-aura-muted">Authorization:</span>{' '}
            <span className="text-aura-cyan">Bearer</span>{' '}
            <span className="text-aura-purple">YOUR_API_KEY</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="glass rounded-xl px-4 py-2.5 flex-1 font-mono text-xs text-aura-muted">
              aura_sk_••••••••••••••••••••••••••••••
            </div>
            <button className="btn-primary text-sm">Generate Key</button>
          </div>
        </div>

        {/* Code Examples */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-aura-border/20">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-aura-muted" />
              Quick Start
            </h2>
            <div className="flex gap-1">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                    activeTab === lang
                      ? 'bg-aura-cyan/15 text-aura-cyan'
                      : 'text-aura-muted hover:text-aura-text hover:bg-white/5'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <pre className="p-6 overflow-x-auto text-sm font-mono text-aura-text/80 leading-relaxed">
              {codeExamples[activeTab]}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-4 right-4 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-aura-green" /> : <Copy className="w-4 h-4 text-aura-muted" />}
            </button>
          </div>
        </div>

        {/* API Endpoints */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-aura-muted" />
            API Reference
          </h2>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-aura-border/20">
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Method</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Endpoint</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Description</th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-aura-muted font-medium">Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((ep, i) => {
                    const mc = methodColors[ep.method];
                    return (
                      <motion.tr
                        key={ep.path}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-aura-border/10 hover:bg-white/2 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-3">
                          <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded ${mc.bg} ${mc.text}`}>{ep.method}</span>
                        </td>
                        <td className="px-6 py-3 font-mono text-xs text-aura-cyan">{ep.path}</td>
                        <td className="px-6 py-3 text-sm text-aura-muted">{ep.description}</td>
                        <td className="px-6 py-3">
                          {ep.auth && <Lock className="w-3.5 h-3.5 text-aura-yellow" />}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Rate Limits & SDKs */}
        <div className="grid md:grid-cols-2 gap-6">
          <GlowCard color="cyan">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-aura-cyan" />
              Rate Limits
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-aura-muted">Free Tier</span><span className="font-mono">100 req/min</span></div>
              <div className="flex justify-between"><span className="text-aura-muted">Pro Tier</span><span className="font-mono">1,000 req/min</span></div>
              <div className="flex justify-between"><span className="text-aura-muted">Enterprise</span><span className="font-mono">Unlimited</span></div>
            </div>
          </GlowCard>
          <GlowCard color="purple">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-aura-purple" />
              SDKs Available
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TypeScript', 'Java', 'Go', 'Rust', 'C#'].map((sdk) => (
                <span key={sdk} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-aura-purple/30 transition-colors">{sdk}</span>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </PageTransition>
  );
}
