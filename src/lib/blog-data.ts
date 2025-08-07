// Mock blog data for demonstration
import type { BlogPost, Author, Category, Tag, BlogStats } from '@/types/blog'

export const AUTHORS: Author[] = [
  {
    id: "john-doe",
    name: "John Doe",
    bio: "Senior DevOps Engineer with 8+ years of experience in cloud infrastructure and automation. Passionate about helping startups scale efficiently.",
    avatar: "/team/john-doe.jpg",
    social: {
      twitter: "johndoe_devops",
      linkedin: "john-doe-devops",
      github: "johndoe",
      website: "https://johndoe.dev"
    }
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    bio: "Cloud Solutions Architect specializing in AWS and Kubernetes. Former engineering lead at two successful Y Combinator startups.",
    avatar: "/team/sarah-chen.jpg",
    social: {
      twitter: "sarahchen_cloud",
      linkedin: "sarah-chen-architect",
      github: "sarahchen"
    }
  },
  {
    id: "mike-johnson",
    name: "Mike Johnson",
    bio: "Site Reliability Engineer and DevSecOps expert. Helps companies build secure, scalable infrastructure from day one.",
    avatar: "/team/mike-johnson.jpg",
    social: {
      twitter: "mike_sre",
      linkedin: "mike-johnson-sre",
      github: "mikejohnson"
    }
  }
]

export const CATEGORIES: Category[] = [
  {
    id: "devops",
    name: "DevOps",
    description: "Best practices, tools, and strategies for DevOps implementation and automation",
    slug: "devops",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Container orchestration, K8s best practices, and cloud-native development",
    slug: "kubernetes",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: "cicd",
    name: "CI/CD",
    description: "Continuous integration and deployment pipelines, automation, and testing strategies",
    slug: "cicd",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "aws",
    name: "AWS",
    description: "Amazon Web Services tutorials, best practices, and cost optimization",
    slug: "aws",
    color: "from-yellow-500 to-orange-500"
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "getting-started-kubernetes-beginners",
    title: "Getting Started with Kubernetes: A Complete Beginner's Guide",
    description: "Learn Kubernetes from scratch with this comprehensive guide covering containers, pods, deployments, and services with practical examples.",
    publishedAt: "2024-01-15",
    updatedAt: "2024-01-20",
    author: "sarah-chen",
    category: "kubernetes",
    tags: ["kubernetes", "containers", "docker", "devops", "beginner", "tutorial"],
    coverImage: "/blog-images/kubernetes-beginners-guide.jpg",
    featured: true,
    content: `# Getting Started with Kubernetes: A Complete Beginner's Guide

Kubernetes has revolutionized how we deploy and manage applications at scale. If you're new to container orchestration, this comprehensive guide will take you from zero to confidently deploying your first applications on Kubernetes.

## What is Kubernetes?

Kubernetes (often abbreviated as K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Think of it as the conductor of an orchestra, coordinating all your containers to work together harmoniously.

### Why Kubernetes Matters

Before diving into the technical details, let's understand why Kubernetes has become the de facto standard for container orchestration:

- **Scalability**: Automatically scale your applications up or down based on demand
- **High Availability**: Ensure your applications stay running even when individual nodes fail
- **Resource Efficiency**: Optimize hardware utilization across your cluster
- **Portability**: Run your applications consistently across different environments

## Core Kubernetes Concepts

### 1. Containers and Images

Before Kubernetes, let's quickly review containers. A container packages your application and its dependencies into a single, portable unit.

### 2. Pods: The Basic Unit

A **Pod** is the smallest deployable unit in Kubernetes. It wraps one or more containers and provides shared storage and networking.

### 3. Deployments: Managing Pod Lifecycle

**Deployments** provide declarative updates to applications. They manage ReplicaSets, which ensure a specified number of pod replicas are running.

### 4. Services: Networking and Discovery

**Services** provide stable networking for your pods. Since pods are ephemeral (they come and go), Services give you a consistent way to reach them.

## Setting Up Your First Kubernetes Cluster

### Option 1: Minikube (Local Development)

Minikube creates a single-node Kubernetes cluster on your local machine.

### Option 2: Cloud-Managed Kubernetes

For production workloads, consider managed services like Amazon EKS, Google GKE, or Azure AKS.

## Deploying Your First Application

Let's deploy a simple web application step by step.

## Essential kubectl Commands

Here are the most important kubectl commands you'll use daily.

## Best Practices for Beginners

### 1. Use Namespaces for Organization
### 2. Resource Limits and Requests
### 3. Health Checks
### 4. Use Labels and Selectors

## Common Troubleshooting Scenarios

Learn how to debug common issues.

## What's Next?

Now that you understand the basics, explore ConfigMaps, Secrets, Persistent Volumes, Ingress Controllers, and Helm.

## Conclusion

Kubernetes might seem complex at first, but understanding these core concepts gives you a solid foundation. Start with simple applications, practice with minikube, and gradually work your way up to more complex scenarios.`,
    readingTime: { text: "12 min read", minutes: 12, words: 2800 },
    excerpt: "Learn Kubernetes from scratch with this comprehensive guide covering containers, pods, deployments, and services with practical examples.",
    tableOfContents: [
      { id: "what-is-kubernetes", title: "What is Kubernetes?", level: 2 },
      { id: "core-concepts", title: "Core Kubernetes Concepts", level: 2 },
      { id: "setting-up-cluster", title: "Setting Up Your First Kubernetes Cluster", level: 2 },
      { id: "deploying-application", title: "Deploying Your First Application", level: 2 },
      { id: "kubectl-commands", title: "Essential kubectl Commands", level: 2 },
      { id: "best-practices", title: "Best Practices for Beginners", level: 2 },
      { id: "troubleshooting", title: "Common Troubleshooting Scenarios", level: 2 },
      { id: "whats-next", title: "What's Next?", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 }
    ],
    authorData: AUTHORS.find(a => a.id === "sarah-chen")!,
    categoryData: CATEGORIES.find(c => c.slug === "kubernetes")!,
    tagData: [
      { id: "kubernetes", name: "Kubernetes", slug: "kubernetes" },
      { id: "containers", name: "Containers", slug: "containers" },
      { id: "docker", name: "Docker", slug: "docker" },
      { id: "devops", name: "DevOps", slug: "devops" },
      { id: "beginner", name: "Beginner", slug: "beginner" },
      { id: "tutorial", name: "Tutorial", slug: "tutorial" }
    ],
    url: "/blog/getting-started-kubernetes-beginners"
  },
  {
    slug: "cicd-github-actions-guide",
    title: "Building Robust CI/CD Pipelines with GitHub Actions",
    description: "Learn how to create efficient CI/CD pipelines using GitHub Actions with testing, building, and deployment automation for modern applications.",
    publishedAt: "2024-01-10",
    author: "john-doe",
    category: "cicd",
    tags: ["github-actions", "cicd", "automation", "testing", "deployment", "workflow"],
    coverImage: "/blog-images/github-actions-cicd.jpg",
    featured: false,
    content: `# Building Robust CI/CD Pipelines with GitHub Actions

Continuous Integration and Continuous Deployment (CI/CD) are essential practices in modern software development. GitHub Actions provides a powerful, integrated platform for automating your development workflow directly from your GitHub repository.

## Why GitHub Actions?

GitHub Actions offers several advantages over traditional CI/CD platforms:

- **Native Integration**: Built directly into GitHub, no external service needed
- **Flexible Workflow**: Support for complex, multi-step workflows
- **Rich Ecosystem**: Thousands of community-contributed actions
- **Cost-Effective**: Generous free tier for public repositories

## Understanding GitHub Actions Concepts

### Workflows
A workflow is an automated procedure defined in a YAML file that lives in .github/workflows/ directory.

### Events
Events trigger workflow runs like push, pull_request, schedule, and workflow_dispatch.

### Jobs and Steps
Jobs run in parallel by default, while steps within a job run sequentially.

## Building a Complete CI/CD Pipeline

Let's create a comprehensive pipeline for a Node.js application with linting, testing, security scanning, building, and deployment.

## Managing Secrets and Environment Variables

Never hardcode sensitive information. Use GitHub Secrets for secure storage.

## Optimizing Workflow Performance

Speed up builds with caching, parallel execution, and conditional execution.

## Testing Strategies in CI/CD

Implement multi-stage testing with unit, integration, and end-to-end tests.

## Monitoring and Debugging

Add monitoring to your pipelines and learn debugging techniques for failed workflows.

## Best Practices

Keep workflows DRY, security first, and maintain fast feedback loops.

## Conclusion

GitHub Actions provides a powerful platform for implementing robust CI/CD pipelines. Start with simple workflows and gradually add complexity as your needs grow.`,
    readingTime: { text: "15 min read", minutes: 15, words: 3500 },
    excerpt: "Learn how to create efficient CI/CD pipelines using GitHub Actions with testing, building, and deployment automation for modern applications.",
    tableOfContents: [
      { id: "why-github-actions", title: "Why GitHub Actions?", level: 2 },
      { id: "understanding-concepts", title: "Understanding GitHub Actions Concepts", level: 2 },
      { id: "building-pipeline", title: "Building a Complete CI/CD Pipeline", level: 2 },
      { id: "managing-secrets", title: "Managing Secrets and Environment Variables", level: 2 },
      { id: "optimizing-performance", title: "Optimizing Workflow Performance", level: 2 },
      { id: "testing-strategies", title: "Testing Strategies in CI/CD", level: 2 },
      { id: "monitoring-debugging", title: "Monitoring and Debugging", level: 2 },
      { id: "best-practices", title: "Best Practices", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 }
    ],
    authorData: AUTHORS.find(a => a.id === "john-doe")!,
    categoryData: CATEGORIES.find(c => c.slug === "cicd")!,
    tagData: [
      { id: "github-actions", name: "GitHub Actions", slug: "github-actions" },
      { id: "cicd", name: "CI/CD", slug: "cicd" },
      { id: "automation", name: "Automation", slug: "automation" },
      { id: "testing", name: "Testing", slug: "testing" },
      { id: "deployment", name: "Deployment", slug: "deployment" },
      { id: "workflow", name: "Workflow", slug: "workflow" }
    ],
    url: "/blog/cicd-github-actions-guide"
  },
  {
    slug: "aws-cost-optimization-strategies",
    title: "AWS Cost Optimization: 15 Proven Strategies to Cut Your Cloud Bill",
    description: "Discover practical AWS cost optimization strategies that can reduce your cloud spending by 30-60% without compromising performance or reliability.",
    publishedAt: "2024-01-05",
    author: "mike-johnson",
    category: "aws",
    tags: ["aws", "cost-optimization", "cloud-costs", "finops", "savings", "efficiency"],
    coverImage: "/blog-images/aws-cost-optimization.jpg",
    featured: true,
    content: `# AWS Cost Optimization: 15 Proven Strategies to Cut Your Cloud Bill

Cloud costs can quickly spiral out of control, especially as your applications scale. With AWS being one of the largest cloud expenses for most companies, implementing effective cost optimization strategies is crucial for maintaining healthy margins and sustainable growth.

In this comprehensive guide, we'll explore 15 proven strategies that can help you reduce your AWS costs by 30-60% without sacrificing performance or reliability.

## The Cost Optimization Mindset

Before diving into specific strategies, it's important to adopt a cost-conscious culture:

- **Visibility First**: You can't optimize what you can't see
- **Right-sizing**: Match resources to actual needs, not peak assumptions
- **Automation**: Manual processes lead to waste and errors
- **Regular Reviews**: Cloud costs change as your usage patterns evolve

## 1. Master AWS Cost Explorer and Billing

Set up comprehensive cost monitoring and implement cost alerting to track spending patterns.

## 2. Right-Size Your EC2 Instances

Analyze instance utilization and implement automated right-sizing to match compute resources to actual needs.

## 3. Leverage Reserved Instances and Savings Plans

Implement strategic Reserved Instance and Savings Plans purchases for predictable workloads.

## 4. Implement Spot Instances for Flexible Workloads

Use Spot Instances for batch processing and fault-tolerant applications to save up to 90%.

## 5. Optimize Storage Costs

Implement S3 storage class optimization and migrate to GP3 EBS volumes for better cost efficiency.

## 6. Database Cost Optimization

Right-size RDS instances and consider Aurora Serverless for variable workloads.

## 7. Auto Scaling and Load Balancing

Implement predictive scaling and smart scaling policies to match capacity with demand.

## 8. Container and Serverless Optimization

Use Fargate Spot integration and optimize Lambda function memory allocation.

## 9. Network and CDN Optimization

Optimize CloudFront configurations and implement VPC endpoints to reduce data transfer costs.

## 10. Monitoring and Automation

Set up cost anomaly detection and implement automated cost optimization actions.

## 11. Multi-Account Cost Management

Implement consolidated billing optimization for complex organizational structures.

## 12. Cost Allocation and Tagging Strategy

Enforce automated tagging for accurate cost attribution and accountability.

## 13. Advanced Optimization Techniques

Migrate to Graviton instances and adopt serverless-first architecture patterns.

## 14. Performance vs Cost Trade-offs

Implement intelligent caching strategies to balance performance requirements with cost efficiency.

## 15. Cost Optimization Culture and Governance

Create FinOps dashboards and establish cost optimization as an organizational practice.

## Measuring Success and ROI

Track key metrics like cost per unit, waste percentage, and optimization coverage to measure success.

## Conclusion

AWS cost optimization is an ongoing practice that requires continuous monitoring and adjustment. By implementing these strategies systematically, you can achieve significant cost savings while maintaining performance and reliability.`,
    readingTime: { text: "20 min read", minutes: 20, words: 4800 },
    excerpt: "Discover practical AWS cost optimization strategies that can reduce your cloud spending by 30-60% without compromising performance or reliability.",
    tableOfContents: [
      { id: "cost-optimization-mindset", title: "The Cost Optimization Mindset", level: 2 },
      { id: "cost-explorer", title: "Master AWS Cost Explorer and Billing", level: 2 },
      { id: "right-size-ec2", title: "Right-Size Your EC2 Instances", level: 2 },
      { id: "reserved-instances", title: "Leverage Reserved Instances and Savings Plans", level: 2 },
      { id: "spot-instances", title: "Implement Spot Instances", level: 2 },
      { id: "storage-optimization", title: "Optimize Storage Costs", level: 2 },
      { id: "database-optimization", title: "Database Cost Optimization", level: 2 },
      { id: "auto-scaling", title: "Auto Scaling and Load Balancing", level: 2 },
      { id: "container-serverless", title: "Container and Serverless Optimization", level: 2 },
      { id: "network-cdn", title: "Network and CDN Optimization", level: 2 },
      { id: "monitoring-automation", title: "Monitoring and Automation", level: 2 },
      { id: "multi-account", title: "Multi-Account Cost Management", level: 2 },
      { id: "cost-allocation", title: "Cost Allocation and Tagging Strategy", level: 2 },
      { id: "advanced-techniques", title: "Advanced Optimization Techniques", level: 2 },
      { id: "performance-tradeoffs", title: "Performance vs Cost Trade-offs", level: 2 },
      { id: "culture-governance", title: "Cost Optimization Culture and Governance", level: 2 },
      { id: "measuring-success", title: "Measuring Success and ROI", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 }
    ],
    authorData: AUTHORS.find(a => a.id === "mike-johnson")!,
    categoryData: CATEGORIES.find(c => c.slug === "aws")!,
    tagData: [
      { id: "aws", name: "AWS", slug: "aws" },
      { id: "cost-optimization", name: "Cost Optimization", slug: "cost-optimization" },
      { id: "cloud-costs", name: "Cloud Costs", slug: "cloud-costs" },
      { id: "finops", name: "FinOps", slug: "finops" },
      { id: "savings", name: "Savings", slug: "savings" },
      { id: "efficiency", name: "Efficiency", slug: "efficiency" }
    ],
    url: "/blog/aws-cost-optimization-strategies"
  }
]

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null
}

export function getAllTags(): Tag[] {
  const tagCounts = new Map<string, number>()
  
  BLOG_POSTS.forEach(post => {
    post.tagData.forEach(tag => {
      tagCounts.set(tag.slug, (tagCounts.get(tag.slug) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries()).map(([slug, count]) => {
    const tag = BLOG_POSTS
      .flatMap(post => post.tagData)
      .find(tag => tag.slug === slug)!

    return {
      ...tag,
      usageCount: count,
      trending: count > 1
    }
  }).sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
}

export function getCategories(): Category[] {
  return CATEGORIES
}

export function getAuthors(): Author[] {
  return AUTHORS
}

export function getBlogStats(): BlogStats {
  const posts = getAllPosts()
  const tags = getAllTags()
  
  return {
    totalPosts: posts.length,
    totalCategories: CATEGORIES.length,
    totalTags: tags.length,
    totalAuthors: AUTHORS.length,
    recentPosts: posts.slice(0, 5),
    popularPosts: posts.filter(p => p.featured),
    trendingTags: tags.filter(t => t.trending).slice(0, 10)
  }
}

export function getRelatedPosts(currentPost: BlogPost, maxPosts: number = 3): BlogPost[] {
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== currentPost.slug)
  
  // Calculate relevance score based on shared categories and tags
  const scoredPosts = otherPosts.map(otherPost => {
    let score = 0

    // Same category gets higher score
    if (otherPost.categoryData.slug === currentPost.categoryData.slug) {
      score += 10
    }

    // Shared tags get points
    const sharedTags = otherPost.tagData.filter(tag =>
      currentPost.tagData.some(postTag => postTag.slug === tag.slug)
    )
    score += sharedTags.length * 3

    // Same author gets points
    if (otherPost.author === currentPost.author) {
      score += 5
    }

    return { post: otherPost, score }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPosts)
    .map(item => item.post)
}

export function formatDate(date: string, formatStr: string = 'MMM dd, yyyy'): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}