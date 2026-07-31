import { useState, type ReactNode } from 'react'
import { ArrowRight, Bell, Bot, Boxes, CalendarDays, Check, ChevronDown, CircleHelp, Command, CreditCard, FileText, FolderKanban, LayoutDashboard, Menu, MoreHorizontal, Plus, Search, Settings, Sparkles, Users, X } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { Brand } from './components/Brand'
import { ProjectsPage } from "./components/ProjectsPage";
import { AiAssistantPage } from "./components/AiAssistantPage";
import { CalendarPage } from "./components/CalendarPage";
import { DocumentsPage } from "./components/DocumentsPage";

const data = [{m:'Jan',v:28},{m:'Feb',v:35},{m:'Mar',v:31},{m:'Apr',v:48},{m:'May',v:44},{m:'Jun',v:62},{m:'Jul',v:70}]

function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing')
  return view === 'landing' ? <Landing enter={() => setView('dashboard')} /> : <Dashboard back={() => setView('landing')} />
}

function Landing({ enter }: { enter: () => void }) {
  const [open, setOpen] = useState(false)
  return <main className="site-shell">
    <nav className="marketing-nav">
      <Brand light />
      <div className="nav-links"><a href="#product">Product</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a><a href="#resources">Resources</a></div>
      <div className="nav-actions"><button className="text-button" onClick={enter}>Log in</button><button className="nav-cta" onClick={enter}>Start for free <ArrowRight size={15}/></button></div>
      <button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      {open && <div className="mobile-links"><a href="#product">Product</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a><button onClick={enter}>Open workspace</button></div>}
    </nav>
    <section className="hero">
      <div className="eyebrow"><Sparkles size={14}/> Built for teams that move fast</div>
      <h1>Turn momentum into<br/><em>meaningful work.</em></h1>
      <p>FlowPilot AI brings projects, people, and intelligent automation into one beautifully focused workspace.</p>
      <div className="hero-actions"><button className="primary-button" onClick={enter}>Start building for free <ArrowRight size={17}/></button><button className="secondary-button"><span className="play">▶</span> Watch the film</button></div>
      <div className="trust"><span>Trusted by teams at</span><b>ARC</b><b>spatial</b><b>luma</b><b>northstar</b><b>vertex</b></div>
    </section>
    <section className="preview-wrap" id="product"><div className="preview-glow"/><DashboardPreview/></section>
    <section className="logos" id="solutions"><p>ONE WORKSPACE. EVERY POSSIBILITY.</p><div><span>01</span><span>atlas</span><span>monday</span><span>Public</span><span>harvest</span></div></section>
    <section className="feature-section"><div><p className="section-kicker">INTELLIGENCE, WITHOUT THE NOISE</p><h2>Your team’s focus,<br/>finally <i>compounded.</i></h2></div><p className="feature-copy">Replace fragmented tools with a calm, intelligent workspace that turns every decision into forward motion.</p></section>
    <section className="feature-grid"><Feature icon={<Bot/>} number="01" title="An AI that knows your work" text="Ask better questions with complete workspace context, not just a blank chat box."/><Feature icon={<FolderKanban/>} number="02" title="Projects that stay in flow" text="A flexible system that makes progress visible, without getting in the way."/><Feature icon={<Users/>} number="03" title="A pulse on every team" text="Understand what is moving, blocked, and ready for your attention."/></section>
    <section className="cta-banner" id="pricing"><span className="halo"/><p className="section-kicker">READY WHEN YOU ARE</p><h2>Make space for<br/><i>your best work.</i></h2><button className="primary-button" onClick={enter}>Build your workspace <ArrowRight size={17}/></button></section>
    <footer><Brand light/><span>© 2026 FlowPilot AI. Built for the future of work.</span><span>Privacy · Terms · Contact</span></footer>
  </main>
}

function Feature({ icon, number, title, text }: { icon: ReactNode, number:string, title:string, text:string }) { return <article className="feature-card"><div className="feature-icon">{icon}</div><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#product">Explore more <ArrowRight size={15}/></a></article> }

function DashboardPreview() { return <div className="product-preview"><div className="preview-sidebar"><div className="mini-logo">F</div>{[LayoutDashboard,FolderKanban,Bot,CalendarDays,Users].map((Icon,i)=><Icon key={i} size={17} className={i===0?'active':''}/>)}</div><div className="preview-main"><div className="preview-top"><span>Overview</span><div><Search size={15}/><Bell size={15}/><span className="avatar">AP</span></div></div><div className="preview-hello"><span>Tuesday, 24 June</span><h3>Good morning, Adhiraj <span>✦</span></h3><p>Here is what’s happening across your workspace.</p></div><div className="mini-cards"><div><span>Active projects</span><b>12</b><small>↑ 18.2% from last month</small></div><div><span>Team velocity</span><b>86%</b><small>↑ 12.4% from last month</small></div><div><span>AI actions</span><b>1,248</b><small>↑ 24.8% from last month</small></div></div><div className="mini-bottom"><div className="mini-chart"><span>Work velocity</span><div className="chart-lines">╱╲__╱╲___╱╲</div></div><div className="mini-task"><span>Up next</span><p><i/> Review onboarding flow</p><p><i/> Finalize brand narrative</p><p><i/> Share sprint update</p></div></div></div></div> }

function Dashboard({ back }: { back: () => void }) {
  const [activePage, setActivePage] = useState<"overview" | "projects" | "ai" | "calendar" | "documents">("overview");
  const [command, setCommand] = useState(false)
  const [dark, setDark] = useState(false)
  return <div className={dark ? 'app dark' : 'app'}>
    <aside className="sidebar"><div className="side-head"><Brand/><button className="collapse" onClick={back}>←</button></div><div className="workspace"><span className="workspace-icon">A</span><span>Aster Studio</span><ChevronDown size={15}/></div><button className="command-button" onClick={()=>setCommand(true)}><Search size={15}/> Search <kbd>⌘ K</kbd></button><div className="nav-label">WORKSPACE</div><nav>
  <button
    className={activePage === "overview" ? "selected" : ""}
    onClick={() => setActivePage("overview")}
  >
    <LayoutDashboard size={17} />
    Overview
  </button>

  <button
    className={activePage === "projects" ? "selected" : ""}
    onClick={() => setActivePage("projects")}
  >
    <FolderKanban size={17} />
    Projects
  </button>

<button
  className={activePage === "ai" ? "selected" : ""}
  onClick={() => setActivePage("ai")}
>
  <Bot size={17} />
  AI Assistant
</button>

<button
  className={activePage === "documents" ? "selected" : ""}
  onClick={() => setActivePage("documents")}
>
  <FileText size={17} />
  Documents
</button>

<button
  className={activePage === "calendar" ? "selected" : ""}
  onClick={() => setActivePage("calendar")}
>
  <CalendarDays size={17} />
  Calendar
</button>

  <button>
    <Users size={17} />
    Team
  </button>
</nav><div className="side-bottom"><button><CircleHelp size={17}/> Help center</button><button><Settings size={17}/> Settings</button><div className="profile"><span className="avatar large">AP</span><div><b>Adhiraj Patel</b><small>Founder</small></div><MoreHorizontal size={17}/></div></div></aside>
    <div className="dashboard-content"><header className="dash-header"><button className="dash-menu"><Menu/></button><div className="crumb"><span>Workspace</span><span>/</span><b>Overview</b></div><div className="header-actions"><button onClick={()=>setDark(!dark)} className="icon-button">◐</button><button className="icon-button"><Bell size={18}/><i/></button><button className="create-button"><Plus size={16}/> Create</button></div></header><main className="dashboard-main">{activePage === "projects" ? (
  <ProjectsPage />
) : activePage === "ai" ? (
  <AiAssistantPage />
) : activePage === "calendar" ? (
  <CalendarPage />
) : activePage === "documents" ? (
  <DocumentsPage />
) : (
<><div className="welcome"><div><p>Tuesday, 24 June</p><h1>Good morning, Adhiraj <span>✦</span></h1><span>Here’s a calm view of what needs your attention.</span></div><button className="ai-brief"><Sparkles size={16}/> Generate daily brief</button></div><section className="stats"><Stat label="Active projects" value="12" change="18.2%" icon={<FolderKanban/>}/><Stat label="Team velocity" value="86%" change="12.4%" icon={<Users/>}/><Stat label="AI actions" value="1,248" change="24.8%" icon={<Sparkles/>}/><Stat label="Monthly spend" value="$842" change="8.6%" icon={<CreditCard/>}/></section><section className="dashboard-grid"><article className="chart-card"><div className="card-title"><div><span>WORK VELOCITY</span><h2>Progress over time</h2></div><button>Last 7 months <ChevronDown size={14}/></button></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7467ff" stopOpacity={.35}/><stop offset="100%" stopColor="#7467ff" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:'#9a9bae',fontSize:12}}/><Tooltip/><Area type="monotone" dataKey="v" stroke="#7a6cff" strokeWidth={2.5} fill="url(#fill)"/></AreaChart></ResponsiveContainer></div></article><article className="upnext"><div className="card-title"><div><span>YOUR FOCUS</span><h2>Up next</h2></div><button className="plain">View all</button></div>{['Review onboarding flow','Finalize brand narrative','Share sprint update'].map((task,i)=><div className="task" key={task}><span className={`task-check c${i}`}>{i===0?<Check size={12}/>:''}</span><div><b>{task}</b><small>{i===0?'Product · Due today':i===1?'Marketing · Tomorrow':'Team · Friday'}</small></div><MoreHorizontal size={17}/></div>)}</article></section><section className="bottom-grid"><article className="project-list"><div className="card-title"><div><span>PROJECTS</span><h2>In motion</h2></div><button className="plain">See projects</button></div>{[['Website redesign','Design','78%'],['Onboarding 2.0','Product','54%'],['Q3 campaign','Marketing','32%']].map(([name,tag,p])=><div className="project-row" key={name}><span className="project-icon">{name[0]}</span><div><b>{name}</b><small>{tag}</small></div><div className="progress"><i style={{width:p}}/><span>{p}</span></div></div>)}</article><article className="ai-card"><div className="ai-orb"><Sparkles/></div><span>FLOWPILOT AI</span><h2>What can I help<br/>move forward?</h2><button onClick={()=>setCommand(true)}>Ask anything <ArrowRight size={15}/></button></article></section></>
)}</main></div>
    {command && <div className="modal-wrap" onClick={()=>setCommand(false)}><div className="command-modal" onClick={e=>e.stopPropagation()}><div><Search size={18}/><input autoFocus placeholder="Ask FlowPilot anything..."/><kbd>Esc</kbd></div><p>SUGGESTED</p><button>Summarize this week’s project activity <ArrowRight size={15}/></button><button>What needs my attention today? <ArrowRight size={15}/></button><button>Draft a team update from recent work <ArrowRight size={15}/></button></div></div>}
  </div>
}

function Stat({label,value,change,icon}:{label:string,value:string,change:string,icon:ReactNode}) {return <article className="stat"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small><b>↑ {change}</b> from last month</small></article>}

export default App
