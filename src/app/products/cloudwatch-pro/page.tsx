import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/products/ProductPageLayout';
import { microSaasProducts } from '@/data/product-features';

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