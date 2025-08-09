interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs?: string[];
  address?: {
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
  };
  foundingDate?: string;
  areaServed?: string;
}

interface ServiceData {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  serviceType: string;
  url?: string;
}

interface WebsiteData {
  url: string;
  name: string;
  description: string;
  publisher: string;
  inLanguage: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductData {
  name: string;
  description: string;
  url?: string;
  image?: string;
  releaseStatus?: 'launched' | 'beta' | 'waitlist' | 'development';
  offers?: {
    price: string;
    priceCurrency: string;
    priceValidUntil?: string;
    availability: string;
  };
  brand?: string;
}

interface BlogPostData {
  headline: string;
  description: string;
  image?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  datePublished: string;
  dateModified?: string;
  url: string;
  wordCount?: number;
  keywords?: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  organization?: OrganizationData;
  services?: ServiceData[];
  website?: WebsiteData;
  breadcrumbs?: BreadcrumbItem[];
  product?: ProductData;
  blogPost?: BlogPostData;
  faq?: FAQItem[];
}

export function StructuredData({ 
  organization, 
  services, 
  website, 
  breadcrumbs,
  product,
  blogPost,
  faq
}: StructuredDataProps) {
  const generateOrganizationSchema = (org: OrganizationData) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": org.name,
    "description": org.description,
    "url": org.url,
    "logo": {
      "@type": "ImageObject",
      "url": org.logo
    },
    ...(org.contactPoint && {
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": org.contactPoint.telephone,
        "contactType": org.contactPoint.contactType,
        "email": org.contactPoint.email
      }
    }),
    ...(org.sameAs && { "sameAs": org.sameAs }),
    ...(org.address && {
      "address": {
        "@type": "PostalAddress",
        "addressCountry": org.address.addressCountry,
        "addressRegion": org.address.addressRegion,
        "addressLocality": org.address.addressLocality
      }
    }),
    ...(org.foundingDate && { "foundingDate": org.foundingDate }),
    ...(org.areaServed && { "areaServed": org.areaServed })
  });

  const generateServicesSchema = (servicesList: ServiceData[]) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": servicesList.map((service, index) => ({
      "@type": "Service",
      "position": index + 1,
      "name": service.name,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": service.provider
      },
      "serviceType": service.serviceType,
      ...(service.areaServed && { "areaServed": service.areaServed }),
      ...(service.url && { "url": service.url })
    }))
  });

  const generateWebsiteSchema = (site: WebsiteData) => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": site.url,
    "name": site.name,
    "description": site.description,
    "publisher": {
      "@type": "Organization",
      "name": site.publisher
    },
    "inLanguage": site.inLanguage,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${site.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  });

  const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });

  const generateProductSchema = (productData: ProductData) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": productData.name,
    "description": productData.description,
    ...(productData.url && { "url": productData.url }),
    ...(productData.image && { 
      "image": {
        "@type": "ImageObject",
        "url": productData.image
      }
    }),
    ...(productData.brand && {
      "brand": {
        "@type": "Organization",
        "name": productData.brand
      }
    }),
    ...(productData.offers && {
      "offers": {
        "@type": "Offer",
        "price": productData.offers.price,
        "priceCurrency": productData.offers.priceCurrency,
        "availability": `https://schema.org/${productData.offers.availability}`,
        ...(productData.offers.priceValidUntil && {
          "priceValidUntil": productData.offers.priceValidUntil
        })
      }
    }),
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web"
  });

  const generateBlogPostSchema = (postData: BlogPostData) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.headline,
    "description": postData.description,
    "url": postData.url,
    "datePublished": postData.datePublished,
    ...(postData.dateModified && { "dateModified": postData.dateModified }),
    "author": {
      "@type": "Person",
      "name": postData.author.name,
      ...(postData.author.url && { "url": postData.author.url })
    },
    "publisher": {
      "@type": "Organization",
      "name": postData.publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": postData.publisher.logo
      }
    },
    ...(postData.image && {
      "image": {
        "@type": "ImageObject",
        "url": postData.image
      }
    }),
    ...(postData.wordCount && { "wordCount": postData.wordCount }),
    ...(postData.keywords && { "keywords": postData.keywords }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postData.url
    }
  });

  const generateFAQSchema = (faqItems: FAQItem[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  });

  const schemas = [];
  
  if (organization) {
    schemas.push(generateOrganizationSchema(organization));
  }
  
  if (services && services.length > 0) {
    schemas.push(generateServicesSchema(services));
  }
  
  if (website) {
    schemas.push(generateWebsiteSchema(website));
  }
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  if (product) {
    schemas.push(generateProductSchema(product));
  }

  if (blogPost) {
    schemas.push(generateBlogPostSchema(blogPost));
  }

  if (faq && faq.length > 0) {
    schemas.push(generateFAQSchema(faq));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
}