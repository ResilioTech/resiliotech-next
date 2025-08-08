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

const cloudWatchProProduct = microSaasProducts.find(p => p.name === 'CloudWatch Pro')!;

export const metadata: Metadata = {
  title: 'CloudWatch Pro - AI-Powered Infrastructure Monitoring | Resiliotech',
  description: 'Intelligent monitoring that predicts and prevents downtime before it happens. Get insights into your infrastructure health with automated alerts and resolution suggestions.',
  keywords: ['monitoring', 'infrastructure', 'ai', 'predictive analytics', 'devops', 'observability', 'alerts'],
  openGraph: {
    title: 'CloudWatch Pro - AI-Powered Infrastructure Monitoring',
    description: 'Intelligent monitoring that predicts and prevents downtime before it happens with AI-powered insights.',
    images: ['/og-images/cloudwatch-pro.png'],
  },
  twitter: {
    title: 'CloudWatch Pro - AI-Powered Infrastructure Monitoring',
    description: 'Intelligent monitoring that predicts and prevents downtime before it happens with AI-powered insights.',
  },
};

export default function CloudWatchProPage() {
  return <ProductPageLayout product={cloudWatchProProduct} />;
}