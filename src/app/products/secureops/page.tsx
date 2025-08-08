import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { microSaasProducts } from '@/data/product-features';

const ProductPageLayout = dynamic(() => import('@/components/products/ProductPageLayout').then(mod => ({ default: mod.ProductPageLayout })), {
  loading: () => (
    <div className="min-h-screen bg-background">
      <div className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-surface/30">
        <div className="max-w-7xl mx-auto px-6 animate-pulse">
          <div className="h-8 bg-surface rounded-full w-32 mb-6"></div>
          <div className="h-16 bg-surface rounded-xl w-3/4 mb-4"></div>
          <div className="h-6 bg-surface rounded-xl w-1/2 mb-6"></div>
          <div className="h-4 bg-surface rounded-xl w-full mb-2"></div>
          <div className="h-4 bg-surface rounded-xl w-2/3"></div>
        </div>
      </div>
    </div>
  )
});

const secureOpsProduct = microSaasProducts.find(p => p.name === 'SecureOps')!;

export const metadata: Metadata = {
  title: 'SecureOps - DevSecOps Made Simple | Resiliotech',
  description: 'Integrate security scanning and compliance checks directly into your CI/CD pipeline. Catch vulnerabilities early and maintain compliance automatically.',
  keywords: ['devsecops', 'security', 'compliance', 'vulnerability scanning', 'devops security', 'ci/cd security', 'secret management'],
  openGraph: {
    title: 'SecureOps - DevSecOps Made Simple',
    description: 'Integrate security scanning and compliance checks directly into your CI/CD pipeline.',
    images: ['/og-images/secureops.png'],
  },
  twitter: {
    title: 'SecureOps - DevSecOps Made Simple',
    description: 'Integrate security scanning and compliance checks directly into your CI/CD pipeline.',
  },
};

export default function SecureOpsPage() {
  return <ProductPageLayout product={secureOpsProduct} />;
}