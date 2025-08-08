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

const deployFlowProduct = microSaasProducts.find(p => p.name === 'DeployFlow')!;

export const metadata: Metadata = {
  title: 'DeployFlow - Simplified CI/CD for Startups | Resiliotech',
  description: 'Zero-config CI/CD pipelines that automatically detect your stack and deploy to production in minutes. Perfect for teams who want to focus on building, not managing infrastructure.',
  keywords: ['ci/cd', 'deployment', 'devops', 'automation', 'startup tools', 'continuous integration', 'continuous deployment'],
  openGraph: {
    title: 'DeployFlow - Simplified CI/CD for Startups',
    description: 'Zero-config CI/CD pipelines that automatically detect your stack and deploy to production in minutes.',
    images: ['/og-images/deployflow.png'],
  },
  twitter: {
    title: 'DeployFlow - Simplified CI/CD for Startups',
    description: 'Zero-config CI/CD pipelines that automatically detect your stack and deploy to production in minutes.',
  },
};

export default function DeployFlowPage() {
  return <ProductPageLayout product={deployFlowProduct} />;
}