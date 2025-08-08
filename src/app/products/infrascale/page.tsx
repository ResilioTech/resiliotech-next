import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/products/ProductPageLayout';
import { microSaasProducts } from '@/data/product-features';

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