import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/products/ProductPageLayout';
import { microSaasProducts } from '@/data/product-features';

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