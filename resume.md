---
title: Resume
---

<script setup lang="ts">
const experience = [
  {
    title: "Senior Software Engineer (Lead Platform Development)",
    subtitle: "Kipu Quantum GmbH - Full-Time",
    start: "05/2024",
    end: "Present",
    location: "Karlsruhe, Germany - Remote",
    description: `
I lead the development of Kipu Quantum Hub (formerly PLANQK), our next-generation quantum computing platform that enables customers to both develop and run quantum experiments and consume ready-to-use quantum applications through well-established API standards.
This empowers enterprises to seamlessly integrate quantum capabilities into existing systems, workflows, and software landscapes.
<br><br>
The platform applies serverless principles and provides unified access to multiple quantum hardware providers—including IBM, Rigetti, IonQ, and D-Wave—via a streamlined Python SDK.
I oversee the cloud-native architecture on Kubernetes and Google Cloud, drive a strong culture of Continuous Delivery with automated deployments, and design comprehensive strategies for operational excellence and test automation to ensure reliability, robustness, and scalability.
<br><br>
<strong>Success Story:</strong>
I played a key role in onboarding major enterprise customers such as Volkswagen, Capgemini, and BASF.
These organizations now actively build quantum applications, run large-scale experiments, or consume API-based quantum solutions developed by Kipu or other ecosystem partners through our platform.
`
  },
  {
    title: "Senior Software Engineer (Lead Platform Development)",
    subtitle: "Anaqor - Full-Time",
    start: "07/2021",
    end: "04/2024",
    location: "Berlin, Germany - Remote",
    description: `
Engineering lead for the PlanQK Platform, a platform offering serverless computing principles that enables users to develop and operate quantum applications by using a variety of different quantum computing hardware.
<br><br>
<strong>Key achievements and learnings:</strong>
<ul>
<li>Led a team of 5 engineers to transform the platform from a research prototype to a commercial public PaaS offering.
<li>Took charge of the technical architecture and mentored the team to develop a cloud-native platform based on Kubernetes and Google Cloud.
<li>Established a continuous delivery culture while using tools for fully automated software deployments.
<li>Developed an operational strategy for the platform including monitoring, logging, and alerting to ensure its reliable operation.
<li>Implemented a comprehensive test automation strategy, covering fully automated integration, acceptance, and performance tests.
<li>Integrated 4 quantum computing hardware providers (IBM, Rigetti, IonQ, DWave) while exposing them through a unified Python SDK.
</ul>
<strong>Technologies:</strong>
Java (Spring Boot), TypeScript (Vue.js), Docker, Kubernetes, Redis, Postgres, Helm, ArgoCD, GitOps, GitHub Actions, GitLab CI, GCP, Python
`
  },
  {
    title: "Research Associate and Technical Consultant",
    subtitle: "University of Stuttgart",
    start: "04/2017",
    end: "06/2021",
    location: "Stuttgart, Germany",
    description: `
Worked as a research associate at the Institute of Architecture of Application Systems (IAAS) with a personal research focus on cloud-native architectures and DevOps, and additionally served as a technical consultant in various research projects.
<br><br>
<strong>Key achievements and learnings:</strong>
<ul>
<li>20+ peer-reviewed <a href="/publications">publications</a>, 10 of which are first author contributions.
<li>Supervised 30+ students during their seminars and master's theses.
<li>Gained knowledge in how to build loosely-coupled, distributed systems for the cloud based on best practices and patterns.
</ul>
<strong>Technologies:</strong>
Java (Spring Boot), TypeScript (Angular), Docker, Kubernetes, Terraform, AWS
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "02/2015",
    end: "03/2017",
    location: "Böblingen, Germany",
    description: `
<strong>Research and Development (HPE BSM Operations Manager i):</strong><br>
Contributed as Scrum Master and Full-Stack Developer to HPE's operations management solution.
<br><br>
<strong>Key achievements and learnings:</strong>
<ul>
<li>Acted as Scrum Master for a feature team of 5 engineers.
<li>Completed 2 SAFe certifications to foster an agile and customer oriented environment.
<li>Strengthened my knowledge in developing enterprise-ready Java applications supporting three different database products.
<li>Designed, developed, and maintained software feature according to customer requirements.
<li>Applied methods of modern software engineering such as code reviews, TDD, and XP.
<li>Completed the part-time M.Sc. course Services Computing at the Reutlingen University.
</ul>
<strong>Technologies:</strong>
Java (Spring Boot), Angular, Postgres, Oracle DB, MSSQL
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "04/2010",
    end: "01/2015",
    location: "Böblingen, Germany",
    description: `
<strong>Research and Development (HPE BSM Integration Adapter):</strong>
<br>
Contributed to an application allowing to integrate third-party monitoring solutions into HPE's operations management solution.
<br><br>
<strong>Key achievements and learnings:</strong>
<ul>
<li>Led the development of 4 monitoring solution adapters to integrate different event sources (Nagios, SAP Solution Manager, Icinga, Oracle Enterprise Manager) into HPE's solution.
<li>Provided onsite support for strategic customers.
<li>Learned how develop software products at an enterprise scale that are packaged for different operating systems.
<li>Gained experience in the Java ecosystem using Spring and Maven to develop JEE and Servlet applications.
<li>Got used to work with UNIX-based operating systems, Shell/Bash scripting, and Python.
<li>Learned how to integrate software system in a loosely coupled manner using RESTful web services and JMS.
</ul>
<strong>Technologies:</strong>
Java (Spring, Maven), Apache Flex, Shell/Bash, Python
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
</script>

# Resume

::: details About Me
With 10 years of experience across startups and established tech companies, I’ve built a strong foundation in software design and end-to-end product delivery.
From developing enterprise-ready systems to rapidly iterating in agile environments, I thrive on turning complex challenges into scalable solutions.
Alongside my professional work, I’ve spent over four years in research, publishing 20 papers—10 as first author—which sharpened my analytical thinking and deepened my expertise in cloud-native and distributed systems.

I’m skilled in Java (Spring), TypeScript, modern web frameworks (React, Vue.js, Angular, Node), Python, various databases (Postgres, MySQL, Redis, MSSQL, Oracle), messaging middleware systems (ActiveMQ, Amazon SQS, Google Pub/Sub), Kubernetes, CI/CD (GitLab CI, GitHub Actions, Jenkins), and DevOps/GitOps practices—leveraging tools like Helm, ArgoCD, Terraform, and Ansible to design, deploy, and operate resilient applications.

I love working in environments practicing continuous delivery, TDD, trunk-based development, and pair/mob programming!
:::

## Professional Experience

<ResumeSection :items="experience"></ResumeSection>

## Education

<ResumeSection :items="education"></ResumeSection>
