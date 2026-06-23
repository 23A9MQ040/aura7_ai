'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Upload, Target, TrendingUp, Star, CheckCircle2, AlertCircle, BarChart3, Award, FileText, X, Sparkles, Loader2 } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';

const initialSkills = [
  { name: 'TypeScript', level: 92, category: 'Strong' },
  { name: 'React/Next.js', level: 88, category: 'Strong' },
  { name: 'Python', level: 75, category: 'Good' },
  { name: 'System Design', level: 70, category: 'Good' },
  { name: 'Machine Learning', level: 65, category: 'Growing' },
  { name: 'Agentic AI', level: 55, category: 'Growing' },
  { name: 'Cloud/DevOps', level: 50, category: 'Developing' },
  { name: 'Data Structures', level: 82, category: 'Strong' },
];

const initialInterviewTopics = [
  { id: 'sd', topic: 'System Design', readiness: 85, questions: 12, prompt: 'Design a distributed rate limiter for an API gateway handling 100k requests/sec.' },
  { id: 'llm', topic: 'LLM Architecture', readiness: 72, questions: 8, prompt: 'Explain the difference between Multi-Query Attention (MQA) and Grouped-Query Attention (GQA).' },
  { id: 'beh', topic: 'Behavioral', readiness: 90, questions: 15, prompt: 'Tell me about a time you had a technical disagreement with a team member. How did you resolve it?' },
  { id: 'cod', topic: 'Coding Challenges', readiness: 78, questions: 20, prompt: 'Explain how you would find the longest palindromic substring in O(N) time complexity.' },
];

const initialPortfolioItems = [
  { title: 'Multi-Agent Chatbot', status: 'In Progress', completeness: 60, impact: 'High' },
  { title: 'RAG Document System', status: 'Planned', completeness: 15, impact: 'High' },
  { title: 'AI Code Reviewer', status: 'Planned', completeness: 0, impact: 'Medium' },
];

export default function CareerPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [interviewTopics, setInterviewTopics] = useState(initialInterviewTopics);
  const [portfolioItems] = useState(initialPortfolioItems);
  const [resumeScore, setResumeScore] = useState(82);
  const [parsingResume, setParsingResume] = useState(false);
  const [resumeName, setResumeName] = useState<string | null>(null);

  // Practice Simulator State
  const [activePracticeTopic, setActivePracticeTopic] = useState<typeof initialInterviewTopics[0] | null>(null);
  const [answer, setAnswer] = useState('');
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [scoreEarned, setScoreEarned] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      setParsingResume(true);
      
      // Simulate parsing
      setTimeout(() => {
        setParsingResume(false);
        setResumeScore(94);
        // Add parsed skills dynamically
        setSkills(prev => {
          // Avoid duplicate additions
          if (prev.find(s => s.name === 'FastAPI')) return prev;
          return [
            ...prev,
            { name: 'FastAPI', level: 85, category: 'Strong' },
            { name: 'LangChain', level: 80, category: 'Strong' },
          ];
        });
      }, 2500);
    }
  };

  const handlePracticeStart = (topic: typeof initialInterviewTopics[0]) => {
    setActivePracticeTopic(topic);
    setAnswer('');
    setFeedback(null);
    setScoreEarned(null);
  };

  const handlePracticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setSubmittingAnswer(true);

    // Simulate AI grading
    setTimeout(() => {
      setSubmittingAnswer(false);
      
      let generatedFeedback = '';
      let score = 90;

      if (activePracticeTopic?.id === 'sd') {
        generatedFeedback = 'Excellent architecture details. You correctly mentioned Redis Token Bucket algorithm and shared-state memory replication. To improve, mention local caching strategies in Gateway memory to reduce Redis load.';
        score = 92;
      } else if (activePracticeTopic?.id === 'llm') {
        generatedFeedback = 'Strong understanding of GQA query/key group ratio compression. You highlighted the memory savings well. Adding discussion around training complexity would make this answer complete.';
        score = 88;
      } else {
        generatedFeedback = 'Great, structure is clear and follows the STAR methodology. Well articulated communication skills!';
        score = 95;
      }

      setFeedback(generatedFeedback);
      setScoreEarned(score);

      // Dynamically improve readiness score
      setInterviewTopics(prev => prev.map(t => {
        if (t.id === activePracticeTopic?.id) {
          return { ...t, readiness: Math.min(100, Math.max(t.readiness, score)) };
        }
        return t;
      }));

    }, 2000);
  };

  const skillsMatch = Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);
  const readinessAvg = Math.round(interviewTopics.reduce((sum, t) => sum + t.readiness, 0) / interviewTopics.length);
  const overallScore = Math.round((resumeScore + skillsMatch + readinessAvg) / 3);

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
                <span className="text-2xl font-bold text-aura-purple font-mono">{overallScore}</span>
                <p className="text-[8px] text-aura-muted font-mono">/ 100</p>
              </div>
            </ProgressRing>
            <p className="font-semibold mt-3">Job Readiness</p>
            <p className="text-xs text-aura-muted">Overall standing</p>
          </GlowCard>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Resume Score', value: `${resumeScore}/100`, icon: FileText, color: '#00f0ff', detail: resumeScore < 90 ? 'Upload updated resume to evaluate' : 'Excellent rating' },
              { label: 'Skills Match', value: `${skillsMatch}%`, icon: Target, color: '#10b981', detail: 'Based on current assessment' },
              { label: 'Market Demand', value: 'High', icon: TrendingUp, color: '#f97316', detail: 'AI/ML roles +32% YoY' },
              { label: 'Interview Ready', value: `${readinessAvg}%`, icon: Award, color: '#ec4899', detail: `${interviewTopics.reduce((acc, t) => acc + t.questions, 0)} modules practice` },
              { label: 'Portfolio Impact', value: 'Medium', icon: Star, color: '#a855f7', detail: `${portfolioItems.length} active projects` },
              { label: 'Network Score', value: '65', icon: BarChart3, color: '#3b82f6', detail: 'Expand tech connections' },
            ].map((m) => (
              <GlowCard key={m.label} color={m.color === '#00f0ff' ? 'cyan' : m.color === '#10b981' ? 'green' : m.color === '#a855f7' ? 'purple' : 'orange'}>
                <m.icon className="w-5 h-5 mb-2" style={{ color: m.color }} />
                <p className="text-xl font-bold font-mono" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs font-medium mt-0.5">{m.label}</p>
                <p className="text-[10px] text-aura-muted">{m.detail}</p>
              </GlowCard>
            ))}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="glass-card p-6 border-dashed border-2 border-aura-border/40 text-center">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {parsingResume ? (
            <div className="py-4 space-y-3">
              <Loader2 className="w-8 h-8 text-aura-cyan animate-spin mx-auto" />
              <p className="font-semibold text-sm">AI Engine Parsing Resume...</p>
              <p className="text-xs text-aura-muted">Extracting new core competencies and matching metrics</p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-aura-muted mx-auto mb-3" />
              <p className="font-semibold mb-1">
                {resumeName ? `Active Resume: ${resumeName}` : 'Upload Your Resume'}
              </p>
              <p className="text-sm text-aura-muted mb-4">
                {resumeName ? 'Upload a different file to re-evaluate score' : 'Drop your PDF or paste text for AI-powered analysis'}
              </p>
              <button onClick={handleUploadClick} className="btn-primary flex items-center gap-2 mx-auto">
                <Sparkles className="w-4 h-4" /> Choose File
              </button>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skill Radar */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-aura-cyan" />
              Skill Assessment
            </h2>
            <div className="glass-card p-5 space-y-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-medium w-28 text-right">{skill.name}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: skill.level >= 80 ? '#10b981' : skill.level >= 60 ? '#00f0ff' : skill.level >= 40 ? '#f97316' : '#ef4444',
                      }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs font-mono w-10" style={{
                    color: skill.level >= 80 ? '#10b981' : skill.level >= 60 ? '#00f0ff' : '#f97316'
                  }}>{skill.level}%</span>
                </div>
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
                        <span className="text-[10px] font-bold font-mono">{topic.readiness}%</span>
                      </ProgressRing>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{topic.topic}</p>
                        <p className="text-xs text-aura-muted">{topic.questions} practice questions available</p>
                      </div>
                      <button onClick={() => handlePracticeStart(topic)} className="btn-ghost text-xs !py-1.5 !px-3 hover:bg-white/5">
                        Practice
                      </button>
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

        {/* Interactive Practice Session Modal */}
        <AnimatePresence>
          {activePracticeTopic && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setActivePracticeTopic(null)} 
                  className="absolute top-6 right-6 p-2 rounded-lg hover:bg-white/5 text-aura-muted hover:text-aura-text transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-aura-purple">
                  <Award className="w-5 h-5" />
                  Mock Interview Session
                </h3>
                <p className="text-xs text-aura-muted mb-6">Topic: {activePracticeTopic.topic}</p>

                <div className="glass rounded-xl p-5 border border-white/5 mb-6 text-left">
                  <p className="text-xs uppercase tracking-wider text-aura-cyan font-semibold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> AI Interviewer Prompt
                  </p>
                  <p className="text-sm text-aura-text leading-relaxed font-mono">{activePracticeTopic.prompt}</p>
                </div>

                <form onSubmit={handlePracticeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-aura-muted">Your Answer</label>
                    <textarea
                      placeholder="Type your technical response here..."
                      rows={5}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={submittingAnswer || feedback !== null}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-aura-text focus:border-aura-purple/50 outline-none transition-colors resize-none disabled:opacity-70 disabled:cursor-not-allowed font-sans"
                      required
                    />
                  </div>

                  {submittingAnswer && (
                    <div className="flex items-center justify-center gap-2 py-4">
                      <Loader2 className="w-5 h-5 text-aura-purple animate-spin" />
                      <p className="text-sm text-aura-muted">AI Evaluator analyzing your response...</p>
                    </div>
                  )}

                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-xl p-5 border border-aura-purple/20 bg-aura-purple/[0.02]"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <p className="text-xs uppercase tracking-wider text-aura-purple font-semibold">AI Evaluation Report</p>
                        <p className="text-sm font-bold text-aura-green font-mono">Score: {scoreEarned}%</p>
                      </div>
                      <p className="text-sm text-aura-text leading-relaxed font-sans">{feedback}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setActivePracticeTopic(null)} 
                      className="btn-secondary text-xs !py-2.5 !px-5"
                    >
                      {feedback ? 'Close Session' : 'Cancel'}
                    </button>
                    {!feedback && (
                      <button 
                        type="submit" 
                        disabled={submittingAnswer}
                        className="btn-primary text-xs !py-2.5 !px-5 flex items-center gap-2 disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Evaluate Answer
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
