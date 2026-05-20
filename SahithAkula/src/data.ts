export const PORTFOLIO_DATA = {
  bio: {
    name: "SAHITH AKULA",
    role: "FULL STACK & AI ENGINEER",
    description: "Full Stack & AI Engineer building scalable backend systems and intelligent applications.",
    email: "akulasahith268@gmail.com",
    location: "Vijayawada, AP",
    phone: "+91 8341999296"
  },
  apart: [
    {
      id: '01',
      category: 'BACKEND ENGINEERING',
      title: 'SCALABLE SYSTEMS',
      desc: 'Designing scalable backend architectures, REST APIs, and microservices using Spring Boot, Node.js, and modern engineering practices.',
    },
    {
      id: '02',
      category: 'FULL STACK DEVELOPMENT',
      title: 'END-TO-END APPLICATIONS',
      desc: 'Building responsive web and mobile applications using React, Flutter, and modern full-stack technologies with production-focused development.',
    },
    {
      id: '03',
      category: 'AI / ML ENGINEERING',
      title: 'INTELLIGENT APPLICATIONS',
      desc: 'Exploring Machine Learning, Deep Learning, LLMs, RAG pipelines, and agentic AI workflows to develop intelligent real-world systems.',
    },
    {
      id: '04',
      category: 'CLOUD & DEVOPS',
      title: 'MODERN DEPLOYMENT',
      desc: 'Containerizing and deploying applications using Docker, GitHub Actions, AWS, and scalable CI/CD workflows.',
    }
  ]
  ,
  artworks: [
    {
      id: "1",
      title: "TRAFFIC SIGN RECOGNITION & ALERT",
      description: "Trained a YOLOv12 model on Indian traffic sign data with a Flask+Spring Boot+MongoDB stack, achieving real-time alerts.",
      imageUrl: "/traffic.jpg",
      aspectRatio: 737 / 223,
      videoUrl: "",
      demoUrl: "",
      paperUrl: "https://drive.google.com/drive/u/0/folders/1OfMVylGdW3eYLVlDGaPnad63w9T1Y0Af",
      githubUrl: "https://github.com/akula-sahith",
      detailed: {
        problemStatement: "Need an automated way to detect traffic violations and correlate vehicle actions with traffic signs in real-time.",
        solution: "A YOLOv12-based model achieving 95% mAP@50 and an automated violation detection engine reaching 94% accuracy, communicating to a Flutter app within 1-2s.",
        features: ["YOLOv12 Object Detection", "Real-Time 1-2s Alerts", "Flutter Mobile App", "Published Research Paper"],
        techStack: ["Python", "Flask", "Spring Boot", "flutter", "MongoDB", "firebase"]
      }
    },
    {
      id: "2",
      title: "SENTINEL RISK INTELLIGENCE",
      description: "AI-Powered Multi-Business Risk Intelligence Platform running on AWS EC2.",
      imageUrl: "/Sentinel.png",
      aspectRatio: 1898 / 927,
      videoUrl: "",
      demoUrl: "https://sentinelworld.vercel.app/",
      githubUrl: "https://github.com/akula-sahith",
      detailed: {
        problemStatement: "Organizations lack a clear, consolidated view of multi-source business, geopolitical, and supply chain risks in real-time.",
        solution: "A full-stack React+Node.js platform integrating LLM-based intelligence layers to interpret events, generate risk insights, and simulate multi-industry risk impacts.",
        features: ["LLM Intelligence Layer", "Interactive Dashboards", "Event-Driven Data Pipelines", "Dockerized Container App"],
        techStack: ["React", "node.js", "Express", "MongoDB", "Docker", "aws"]
      }
    },
    {
      id: "3",
      title: "ORCHESTRATE SUPPORT TRIAGE AGENT",
      description: "Multi-domain AI-powered support triage system using RAG, ChromaDB, and Gemini for grounded response generation.",
      imageUrl: "/Orchestrate.png",
      aspectRatio: 1898 / 927,
      videoUrl: "",
      demoUrl: "",
      githubUrl: "https://github.com/akula-sahith/Orchestrate",
      detailed: {
        problemStatement: "Organizations handling support operations across multiple ecosystems struggle with routing, escalation, hallucination prevention, and generating safe grounded responses in real-time.",

        solution: "Built a deterministic Single-Agent RAG (Retrieval-Augmented Generation) pipeline capable of handling support tickets across HackerRank, Claude, and Visa ecosystems. The system performs company-aware routing, metadata-filtered retrieval, escalation handling, and structured response generation using Gemini and ChromaDB.",

        features: [
          "Metadata-Filtered RAG Pipeline",
          "Multi-Domain Ticket Routing",
          "Deterministic Escalation Logic",
          "Structured Outputs using Pydantic",
          "Semantic Search with ChromaDB",
          "Grounded Response Generation",
          "Hallucination Reduction Techniques",
          "Local Embedding Pipeline",
          "CSV-Based Batch Ticket Processing"
        ],

        techStack: [
          "Python",
          "LangChain",
          "Gemini 1.5 Flash",
          "ChromaDB",
          "Sentence Transformers",
          "Pydantic",
          "Pandas",
          "scikit-learn"
        ]
      }
    },
    {
      id: "4",
      title: "AI CAREER ASSISTANCE",
      description: "Platform integrating ATS scoring, RAG chatbots, and browser automation to streamline applications.",
      imageUrl: "/Career.png",
      aspectRatio: 1901 / 927,
      videoUrl: "",
      demoUrl: "https://vzg-hck.vercel.app/",
      githubUrl: "https://github.com/akula-sahith",
      detailed: {
        problemStatement: "Candidates struggle to align resumes to job descriptions and spend tedious hours applying on multiple platforms.",
        solution: "An intelligent platform combining NLP+LLM ATS scoring, interview preparation modules, and a unique one-click apply system built using browser automation.",
        features: ["NLP AI Resume Optimization", "RAG based Interview Chatbot", "One-Click Browser Automation Applier"],
        techStack: ["React", "Express", "MongoDB", "Python"]
      }
    },
    {
      id: "5",
      title: "URBAN EYE",
      description: "Smart City Dashboard visualizing real-time city data — traffic, pollution, and live events — through interactive maps and charts.",
      imageUrl: "/urbaneye.png",
      aspectRatio: 16 / 9,
      videoUrl: "",
      demoUrl: "https://urban-eye-wine.vercel.app",
      paperUrl: "",
      githubUrl: "https://github.com/akula-sahith/UrbanEye",
      detailed: {
        problemStatement: "City administrators and citizens lack a unified, real-time view of urban metrics like traffic congestion, air quality, and local events across their city.",
        solution: "An interactive smart city dashboard that aggregates and visualizes live urban data streams through dynamic charts, geospatial maps, and real-time event feeds with a clean, data-driven UI.",
        features: ["Real-Time Traffic Visualization", "Pollution & Air Quality Tracking", "Interactive City Event Map", "Live Data Updates & Charts"],
        techStack: ["React", "node.js", "MongoDB", "tailwindcss"]
      }
    },
    {
      id: "6",
      title: "TOURIX",
      description: "Travel & Tourism platform enabling seamless trip discovery, booking, and itinerary management with an immersive front-end experience.",
      imageUrl: "/tourix.png",
      aspectRatio: 16 / 9,
      videoUrl: "",
      demoUrl: "https://tourix-frontend-fawn.vercel.app",
      paperUrl: "",
      githubUrl: "https://github.com/akula-sahith/Tourix-Frontend",
      detailed: {
        problemStatement: "Travelers struggle to discover, plan, and book trips from a single platform, often navigating multiple fragmented services for destinations, stays, and itineraries.",
        solution: "A full-featured tourism frontend that provides curated destination discovery, trip planning flows, and booking interfaces with smooth animations and a modern, immersive UI/UX.",
        features: ["Destination Discovery & Search", "Trip Itinerary Planning", "Booking & Reservation Flows", "Immersive Animated UI"],
        techStack: ["React", "tailwindcss", "node.js", "MongoDB"]
      }
    }
  ],
  manifesto: [
    {
      id: '01',
      category: 'STRATEGY',
      title: 'ATTENTION THAT MATTERS',
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: '02',
      category: 'TECH',
      title: 'SCALABLE ARCHITECTURE',
      imageUrl: "https://images.unsplash.com/photo-1481481322814-3d601de11171?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: '03',
      category: 'UX & UI',
      title: 'EMOTIONAL INTERFACES',
      imageUrl: "https://images.unsplash.com/photo-1616077168079-7e090ce23f95?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: '04',
      category: 'FUTURE',
      title: 'AI-DRIVEN LOGIC',
      imageUrl: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&q=80&w=800"
    }
  ],
  certifications: [
    {
      id: 'c1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'Mar 2026',
      fileId: '1wrJMQTQdU_bbpObnXmtLhOZTY29vu-pb',
      category: 'Cloud'
    },
    {
      id: 'c2',
      title: 'Docker Mastery',
      issuer: 'Udemy',
      date: 'May 2026',
      fileId: '1dcE7k3GkCvM_07BK_MPB27mFcWyP9c9-',
      category: 'DevOps'
    },
    {
      id: 'c3',
      title: 'Spring Boot Development',
      issuer: 'Udemy',
      date: 'May 2026',
      fileId: '1SMWQ_zZ_oKJSCUd1V9JtkkcsKonpEWEO',
      category: 'Backend'
    },
    {
      id: 'c4',
      title: 'CLA: Programming Essentials in C',
      issuer: 'Cisco Networking Academy',
      date: 'Jan 2024',
      fileId: '1_Tcymn02xdnybudmeeX2krKvrEtbYBLq',
      category: 'Programming'
    },
    {
      id: 'c5',
      title: 'CPA: Programming Essentials in C++',
      issuer: 'Cisco Networking Academy',
      date: 'Sep 2024',
      fileId: '1fLuNF5acrg0zzFrbdj43HpKSkmjZUApW',
      category: 'Programming'
    },
    {
      id: 'c5',
      title: 'PCAP: Programming Essentials in Python',
      issuer: 'Cisco Networking Academy',
      date: 'May4 2024',
      fileId: '1UwJYANXvxomoMRbY-CfACoLX8SlDPb-R',
      category: 'Programming'
    },
    {
      id: 'c6',
      title: 'Java Programming for Beginners',
      issuer: 'SkillUp by Simplilearn',
      date: 'Sep 2023',
      fileId: '17mIDXzQIPO9cH0yvqTa4vRc7IpPeGfMq',
      category: 'Programming'
    },
    {
      id: 'c7',
      title: 'Java (Basic)',
      issuer: 'HackerRank',
      date: 'Jan 2025',
      fileId: '1uf2mA0QHoP4bGVKWcpJC96GFBzEWeqUt',
      category: 'Programming'
    },
    {
      id: 'c8',
      title: 'Python (Basic)',
      issuer: 'HackerRank',
      date: 'Jan 2025',
      fileId: '10VCkER-d3jSrF5Spnm0MI9OYX3trTrWX',
      category: 'Programming'
    },
    {
      id: 'c9',
      title: 'The Joy of Computing Using Python',
      issuer: 'NPTEL / IIT Madras',
      date: 'Oct 2024',
      fileId: '1CpodCn7LFJpLQfNGGQaAGlfq-22Y2ZNt',
      category: 'AI/ML'
    },
    {
      id: 'c10',
      title: 'Understanding Incubation and Entrepreneurship',
      issuer: 'NPTEL / IIT Madras',
      date: 'Oct 2025',
      fileId: '1efOFBCBeUskCHd9D4e0aHKSIALQEoOHU',
      category: 'Entrepreneurship'
    }
  ]
};
