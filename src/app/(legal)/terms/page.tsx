import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Terms of Service | Legal Agreement',
  description: 'Terms and conditions for using Resiliotech services and website.',
}

export default function TermsPage() {
  const lastUpdated = 'January 6, 2025'

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Terms of Service</h1>
        <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

        <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-li:text-text-secondary max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using {siteConfig.name}'s website and services, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">2. Services Provided</h2>
            <p>{siteConfig.name} provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Founding Pilot Program:</strong> Fixed-scope DevOps implementation services</li>
              <li><strong>DevOps Consulting:</strong> Infrastructure, CI/CD, and observability consulting</li>
              <li><strong>Software Products:</strong> DevOps tools and platforms (currently in Private Alpha)</li>
              <li><strong>Educational Content:</strong> Blog posts, guides, and documentation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Use services only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access to systems</li>
              <li>Not use services to transmit malicious code or spam</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">4. Founding Pilot Terms</h2>
            <h3 className="text-xl font-semibold text-text-primary mb-3">4.1 Scope</h3>
            <p>
              The Founding Pilot is a fixed-scope engagement with deliverables defined on the{' '}
              <Link href="/founding-pilot" className="text-primary hover:underline">Founding Pilot page</Link>.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-4">4.2 Success Criteria</h3>
            <p>Payment is contingent on meeting documented success criteria:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Successful production deployment via CI/CD pipeline</li>
              <li>Passing health checks and monitoring setup</li>
              <li>Team handoff and knowledge transfer completed</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-4">4.3 Risk-Free Guarantee</h3>
            <p>
              If we do not meet all success criteria within the agreed timeline, you pay ₹0.
              This guarantee requires good-faith cooperation and timely provision of access/information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">5. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pilot program: Payment upon meeting success criteria</li>
              <li>Ongoing services: Invoiced monthly (if applicable)</li>
              <li>Currency: {siteConfig.founding.currency} (Indian Rupees)</li>
              <li>Refunds: As specified in individual service agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">6. Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-text-primary mb-3">6.1 Client Work Product</h3>
            <p>
              For Founding Pilot and consulting engagements, you own all infrastructure code, configurations,
              and deliverables created specifically for your project.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-4">6.2 {siteConfig.name} IP</h3>
            <p>
              We retain ownership of our reusable frameworks, tools, methodologies, and pre-existing IP.
              You receive a license to use these as part of the engagement.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-4">6.3 Website Content</h3>
            <p>
              All content on this website (text, logos, designs) is owned by {siteConfig.name} and protected by copyright.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">7. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential information disclosed during engagements private.
              We will sign your NDA or use our mutual NDA template upon request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {siteConfig.name} shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages exceeding the fees paid for the specific service</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> This limitation does not apply to liability for gross negligence, willful misconduct,
              or violations of applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">9. Disclaimer of Warranties</h2>
            <p>
              Services are provided "as is" without warranties of any kind, express or implied.
              We make no guarantees regarding specific outcomes, uptime, or error-free operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">10. Termination</h2>
            <p>Either party may terminate services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For convenience with 30 days' written notice (for ongoing services)</li>
              <li>Immediately for breach of terms</li>
              <li>Upon mutual agreement</li>
            </ul>
            <p>Termination does not affect payment obligations for work completed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction
              of courts in [Your City, India].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">12. Changes to Terms</h2>
            <p>
              We may update these Terms periodically. Continued use of services after changes constitutes acceptance.
              Significant changes will be communicated via email or website notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">13. Contact</h2>
            <p>For questions about these Terms, contact us at:</p>
            <div className="bg-surface border border-border rounded-lg p-6 mt-4">
              <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${siteConfig.email.hello}`} className="text-primary hover:underline">{siteConfig.email.hello}</a></p>
              <p className="mb-2"><strong>Company:</strong> {siteConfig.name}</p>
              <p><strong>Location:</strong> {siteConfig.hq}</p>
            </div>
          </section>

          <section className="mt-12 p-6 bg-surface-elevated border border-border rounded-lg">
            <p className="text-sm text-text-muted italic">
              <strong>Disclaimer:</strong> These Terms are provided as-is and do not constitute legal advice.
              Consult a lawyer for your specific situation.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
