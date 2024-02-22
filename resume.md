---
title: Resume
---

<script setup lang="ts">
const experience = [
  {
    title: "Senior Software Engineer",
    subtitle: "Anaqor - Full-Time, Remote",
    start: "01/2023",
    end: "present",
    location: "Berlin, Germany",
    description: `
Lead the transformation of the PlanQK Platform from a research prototype into a public SaaS offering.
Built on top of Kubernetes while embracing continuous delivery to build better software faster.
`,
  },
  {
    title: "Senior Software Engineer",
    subtitle: "StoneOne AG - Full-Time, Remote",
    start: "07/2021",
    end: "12/2022",
    location: "Berlin, Germany",
    description: `
Part of the research project PlanQK.
Designed and built the PlanQK Platform prototype helping quantum value chain players to develop, operate, and monetize quantum services.
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
RnD at HP Operations Manager i:
Certified scrum master and senior software engineer of one feature team.
Strengthened my experience in designing and developing loosely coupled, Java-based software solutions.
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
RnD at HP Operations Manager i:
Moved to the core development team of HPE’s operation management solution.
Gained experience in enterprise-ready software engineering using Java and Angular while supporting three different database products (Oracle, MSSQL, Postgres).
Applied agile software development practices using Scrum (SAFe certification).
Started the M.Sc. course Services Computing part-time at the Reutlingen University.
`,
  },
  {
    title: "Software Design Engineer",
    subtitle: "Hewlett Packard Enterprise - Full-Time",
    start: "06/2012",
    end: "01/2015",
    location: "Böblingen, Germany",
    description: `
RnD at HP BSM Integration Adapter:
Lead the development to productize different monitoring solution adapters, e.g., to integrate Nagios, SAP Solution Manager, Icinga, and Oracle Enterprise Manager into HPe’s operations management solution (HP Operations Manager i).
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
RnD at HP BSM Integration Adapter:
Entry-level position as a software engineer. 
Working on a software solution and integration platform for multiple different monitoring solutions where I mainly developed parts of the Java backend and the web-based Apache Flex application.
The loosely coupled software solution helped to monitor different event sources, and, if certain conditions apply, to forward the detected events to HPE’s operations management solution.
`,
  },
];

const education = [
  {
    title: "Reutlingen University",
    subtitle: "Master of Science (M.Sc.), Services Computing",
    start: "10/2014",
    end: "08/2016",
    description: "Focus on Cloud Computing, Data Mining and Analytics; Master's thesis at the Institute of Architecture of Application Systems (University of Stuttgart)"
  },
  {
    title: "Esslingen University",
    subtitle: "Bachelor of Engineering (B.Eng.), Information Technology",
    start: "10/2006",
    end: "02/2010",
    description: "Focus on Business Process Management & Software Engineering; Bachelor's thesis at Hewlett Packard Enterprise."
  },
];
</script>

# Resume

::: details About Me
With a decade of experience in software development, my career spans roles at traditional tech giants, where I contributed to building enterprise-ready products, to dynamic positions in startups, where I honed my skills in rapidly developing, delivering, and adapting products to meet changing market demands. My diverse background has given me a solid foundation in software design and equipped me with a broad skill set to tackle technological challenges.

Parallel to my professional journey, I have pursued a rigorous path in research, dedicating over four years to contributing to the academic field with 20 research papers, and notably, leading as the first author in 10 of them. My engagement in research has not only refined my analytical and problem solving skills but has also deepened my understanding of complex software systems, particularly in cloud-native environments.

My technical expertise encompasses Java (Spring Framework, Maven), TypeScript, modern web development frameworks (React, Angular, Vue.js, Node), Python, various database systems (Postgres, MySQL, MSSQL, Oracle, Redis), and messaging middleware systems (ActiveMQ, Amazon SQS, Google Pub/Sub). In recent years, I strengthened my experience with Kubernetes to design and develop distributed applications. My expertise in Continuous Integration and Continuous Deployment (CI/CD), a domain where I have both academic and practical experience, helps me to deploy and operate containerized applications on Kubernetes effectively using proven DevOps tools and practices, such as GitOps, Helm, and ArgoCD. I advocate for agile methodologies while practicing Extreme Programming (XP) and Test-Driven Development (TDD) to ensure quality and reliability.

The combination of a strong foundation in software design, extensive research achievements, and practical expertise in software development positions me to contribute to innovative and technologically advanced software solutions, ensuring they are both cutting-edge and grounded in solid academic and practical insights.
:::

## Professional Experience

<ResumeSection :items="experience"></ResumeSection>

## Education

<ResumeSection :items="education"></ResumeSection>
