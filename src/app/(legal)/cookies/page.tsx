import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Cookie Policy | How We Use Cookies',
  description: 'Learn about the cookies Resilio Tech uses and how to manage your preferences.',
}

export default function CookiesPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Cookie Policy</h1>
        <p className="text-text-muted mb-12">Last updated: {lastUpdated}</p>

        <div className="prose prose-invert prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-li:text-text-secondary max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites remember
              your preferences and analyze how you use the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Cookies We Use</h2>

            <h3 className="text-xl font-semibold text-text-primary mb-3">1. Strictly Necessary Cookies</h3>
            <p>These cookies are essential for the website to function. They cannot be disabled.</p>
            <div className="bg-surface border border-border rounded-lg p-4 mt-3">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Session cookies:</strong> Keep you logged in (if applicable)</li>
                <li><strong>Security cookies:</strong> Protect against CSRF attacks</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">2. Analytics Cookies (Consent Required)</h3>
            <p>
              We use <strong>Google Analytics 4</strong> and <strong>Microsoft Clarity</strong> to understand how visitors use our site.
              These tools are only loaded after you accept our cookie consent banner. This helps us improve the user experience.
            </p>
            <div className="bg-surface border border-border rounded-lg p-4 mt-3">
              <p className="font-semibold mb-2">Google Analytics 4:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>_ga:</strong> Distinguishes users (expires in 2 years)</li>
                <li><strong>_ga_*:</strong> Maintains session state (expires in 2 years)</li>
                <li><strong>_gid:</strong> Distinguishes users (expires in 24 hours)</li>
              </ul>
              <p className="mt-3 text-sm">
                <strong>Data collected:</strong> Page views, session duration, bounce rate, device type, browser, location (city-level)
              </p>
              <p className="mt-2 text-sm">
                <strong>Third-party:</strong> Google LLC (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>)
              </p>
            </div>

            <div className="bg-surface border border-border rounded-lg p-4 mt-3">
              <p className="font-semibold mb-2">Microsoft Clarity:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>_clck:</strong> Persists Clarity user ID (expires in 1 year)</li>
                <li><strong>_clsk:</strong> Connects multiple page views in a session (expires in 1 day)</li>
                <li><strong>CLID:</strong> Identifies first-time visitors</li>
              </ul>
              <p className="mt-3 text-sm">
                <strong>Data collected:</strong> Session recordings, heatmaps, scroll depth, clicks, device information
              </p>
              <p className="mt-2 text-sm">
                <strong>Third-party:</strong> Microsoft Corporation (<a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>)
              </p>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">3. Functional Cookies (Future)</h3>
            <p>
              When we add features like saved preferences or theme selection, we may use functional cookies.
              You will be notified before these are implemented.
            </p>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">4. Marketing Cookies (Not Currently Used)</h3>
            <p>
              We do not currently use marketing or advertising cookies. If this changes, we will update this policy
              and request your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Managing Your Cookie Preferences</h2>

            <h3 className="text-xl font-semibold text-text-primary mb-3">Browser Controls</h3>
            <p>You can control cookies through your browser settings:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">Opt-Out of Analytics</h3>
            <p>To opt out of analytics tracking:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Easiest:</strong> Decline our consent banner when it appears (or clear localStorage key "rtx-consent" to reset your choice)</li>
              <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li>Enable "Do Not Track" in your browser settings</li>
              <li>Use privacy-focused browsers or extensions (e.g., Brave, uBlock Origin)</li>
            </ul>

            <h3 className="text-xl font-semibold text-text-primary mb-3 mt-6">Current Implementation</h3>
            <p>
              We use strictly necessary cookies for site functionality. Analytics tools (Google Analytics 4 and Microsoft Clarity) are only loaded after you accept our consent banner.
              You can decline the banner or opt out anytime using the methods above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Impact of Disabling Cookies</h2>
            <p>If you disable cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Analytics cookies:</strong> We won't be able to analyze site usage, but the site will function normally</li>
              <li><strong>Strictly necessary cookies:</strong> Some features may not work (e.g., login, security)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Third-Party Cookies</h2>
            <p>
              Our site may contain links to third-party sites (GitHub, LinkedIn, Twitter). These sites have their own
              cookie policies, which we do not control. Review their privacy policies before providing information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy as we add new features or comply with regulations.
              Changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Contact Us</h2>
            <p>For questions about cookies, contact us at:</p>
            <div className="bg-surface border border-border rounded-lg p-6 mt-4">
              <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${siteConfig.email.contact}`} className="text-primary hover:underline">{siteConfig.email.contact}</a></p>
              <p><strong>See also:</strong> <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
