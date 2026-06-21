'use client';

import { motion } from 'framer-motion';
import { Briefcase, Upload, Target, TrendingUp, Star, CheckCircle2, AlertCircle, BarChart3, Award, FileText } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';

const skills = [
  { name: 'TypeScript', level: 92, category: 'Strong' },
  { name: 'React/Next.js', level: 88, category: 'Strong' },
  { name: 'Python', level: 75, category: 'Good' },
  { name: 'System Design', level: 70, category: 'Good' },
  { name: 'Machine Learning', level: 65, category: 'Growing' },
  { name: 'Agentic AI', level: 55, category: 'Growing' },
  { name: 'Cloud/DevOps', level: 50, category: 'Developing' },
  { name: 'Data Structures', level: 82, category: 'Strong' },
];

const interviewTopics = [
  { topic: 'System Design', readiness: 85, questions: 12 },
  { topic: 'LLM Architecture', readiness: 72, questions: 8 },
  { topic: 'Behavioral', readiness: 90, questions: 15 },
  { topic: 'Coding Challenges', readiness: 78, questions: 20 },
];

const portfolioItems = [
  { title: 'Multi-Agent Chatbot', status: 'In Progress', completeness: 60, impact: 'High' },
  { title: 'RAG Document System', status: 'Planned', completeness: 15, impact: 'High' },
  { title: 'AI Code Reviewer', status: 'Planned', completeness: 0, impact: 'Medium' },
];

export default function CareerPage() {
  const overallScore = 85;

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-aura-purple" />
            Career Intelligence
          </h1>
          <p className="text-aura-muted">AI-powered career analysis, skill tracking, and interview preparation.</p>
        </div>

        {/* Score Overview */}
        <div className="grid md:grid-cols-4 gap-5">
          <GlowCard color="purple" className="md:col-span-1 flex flex-col items-center justify-center">
            <ProgressRing progress={overallScore} size={120} strokeWidth={8} color="#a855f7">
              <div className="text-center">
                <span className="text-2xl font-bold text-aura-purple">{overallScore}</span>
                <p className="text-[8px] text-aura-muted">/ 100</p>
              </div>
            </ProgressRing>
            <p className="font-semibold mt-3">Job Readiness</p>
            <p className="text-xs text-aura-muted">Excellent standing</p>
          </GlowCard>

          <div className="md:col-span-3 grid grid-cols-3 gap-4">
            {[
              { label: 'Resume Score', value: '82/100', icon: FileText, color: '#00f0ff', detail: '3 improvements suggested' },
              { label: 'Skills Match', value: '74%', icon: Target, color: '#10b981', detail: 'For AI Engineer roles' },
              { label: 'Market Demand', value: 'High', icon: TrendingUp, color: '#f97316', detail: 'AI/ML roles +32% YoY' },
              { label: 'Interview Ready', value: '81%', icon: Award, color: '#ec4899', detail: '55 practice sessions' },
              { label: 'Portfolio Impact', value: 'Medium', icon: Star, color: '#a855f7', detail: '2 projects needed' },
              { label: 'Network Score', value: '65', icon: BarChart3, color: '#3b82f6', detail: 'Expand connections' },
            ].map((m) => (
              <GlowCard key={m.label} color={m.color === '#00f0ff' ? 'cyan' : m.color === '#10b981' ? 'green' : m.color === '#a855f7' ? 'purple' : 'orange'}>
                <m.icon className="w-5 h-5 mb-2" style={{ color: m.color }} />
                <p className="text-xl font-bold" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs font-medium mt-0.5">{m.label}</p>
                <p className="text-[10px] text-aura-muted">{m.detail}</p>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="glass-card p-6 border-dashed border-2 border-aura-border/40 text-center">
          <Upload className="w-10 h-10 text-aura-muted mx-auto mb-3" />
          <p className="font-semibold mb-1">Upload Your Resume</p>
          <p className="text-sm text-aura-muted mb-4">Drop your PDF or paste text for AI-powered analysis</p>
          <button className="btn-primary">Choose File</button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skill Radar */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-aura-cyan" />
              Skill Assessment
            </h2>
            <div className="glass-card p-5 space-y-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-medium w-28 text-right">{skill.name}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: skill.level >= 80 ? '#10b981' : skill.level >= 60 ? '#00f0ff' : skill.level >= 40 ? '#f97316' : '#ef4444',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-xs font-mono w-10" style={{
                    color: skill.level >= 80 ? '#10b981' : skill.level >= 60 ? '#00f0ff' : '#f97316'
                  }}>{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Prep */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-aura-pink" />
              Interview Preparation
            </h2>
            <StaggerContainer className="space-y-3">
              {interviewTopics.map((topic) => (
                <StaggerItem key={topic.topic}>
                  <GlowCard color={topic.readiness >= 85 ? 'green' : topic.readiness >= 70 ? 'cyan' : 'orange'}>
                    <div className="flex items-center gap-4">
                      <ProgressRing progress={topic.readiness} size={50} strokeWidth={4} color={topic.readiness >= 85 ? '#10b981' : topic.readiness >= 70 ? '#00f0ff' : '#f97316'}>
                        <span className="text-[10px] font-bold">{topic.readiness}%</span>
                      </ProgressRing>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{topic.topic}</p>
                        <p className="text-xs text-aura-muted">{topic.questions} practice questions</p>
                      </div>
                      <button className="btn-ghost text-xs !py-1.5 !px-3">Practice</button>
                    </div>
                  </GlowCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-aura-orange" />
            Portfolio Projects
          </h2>
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {portfolioItems.map((p) => (
              <StaggerItem key={p.title}>
                <GlowCard>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{p.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      p.status === 'In Progress' ? 'bg-aura-cyan/10 text-aura-cyan' : 'bg-white/5 text-aura-muted'
                    }`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-aura-cyan to-aura-purple"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.completeness}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    <span className="text-xs font-mono text-aura-muted">{p.completeness}%</span>
                  </div>
                  <p className="text-xs text-aura-muted">Impact: <span className={p.impact === 'High' ? 'text-aura-green' : 'text-aura-orange'}>{p.impact}</span></p>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  );
}
