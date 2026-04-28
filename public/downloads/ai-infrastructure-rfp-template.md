# AI Infrastructure RFP Template

Use this template to evaluate AI infrastructure vendors, MLOps platforms, managed model-serving providers, and implementation partners.

## 1. Company Overview

- Company name:
- Primary contact:
- Evaluation owner:
- Procurement timeline:
- Decision date:

## 2. Current Environment

- Current cloud(s):
- Current orchestration model:
- Current model registry or artifact process:
- Current observability stack:
- Current security and compliance requirements:
- Internal team size and skill mix:

## 3. Use Case and Workload Profile

Describe the real workloads this procurement must support.

- Number of production models today:
- Expected number of models in 12 months:
- Primary workload types:
  - training
  - batch inference
  - online inference
  - LLM gateway / prompt routing
  - feature pipelines
- Latency requirements:
- Availability requirements:
- Data residency or regulatory constraints:
- GPU usage requirements:

## 4. Architecture and Deployment Requirements

Please describe how your product or service would operate in our environment.

1. What components run in our account, cluster, or VPC versus yours?
2. What are the core dependencies for control plane and data plane operation?
3. How do you handle model versioning and rollout?
4. How do you support scaling for:
   - low traffic
   - medium traffic
   - high traffic
5. How do you support mixed workloads across:
   - training
   - batch jobs
   - online inference
   - LLM or generative AI routes
6. What parts of the environment remain our operational responsibility?

## 5. Security and Compliance

Please answer with implementation detail, not marketing language.

1. Describe identity and access control.
2. Describe tenant or team isolation boundaries.
3. How are model artifacts protected?
4. How are secrets stored, accessed, and rotated?
5. How is data encrypted at rest and in transit?
6. What audit logs are available?
7. What compliance frameworks do you support today?
8. How do you support regional data residency and restricted egress requirements?

## 6. Observability and Operations

1. What metrics, logs, and traces are available by default?
2. How are failed jobs, failed rollouts, or degraded model routes detected?
3. What alerting or notification features are included?
4. What rollback capabilities exist?
5. How are upgrades handled?
6. How are incidents supported operationally?

## 7. Pricing and Commercial Structure

Please provide pricing assumptions and the major cost drivers.

1. What is the pricing model?
2. What charges scale with:
   - model count
   - request volume
   - tokens
   - GPU hours
   - environments
3. What features or modes create major cost increases?
4. What support or professional services are extra?
5. Provide example cost scenarios for:
   - small-scale deployment
   - medium-scale deployment
   - high-scale deployment
6. Describe migration and exit costs or constraints.

## 8. Implementation and Support

1. What is the typical time to first production deployment?
2. What internal skills do you assume we already have?
3. What implementation support do you provide?
4. What does post-deployment support look like?
5. What parts of the rollout typically require custom work?

## 9. Reference Scenarios

Please provide examples that match our likely operating profile.

1. Describe one customer environment closest to our workload shape.
2. Describe one incident or failure mode you helped resolve.
3. Describe one migration, rollout, or adoption project similar to ours.

## 10. Open Risks and Constraints

Please list:

- unsupported scenarios
- known platform limitations
- common failure modes
- conditions under which you would not recommend your own product or service

## 11. Evaluation Scoring Matrix

| Category | Weight | Score (1-5) | Notes |
| --- | --- | --- | --- |
| Architecture fit | 25% |  |  |
| Security and compliance | 20% |  |  |
| Operating model and support | 20% |  |  |
| Cost structure | 20% |  |  |
| Implementation speed and references | 15% |  |  |

## 12. Internal Decision Notes

- Shortlisted vendor(s):
- Key risks:
- Key differentiators:
- Follow-up questions:
- Recommended next step:
