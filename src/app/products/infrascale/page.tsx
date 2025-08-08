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

const infraScaleProduct = microSaasProducts.find(p => p.name === 'InfraScale')!;

export const metadata: Metadata = {
  title: 'InfraScale - Smart Infrastructure Scaling | Resiliotech',
  description: 'Automatically scale your infrastructure based on real usage patterns and predictions. Never overpay for unused resources or experience performance bottlenecks.',
  keywords: ['infrastructure scaling', 'auto scaling', 'cloud optimization', 'multi-cloud', 'cost optimization', 'devops tools'],
  openGraph: {
    title: 'InfraScale - Smart Infrastructure Scaling',
    description: 'Automatically scale your infrastructure based on real usage patterns and predictions.',
    images: ['/og-images/infrascale.png'],
  },
  twitter: {
    title: 'InfraScale - Smart Infrastructure Scaling',
    description: 'Automatically scale your infrastructure based on real usage patterns and predictions.',
  },
};

export default function InfraScalePage() {
  return <ProductPageLayout product={infraScaleProduct} />;
}