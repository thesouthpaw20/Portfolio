/**
 * content.js
 * Single source of truth for every piece of copy on the site.
 * Sourced directly from Job Kuriakose George's CV — edit here, never in JSX.
 */

export const profile = {
  firstName: 'Job',
  middleName: 'Kuriakose',
  lastName: 'George',
  fullName: 'Job Kuriakose George',
  role: 'Data Analyst',
  roleLong: 'Data Analyst & AI Automation Engineer',
  tagline: 'Turning operational data into dashboards, forecasts and production tools.',
  // Region only — the full postal address is deliberately not published.
  locationShort: 'Kerala, India',
  email: 'jobkgeorge2k@gmail.com',
  phone: '+91 8075650894',
  phoneHref: '+918075650894',
  linkedin: 'https://www.linkedin.com/in/job-kuriakose-george123',
  linkedinLabel: 'in/job-kuriakose-george123',
  availability: 'Open to data & AI roles',
  summary:
    'Data analyst with a year-plus of experience delivering analytics and AI-driven automation for major enterprise clients, backed by an MSc in Data Analytics and a BSc in Statistics. Works end to end — data extraction and cleaning through modelling, forecasting, and deployment — with Python, SQL, Power BI, and machine learning, turning operational data into dashboards, forecasts, and production tools.',
};

export const navLinks = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'experience', label: 'Experience', index: '02' },
  { id: 'expertise', label: 'Expertise', index: '03' },
  { id: 'education', label: 'Education', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
];

// Self-contained career numbers. The detail lines deliberately describe the
// method rather than naming a project, since the work section is not published.
export const stats = [
  { value: 1600, suffix: '+', label: 'Agreements processed', detail: 'OCR + anomaly detection at scale' },
  { value: 9, suffix: '', label: 'Algorithms benchmarked', detail: 'Side-by-side model comparison' },
  { value: 12, suffix: '', label: 'Departments analysed', detail: 'Clustering & logistic regression' },
  { value: 4, suffix: '', label: 'Certifications earned', detail: 'Kaggle · DataCamp · Microsoft' },
];

export const marqueeItems = [
  'Python',
  'SQL',
  'Power BI',
  'Machine Learning',
  'ARIMA Forecasting',
  'Graph Neural Networks',
  'RAG / LLMs',
  'Tableau',
  'R',
  'KNIME',
  'Statistical Modelling',
  'Flask',
];

export const aboutHighlights = [
  {
    title: 'End to end, not hand-off to hand-off',
    body: 'Extraction and cleaning through modelling, forecasting and deployment — the whole path from raw operational data to something a team actually opens every morning.',
  },
  {
    title: 'Statistics first, then the model',
    body: 'A BSc in Statistics underneath an MSc in Data Analytics. Models get benchmarked on accuracy, F1, MSE and R² before anyone calls them a recommendation.',
  },
  {
    title: 'Built for enterprise floors',
    body: 'RAG search over unstructured engineering blueprints, RBAC audit tooling across AD-enabled accounts, ARIMA demand forecasts driving live inventory decisions.',
  },
];

export const experience = [
  {
    id: 'ajalabs',
    company: 'Ajalabs.ai',
    role: 'Data Analyst',
    period: 'Jun 2025 — Present',
    year: '2025',
    status: 'current',
    summary:
      'Analytics and AI-driven automation for major enterprise clients, owned from extraction through deployment.',
    points: [
      'Delivered end-to-end data analysis and AI-driven automation for major enterprise clients, spanning data extraction, cleaning, modelling and deployment.',
      'Built a Retrieval-Augmented Generation (RAG) chatbot over internal engineering blueprints, enabling natural-language search across previously unstructured technical documentation.',
      'Developed a role-based access control (RBAC) audit tool checking AD-enabled status, designation–role alignment, employee–manager role parity, application access, and 6-month inactive-login detection.',
    ],
    stack: ['Python', 'RAG / LLMs', 'SQL', 'Power BI', 'Automation'],
  },
  {
    id: 'promise',
    company: 'Promise Packagings',
    role: 'Data Analyst Intern',
    period: 'Jan 2025 — Mar 2025',
    year: '2025',
    status: 'past',
    summary:
      'Demand forecasting on large procurement datasets, benchmarked against tree-based baselines.',
    points: [
      'Ran purchase and sales analysis on large procurement datasets, using ARIMA forecasting to surface demand trends for inventory and financial decisions.',
      'Benchmarked ARIMA against Random Forest on accuracy, F1, MSE and R², then recommended data-driven strategies to optimise inventory and reduce waste.',
    ],
    stack: ['ARIMA', 'Random Forest', 'Python', 'Forecasting'],
  },
  {
    id: 'internships',
    company: 'Encryptix · Prodigy Infotech',
    role: 'Machine Learning & Data Science Intern',
    period: '2024 · Remote',
    year: '2024',
    status: 'past',
    summary: 'Task-based virtual internships across the applied ML lifecycle.',
    points: [
      'Completed task-based virtual internships in ML model development, evaluation, and applied data science methods.',
    ],
    stack: ['Model Development', 'Evaluation', 'Applied DS'],
  },
];

// NOT CURRENTLY RENDERED. The work/projects section is unpublished — the data
// and its <Projects /> component are kept intact so it can be switched back on
// by restoring the import and the <Projects /> line in App.jsx.
export const projects = [
  {
    id: 'fraud',
    index: '01',
    title: 'Rental Agreement Fraud Detection System',
    category: 'Applied ML · Graph Learning',
    blurb:
      'An OCR-to-graph pipeline that reads rental agreements at scale, measures how far each one sits from the norm, and surfaces the anomalies as live fraud signals.',
    points: [
      'Processed 1,600+ rental agreements with OCR and applied distance-metric analysis to flag anomalies and fraud patterns.',
      'Built and compared multiple ML models — Hierarchical Clustering, K-Means, SVM and Graph Neural Networks — for fraud detection.',
      'Deployed a Flask web app with GNN-based graph visualisation and live fraud prediction, plus Power BI dashboards for distance metrics and fraud indicators.',
    ],
    stack: ['OCR', 'Graph Neural Networks', 'K-Means', 'SVM', 'Flask', 'Power BI'],
    metric: { value: '1,600+', label: 'agreements processed' },
  },
  {
    id: 'anode',
    index: '02',
    title: 'AutoML Analytics Platform — Anode',
    category: 'Platform · End-to-End ML Pipeline',
    blurb:
      'A self-service pipeline that takes a raw upload through preprocessing, cleaning and feature selection, then trains nine algorithms side by side and lets the results argue for themselves.',
    points: [
      'Built dataset upload with automated preprocessing, data cleaning, quality reporting and intelligent feature selection.',
      'Created a multi-model training interface supporting nine algorithms with a side-by-side performance-comparison dashboard.',
    ],
    stack: ['AutoML', 'Python', 'Feature Selection', 'Model Comparison'],
    metric: { value: '9', label: 'algorithms compared' },
  },
  {
    id: 'elective',
    index: '03',
    title: 'Open Course Elective Analysis',
    category: 'Statistical Research · 2019–2020',
    blurb:
      'A study of how students actually choose electives across an entire institution — clustering the patterns, then modelling them well enough to predict the next allotment.',
    points: [
      'Analysed elective selection across 12 departments in Python, applying K-Means clustering and multinomial logistic regression to identify patterns and predict allotments.',
    ],
    stack: ['K-Means', 'Multinomial Logistic Regression', 'Python'],
    metric: { value: '12', label: 'departments analysed' },
  },
];

export const skillGroups = [
  {
    id: 'data',
    label: 'Data & Analytics',
    caption: 'Finding the signal and making it legible.',
    items: [
      'Data analysis',
      'Statistical modelling',
      'Machine learning',
      'Power BI',
      'Tableau',
      'KNIME',
      'MS Excel',
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    caption: 'The working languages.',
    items: ['Python', 'SQL', 'R'],
  },
  {
    id: 'ml',
    label: 'ML & AI',
    caption: 'Forecasting, clustering, graphs and retrieval.',
    items: [
      'Forecasting (ARIMA)',
      'Clustering (K-Means, hierarchical)',
      'SVM',
      'Graph Neural Networks',
      'RAG / LLMs',
    ],
  },
  {
    id: 'dev',
    label: 'Development',
    caption: 'Shipping the model as a product.',
    items: ['Flask'],
  },
];

export const education = [
  {
    id: 'msc',
    degree: 'MSc Computer Science',
    focus: 'Data Analytics',
    institution: 'Rajagiri College of Social Sciences (Autonomous)',
    period: '2023 — 2025',
  },
  {
    id: 'bsc',
    degree: 'BSc Statistics',
    focus: null,
    institution: 'Mar Athanasius College (Autonomous), Kothamangalam',
    period: '2020 — 2023',
  },
  {
    id: 'hss',
    degree: 'Higher Secondary, Class XII',
    focus: '94%',
    institution: "St Peter's HSS",
    period: '2018 — 2020',
  },
];

export const certifications = [
  { name: 'Data Science with Python', issuer: 'Great Learning' },
  { name: 'Introduction to Machine Learning', issuer: 'Kaggle' },
  { name: 'Introduction to Python', issuer: 'DataCamp' },
  { name: 'Excel & Copilot Fundamentals', issuer: 'Microsoft' },
];

export const socials = [
  { label: 'LinkedIn', href: profile.linkedin, handle: profile.linkedinLabel },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
  { label: 'Phone', href: `tel:${profile.phoneHref}`, handle: profile.phone },
];
