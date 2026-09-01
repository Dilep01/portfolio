import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

export const dynamic = 'force-static';

const stats = [
  ['100+', 'test cases'],
  ['8', 'releases'],
  ['3', 'AI/ML builds'],
  ['2025', 'client award'],
];

const skillGroups = [
  {
    index: '01', title: 'Data & modeling', icon: ScanSearch,
    skills: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'LightGBM', 'Feature engineering', 'Model evaluation'],
  },
  {
    index: '02', title: 'Explainability & MLOps', icon: ShieldCheck,
    skills: ['SHAP', 'MLflow', 'Optuna', 'Drift detection', 'Model monitoring', 'Auditable decisions'],
  },
  {
    index: '03', title: 'AI engineering', icon: BrainCircuit,
    skills: ['Ollama', 'Qwen', 'Mem0', 'Qdrant', 'Local embeddings', 'Long-term memory'],
  },
  {
    index: '04', title: 'Delivery & quality', icon: Code2,
    skills: ['FastAPI', 'Streamlit', 'Docker', 'PostgreSQL', 'SQLAlchemy', 'Git', 'pytest', 'Pydantic'],
  },
];

const projects = [
  {
    number: '01', label: 'Local AI · Memory systems', title: 'Self-Learning AI Agent',
    summary: 'A privacy-conscious conversational agent that retrieves user-specific long-term memories before every response—without retraining model weights.',
    highlights: ['Local models and embeddings with no required paid cloud API', 'Message-ID provenance validation before durable memory writes', 'User-scoped memory retrieval, listing, deletion, and auditable summaries'],
    tech: ['Python', 'FastAPI', 'Ollama', 'Qwen', 'Mem0', 'Qdrant', 'PostgreSQL', 'Docker'],
    flow: ['Message', 'Recall', 'Respond', 'Validate', 'Remember'],
    href: 'https://github.com/Dilep01/self-learning-ai-agent',
  },
  {
    number: '02', label: 'Fintech · Explainable ML', title: 'Explainable Credit Risk Engine',
    summary: 'An auditable risk-decisioning platform that turns default probability into a 300–850 score and an APPROVE, REFER, or DECLINE recommendation.',
    highlights: ['Ranked SHAP reason codes and plain-English decision explanations', 'Configurable policy thresholds with auditable FastAPI responses', 'Automated tests for training, scoring, and decision logic'],
    tech: ['Python', 'scikit-learn', 'LightGBM', 'SHAP', 'Optuna', 'FastAPI', 'pytest'],
    flow: ['Applicant', 'Features', 'PD model', 'Reasons', 'Decision'],
    href: 'https://github.com/Dilep01/explainable-credit-risk-engine',
    note: 'Synthetic demonstration data—not validated for real lending decisions.',
  },
  {
    number: '03', label: 'Fraud · Risk intelligence', title: 'Transaction Fraud Intelligence Platform',
    summary: 'An end-to-end fraud platform combining deterministic rules, ML risk scoring, explainability, local streaming replay, and analyst monitoring.',
    highlights: ['50,000-row PaySim-format dataset with 18 behavioral features', 'Compared four models with precision, recall, F1, and PR-AUC', 'SHAP explanations, MLflow tracking, PSI/KS drift checks, and Streamlit dashboard'],
    tech: ['XGBoost', 'LightGBM', 'SHAP', 'MLflow', 'FastAPI', 'Streamlit', 'Docker'],
    flow: ['Stream', 'Features', 'Rules + ML', 'Decision', 'Monitor'],
    href: 'https://github.com/Dilep01/real-time-transaction-fraud-risk-intelligence-platform',
    note: 'Streaming is a timestamp-ordered local replay; no production metrics are claimed.',
  },
];

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#home" aria-label="Dilep Kumar K — home">DK<span>.</span></a>
        <div className="nav-links">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="nav-cta" href="./Dilep_Kumar_K_Resume.docx" download>
          Résumé <ArrowDownRight size={15} />
        </a>
        <details className="mobile-nav">
          <summary aria-label="Toggle navigation"><Menu size={21} /></summary>
          <div className="mobile-menu">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </div>
        </details>
      </nav>

      <section id="home" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Data science · Machine learning · Explainable AI</p>
          <h1>I build AI systems people can <em>understand</em> and trust.</h1>
          <p className="hero-lede">
            I’m Dilep Kumar K — a Computer Science graduate and former testing professional building reliable machine-learning systems for credit risk, fraud intelligence, and local AI agents.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
            <a className="button button-ghost" href="mailto:dilepdeepu001@gmail.com">Start a conversation</a>
          </div>
          <div className="social-row" aria-label="Social links">
            <a href="https://github.com/Dilep01" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
            <a href="https://www.linkedin.com/in/dilep-kumar-k-a70449245" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
            <a href="mailto:dilepdeepu001@gmail.com"><Mail size={18} /> Email</a>
          </div>
        </div>

        <div className="portrait-stage">
          <div className="portrait-frame"><img src="./dilep-photo.jpeg" alt="Portrait of Dilep Kumar K" /></div>
          <div className="availability-card">
            <span className="status-dot" />
            <div><strong>Open to opportunities</strong><small><MapPin size={13} /> Mysore, Karnataka</small></div>
          </div>
          <div className="code-note" aria-hidden="true"><span>focus</span><strong>explainable_ai</strong></div>
        </div>
      </section>

      <section className="stat-band section-shell" aria-label="Career highlights">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section id="about" className="content-section section-shell about-grid">
        <div>
          <p className="section-index">01 / About</p>
          <h2>A tester’s discipline,<br />applied to machine learning.</h2>
        </div>
        <div className="about-copy">
          <p className="lead-copy">I moved from validating production software to building data products—carrying the same care for evidence, failure modes, and quality into every model.</p>
          <p>My work sits where machine learning meets accountable engineering: explainable financial-risk decisions, behavior-aware fraud systems, and local AI agents with auditable memory. I’m looking for an entry-level Data Scientist, ML Engineer, or AI Engineer role where dependable execution matters.</p>
          <blockquote>“Validate assumptions. Measure the right outcomes. Explain every decision.”</blockquote>
        </div>
      </section>

      <section id="skills" className="content-section skills-wrap">
        <div className="section-shell">
          <div className="section-heading">
            <div><p className="section-index">02 / Capabilities</p><h2>From data to a<br />dependable system.</h2></div>
            <p>I work across the full path: explore, model, explain, serve, monitor, and test.</p>
          </div>
          <div className="skills-grid">
            {skillGroups.map(({ index, title, icon: Icon, skills }) => (
              <article className="skill-card" key={title}>
                <div className="skill-card-head"><span>{index}</span><Icon size={25} /></div>
                <h3>{title}</h3>
                <div className="tag-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="content-section section-shell experience-grid">
        <div>
          <p className="section-index">03 / Experience</p>
          <h2>Quality work,<br />under real release pressure.</h2>
          <div className="award-chip"><Award size={18} /><span><strong>Client Champion Award</strong>Arteria Technologies · 2025</span></div>
        </div>
        <article className="timeline-card">
          <div className="timeline-meta"><span>Sep 2024 — Mar 2026</span><span>Bengaluru, Karnataka</span></div>
          <h3>Testing Trainee</h3>
          <p className="company">Arteria Technologies Private Limited</p>
          <ul>
            <li><CheckCircle2 size={17} />Created and executed 100+ functional and end-to-end SAP/CPI test cases.</li>
            <li><CheckCircle2 size={17} />Tested 30+ CPI iFlows and supported validation across 8 production releases.</li>
            <li><CheckCircle2 size={17} />Identified 10+ requirement defects and worked through resolution and retesting.</li>
            <li><CheckCircle2 size={17} />Prepared daily production-data reports throughout an 18-month tenure.</li>
          </ul>
        </article>
      </section>

      <section id="projects" className="content-section projects-wrap">
        <div className="section-shell">
          <div className="section-heading project-heading">
            <div><p className="section-index">04 / Selected work</p><h2>Built beyond<br />the notebook.</h2></div>
            <p>Three end-to-end builds that connect models to decisions, interfaces, tests, and operational guardrails.</p>
          </div>
          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-number">{project.number}</div>
                <div className="project-main">
                  <p className="project-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="project-highlights">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                  {project.note && <p className="project-note">{project.note}</p>}
                  <div className="tag-list project-tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
                  <a className="project-link" href={project.href} target="_blank" rel="noreferrer">Explore repository <ArrowUpRight size={17} /></a>
                </div>
                <div className="flow-card" aria-label={`${project.title} workflow`}>
                  <p>System flow</p>
                  {project.flow.map((step, index) => (
                    <div className="flow-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < project.flow.length - 1 && <i />}</div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="content-section section-shell">
        <div className="section-heading">
          <div><p className="section-index">05 / Education & credentials</p><h2>Learning with<br />purpose.</h2></div>
          <p>Formal computer-science training, advanced data-science study, and hands-on technical challenges.</p>
        </div>
        <div className="education-grid">
          <article className="education-card featured-education">
            <GraduationCap size={28} /><span>2024</span><h3>Bachelor of Engineering</h3><p>Computer Science and Engineering<br />ATME College of Engineering</p><strong>CGPA · 7.62</strong>
          </article>
          <article className="education-card">
            <BrainCircuit size={28} /><span>Pursuing · 2026</span><h3>Advanced Certification</h3><p>Data Science and AI<br />iHUB IIT Roorkee</p>
          </article>
          <article className="education-card activity-card">
            <Award size={28} /><span>Activities</span><h3>National hackathons</h3><p>Ethical Hacking & Cyber Security · 2022<br />Intercollegiate Hackazon · 2023</p>
          </article>
        </div>
      </section>

      <section id="resume" className="resume-section section-shell">
        <div>
          <p className="section-index">06 / Résumé</p>
          <h2>Want the complete picture?</h2>
          <p>Download a concise overview of my experience, skills, projects, education, and achievements.</p>
        </div>
        <a className="resume-download" href="./Dilep_Kumar_K_Resume.docx" download><Download size={24} /><span><strong>Download résumé</strong><small>DOCX · Updated 2026</small></span></a>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-shell contact-inner">
          <p className="section-index">07 / Contact</p>
          <h2>Let’s build reliable<br /><em>AI together.</em></h2>
          <p>I’m exploring entry-level opportunities in Data Science, Machine Learning, and AI Engineering. If you’re building explainable, data-driven products, I’d be glad to connect.</p>
          <a className="email-link" href="mailto:dilepdeepu001@gmail.com">dilepdeepu001@gmail.com <ArrowUpRight size={24} /></a>
          <div className="contact-links">
            <a href="https://github.com/Dilep01" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub</a>
            <a href="https://www.linkedin.com/in/dilep-kumar-k-a70449245" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LinkedIn</a>
            <span><MapPin size={18} /> Mysore, Karnataka</span>
          </div>
          <footer><span>© 2026 Dilep Kumar K</span><a href="#home">Back to top <ArrowUpRight size={14} /></a></footer>
        </div>
      </section>
    </main>
  );
}
