'use client';

import { motion } from 'framer-motion';
import { Globe, Leaf, GraduationCap, Accessibility, Heart, Users, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, GlowCard, ProgressRing } from '@/components/ui/Animations';

const pillars = [
  {
    title: 'Agriculture',
    icon: Leaf,
    color: '#10b981',
    description: 'Empowering farmers with AI-driven crop insights, weather predictions, and market price intelligence.',
    stats: { helped: '12,400+', queries: '48K', regions: '15' },
    features: ['Crop disease detection via image AI', 'Local language voice support', 'Weather-based planting schedules', 'Market price alerts'],
    stories: [
      { name: 'Rajesh K.', location: 'Karnataka, India', quote: 'AURA helped me identify wheat rust early, saving 40% of my crop.', impact: '₹2.4L saved' },
    ],
  },
  {
    title: 'Education',
    icon: GraduationCap,
    color: '#3b82f6',
    description: 'Personalized learning paths, tutoring, and career guidance for underserved student communities.',
    stats: { helped: '8,200+', queries: '32K', regions: '22' },
    features: ['Adaptive learning roadmaps', 'Multi-language content delivery', 'Scholarship matching', 'Peer mentoring connections'],
    stories: [
      { name: 'Priya M.', location: 'Tamil Nadu, India', quote: 'AURA created a study plan that helped me crack my engineering entrance exam.', impact: 'Top 5% score' },
    ],
  },
  {
    title: 'Accessibility',
    icon: Accessibility,
    color: '#a855f7',
    description: 'Voice-first AI assistance, real-time translation, and tools designed for people with disabilities.',
    stats: { helped: '5,600+', queries: '21K', regions: '18' },
    features: ['Voice-controlled interface', 'Screen reader optimization', 'Real-time language translation', 'Simplified UI mode'],
    stories: [
      { name: 'Ahmed S.', location: 'Maharashtra, India', quote: 'The voice assistant lets me manage my tasks independently.', impact: 'Full independence' },
    ],
  },
];

const impactMetrics = [
  { label: 'Lives Impacted', value: '26,200+', icon: Heart, color: '#ec4899' },
  { label: 'Queries Processed', value: '101K+', icon: TrendingUp, color: '#00f0ff' },
  { label: 'Regions Served', value: '55', icon: MapPin, color: '#f97316' },
  { label: 'Active Volunteers', value: '340', icon: Users, color: '#10b981' },
];

export default function ImpactPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
            <Globe className="w-8 h-8 text-aura-blue" />
            Social Impact Portal
          </h1>
          <p className="text-lg text-aura-muted">
            <span className="text-aura-green font-semibold">Agents for Good</span> — Using AI to create meaningful change
            in agriculture, education, and accessibility.
          </p>
        </div>

        {/* Impact Metrics */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactMetrics.map((m) => (
            <StaggerItem key={m.label}>
              <GlowCard color={m.color === '#ec4899' ? 'pink' : m.color === '#00f0ff' ? 'cyan' : m.color === '#f97316' ? 'orange' : 'green'} className="text-center">
                <m.icon className="w-6 h-6 mx-auto mb-2" style={{ color: m.color }} />
                <p className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</p>
                <p className="text-xs text-aura-muted mt-1">{m.label}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Pillars */}
        <div className="space-y-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 lg:p-8"
            >
              <div className="grid lg:grid-cols-5 gap-6">
                {/* Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${pillar.color}15`, border: `1px solid ${pillar.color}30` }}>
                      <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{pillar.title}</h2>
                      <p className="text-xs text-aura-muted">Impact Initiative</p>
                    </div>
                  </div>

                  <p className="text-sm text-aura-muted leading-relaxed mb-4">{pillar.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {pillar.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: pillar.color }} />
                        <span className="text-aura-muted">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Story */}
                  {pillar.stories.map((story) => (
                    <div key={story.name} className="glass rounded-xl p-4">
                      <p className="text-sm italic text-aura-text/80 mb-2">&ldquo;{story.quote}&rdquo;</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold">{story.name}</p>
                          <p className="text-[10px] text-aura-muted">{story.location}</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ background: `${pillar.color}15`, color: pillar.color }}>
                          {story.impact}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="lg:col-span-2 flex flex-col justify-center gap-4">
                  {[
                    { label: 'People Helped', value: pillar.stats.helped },
                    { label: 'Queries Processed', value: pillar.stats.queries },
                    { label: 'Regions Active', value: pillar.stats.regions },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold" style={{ color: pillar.color }}>{s.value}</p>
                      <p className="text-[10px] text-aura-muted uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Join the Movement</h2>
          <p className="text-sm text-aura-muted max-w-lg mx-auto mb-6">
            Help us expand AURA&apos;s social impact. Contribute as a developer, mentor, or community leader.
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-primary flex items-center gap-2">
              <Heart className="w-4 h-4" /> Volunteer
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Users className="w-4 h-4" /> Partner With Us
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
