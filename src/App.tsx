import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bell,
  Check,
  ChevronDown,
  CircleHelp,
  Filter,
  LayoutDashboard,
  Lightbulb,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import './App.css';

type Status = 'On track' | 'Needs attention' | 'Blocked';
type Area = 'Strategy' | 'Audience' | 'Offer' | 'Channels' | 'Operations';

type CheckItem = {
  id: number;
  title: string;
  description: string;
  area: Area;
  owner: string;
  due: string;
  status: Status;
  score: number;
};

const initialItems: CheckItem[] = [
  { id: 1, title: 'Positioning statement is clear', description: 'One sentence that explains who this is for and why it wins.', area: 'Strategy', owner: 'Nina', due: 'Today', status: 'On track', score: 100 },
  { id: 2, title: 'ICP and buying trigger are defined', description: 'The first customer profile and moment of need are specific enough to target.', area: 'Audience', owner: 'James', due: 'Oct 08', status: 'On track', score: 100 },
  { id: 3, title: 'Launch offer has a compelling hook', description: 'The launch incentive makes the first action feel easy and timely.', area: 'Offer', owner: 'You', due: 'Oct 10', status: 'Needs attention', score: 60 },
  { id: 4, title: 'Proof points are ready for sales', description: 'Testimonials, demos, or results a prospect can trust at a glance.', area: 'Offer', owner: 'Maya', due: 'Oct 11', status: 'Needs attention', score: 40 },
  { id: 5, title: 'Owned launch channels are sequenced', description: 'Email, community, and social posts have one coordinated narrative.', area: 'Channels', owner: 'Nina', due: 'Oct 12', status: 'On track', score: 80 },
  { id: 6, title: 'Conversion path has been tested', description: 'A new visitor can move from first touch to signup without confusion.', area: 'Operations', owner: 'You', due: 'Oct 14', status: 'Blocked', score: 20 },
];

const statusStyles: Record<Status, string> = {
  'On track': 'status-green',
  'Needs attention': 'status-orange',
  Blocked: 'status-red',
};

function ScoreRing({ score }: { score: number }) {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (score / 100) * circumference;
  return (
    <div className="score-ring-wrap">
      <svg className="score-ring" viewBox="0 0 120 120" aria-label={`${score}% ready`}>
        <circle className="score-track" cx="60" cy="60" r={radius} />
        <circle className="score-progress" cx="60" cy="60" r={radius} style={{ strokeDasharray: circumference, strokeDashoffset: dash }} />
      </svg>
      <div className="score-value"><strong>{score}%</strong><span>ready</span></div>
    </div>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [activeArea, setActiveArea] = useState<'All' | Area>('All');
  const [activeStatus, setActiveStatus] = useState<'All' | Status>('All');
  const [query, setQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const filteredItems = useMemo(() => items.filter((item) => {
    const matchesArea = activeArea === 'All' || item.area === activeArea;
    const matchesStatus = activeStatus === 'All' || item.status === activeStatus;
    const matchesQuery = `${item.title} ${item.description} ${item.owner}`.toLowerCase().includes(query.toLowerCase());
    return matchesArea && matchesStatus && matchesQuery;
  }), [items, activeArea, activeStatus, query]);

  const score = Math.round(items.reduce((sum, item) => sum + item.score, 0) / items.length);
  const onTrack = items.filter((item) => item.status === 'On track').length;
  const attention = items.filter((item) => item.status === 'Needs attention').length;
  const blocked = items.filter((item) => item.status === 'Blocked').length;

  const toggleItem = (id: number) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: item.status === 'On track' ? 'Needs attention' : 'On track', score: item.status === 'On track' ? 55 : 100 } : item));
  };

  const addItem = () => {
    setItems((current) => [...current, { id: Date.now(), title: 'New launch readiness check', description: 'Add a concrete signal that needs an owner and a due date.', area: 'Strategy', owner: 'You', due: 'Oct 18', status: 'Needs attention', score: 0 }]);
    setShowAdd(false);
  };

  const exportReview = () => {
    void navigator.clipboard?.writeText(`RASSA Go-to-market readiness: ${score}/100`);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">R</span><span>RASSA</span><span className="brand-dot" /></div>
        <div className="workspace-switcher"><div className="workspace-avatar">GT</div><div><small>Workspace</small><strong>Go-to-market</strong></div><ChevronDown size={15} /></div>
        <nav className="nav-list" aria-label="Main navigation">
          <button className="nav-item active"><LayoutDashboard size={18} />Overview</button>
          <button className="nav-item"><Target size={18} />Readiness checks<span className="nav-count">6</span></button>
          <button className="nav-item"><Users size={18} />Team owners</button>
          <button className="nav-item"><TrendingUp size={18} />Launch signals</button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><Sparkles size={17} /><div><strong>Make the next move</strong><span>Close 2 gaps to reach 80%</span></div></div>
          <button className="nav-item"><Settings2 size={18} />Settings</button>
          <div className="profile"><div className="profile-avatar">DK</div><div><strong>Donny K.</strong><span>Product lead</span></div><MoreHorizontal size={17} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>Go-to-market check</strong></div><div className="top-actions"><button className="icon-button" aria-label="Help"><CircleHelp size={18} /></button><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><button className="avatar-button">DK</button></div></header>

        <section className="page-heading"><div><p className="eyebrow">Launch room · Q4 2026</p><h1>Is this ready<br /><em>for market?</em></h1><p className="intro">A clear view of the signals, gaps, and next moves behind your launch.</p></div><div className="heading-actions"><button className="secondary-button" onClick={exportReview}><ArrowUpRight size={17} />Share review</button><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17} />Add check</button></div></section>

        <section className="overview-grid">
          <div className="readiness-panel"><div><p className="section-label">Overall readiness</p><div className="ready-number">{score}<span>/100</span></div><div className="trend"><TrendingUp size={14} />+8 pts <span>since last review</span></div></div><ScoreRing score={score} /><div className="panel-footer"><span>Last updated 12 min ago</span><button>View score details <ArrowUpRight size={14} /></button></div></div>
          <div className="signal-panel"><div className="panel-title"><div><p className="section-label">Launch signals</p><h2>Momentum is building</h2></div><span className="signal-icon"><TrendingUp size={18} /></span></div><div className="signal-bars"><div className="signal-row"><span>On track</span><div className="bar"><i style={{ width: `${(onTrack / items.length) * 100}%` }} /></div><strong>{onTrack}</strong></div><div className="signal-row"><span>Needs attention</span><div className="bar orange"><i style={{ width: `${(attention / items.length) * 100}%` }} /></div><strong>{attention}</strong></div><div className="signal-row"><span>Blocked</span><div className="bar red"><i style={{ width: `${(blocked / items.length) * 100}%` }} /></div><strong>{blocked}</strong></div></div><div className="signal-callout"><Lightbulb size={17} /><span>Focus on the conversion path next — it is your biggest unlock.</span></div></div>
          <div className="team-panel"><p className="section-label">Team pulse</p><div className="team-avatars"><div className="team-avatar pink">N</div><div className="team-avatar yellow">J</div><div className="team-avatar blue">M</div><div className="team-avatar muted">+2</div></div><h2>5 people are moving this forward</h2><p>2 checks need an owner this week.</p><button className="text-button">See team activity <ArrowUpRight size={14} /></button></div>
        </section>

        <section className="checks-section"><div className="section-header"><div><p className="section-label">Readiness checklist</p><h2>What needs to be true</h2></div><div className="view-toggle"><button className="selected">List</button><button>Board</button></div></div>
          <div className="toolbar"><div className="search-wrap"><Search size={17} /><input aria-label="Search checks" placeholder="Search checks" value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="filter-buttons"><div className="select-wrap"><Filter size={15} /><select value={activeArea} onChange={(event) => setActiveArea(event.target.value as 'All' | Area)}><option value="All">All areas</option>{(['Strategy', 'Audience', 'Offer', 'Channels', 'Operations'] as Area[]).map((area) => <option key={area} value={area}>{area}</option>)}</select></div><div className="select-wrap"><select value={activeStatus} onChange={(event) => setActiveStatus(event.target.value as 'All' | Status)}><option value="All">All statuses</option><option>On track</option><option>Needs attention</option><option>Blocked</option></select></div></div></div>
          <div className="checks-list">{filteredItems.map((item) => <div className="check-row" key={item.id}><button className={`check-box ${item.status === 'On track' ? 'checked' : ''}`} onClick={() => toggleItem(item.id)} aria-label={`Toggle ${item.title}`}>{item.status === 'On track' && <Check size={14} />}</button><div className="check-main"><div className="check-title-line"><h3>{item.title}</h3><span className="area-label">{item.area}</span></div><p>{item.description}</p></div><div className="row-owner"><span className={`mini-avatar ${item.owner === 'You' ? 'you' : ''}`}>{item.owner.slice(0, 1)}</span>{item.owner}</div><div className="row-due">{item.due}</div><span className={`status-badge ${statusStyles[item.status]}`}><i />{item.status}</span><button className="more-button" aria-label="More options"><MoreHorizontal size={18} /></button></div>)}{filteredItems.length === 0 && <div className="empty-state">No checks match these filters.</div>}</div>
        </section>
        <footer className="app-footer"><span>RASSA internal · GTM room</span><span><span className="live-dot" /> All systems operational</span></footer>
      </main>

      {showAdd && <div className="modal-backdrop" onClick={() => setShowAdd(false)}><div className="add-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setShowAdd(false)}><X size={18} /></button><div className="modal-icon"><Plus size={20} /></div><h2>Add a readiness check</h2><p>Keep it concrete: what must be true before this launch moves forward?</p><button className="primary-button modal-cta" onClick={addItem}>Create check <ArrowUpRight size={16} /></button></div></div>}
      {showToast && <div className="toast"><Check size={16} />Review link copied to clipboard</div>}
    </div>
  );
}

export default App;
