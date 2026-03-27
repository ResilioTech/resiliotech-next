import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacy Policy | How We Protect Your Data',
  description: 'Learn how Resilio Tech collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

        <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-li:text-text-secondary max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
            <p>When you use {siteConfig.name} services or visit our website, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, and company details you provide through forms</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, IP address (via Google Analytics 4)</li>
              <li><strong>Cookies:</strong> Small text files for site functionality and analytics (see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
              <li><strong>Technical Information:</strong> Cloud provider, team size, and infrastructure details you share during consultations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
            <p>We use collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide DevOps services</li>
              <li>Process service inquiries and consultation requests</li>
              <li>Improve our website, products, and services</li>
              <li>Send product updates and educational content (opt-in only)</li>
              <li>Analyze usage patterns to optimize user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. Data Sharing and Disclosure</h2>
            <p><strong>We do not sell your personal data.</strong></p>
            <p>We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Hosting (Vercel/AWS), analytics (Google Analytics), email (if applicable), form processing (Formspree) — all under strict data processing agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale (you will be notified)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Your Rights</h2>
            <p>Depending on your location, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
            </ul>
            <p>To exercise these rights, email <a href={`mailto:${siteConfig.email.hello}`} className="text-primary hover:underline">{siteConfig.email.hello}</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Data Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure cloud hosting with access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
            </ul>
            <p>However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Data Retention</h2>
            <p>We retain your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>As long as you have an active relationship with us</li>
              <li>As required for legal, tax, or regulatory purposes</li>
              <li>Until you request deletion (if no legal obligation to retain)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. International Data Transfers</h2>
            <p>
              We are based in <strong>{siteConfig.hq}</strong>. If you access our services from outside India,
              your data may be transferred to and processed in India or other countries where our service providers operate.
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect personal data from children.
              If you believe we have collected data from a child, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last updated" date.
              Significant changes will be communicated via email or website notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contact Us</h2>
            <p>For privacy questions or concerns, contact us at:</p>
            <div className="bg-surface border border-border rounded-lg p-6 mt-4">
              <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${siteConfig.email.hello}`} className="text-primary hover:underline">{siteConfig.email.hello}</a></p>
              <p className="mb-2"><strong>Company:</strong> {siteConfig.name}</p>
              <p><strong>Location:</strong> {siteConfig.hq}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
