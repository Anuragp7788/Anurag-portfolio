import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, BriefcaseBusiness, Check, ChevronDown, ChevronLeft, ChevronRight, Code2, Download, ExternalLink, FileText, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Presentation, Sparkles, Sun, Moon, X, Maximize2 } from "lucide-react";
import { projects, type Project } from "./data/projects";

type Route = { path: string; params?: Record<string, string> };
function readRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const detail = path.match(/^\/projects\/([^/]+)$/);
  if (detail) return { path: "/projects/:slug", params: { slug: detail[1] } };
  const deck = path.match(/^\/presentations\/([^/]+)$/);
  if (deck) return { path: "/presentations/:slug", params: { slug: deck[1] } };
  return { path };
}
function useRoute() {
  const [route, setRoute] = useState<Route>(() => readRoute());
  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  const navigate = (path: string) => {
    if (window.location.pathname !== path) window.history.pushState({}, "", path);
    setRoute(readRoute());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { route, navigate };
}

const nav = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "About", path: "/about" },
];
const presentations = [
  { slug: "analytics-thinking", title: "How I approach an analytics problem", kind: "Methods & problem solving", description: "A concise walkthrough of turning an ambiguous business question into a measurable decision.", slides: [
    { eyebrow: "01 / THE MINDSET", title: "Start with the decision, not the dataset.", body: "Analytics is useful when it changes what someone does next. Before opening a notebook, clarify the decision, the stakeholder and the cost of getting it wrong.", bullets: ["Who owns the decision?", "What would change if we knew the answer?", "What evidence would be convincing?"] },
    { eyebrow: "02 / FRAME THE PROBLEM", title: "Translate a broad question into a testable one.", body: "Replace vague requests such as “improve growth” with a specific question, a target population, an outcome and a time window.", bullets: ["Define the business outcome", "Identify the customer or process segment", "Write down assumptions and constraints"] },
    { eyebrow: "03 / DEFINE METRICS", title: "Choose one outcome and useful guardrails.", body: "A metric needs a definition, a grain, a denominator and a time window. Guardrails prevent a local improvement from damaging the wider system.", bullets: ["Primary KPI: the result we want to move", "Input metrics: the drivers we can influence", "Guardrails: quality, cost, risk and customer experience"] },
    { eyebrow: "04 / CHECK THE DATA", title: "Trust the data only after checking it.", body: "Understand where the data comes from and how it is generated. Check missing values, duplicates, freshness, join keys and whether the unit of analysis matches the question.", bullets: ["Validate row-level grain", "Reconcile totals with a trusted source", "Document limitations before interpreting"] },
    { eyebrow: "05 / ANALYSE", title: "Move from description to explanation.", body: "Start with a baseline, segment the result, inspect changes over time and test plausible drivers. Separate correlation from causation.", bullets: ["Establish a baseline and comparison", "Segment by meaningful business dimensions", "Test alternative explanations"] },
    { eyebrow: "06 / COMMUNICATE", title: "Make the recommendation easy to act on.", body: "Lead with the answer. Show the evidence that supports it, explain uncertainty and state the next action. A chart is a tool for a decision, not the final deliverable.", bullets: ["State the conclusion first", "Show only decision-relevant evidence", "Name the owner, next step and measurement plan"] },
    { eyebrow: "07 / LEARN", title: "Close the loop after the recommendation.", body: "A recommendation is a hypothesis until its effect is measured. Define what success looks like, when to review it and what would cause the team to change course.", bullets: ["Set a review date", "Track outcome and guardrails", "Record what changed and what was learned"] },
  ]},
  { slug: "market-vwap", title: "Market regime & VWAP execution", kind: "Financial analytics", description: "A presentation-style walkthrough of a market analysis workflow, with explicit separation between method and performance claims.", slides: [
    { eyebrow: "01 / CONTEXT", title: "Price action needs context.", body: "A trading signal should be evaluated against the market environment in which it appears. Trend, volatility, liquidity and time of day can change how an execution rule behaves.", bullets: ["Define the instrument and session", "Separate signal generation from execution", "Avoid treating every market day as identical"] },
    { eyebrow: "02 / REGIME", title: "Classify the environment before comparing signals.", body: "Regime analysis groups observations into interpretable market conditions. The classification should be simple enough to explain and stable enough to test.", bullets: ["Trend strength and direction", "Realised volatility", "Range expansion, compression and session context"] },
    { eyebrow: "03 / VWAP", title: "Use VWAP as an execution reference.", body: "Volume-weighted average price provides a session benchmark. Distance from VWAP, slope and reclaim or rejection behaviour can be examined as features—not treated as guarantees.", bullets: ["Measure price distance from VWAP", "Track VWAP slope and session timing", "Compare execution quality across regimes"] },
    { eyebrow: "04 / TEST DESIGN", title: "Backtest without leaking future information.", body: "A credible test uses chronological splits, realistic transaction costs and explicit entry and exit rules. Parameter selection belongs inside the training period.", bullets: ["Use out-of-sample evaluation", "Include slippage, fees and spread assumptions", "Report drawdown and risk-adjusted results"] },
    { eyebrow: "05 / RISK", title: "Risk controls matter as much as the entry.", body: "Position sizing, stop logic, exposure limits and drawdown rules determine whether a strategy is operationally viable.", bullets: ["Define risk per trade", "Set daily and portfolio loss limits", "Stress test costs and adverse market conditions"] },
    { eyebrow: "06 / CONCLUSION", title: "Evaluate the process, not a single headline return.", body: "The goal is to understand where a rule works, where it fails and whether the edge survives realistic execution. No performance claim is made in this illustrative presentation.", bullets: ["Compare results by regime", "Inspect trade distribution and tail losses", "Document limitations before deployment"] },
  ]}
];

const Button = ({ children, onClick, variant = "primary" }: { children: React.ReactNode; onClick: () => void; variant?: "primary" | "secondary" | "quiet" }) => (
  <button onClick={onClick} className={`button button-${variant}`}>{children}</button>
);
const SectionHeading = ({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) => (
  <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="muted lead">{description}</p>}</div>
);
const Tag = ({ children }: { children: React.ReactNode }) => <span className="tag">{children}</span>;

function Header({ path, navigate, theme, onToggleTheme }: { path: string; navigate: (path: string) => void; theme: "dark" | "light"; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="nav-wrap">
    <button className="wordmark" onClick={() => navigate("/")} aria-label="Go to homepage"><span className="wordmark-mark">AP<span>·</span></span><span>ANURAG PARKHE<small>INDEPENDENT ANALYTICS PRACTICE</small></span></button>
    <nav className={open ? "nav-links nav-open" : "nav-links"}>{nav.map(item => <button key={item.path} className={path === item.path || (item.path === "/projects" && path.startsWith("/projects")) ? "nav-link active" : "nav-link"} onClick={() => { navigate(item.path); setOpen(false); }}>{item.label}</button>)}</nav>
    <div className="nav-actions"><button className="theme-toggle" onClick={onToggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"} title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>{theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}<span>{theme === "dark" ? "LIGHT" : "DARK"}</span></button><a className="nav-contact" href="mailto:anuragparkhe7755@gmail.com">LET'S TALK <ArrowUpRight size={14}/></a><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button></div>
  </div></header>;
}
function Footer({ navigate }: { navigate: (path: string) => void }) {
  return <footer className="footer"><div><span className="wordmark-mark">AP</span><p>Curious about business problems. Serious about evidence.</p></div><div className="footer-links"><a href="mailto:anuragparkhe7755@gmail.com">Email</a><a href="https://www.linkedin.com/in/anuragparkhe" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Anuragp7788" target="_blank" rel="noreferrer">GitHub</a><button onClick={() => navigate("/")}>Back to top ↑</button></div><small>© {new Date().getFullYear()} Anurag Parkhe · Built for clarity, not noise.</small></footer>;
}
function ProjectCard({ project, navigate }: { project: Project; navigate: (path: string) => void }) {
  return <article className="project-card"><button className="project-art" onClick={() => navigate(`/projects/${project.slug}`)} aria-label={`Open ${project.title}`}><div className={`art-pattern art-${project.visual}`}><span>{project.number}</span><div className="art-lines"><i/><i/><i/><i/></div><strong>{project.visualLabel}</strong></div><span className="card-open"><ArrowUpRight size={18}/></span></button><div className="project-meta"><span className="eyebrow">{project.category}</span><span className="project-status">{project.status}</span></div><h3>{project.title}</h3><p className="muted">{project.summary}</p><div className="tag-row">{project.tools.slice(0, 4).map(t => <Tag key={t}>{t}</Tag>)}</div><button className="text-link" onClick={() => navigate(`/projects/${project.slug}`)}>Explore case study <ArrowRight size={15}/></button></article>;
}
function Home({ navigate, onOpenResume }: { navigate: (path: string) => void; onOpenResume: () => void }) {
  return <main className="quiet-home">
    <section className="quiet-hero page-shell">
      <div className="quiet-hero-copy">
        <p className="quiet-kicker"><span/> ANURAG PARKHE <i>·</i> ANALYTICS & BUSINESS</p>
        <h1>Turning complex<br/>questions into<br/><em>clear decisions.</em></h1>
        <p className="quiet-intro">I use data, structured thinking and practical tools to understand business problems and find what matters.</p>
        <div className="quiet-actions">
          <Button onClick={() => navigate("/projects")}>Explore my work <ArrowUpRight size={16}/></Button>
          <button className="quiet-resume-link" onClick={onOpenResume}>View résumé <ArrowUpRight size={15}/></button>
        </div>
        <div className="quiet-meta"><span>BASED IN INDIA</span><span>SQL · PYTHON · POWER BI</span></div>
      </div>
      <div className="quiet-hero-space" aria-hidden="true"><span>ANALYTICS</span><i/></div>
    </section>

    <section className="quiet-selected page-shell">
      <div className="quiet-section-top"><p className="quiet-label">SELECTED WORK</p><button className="quiet-view-all" onClick={() => navigate("/projects")}>View all projects <ArrowUpRight size={15}/></button></div>
      <div className="quiet-project-list">
        {projects.slice(0,3).map((p,i)=><button className="quiet-project-row" key={p.slug} onClick={() => navigate(`/projects/${p.slug}`)}>
          <span className="quiet-project-index">0{i+1}</span><span className="quiet-project-name">{p.title}<small>{p.category} · {p.tools.slice(0,3).join(" / ")}</small></span><span className="quiet-project-arrow"><ArrowUpRight size={19}/></span>
        </button>)}
      </div>
    </section>

    <section className="quiet-about">
      <div className="page-shell quiet-about-inner">
        <p className="quiet-label">A LITTLE ABOUT ME</p>
        <div><h2>Curious by nature.<br/><em>Practical by design.</em></h2><p>Engineering graduate from IIT (BHU), with experience in fintech analytics and a strong interest in markets, products and how businesses work.</p><button className="quiet-text-link" onClick={() => navigate("/experience")}>More about my experience <ArrowUpRight size={15}/></button></div>
      </div>
    </section>

    <section className="quiet-contact page-shell">
      <p className="quiet-label">HAVE A QUESTION OR AN OPPORTUNITY?</p>
      <div><h2>Let’s make<br/><em>something useful.</em></h2><a href="mailto:anuragparkhe7755@gmail.com">Get in touch <ArrowUpRight size={18}/></a></div>
      <footer><span>© {new Date().getFullYear()} ANURAG PARKHE</span><span><a href="https://www.linkedin.com/in/anuragparkhe" target="_blank" rel="noreferrer">LINKEDIN</a><a href="https://github.com/Anuragp7788" target="_blank" rel="noreferrer">GITHUB</a></span></footer>
    </section>
  </main>;
}
function Projects({ navigate }: { navigate: (path: string) => void }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = category === "All" ? projects : projects.filter(p => p.category === category);
  return <main className="page-shell inner-page"><SectionHeading eyebrow="PROJECT LIBRARY / 01" title="Selected analytical work." description="Each case study explains the problem, approach, tools and what can—and cannot—be concluded from the work."/><div className="filter-row">{categories.map(c=><button key={c} className={category===c?"filter active":"filter"} onClick={()=>setCategory(c)}>{c}</button>)}</div><div className="project-grid">{filtered.map(p=><ProjectCard key={p.slug} project={p} navigate={navigate}/>)}</div></main>;
}
function ProjectDetail({ slug, navigate }: { slug: string; navigate: (path: string) => void }) {
  const p = projects.find(x => x.slug === slug);
  if (!p) return <main className="page-shell inner-page"><h1>Project not found</h1><Button onClick={() => navigate("/projects")}>Back to projects</Button></main>;
  return <main className="page-shell inner-page"><button className="back-link" onClick={() => navigate("/projects")}><ArrowLeft size={16}/> All projects</button><div className="case-hero"><p className="eyebrow">{p.category} · CASE STUDY</p><h1>{p.title}</h1><p className="lead muted">{p.summary}</p><div className="tag-row">{p.tools.map(t=><Tag key={t}>{t}</Tag>)}</div><div className={`case-art art-pattern art-${p.visual}`}><span>{p.number}</span><div className="art-lines"><i/><i/><i/><i/></div><strong>{p.visualLabel}</strong></div></div><div className="case-grid"><aside className="case-aside"><span className="eyebrow">PROJECT NOTES</span><p><b>Status</b><br/>{p.status}</p><p><b>Tools</b><br/>{p.tools.join(" · ")}</p><p><b>Evidence</b><br/>See repository for source materials and reproducibility.</p></aside><div className="case-content"><section><p className="eyebrow">01 / BUSINESS QUESTION</p><h2>{p.problem}</h2><p>{p.context}</p></section><section><p className="eyebrow">02 / APPROACH</p><h2>How the analysis is structured</h2><ul className="rich-list">{p.approach.map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul></section><section><p className="eyebrow">03 / WHAT TO LOOK FOR</p><h2>Interpretation and limitations</h2><p>{p.takeaway}</p><div className="note"><Sparkles size={18}/><p>{p.caveat}</p></div></section><section><p className="eyebrow">04 / NEXT ITERATION</p><h2>How I would take it further</h2><ul className="rich-list">{p.nextSteps.map(x=><li key={x}><ArrowUpRight size={17}/>{x}</li>)}</ul></section></div></div><div className="case-next"><span>CONTINUE EXPLORING</span><Button onClick={() => navigate("/dashboards")}>Open interactive dashboards <ArrowRight size={16}/></Button></div></main>;
}

const dashboardSeries = {
  "30 days": [42,48,45,54,51,62,58,67,64,73,70,78],
  "90 days": [35,39,43,41,49,47,55,53,61,59,68,74],
  "12 months": [28,31,35,33,39,43,41,49,54,52,63,72],
};
function Dashboard() {
  const [period, setPeriod] = useState<keyof typeof dashboardSeries>("90 days");
  const [metric, setMetric] = useState("Revenue index");
  const [segment, setSegment] = useState("All segments");
  const values = dashboardSeries[period].map((v,i)=>Math.round(v * (metric === "Orders index" ? 0.72 : metric === "Conversion index" ? 0.46 : 1) * (segment === "Enterprise" ? 1.16 : segment === "SMB" ? 0.83 : 1) + (i%3)*2));
  const max = Math.max(...values)+10, min = Math.min(...values)-8;
  const points = values.map((v,i)=>`${40+i*54},${210-(v-min)/(max-min)*165}`).join(" ");
  const latest = values[values.length-1], previous = values[values.length-2];
  const change = ((latest-previous)/previous*100).toFixed(1);
  return <main className="page-shell inner-page"><SectionHeading eyebrow="INTERACTIVE DASHBOARD / 01" title="Commercial performance explorer." description="A browser-native demonstration of dashboard interaction. All values below are illustrative sample data—not company results or client performance."/><div className="demo-disclaimer"><Sparkles size={17}/><span>DEMO DATA · NOT ACTUAL BUSINESS PERFORMANCE</span></div><div className="dashboard-shell"><div className="dashboard-toolbar"><div><span className="eyebrow">SAMPLE WORKSPACE</span><h2>Commercial overview</h2></div><div className="dashboard-controls"><label>Period<select value={period} onChange={e=>setPeriod(e.target.value as keyof typeof dashboardSeries)}><option>30 days</option><option>90 days</option><option>12 months</option></select></label><label>Segment<select value={segment} onChange={e=>setSegment(e.target.value)}><option>All segments</option><option>Enterprise</option><option>SMB</option></select></label></div></div><div className="metric-select">{["Revenue index","Orders index","Conversion index"].map(m=><button key={m} className={metric===m?"metric-tab active":"metric-tab"} onClick={()=>setMetric(m)}>{m}</button>)}</div><div className="kpi-grid"><div className="kpi"><span>{metric.toUpperCase()}</span><strong>{latest.toLocaleString("en-IN")}</strong><small className="positive">↑ {change}% vs previous point</small></div><div className="kpi"><span>PERIOD</span><strong>{period}</strong><small>Selected reporting window</small></div><div className="kpi"><span>SEGMENT</span><strong>{segment}</strong><small>Interactive filter</small></div><div className="kpi"><span>DATA TYPE</span><strong>Illustrative</strong><small>Sample series for UI testing</small></div></div><div className="chart-panel"><div className="chart-title"><div><h3>{metric} trend</h3><p>Indexed sample values · 12 observations</p></div><Tag>Interactive</Tag></div><svg viewBox="0 0 680 250" role="img" aria-label={`${metric} illustrative trend line`} className="trend-chart"><defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4263eb" stopOpacity=".2"/><stop offset="100%" stopColor="#4263eb" stopOpacity="0"/></linearGradient></defs>{[45,95,145,195].map(y=><line key={y} x1="40" x2="635" y1={y} y2={y} stroke="#e7ebf2" strokeDasharray="4 5"/>)}<polygon points={`40,210 ${points} 634,210`} fill="url(#areaFill)"/><polyline points={points} fill="none" stroke="#4263eb" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>{values.map((v,i)=><circle key={i} cx={40+i*54} cy={210-(v-min)/(max-min)*165} r="4" fill="#fff" stroke="#4263eb" strokeWidth="2.5"><title>{`Observation ${i+1}: ${v}`}</title></circle>)}</svg><div className="chart-axis"><span>Observation 01</span><span>Observation 06</span><span>Observation 12</span></div></div><div className="table-panel"><div className="chart-title"><div><h3>Observation detail</h3><p>Values update when you change the controls above.</p></div><Tag>{values.length} rows</Tag></div><div className="table-scroll"><table><thead><tr><th>Period</th><th>Index value</th><th>Change</th><th>Segment</th></tr></thead><tbody>{values.map((v,i)=><tr key={i}><td>Point {String(i+1).padStart(2,"0")}</td><td>{v}</td><td className={i===0?"muted":v>=values[i-1]?"positive":"negative"}>{i===0?"—":`${v>=values[i-1]?"+":""}${(v-values[i-1]).toFixed(0)}`}</td><td>{segment}</td></tr>)}</tbody></table></div></div><p className="dashboard-footnote">This dashboard is intentionally self-contained: filters, KPI cards, chart and observation table run inside this portfolio. The sample dataset is not represented as real company data.</p></div></main>;
}
function PresentationLibrary({ navigate }: { navigate: (path: string) => void }) {
  return <main className="page-shell inner-page"><SectionHeading eyebrow="PRESENTATION LIBRARY / 01" title="Ideas, presented clearly." description="Slide-based walkthroughs you can open, navigate and present directly in this website. Use the controls or your keyboard—no external presentation viewer."/><div className="presentation-grid">{presentations.map((p,i)=><article className="presentation-card" key={p.slug}><div className="presentation-cover"><span>0{i+1} / PRESENTATION</span><Presentation size={34}/><strong>{p.title}</strong><small>IN-BROWSER SLIDE DECK</small></div><div className="presentation-info"><Tag>{p.kind}</Tag><p>{p.description}</p><button className="text-link" onClick={()=>navigate(`/presentations/${p.slug}`)}>Open presentation <ArrowUpRight size={16}/></button></div></article>)}</div></main>;
}
function SlideDeck({ slug, navigate }: { slug: string; navigate: (path: string) => void }) {
  const deck = presentations.find(p=>p.slug===slug);
  const [index,setIndex] = useState(0);
  const [overview,setOverview] = useState(false);
  const slide = deck?.slides[index];
  useEffect(()=>{setIndex(0);setOverview(false)},[slug]);
  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();setIndex(i=>Math.min((deck?.slides.length||1)-1,i+1));}if(e.key==="ArrowLeft"){e.preventDefault();setIndex(i=>Math.max(0,i-1));}if(e.key==="Escape"){setOverview(false);}};
    window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key);
  },[deck]);
  if(!deck) return <main className="page-shell inner-page"><h1>Presentation not found</h1><Button onClick={()=>navigate("/presentations")}>Back to presentations</Button></main>;
  return <main className="page-shell inner-page deck-page"><div className="deck-toolbar"><button className="back-link" onClick={()=>navigate("/presentations")}><ArrowLeft size={16}/> All presentations</button><div><span>{deck.title}</span><button className="deck-overview" onClick={()=>setOverview(!overview)}>{overview?"Close overview":"Slide overview"}</button></div></div>{overview?<div className="slide-overview">{deck.slides.map((s,i)=><button key={i} className={index===i?"slide-thumb selected":"slide-thumb"} onClick={()=>{setIndex(i);setOverview(false)}}><span>SLIDE {String(i+1).padStart(2,"0")}</span><b>{s.title}</b><small>{s.eyebrow}</small></button>)}</div>:<section className="slide-stage"><div className="slide-content"><div className="slide-topline"><span>ANURAG PARKHE / FIELD NOTES</span><span>{String(index+1).padStart(2,"0")} — {String(deck.slides.length).padStart(2,"0")}</span></div><p className="eyebrow">{slide?.eyebrow}</p><h1>{slide?.title}</h1><p className="slide-body">{slide?.body}</p><ul>{slide?.bullets.map(b=><li key={b}><span/> {b}</li>)}</ul><div className="slide-footer"><span>{deck.kind.toUpperCase()}</span><span>USE ← → TO NAVIGATE</span></div></div></section>}<div className="deck-controls"><button className="deck-arrow" disabled={index===0} onClick={()=>setIndex(i=>Math.max(0,i-1))}><ChevronLeft/> Previous</button><div className="deck-progress">{deck.slides.map((_,i)=><button aria-label={`Go to slide ${i+1}`} key={i} onClick={()=>setIndex(i)} className={i===index?"progress-dot current":"progress-dot"}/>)}</div><span className="deck-count">{index+1} / {deck.slides.length}</span><button className="deck-arrow" disabled={index===deck.slides.length-1} onClick={()=>setIndex(i=>Math.min(deck.slides.length-1,i+1))}>Next <ChevronRight/></button></div><p className="deck-hint">Tip: use your left and right arrow keys to navigate the presentation.</p></main>;
}
function Experience({ navigate }: { navigate: (path: string) => void }) {
  const items=[{date:"MAY — JUL 2025",role:"Business & Data Analyst Intern",company:"Hightide · FinTech",points:["Worked around options-trading tools and analytical workflows.","Contributed to business and data analysis, dashboard-oriented reporting and decision support."]},{date:"PRODUCT EXPERIMENT",role:"Co-founder",company:"MentorQ Pro · EdTech",points:["Explored a mentoring platform and its customer problem.","Worked on product thinking, demand validation and acquisition experiments."]},{date:"AUG 2024 — MAR 2025",role:"Senior Induction Mentor",company:"Student Counselling Services · IIT (BHU)",points:["Supported onboarding and mentoring for incoming students.","Helped structure communication and student support activities."]},{date:"JUL — OCT 2023",role:"Marketing Executive",company:"Spardha · IIT (BHU)",points:["Contributed to sponsorship outreach and partnership development.","Worked with a team on event marketing and external communication."]}];
  return <main className="page-shell inner-page"><SectionHeading eyebrow="EXPERIENCE / 01" title="Where I've learned by doing." description="A combination of analytical work, product experimentation and team responsibilities."/><div className="timeline">{items.map((x,i)=><article className="timeline-item" key={x.company}><div className="timeline-date">{x.date}</div><div className="timeline-content"><span className="eyebrow">0{i+1}</span><h2>{x.role}</h2><h3>{x.company}</h3><ul className="rich-list">{x.points.map(p=><li key={p}><Check size={17}/>{p}</li>)}</ul></div></article>)}</div><div className="education-card"><GraduationCap size={26}/><div><span className="eyebrow">EDUCATION</span><h2>B.Tech in Ceramic Engineering</h2><p>IIT (BHU), Varanasi · 2022–2026</p></div></div><button className="text-link" onClick={()=>navigate("/about")}>Read more about my approach <ArrowRight size={16}/></button></main>;
}
function About() {
  const skills=[["Analytics","SQL","Python","Pandas","NumPy","Excel","Power BI"],["Product & business","KPI design","Customer segmentation","Business analysis","Growth analysis","Experiment thinking"],["Finance & markets","Options & futures","Market structure","VWAP","Backtesting","Risk management"],["Ways of working","Problem framing","Stakeholder communication","Research","Reporting","Process improvement"]];
  return <main className="page-shell inner-page"><SectionHeading eyebrow="ABOUT / 01" title="An engineer's curiosity. An analyst's toolkit." description="I studied Ceramic Engineering at IIT (BHU), and built a parallel track in business, data and financial analysis."/><div className="about-layout"><img className="profile-image" src="/images/profile-photo.jpg" alt="Anurag Parkhe"/><div className="about-copy"><p>I enjoy understanding how businesses work: where customers experience friction, how products create value, how operations affect margins and how financial decisions should account for risk.</p><p>My experience spans a FinTech internship, an early-stage EdTech product experiment and independent analytical projects. I use Python, SQL, spreadsheets and visualisation to structure questions and communicate evidence.</p><p>I am interested in roles where analysis connects directly to a business decision—across product, business intelligence, finance and operations.</p><div className="about-links"><a href="https://www.linkedin.com/in/anuragparkhe" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ExternalLink size={13}/></a><a href="https://github.com/Anuragp7788" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ExternalLink size={13}/></a></div></div></div><section className="skills-section"><p className="eyebrow">CAPABILITIES</p><h2>Tools are useful. Thinking is the skill.</h2><div className="skills-grid">{skills.map(([name,...items])=><div className="skill-card" key={name}><h3>{name}</h3><div className="tag-row">{items.map(x=><Tag key={x}>{x}</Tag>)}</div></div>)}</div></section></main>;
}

function ResumeViewer({ onClose }: { onClose: () => void }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [onClose]);
  const openFullscreen = () => { const frame = frameRef.current; if (frame?.requestFullscreen) frame.requestFullscreen(); };
  return <div className="resume-overlay" role="dialog" aria-modal="true" aria-label="Résumé viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="resume-window">
      <header className="resume-toolbar"><div><FileText size={17}/><span>ANURAG PARKHE <small>RÉSUMÉ</small></span></div><div className="resume-toolbar-actions"><a href="/resume.pdf" download="Anurag-Parkhe-Resume.pdf"><Download size={15}/> Download</a><button onClick={openFullscreen} aria-label="Open résumé fullscreen" title="Fullscreen"><Maximize2 size={16}/></button><button onClick={onClose} aria-label="Close résumé"><X size={18}/></button></div></header>
      <iframe ref={frameRef} className="resume-frame" src="/resume.pdf#toolbar=1&navpanes=0" title="Anurag Parkhe résumé"/>
    </section>
  </div>;
}

function App() {
  const {route,navigate}=useRoute();
  const [resumeOpen,setResumeOpen] = useState(false);
  const closeResume = () => setResumeOpen(false);
  const [theme,setTheme] = useState<"dark"|"light">(() => {
    const saved = window.localStorage.getItem("anurag-portfolio-theme");
    return saved === "light" ? "light" : "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("anurag-portfolio-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(current => current === "dark" ? "light" : "dark");
  const content=useMemo(()=>{
    if(route.path==="/") return <Home navigate={navigate} onOpenResume={() => setResumeOpen(true)}/>;
    if(route.path==="/projects") return <Projects navigate={navigate}/>;
    if(route.path==="/projects/:slug") return <ProjectDetail slug={route.params?.slug||""} navigate={navigate}/>;
    if(route.path==="/dashboards") return <Dashboard/>;
    if(route.path==="/presentations") return <PresentationLibrary navigate={navigate}/>;
    if(route.path==="/presentations/:slug") return <SlideDeck slug={route.params?.slug||""} navigate={navigate}/>;
    if(route.path==="/experience") return <Experience navigate={navigate}/>;
    if(route.path==="/about") return <About/>;
    return <main className="page-shell inner-page"><SectionHeading eyebrow="404 / NOT FOUND" title="This page doesn't exist."/><Button onClick={()=>navigate("/")}>Return home</Button></main>;
  },[route,navigate]);
  return <div className="app"><Header path={route.path} navigate={navigate} theme={theme} onToggleTheme={toggleTheme}/>{content}<Footer navigate={navigate}/>{resumeOpen && <ResumeViewer onClose={closeResume}/>}</div>;
}
export default App;
