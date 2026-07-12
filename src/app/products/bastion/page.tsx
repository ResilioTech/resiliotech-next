import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Bastion — AI-Powered Zero-Trust Infrastructure Architect',
  description: 'Design secure, least-privilege cloud architectures through conversation. Export production-ready Terraform with perfect IAM, network isolation, and compliance built in.',
};

export default function BastionLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 text-center overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 mb-7">
            Now building · MVP launching Q3 2026
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-text-primary tracking-tight mb-6 leading-tight">
            AI that designs<br />
            <span className="gradient-text">Zero-Trust Cloud Architecture</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mb-9 leading-relaxed">
            Describe your infrastructure in plain English. Get a visual architecture diagram,
            security explanations, and production-ready Terraform with <strong className="text-text-primary">least-privilege IAM</strong> — in minutes, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#waitlist" className="px-7 py-3.5 bg-primary hover:bg-primary-hover text-background font-semibold rounded-lg shadow-[0_0_24px_rgba(0,212,255,0.25)] hover:shadow-[0_0_32px_rgba(0,212,255,0.35)] hover:-translate-y-0.5 transition-all glow-effect text-center">
              Join the Waitlist
            </a>
            <a href="#how-it-works" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-text-primary font-semibold rounded-lg border border-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all text-center">
              See How It Works
            </a>
          </div>

          {/* Demo Window */}
          <div className="max-w-4xl mx-auto bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141420] border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="text-xs text-text-muted ml-2">bastion — architecture session</span>
            </div>
            <div className="p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-[320px]">
                <div className="p-4 flex flex-col gap-2.5 md:border-r border-white/5">
                  <div className="self-end bg-primary text-background p-2.5 rounded-xl rounded-br-sm text-sm max-w-[92%] leading-relaxed">
                    I need a batch ETL pipeline from Postgres to a data warehouse, SOC2 compliant.
                  </div>
                  <div className="self-start bg-surface-elevated text-text-secondary border border-white/5 p-2.5 rounded-xl rounded-bl-sm text-sm max-w-[92%] leading-relaxed">
                    I&apos;ll design that for you. A few questions first:
                    <br /><br />
                    📊 Expected data volume per day?<br />
                    🔐 Do you need Customer-Managed Encryption Keys (CMEK)?<br />
                    🌐 Network isolation requirements?
                  </div>
                  <div className="self-end bg-primary text-background p-2.5 rounded-xl rounded-br-sm text-sm max-w-[92%] leading-relaxed">
                    ~50GB/day, yes to CMEK, fully private networking.
                  </div>
                  <div className="self-start bg-surface-elevated text-text-secondary border border-white/5 p-2.5 rounded-xl rounded-bl-sm text-sm max-w-[92%] leading-relaxed">
                    ✅ Architecture ready. I&apos;ve selected:<br /><br />
                    <strong className="text-text-primary">RDS Postgres → AWS Glue → Redshift</strong><br /><br />
                    Selected Glue over EMR to minimize cluster management. Configured with VPC endpoints to ensure data never traverses the public internet.
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap p-5 relative min-h-[200px]">
                  <div className="p-3.5 rounded-xl text-sm font-semibold text-center border bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                    RDS<br/><small className="block font-normal text-xs text-text-muted mt-0.5">PostgreSQL</small>
                  </div>
                  <div className="text-text-muted text-xl md:rotate-0 rotate-90">→</div>
                  <div className="p-3.5 rounded-xl text-sm font-semibold text-center border bg-primary/10 border-primary/25 text-primary">
                    AWS Glue<br/><small className="block font-normal text-xs text-text-muted mt-0.5">ETL Job</small>
                  </div>
                  <div className="text-text-muted text-xl md:rotate-0 rotate-90">→</div>
                  <div className="p-3.5 rounded-xl text-sm font-semibold text-center border bg-purple-500/10 border-purple-500/25 text-purple-400">
                    Redshift<br/><small className="block font-normal text-xs text-text-muted mt-0.5">Warehouse</small>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-semibold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    IAM Score: 98/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-3">The Problem with AI-Generated Terraform</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">Every AI can generate Terraform. Almost none of it is secure enough to deploy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <div className="p-7 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-red-500/25 transition-colors">
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Wildcard IAM Policies</h3>
              <p className="text-sm text-text-muted leading-relaxed">AI tools generate <code className="bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-mono text-xs">&quot;Resource&quot;: &quot;*&quot;</code> because it&apos;s easier. One compromised service = full account access.</p>
            </div>
            <div className="p-7 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-red-500/25 transition-colors">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">Public by Default</h3>
              <p className="text-sm text-text-muted leading-relaxed">Default configurations expose databases and services to the public internet. SOC2 auditors will flag this immediately.</p>
            </div>
            <div className="p-7 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-red-500/25 transition-colors">
              <div className="text-3xl mb-3">🤷</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">No Explanations</h3>
              <p className="text-sm text-text-muted leading-relaxed">You get code with zero context. Why was this service chosen? What are the trade-offs? Your CISO will ask. You won&apos;t have answers.</p>
            </div>
          </div>
          <div className="text-center p-8 bg-primary/5 border border-primary/15 rounded-2xl">
            <h3 className="text-xl font-extrabold text-text-primary mb-2">Bastion fixes this.</h3>
            <p className="text-base text-text-muted max-w-2xl mx-auto">Every architecture is designed with <strong className="text-primary font-semibold">least-privilege IAM</strong>, <strong className="text-primary font-semibold">private networking</strong>, and <strong className="text-primary font-semibold">plain-English explanations</strong> of every decision.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-3">How It Works</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">From requirements to production-ready Terraform in 4 steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', icon: '💬', title: 'Describe', desc: 'Tell Bastion what you need in plain English. "I need a batch ETL pipeline from Postgres to a warehouse, SOC2 compliant."' },
              { num: '02', icon: '🏗️', title: 'Architect', desc: 'The AI asks constraint questions — scale, compliance, encryption, network isolation — then designs a visual architecture.' },
              { num: '03', icon: '🔍', title: 'Explain', desc: 'Click any component to see why it was chosen, what alternatives were rejected, and what IAM permissions it requires.' },
              { num: '04', icon: '📦', title: 'Export', desc: 'Download production-ready Terraform with strictly scoped IAM roles, VPC isolation, encryption, and a security compliance report.' },
            ].map((step, i) => (
              <div key={i} className="p-7 bg-white/[0.02] border border-white/5 rounded-2xl relative hover:border-primary/25 hover:-translate-y-1 transition-all">
                <div className="absolute top-4 right-5 text-5xl font-extrabold text-white/[0.03] leading-none">{step.num}</div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight mb-3">Built by an SRE. For Platform Teams.</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">Every line of generated Terraform passes our security compiler.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'One IAM role per component', desc: 'No shared roles. No privilege escalation paths.' },
              { title: 'No wildcard resource ARNs', desc: 'Every IAM policy references specific resource ARNs.' },
              { title: 'Private networking by default', desc: 'VPC endpoints, private subnets, no public IPs.' },
              { title: 'Encryption everywhere', desc: 'At rest, in transit, with CMEK when compliance requires it.' },
              { title: 'SOC2 & HIPAA ready', desc: 'Compliance controls enforced automatically.' },
              { title: 'Checkov validated', desc: 'Every output passes open-source security scanning.' },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3.5 p-5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-emerald-500/25 transition-colors">
                <div className="shrink-0 w-7 h-7 flex items-center justify-center bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary mb-1">{feature.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 border-t border-white/5 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center p-12 bg-primary/5 border border-primary/10 rounded-3xl">
            <h2 className="text-3xl font-extrabold text-text-primary mb-3">Get Early Access</h2>
            <p className="text-sm text-text-muted mb-7 leading-relaxed">Bastion is currently in development. Join the waitlist to be among the first to design secure cloud architectures with AI.</p>
            
            <form name="bastion-waitlist" method="POST" data-netlify="true" className="flex flex-col sm:flex-row gap-2.5 mb-3.5">
              <input type="hidden" name="form-name" value="bastion-waitlist" />
              <input 
                type="email" 
                name="email" 
                placeholder="you@company.com" 
                required 
                className="flex-1 px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-text-muted"
              />
              <button 
                type="submit" 
                className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-background font-semibold rounded-xl text-sm transition-colors whitespace-nowrap glow-effect"
              >
                Join Waitlist
              </button>
            </form>
            
            <p className="text-xs text-text-muted opacity-80">No spam. We&apos;ll email you when Bastion is ready for beta testers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
