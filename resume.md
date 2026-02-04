---
title: Resume
---

<script setup lang="ts">
const experience = [
  {
    title: "Senior Software Engineer, Product & Platform",
    subtitle: "Kipu Quantum GmbH - Full-Time",
    start: "05/2024",
    end: "Present",
    location: "Karlsruhe, Germany - Remote",
    description: `
<blockquote style='margin-top: 0;'>
Seed-stage deep-tech startup; continuation of the PLANQK Platform following acquisition from Anaqor; same product, team, and codebase
</blockquote>
<ul>
<li>Led the continued end-to-end development of a production quantum-as-a-service platform, enabling customers to build, run, and integrate quantum applications via standardized APIs and SDKs.
<li>Carried responsibility for system architecture and technical direction, alongside frontend and backend development, automated GitOps-based deployment, and production operations on Kubernetes and Google Cloud Platform (GCP).
<li>Defined and evolved the platform's system and code architecture, applying proven patterns for distributed and loosely coupled systems as well as Domain-Driven Design and Clean Architec-ture principles to ensure long-term maintainability and change tolerance.
<li>Designed and evolved backend services and data models using Java (Spring Boot) and Post-greSQL, iterating on them based on production behavior, reliability issues, and scaling needs.
<li>Defined and implemented customer-facing features and flows in TypeScript (UI, CLI) and Py-thon (SDK), translating direct customer feedback and usage data into concrete UX and func-tional improvements.
<li>Established and maintained CI/CD and GitOps workflows and operated the platform in produc-tion, using monitoring and incident analysis (Datadog, Grafana, Loki) to enable frequent, low-risk releases and drive continuous improvements in reliability, usability, and developer experi-ence.
<li>Supported onboarding of enterprise customers who actively run experiments or consume quantum services through the platform.
`
  },
  {
    title: "Senior Software Engineer, Product & Platform",
    subtitle: "Anaqor - Full-Time",
    start: "07/2021",
    end: "04/2024",
    location: "Berlin, Germany - Remote",
    description: `
<blockquote style='margin-top: 0;'>
Pre-seed startup
</blockquote>
<ul>
<li>Joined at an early stage to help evolve the PLANQK Platform from a research prototype into a commercial, publicly available quantum-as-a-service offering.
<li>Took responsibility for core architectural decisions, designing a modular and loosely coupled platform and establishing clear service and domain boundaries using Domain-Driven Design and Clean Architecture principles.
<li>Built customer-facing functionality and APIs, working closely with early users to refine work-flows and platform behavior based on real-world usage.
<li>Designed and iterated on cloud-native deployment and operational architectures on Kuber-netes, laying the foundation for reliable and scalable production usage.
<li>Integrated multiple quantum hardware providers behind a unified API and Python SDK, bal-ancing abstraction with performance and provider-specific constraints.
<li>Collaborated closely with product, business, and research stakeholders to define scope, make trade-offs, and ship features in a fast-moving startup environment.
</ul>
`
  },
  {
    title: "Research Associate & Technical Consultant",
    subtitle: "University of Stuttgart",
    start: "04/2017",
    end: "06/2021",
    location: "Stuttgart, Germany",
    description: `
<ul>
<li>Conducted applied research on cloud-native architectures, DevOps, and distributed systems with a strong focus on practical system design.
<li>Designed and implemented prototype systems and reference architectures using Java (Spring Boot), TypeScript, Kubernetes, and Terraform.
<li>Served as technical consultant in research and industry-partnered projects, translating conceptual ideas into working software solutions.
<li>Authored 20+ peer-reviewed publications (10 as first author).
<li>Supervised and mentored 30+ students in seminars and master's theses.
</ul>
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "04/2010",
    end: "03/2017",
    location: "Böblingen, Germany",
    description: `
<ul>
<li>Contributed to the core development of HPE's enterprise operations management platform, building backend services used by large international customers.
<li>Led development of integration adapters enabling third-party monitoring systems (e.g., Nagios, SAP Solution Manager, Icinga, Oracle Enterprise Manager) to integrate seamlessly with the core platform.
<li>Designed and implemented customer-facing features and internal platform components in Java (Spring), supporting multiple relational database systems.
<li>Worked directly with strategic enterprise customers, including onsite support, to ensure reliable operation and successful integrations.
<li>Acted as Scrum Master for a feature team and applied modern engineering practices such as TDD, XP, and code reviews.
<li>Built and shipped software packaged for multiple operating systems using Java and Python.
</ul>
`,
  },
];

const education = [
  {
    title: "Reutlingen University",
    subtitle: "Master of Science (M.Sc.), Services Computing",
    start: "10/2014",
    end: "08/2016",
    description: `
Focus on Cloud Computing, Software Architecture, and Cloud-Native Software Engineering.
Master's thesis at the Institute of Architecture of Application Systems (University of Stuttgart).
`
  },
  {
    title: "Esslingen University",
    subtitle: "Bachelor of Engineering (B.Eng.), Information Systems (Wirtschaftsinformatik)",
    start: "10/2006",
    end: "02/2010",
    description: `
Focus on Business Process Management & Software Engineering.
Bachelor's thesis at Hewlett Packard Enterprise.
`
  },
];

const profile = `
I'm a Senior Software Engineer with 10+ years of experience building and operating complex, customer-facing systems across startup and enterprise environments. Over the last four years, I've worked continuously on the same product, a quantum-as-a-service platform, carrying end-to-end responsibility from product discovery and system architecture through implementation, automated deployment, and production operations. In this context, I've designed and evolved both system-level and code-level architectures, applying proven patterns for distributed and loosely coupled systems to support long-term maintainability and change tolerance.
<br><br>
I enjoy working at the intersection of product and engineering, especially in early-stage, fast-moving environments where requirements are incomplete and engineers are trusted to define scope, make trade-offs, and ship. My work spans the full lifecycle: collaborating on problem definition, implementing customer-facing features, designing backend services and data models, and establishing CI/CD and GitOps workflows. I place strong emphasis on clear architectural boundaries and sustainable design, using principles such as Domain-Driven Design and Clean Architecture to keep business logic isolated from infrastructure concerns and enable systems to evolve over time.
<br><br>
I've worked closely with customers, sales, and business stakeholders, and regularly use monitoring and usage data to guide technical and product decisions. Technically, I'm strongest in TypeScript (Vue.js, React, Node.js), Java (Spring Boot), Python, and PostgreSQL, with deep experience building cloud-native systems on Kubernetes and public cloud platforms (GCP, AWS, Azure).
<br><br>
I'm motivated by roles where engineers carry responsibility from initial design through production operation and long-term maintenance.
`

const skills = `
<ul>
<li><strong>Languages & Frameworks:</strong>
Java (Spring Boot, Maven), TypeScript (Node.js, Vue.js, React, Angular), Python
<li><strong>Data & Messaging:</strong>
PostgreSQL, MySQL, Redis, Oracle DB, Microsoft SQL Server, ActiveMQ, Amazon SQS, Google Pub/Sub
<li><strong>Cloud-Native & Platforms:</strong>
Kubernetes, Docker, Google Cloud Platform (GCP), AWS, Azure
<li><strong>CI/CD & DevOps:</strong>
GitLab CI, GitHub Actions, Jenkins, Helm, ArgoCD, Terraform, Ansible, Loki, Datadog, Grafana
<li><strong>Architecture & Design:</strong>
Distributed and loosely coupled systems, Domain-Driven Design (DDD), Clean Architecture, designing for long-term evolution and maintainability
<li><strong>Engineering Practices:</strong>
End-to-end ownership, Continuous Delivery, Trunk-based Development, Pair & Mob Programming, GitOps
</ul>
`
</script>

# Resume

## Profile

<ResumeItem :description="profile"/>

## Skills

<ResumeItem :description="skills"/>

## Experience

<ResumeSection :items="experience"></ResumeSection>

## Education

<ResumeSection :items="education"></ResumeSection>
