import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/products/ProductPageLayout';
import { microSaasProducts } from '@/data/product-features';

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