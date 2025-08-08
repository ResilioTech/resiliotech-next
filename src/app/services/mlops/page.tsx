import type { Metadata } from 'next';
import { ServicePageLayout, ServiceData } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'MLOps Services - Machine Learning Operations & Data Pipelines | Resiliotech',
  description: 'Professional MLOps services including ML model deployment, data pipeline automation, model monitoring, and A/B testing. Scale your AI initiatives with production-ready ML infrastructure.',
  keywords: ['MLOps', 'machine learning operations', 'ML model deployment', 'data pipelines', 'model monitoring', 'A/B testing', 'AI infrastructure'],
  openGraph: {
    title: 'MLOps Services - Machine Learning Operations & Data Pipelines',
    description: 'Scale your AI initiatives with production-ready ML infrastructure and automated data workflows.',
    images: ['/og-images/mlops.png'],
  },
};

const mlopsService: ServiceData = {
  title: 'MLOps & Data Pipeline',
  subtitle: 'Production-Ready Machine Learning Infrastructure',
  description: 'Transform your machine learning models from experiments to production-ready systems. We build scalable MLOps pipelines with automated data workflows, model deployment, monitoring, and continuous integration for AI-powered applications.',
  
  features: [
    {
      title: 'ML Model Deployment',
      description: 'Automated model deployment pipelines with versioning, rollback capabilities, and A/B testing infrastructure.',
      icon: 'Zap'
    },
    {
      title: 'Data Pipeline Automation',
      description: 'Robust ETL/ELT pipelines for data ingestion, transformation, and feature engineering at scale.',
      icon: 'TrendingUp'
    },
    {
      title: 'Model Monitoring & Drift Detection',
      description: 'Comprehensive monitoring for model performance, data drift, and concept drift with automated alerts.',
      icon: 'Shield'
    },
    {
      title: 'Feature Store Implementation',
      description: 'Centralized feature management with versioning, lineage tracking, and real-time serving capabilities.',
      icon: 'Target'
    },
    {
      title: 'Experiment Tracking',
      description: 'Complete experiment management with hyperparameter tracking, model comparison, and reproducibility.',
      icon: 'Award'
    },
    {
      title: 'AutoML & Model Optimization',
      description: 'Automated model selection, hyperparameter tuning, and performance optimization pipelines.',
      icon: 'Star'
    }
  ],

  benefits: [
    {
      title: 'Faster model deployment',
      description: 'Deploy models to production in minutes, not months',
      metric: '10x faster deployment'
    },
    {
      title: 'Improved model accuracy',
      description: 'Continuous monitoring and retraining',
      metric: '25% accuracy improvement'
    },
    {
      title: 'Reduced operational overhead',
      description: 'Automated pipelines and monitoring',
      metric: '60% less manual work'
    },
    {
      title: 'Better data quality',
      description: 'Automated data validation and quality checks',
      metric: '90% fewer data issues'
    }
  ],

  process: [
    {
      step: 1,
      title: 'ML Maturity Assessment',
      description: 'Evaluate current ML practices, data infrastructure, and identify opportunities for improvement.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Architecture & Strategy Design',
      description: 'Design MLOps architecture including data pipelines, model serving, and monitoring strategy.',
      duration: '2-3 weeks'
    },
    {
      step: 3,
      title: 'Infrastructure Implementation',
      description: 'Build data pipelines, model deployment systems, and monitoring infrastructure.',
      duration: '6-10 weeks'
    },
    {
      step: 4,
      title: 'Model Migration & Optimization',
      description: 'Migrate existing models, optimize performance, and establish ongoing improvement processes.',
      duration: '2-4 weeks'
    }
  ],

  caseStudies: [
    {
      company: 'AI-Powered Analytics Platform',
      industry: 'Data Analytics',
      challenge: 'Manual model deployment process taking weeks, inconsistent model performance in production, and no systematic approach to model monitoring.',
      solution: 'Implemented comprehensive MLOps platform with automated pipelines, feature store, and real-time monitoring for 20+ ML models.',
      results: [
        'Reduced model deployment time from 3 weeks to 2 hours',
        'Improved model accuracy by 30% through automated retraining',
        'Detected and resolved 15+ data drift issues automatically',
        'Enabled data scientists to focus on model development vs. deployment'
      ]
    },
    {
      company: 'Recommendation Engine Startup',
      industry: 'E-commerce Technology',
      challenge: 'Scaling recommendation models across millions of users with real-time inference requirements and complex feature engineering needs.',
      solution: 'Built high-throughput feature store and real-time model serving infrastructure with automated A/B testing framework.',
      results: [
        'Serving 1M+ recommendations per second with <50ms latency',
        'Increased recommendation click-through rate by 45%',
        'Reduced feature engineering time by 70%',
        'Automated A/B testing for 10+ model variants simultaneously'
      ]
    }
  ],

  technologies: [
    'MLflow', 'Kubeflow', 'Apache Airflow', 'Prefect', 'Dagster',
    'Docker', 'Kubernetes', 'Ray', 'Dask', 'Spark',
    'TensorFlow Serving', 'Seldon Core', 'BentoML', 'Triton',
    'Feast', 'Tecton', 'Hopsworks', 'Redis', 'Kafka',
    'Weights & Biases', 'Neptune', 'Comet', 'TensorBoard',
    'Prometheus', 'Grafana', 'Evidently AI', 'Great Expectations',
    'AWS SageMaker', 'GCP Vertex AI', 'Azure ML'
  ],

  pricing: {
    startingPrice: '$4,500',
    model: 'Project-based with ongoing support',
    description: 'Pricing varies based on data volume, model complexity, and infrastructure requirements. Includes initial setup and 6 months of monitoring and optimization.'
  },

  faq: [
    {
      question: 'What\'s the difference between MLOps and traditional DevOps?',
      answer: 'MLOps extends DevOps principles to machine learning with additional considerations for data versioning, model versioning, experiment tracking, feature stores, and model performance monitoring. It addresses the unique challenges of deploying and maintaining ML models in production.'
    },
    {
      question: 'Do you work with existing ML models or only new ones?',
      answer: 'We work with both existing models and new model development. For existing models, we can help containerize, deploy, and add monitoring. For new models, we can set up the entire MLOps pipeline from data ingestion to model serving.'
    },
    {
      question: 'How do you handle model versioning and rollbacks?',
      answer: 'We implement comprehensive model versioning systems that track model artifacts, training data, code, and hyperparameters. Our deployment pipelines include automated rollback capabilities and A/B testing to ensure safe model updates.'
    },
    {
      question: 'What about data privacy and compliance in ML pipelines?',
      answer: 'Data privacy and compliance are built into our MLOps solutions. We implement data anonymization, encryption, access controls, and audit trails to meet requirements like GDPR, HIPAA, and industry-specific regulations.'
    },
    {
      question: 'Can you help with real-time ML inference at scale?',
      answer: 'Yes, we specialize in high-throughput, low-latency ML serving infrastructure. Our solutions can handle millions of predictions per second with sub-100ms latency using optimized serving frameworks and caching strategies.'
    }
  ]
};

export default function MLOpsPage() {
  return <ServicePageLayout service={mlopsService} category="mlops" />;
}