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
    location: "Karlsruhe, Baden-Württemberg, Germany - Remote",
    description: `
Leading the development of the next-generation quantum computing platform "PlanQK". Our platform leverages serverless computing principles and integrates multiple quantum hardware providers, such as IBM, Rigetti, IonQ or D-Wave, through a unified Python SDK.<br>
<br>
My role is to oversee the cloud-native architecture on Kubernetes and Google Cloud, foster a culture of continuous delivery with automated deployments, and develop comprehensive operational and test automation strategies to ensure robustness, reliability, and scalability.
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
    title: "Research Associate",
    subtitle: "University of Stuttgart",
    start: "04/2017",
    end: "06/2021",
    location: "Stuttgart, Germany",
    description: `
Worked as a research associate at the Institute of Architecture of Application Systems (IAAS) and contributed in my research to the field of cloud-native architectures and DevOps.
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
With a decade of experience in software development, my career spans roles at traditional tech giants, where I contributed to building enterprise-ready products, to dynamic positions in startups, where I honed my skills in rapidly developing, delivering, and adapting products to meet changing market demands. My diverse background has given me a solid foundation in software design and equipped me with a broad skill set to tackle technological challenges.

Parallel to my professional journey, I have pursued a rigorous path in research, dedicating over four years to contributing to the academic field with 20 research papers, and notably, leading as the first author in 10 of them. My engagement in research has not only refined my analytical and problem solving skills but has also deepened my understanding of complex software systems, particularly in cloud-native environments.

My technical expertise encompasses Java (Spring Framework, Maven), TypeScript, modern web development frameworks (React, Angular, Vue.js, Node), Python, various database systems (Postgres, MySQL, MSSQL, Oracle, Redis), and messaging middleware systems (ActiveMQ, Amazon SQS, Google Pub/Sub). In recent years, I strengthened my experience with Kubernetes to design and develop distributed applications. My expertise in Continuous Integration and Continuous Delivery (CI/CD), a domain where I have both academic and practical experience, helps me to deploy and operate containerized applications on Kubernetes effectively using proven DevOps tools and practices, such as GitOps, Helm, and ArgoCD. I advocate for agile methodologies while practicing Extreme Programming (XP) and Test-Driven Development (TDD) to ensure quality and reliability.

The combination of a strong foundation in software design, extensive research achievements, and practical expertise in software development positions me to contribute to innovative and technologically advanced software solutions, ensuring they are both cutting-edge and grounded in solid academic and practical insights.
:::

## Professional Experience

<ResumeSection :items="experience"></ResumeSection>

## Education

<ResumeSection :items="education"></ResumeSection>
