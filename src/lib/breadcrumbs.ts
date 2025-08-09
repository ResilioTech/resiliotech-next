interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const baseUrl = 'https://resiliotech.com';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: baseUrl }
  ];

  // Clean pathname and split into segments
  const segments = pathname.replace(/^\//, '').replace(/\/$/, '').split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return breadcrumbs;
  }

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Map segments to friendly names
    const segmentName = getBreadcrumbName(segment, segments, index);
    
    breadcrumbs.push({
      name: segmentName,
      url: `${baseUrl}${currentPath}`
    });
  });

  return breadcrumbs;
}

function getBreadcrumbName(segment: string, segments: string[], index: number): string {
  // Convert kebab-case to title case
  const toTitleCase = (str: string) => 
    str.split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ');

  // Handle specific routes
  switch (segment) {
    case 'devops-automation':
      return 'DevOps Automation';
    case 'cloud-infrastructure':
      return 'Cloud Infrastructure';
    case 'mlops':
      return 'MLOps';
    case 'observability':
      return 'Observability';
    case 'security':
      return 'Security';
    case 'deployflow':
      return 'DeployFlow';
    case 'cloudwatch-pro':
      return 'CloudWatch Pro';
    case 'secureops':
      return 'SecureOps';
    case 'infrascale':
      return 'InfraScale';
    case 'projects':
      return 'Case Studies';
    default:
      // For dynamic routes like blog slugs or project slugs, use title case
      if (index === segments.length - 1) {
        // This is likely a slug, convert to readable title
        return toTitleCase(segment);
      }
      return toTitleCase(segment);
  }
}

export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  return generateBreadcrumbs(pathname);
}