import type { Metadata } from 'next';
import { ServicePageLayout, ServiceData } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'Observability & Monitoring Services - Complete System Visibility | Resiliotech',
  description: 'Professional observability services including monitoring, logging, alerting, and performance tracking. Get complete visibility into your systems with proactive issue detection.',
  keywords: ['observability', 'monitoring', 'logging', 'alerting', 'metrics', 'dashboards', 'performance monitoring', 'SRE'],
  openGraph: {
    title: 'Observability & Monitoring Services - Complete System Visibility',
    description: 'Get complete visibility into your systems with comprehensive monitoring, logging, and alerting solutions.',
    images: ['/og-images/observability.png'],
  },
};

const observabilityService: ServiceData = {
  title: 'Observability & Monitoring',
  subtitle: 'Complete Visibility Into Your Systems',
  description: 'Gain deep insights into your applications and infrastructure with comprehensive observability solutions. We implement monitoring, logging, and alerting systems that detect issues before they impact your users and provide actionable insights for continuous improvement.',
  
  features: [
    {
      title: 'Metrics & Dashboards',
      description: 'Custom dashboards with business and technical metrics, real-time visualization, and historical trend analysis.',
      icon: 'TrendingUp'
    },
    {
      title: 'Centralized Logging',
      description: 'Unified log aggregation, parsing, and analysis with powerful search capabilities and correlation.',
      icon: 'Target'
    },
    {
      title: 'Intelligent Alerting',
      description: 'Smart alerting with ML-based anomaly detection, alert fatigue reduction, and escalation policies.',
      icon: 'Shield'
    },
    {
      title: 'Application Performance Monitoring',
      description: 'Deep application insights including response times, error rates, and user experience metrics.',
      icon: 'Zap'
    },
    {
      title: 'Infrastructure Monitoring',
      description: 'Comprehensive monitoring of servers, containers, databases, and cloud resources.',
      icon: 'Award'
    },
    {
      title: 'Distributed Tracing',
      description: 'End-to-end request tracing across microservices for performance bottleneck identification.',
      icon: 'Star'
    }
  ],

  benefits: [
    {
      title: 'Faster issue resolution',
      description: 'Pilot target: identify and resolve issues before users notice',
      metric: '(target)'
    },
    {
      title: 'Improved system reliability',
      description: 'Proactive monitoring to prevent outages',
      metric: '(target)'
    },
    {
      title: 'Better user experience',
      description: 'Monitor and optimize application performance',
      metric: '(target)'
    },
    {
      title: 'Reduced operational costs',
      description: 'Optimize resource usage and prevent waste',
      metric: '(target)'
    }
  ],

  process: [
    {
      step: 1,
      title: 'Observability Assessment',
      description: 'Analyze current monitoring setup, identify blind spots, and define observability requirements.',
      duration: '1 week'
    },
    {
      step: 2,
      title: 'Strategy & Architecture Design',
      description: 'Design comprehensive observability strategy including metrics, logs, traces, and alerting.',
      duration: '1-2 weeks'
    },
    {
      step: 3,
      title: 'Implementation & Integration',
      description: 'Deploy monitoring tools, configure dashboards, set up alerting, and instrument applications.',
      duration: '3-6 weeks'
    },
    {
      step: 4,
      title: 'Optimization & Training',
      description: 'Fine-tune alerts, optimize performance, and train team on observability best practices.',
      duration: '1-2 weeks'
    }
  ],

  caseStudies: [],

  technologies: [
    'Prometheus', 'Grafana', 'Datadog', 'New Relic', 'Dynatrace',
    'ELK Stack', 'Fluentd', 'Loki', 'Splunk', 'CloudWatch',
    'Jaeger', 'Zipkin', 'OpenTelemetry', 'AWS X-Ray',
    'PagerDuty', 'Opsgenie', 'Slack', 'Microsoft Teams',
    'Telegraf', 'StatsD', 'InfluxDB', 'TimescaleDB',
    'Nagios', 'Zabbix', 'PRTG', 'SolarWinds',
    'Kubernetes', 'Docker', 'Node Exporter', 'cAdvisor'
  ],

  pricing: {
    startingPrice: 'Founding Pilot',
    model: '3 slots/month at pilot rates',
    description: 'We\'re running Founding Pilot engagements (3 slots/month) to refine our observability services. Join the waitlist to get pilot rates and shape how we build monitoring solutions.'
  },

  faq: [
    {
      question: 'What\'s the difference between monitoring and observability?',
      answer: 'Monitoring tells you what\'s wrong with your system, while observability helps you understand why it\'s wrong. Observability combines metrics, logs, and traces to provide deep insights into system behavior and enables you to answer questions you didn\'t know you needed to ask.'
    },
    {
      question: 'How do you prevent alert fatigue?',
      answer: 'We implement intelligent alerting with ML-based anomaly detection, alert correlation, and escalation policies. We focus on actionable alerts that require immediate attention and provide clear context for faster resolution. Join our Founding Pilot program to help us refine these approaches and get early access to pilot rates.'
    },
    {
      question: 'Can you work with our existing monitoring tools?',
      answer: 'Yes, we work with your existing tools and can integrate or migrate data as needed. We\'ll assess your current setup and recommend the best approach to enhance or complement your existing monitoring infrastructure.'
    },
    {
      question: 'What about monitoring costs? Won\'t this be expensive?',
      answer: 'We design cost-effective monitoring strategies using open-source tools where appropriate and optimizing data retention policies. Our goal is to ensure that the cost savings from prevented outages and improved efficiency outweigh the monitoring costs. Join our Founding Pilot program to help us prove this value proposition and get early access to pilot rates.'
    },
    {
      question: 'How do you handle sensitive data in logs and metrics?',
      answer: 'We implement data anonymization, filtering, and access controls to ensure sensitive information is protected. Our solutions include log scrubbing, PII detection, and secure data transmission and storage practices.'
    }
  ]
};

export default function ObservabilityPage() {
  return <ServicePageLayout service={observabilityService} category="observability" />;
}