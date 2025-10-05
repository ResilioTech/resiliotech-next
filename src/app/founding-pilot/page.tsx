import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import {
  CheckCircle2,
  Clock,
  FileCode,
  GitBranch,
  LineChart,
  Shield,
  Zap,
  ArrowRight,
  Users,
  Cloud
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Founding Pilot Program | Fixed-Fee DevOps Implementation',
  description: `Join ${siteConfig.founding.slots} teams per month. Fixed-scope DevOps implementation: CI/CD, IaC, observability, cost guardrails. Risk-free: pay ₹0 if we don't deliver.`,
  openGraph: {
    title: 'Founding Pilot Program - Resiliotech',
    description: 'Fixed-fee DevOps implementation for seed to Series A startups',
    url: \`\${siteConfig.url}/founding-pilot\`,
  }
}

export default function FoundingPilotPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Founding Pilot — DevOps Acceleration",
            description: "Fixed-scope DevOps implementation: CI/CD baseline, IaC, observability, and cost guardrails for startups.",
            provider: {
              "@type": "Organization",
              name: siteConfig.name
            },
            areaServed: "Global",
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: \`\${siteConfig.url}/founding-pilot\`
            },
            offers: {
              "@type": "Offer",
              priceCurrency: siteConfig.founding.currency,
              availability: "https://schema.org/InStock"
            },
            serviceType: "DevOps Implementation"
          })
        }}
      />

      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-surface/30 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
            <Users className="w-4 h-4" />
            {siteConfig.founding.slots} slots/month • Fixed Fee
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Founding Pilot Program
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            A fixed-scope DevOps implementation to take your startup from manual deploys
            to production-grade infrastructure in 30 days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Apply for a Slot
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary font-semibold rounded-lg transition-all duration-300"
            >
              <Clock className="w-5 h-5" />
              Book Free Audit
            </Link>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-text-muted">
            <Shield className="w-4 h-4 inline mr-2 text-green-500" />
            Risk-free: Pay ₹0 if we don't hit success criteria
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            What's Included
          </h2>
          <p className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Everything you need to ship fast and sleep well
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                CI/CD Baseline
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>GitHub Actions pipelines (build, test, deploy)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>GitOps deploys with FluxCD + Kustomize</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Environment promotions (dev → staging → prod)</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileCode className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Infrastructure as Code
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Terraform for 1 environment (VPC, cluster, RBAC)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Secrets management flow (AWS Secrets Manager / Vault)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>State backend + remote execution</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Observability Stack
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Logging (Loki) + metrics (Mimir/Prometheus)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Grafana dashboards + basic SLOs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Alerting rules (PagerDuty/OpsGenie integration)</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Cost Guardrails
              </h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>AWS/GCP/Azure budget alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Resource policies (OPA/Sentinel) to prevent expensive mistakes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Cost showback dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            What You Get
          </h2>

          <div className="space-y-4">
            {[
              "Terraform repository (VPC, K8s/ECS, networking, IAM)",
              "FluxCD + Kustomize manifests (base + overlays)",
              "GitHub Actions workflows (CI/CD pipelines)",
              "Grafana dashboards + Loki/Mimir stack",
              "Runbooks (incident response, rollback procedures)",
              "Handover document + 2-week hypercare support"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg">
                <FileCode className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Criteria */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            Success Criteria
          </h2>
          <p className="text-lg text-text-secondary text-center mb-12">
            Clear, measurable outcomes—not hand-wavy consulting
          </p>

          <div className="bg-background border-2 border-primary/20 rounded-xl p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">Production Deploy via Pipeline</h3>
                  <p className="text-text-secondary">
                    One service successfully deployed to prod via GitHub Actions + FluxCD
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">Health Checks Passing</h3>
                  <p className="text-text-secondary">
                    Service returns 200 OK, logs visible in Grafana, metrics flowing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1">Team Handoff Complete</h3>
                  <p className="text-text-secondary">
                    Your team can trigger deploys, read logs, and roll back independently
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5" />
                If we don't hit all 3 criteria, you pay ₹0
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            Apply for a Slot
          </h2>
          <p className="text-lg text-text-secondary text-center mb-12">
            Short application • We'll reply within 24 hours
          </p>

          <form
            action={siteConfig.forms.pilot}
            method="POST"
            className="space-y-6 bg-surface border border-border rounded-xl p-8"
          >
            <input type="hidden" name="source_page" value="founding-pilot" />

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Work Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@startup.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Team Size *
              </label>
              <div className="space-y-2">
                {["1-5", "6-15", "16-50", "50+"].map((size) => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="team_size"
                      value={size}
                      required
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-text-secondary">{size} people</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Primary Cloud *
              </label>
              <div className="space-y-2">
                {siteConfig.primaryClouds.map((cloud) => (
                  <label key={cloud} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cloud"
                      value={cloud}
                      required
                      className="text-primary focus:ring-primary"
                    />
                    <Cloud className="w-4 h-4 text-text-muted" />
                    <span className="text-text-secondary">{cloud}</span>
                  </label>
                ))}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cloud"
                    value="other"
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-text-secondary">Other / Multi-cloud</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-text-primary mb-2">
                Timeline *
              </label>
              <select
                id="urgency"
                name="urgency"
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP (within 2 weeks)</option>
                <option value="month">Within 1 month</option>
                <option value="quarter">Within 3 months</option>
                <option value="exploring">Just exploring</option>
              </select>
            </div>

            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-text-primary mb-2">
                What's your main goal? *
              </label>
              <textarea
                id="goal"
                name="goal"
                required
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="E.g., Ship MVP faster, reduce AWS costs, improve reliability..."
              />
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              Submit Application
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-text-muted text-center">
              By submitting, you agree to our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Why only 3 slots per month?",
                a: "Quality over quantity. Each pilot gets hands-on attention from our founding team. As we grow, we'll increase capacity."
              },
              {
                q: "What if my stack is different (e.g., GCP + Cloud Run)?",
                a: "We adapt. The pilot covers the same functional areas (CI/CD, IaC, observability, cost) but uses the tools native to your cloud."
              },
              {
                q: "Can I pay monthly instead of fixed fee?",
                a: "The founding pilot is fixed-fee only. Once you're live, we offer monthly retainers for ongoing support."
              },
              {
                q: "Do you sign NDAs?",
                a: "Yes. We'll sign your NDA or use our mutual NDA template."
              },
              {
                q: "What happens after the 30 days?",
                a: "You own all code and infra. We offer 2 weeks of hypercare (Slack support, quick fixes). After that, optional monthly retainer or you're on your own."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-bold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-text-secondary">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to ship faster?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join the founding cohort and get production-grade DevOps in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface border border-border hover:border-primary text-text-primary font-semibold rounded-lg transition-all duration-300"
            >
              <Clock className="w-5 h-5" />
              Book Free Audit First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
