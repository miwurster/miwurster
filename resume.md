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
<ul>
<li>Led the end-to-end development of a production quantum-as-a-service platform, enabling customers to build, run, and integrate quantum applications via standardized APIs and SDKs.
<li>Owned system architecture, frontend and backend development, GitOps-based deployment, and production operation on Kubernetes and Google Cloud.
<li>Worked closely with customers, Sales, and Business Development to translate direct feedback into product and technical improvements, using monitoring and usage data to reduce friction and improve reliability.
<li>Built customer-facing UI components and workflows using TypeScript and Vue.js and developed internal and external tooling with Node.js and Python.
<li>Established a strong Continuous Delivery culture with automated testing and deployments, enabling frequent, low-risk releases.
<li>Supported onboarding of enterprise customers who actively run experiments or consume quantum services through the platform.
</ul>
`
  },
  {
    title: "Senior Software Engineer, Product & Platform",
    subtitle: "Anaqor - Full-Time",
    start: "07/2021",
    end: "04/2024",
    location: "Berlin, Germany - Remote",
    description: `
<ul>
<li>Led the transition of the PlanQK platform from a research prototype to a commercial public quantum-as-a-service offering.
<li>Owned the technical architecture and mentored engineers building a cloud-native platform on Kubernetes and Google Cloud.
<li>Established automated CI/CD pipelines, GitOps workflows, and operational best practices to support reliable production usage.
<li>Integrated multiple quantum hardware providers behind a unified API and Python SDK.
<li>Collaborated closely with cross-functional stakeholders to balance product requirements, technical constraints, and long-term platform evolution.
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
<li>Supervised and mentored 30+ students in seminars and master’s theses.
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
I'm a Senior Software Engineer with 10+ years of experience building and operating complex, customer-facing systems in both startup and enterprise environments. Over the last four years, I've led the end-to-end development of a quantum-as-a-service platform; from product discovery and system architecture to implementation, automated deployment, and production operations.
<br><br>
I enjoy working at the intersection of product and engineering, especially in ambiguous problem spaces where close collaboration with users, product, and business stakeholders is essential. I've worked directly with customers, sales, and business development teams, and I regularly use monitoring and usage data to identify friction points and improve the user experience.
<br><br>
Technically, I'm strongest in TypeScript (Vue.js, Node.js, React), Java (Spring Boot), Python, and PostgreSQL, with deep experience building cloud-native systems on Kubernetes and Google Cloud. I value strong engineering practices (Continuous Delivery, TDD, trunk-based development, pair/mob programming, and GitOps) and I've seen how they enable teams to move quickly without sacrificing quality.
<br><br>
I'm motivated by roles where engineers own problems end-to-end, ship iteratively, and are accountable for the systems they build.
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
GitLab CI, GitHub Actions, Jenkins, Helm, ArgoCD, Terraform, Ansible
<li><strong>Engineering Practices:</strong>
End-to-end ownership, Continuous Delivery, trunk-based development, pair & mob programming, GitOps
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
