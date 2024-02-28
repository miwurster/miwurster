---
title: Resume
---

<script setup lang="ts">
const experience = [
  {
    title: "Senior Software Engineer",
    subtitle: "Anaqor - Full-Time",
    start: "01/2023",
    end: "present",
    location: "Berlin, Germany - Remote",
    description: `
I led the transformation of the PlanQK Platform from a research prototype to a commercial public PaaS offering.
Users of the PlanQK Platform bring their own code that can access a variety of different quantum computing hardware through the platform's SDK.
Notably, the platform ensures that users only pay for the resources they actually consume.
<br>
<br>
A cornerstone of this transformation was the integration of Google Cloud services, including GKE, Cloud SQL, PubSub, Cloud Build, Cloud Run, and Cloud Storage, which formed the foundation of a robust and scalable cloud infrastructure.
This was complemented by the containerization of software components, such as Java/Spring Boot and TypeScript/Vue.js applications, ensuring their deployment on Kubernetes achieved high availability and resiliency.
My responsibilities extended to overseeing the platform's technical architecture, ensuring its scalability, security, and maintainability.
A key part of our strategy was implementing a comprehensive test automation strategy that encompassed fully automated integration, acceptance, and performance testing.
My leadership in the establishment of a continuous delivery pipeline, leveraging GitLab CI, Helm, GitOps, and ArgoCD, was central to build better software faster.
Additionally, I developed an operational strategy encompassing monitoring, logging, and alerting to guarantee the platform's reliable operation.
I further helped to integrate a variety of quantum computing hardware providers, such as IBM, Rigetti, and IonQ, into the platform while exposing them through a unified, Python-based SDK.
`,
  },
  {
    title: "Senior Software Engineer",
    subtitle: "StoneOne AG - Full-Time",
    start: "07/2021",
    end: "12/2022",
    location: "Berlin, Germany - Remote",
    description: `
While the company was a core member of the PlanQK research project, I took on a leading role of designing and developing the prototype of the PlanQK Platform, which enables users to develop, operate, and monetize quantum applications and services using a variety of different quantum computing hardware.
This initial phase laid the groundwork for the platform's evolution, incorporating advanced cloud services, containerization, and continuous delivery practices to facilitate a platform that is able to run quantum applications and services in a secure and scalable manner.
Apart from that, I provided technical leadership, guiding and mentoring team members while overseeing the platform's technical architecture and design to ensure scalability, security, and maintainability.
`,
  },
  {
    title: "Research Associate",
    subtitle: "Institute of Architecture of Application Systems (IAAS), University of Stuttgart",
    start: "03/2017",
    end: "06/2021",
    location: "Stuttgart, Germany",
    description: `
20+ peer-reviewed <a href="/publications">publications</a> in the area of DevOps and cloud-native application deployment automation, 10 of which are first author contributions.
`,
  },
  {
    title: "Senior Software Engineer and Scrum Master",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "04/2016",
    end: "03/2017",
    location: "Böblingen, Germany",
    description: `
RnD at HPE Operations Manager i:
Certified scrum master and senior software engineer of one feature team.
I strengthened my experience in designing and developing loosely coupled, Java-based software solutions.
I left HPE since the RnD department in Germany was steadily shrinking and therefore lacked the opportunities for further personal development.
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "02/2015",
    end: "03/2016",
    location: "Böblingen, Germany",
    description: `
RnD at HPE Operations Manager i:
I moved to the core development team of HPE's operation management solution and gained experience in enterprise-ready software engineering using Java and Angular while supporting three different database products (Oracle, MSSQL, Postgres).
We applied agile software development practices using Scrum (SAFe certification) to deliver regular releases while maintaining a high level of quality.
Further, I started the M.Sc. course Services Computing part-time at the Reutlingen University.
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "06/2012",
    end: "01/2015",
    location: "Böblingen, Germany",
    description: `
RnD at HPE BSM Integration Adapter:
I led the development to productize different monitoring solution adapters, i.e., to integrate Nagios, SAP Solution Manager, Icinga, and Oracle Enterprise Manager into HPE's operations management solution (HPE Operations Manager i).
Onsite support for strategic HPE customers.
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "04/2010",
    end: "05/2012",
    location: "Böblingen, Germany",
    description: `
RnD at HPE BSM Integration Adapter:
Entry-level position as a software engineer.
I worked on a software solution and integration platform for multiple different monitoring solutions where I mainly developed parts of the Java backend and the web-based Apache Flex application.
The loosely coupled software solution helped to monitor different event sources, and, if certain conditions apply, to forward the detected events to HPE's operations management solution.
`,
  },
];

const education = [
  {
    title: "Reutlingen University",
    subtitle: "Master of Science (M.Sc.), Services Computing",
    start: "10/2014",
    end: "08/2016",
    description: "Focus on Cloud Computing, Data Mining and Analytics. Master's thesis at the Institute of Architecture of Application Systems (University of Stuttgart)."
  },
  {
    title: "Esslingen University",
    subtitle: "Bachelor of Engineering (B.Eng.), Information Technology",
    start: "10/2006",
    end: "02/2010",
    description: "Focus on Business Process Management & Software Engineering. Bachelor's thesis at Hewlett Packard Enterprise."
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
