// src/pages/JobsPage.jsx
import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { Search, MapPin, Clock, Bookmark, BookmarkCheck, X } from 'lucide-react';
import { JOBS } from '../data/jobsData';
import { useToast } from '../context/ToastContext';

const TYPES = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
const LEVELS = ['All', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Manager'];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [saved, setSaved] = useState({});
  const [modal, setModal] = useState(null);
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    return JOBS.filter(job => {
      const q = search.toLowerCase();
      const matchSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.tags.some(t => t.toLowerCase().includes(q));
      const matchLoc = !location || job.location.toLowerCase().includes(location.toLowerCase());
      const matchType = activeType === 'All' || job.type === activeType || (activeType === 'Remote' && job.location === 'Remote');
      const matchLevel = activeLevel === 'All' || job.level === activeLevel;
      return matchSearch && matchLoc && matchType && matchLevel;
    });
  }, [search, location, activeType, activeLevel]);

  const toggleSave = (id, title) => {
    setSaved(prev => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? `"${title}" saved!` : `"${title}" removed from saved`, next[id] ? 'success' : 'info');
      return next;
    });
  };

  const handleApply = (job) => {
    setModal(null);
    showToast(`Applied to "${job.title}" at ${job.company}! 🎉`, 'success');
  };

  return (
    <Layout title="Find Jobs" searchVal={search} onSearch={setSearch}>
      {/* Hero Search */}
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Find Your Next Role</h1>
            <p className="page-subtitle">Showing {filtered.length} opportunities</p>
          </div>
        </div>

        <div className="hero-search" style={{ marginTop: 16 }}>
          <div className="hero-search-field">
            <Search size={18} />
            <input
              id="job-search-input"
              type="text"
              placeholder="Job title, keyword, or company"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="hero-search-field">
            <MapPin size={18} />
            <input
              id="location-search-input"
              type="text"
              placeholder="City, state, or Remote"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </div>
          <button className="btn-search" id="search-btn">
            <Search size={16} /> Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="filter-chips">
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4 }}>Type:</span>
          {TYPES.map(t => (
            <button key={t} className={`filter-chip ${activeType === t ? 'active' : ''}`} onClick={() => setActiveType(t)} id={`filter-type-${t.toLowerCase().replace(' ', '-')}`}>{t}</button>
          ))}
        </div>
        <div className="filter-chips">
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4 }}>Level:</span>
          {LEVELS.map(l => (
            <button key={l} className={`filter-chip ${activeLevel === l ? 'active' : ''}`} onClick={() => setActiveLevel(l)} id={`filter-level-${l.toLowerCase().replace('-', '')}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filters to find more opportunities.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filtered.map(job => (
            <div key={job.id} className="job-card" onClick={() => setModal(job)}>
              <div className="job-card-top">
                <div className="job-company-logo" style={{ background: job.logoColor }}>
                  {job.logo}
                </div>
                <div className="job-card-info">
                  <div className="job-title">{job.title}</div>
                  <div className="job-company">{job.company}</div>
                </div>
                <button
                  className={`job-bookmark ${saved[job.id] ? 'saved' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleSave(job.id, job.title); }}
                  id={`bookmark-${job.id}`}
                  aria-label={saved[job.id] ? 'Remove bookmark' : 'Bookmark job'}
                >
                  {saved[job.id] ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>
              <div className="job-tags">
                <span className="job-tag type">{job.type}</span>
                <span className="job-tag level">{job.level}</span>
                <span className="job-tag loc"><MapPin size={11} style={{ marginRight: 3 }} />{job.location}</span>
                <span className="job-tag salary">{job.salary}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
                {job.description}
              </div>
              <div className="job-card-bottom">
                <span className="job-posted"><Clock size={12} />{job.posted}</span>
                <button className="btn-apply" onClick={e => { e.stopPropagation(); handleApply(job); }} id={`apply-${job.id}`}>
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Detail Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="job-company-logo" style={{ background: modal.logoColor, fontSize: 22, width: 52, height: 52 }}>
                  {modal.logo}
                </div>
                <div>
                  <div className="modal-title">{modal.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 2 }}>{modal.company}</div>
                </div>
              </div>
              <button className="modal-close" onClick={() => setModal(null)} aria-label="Close modal">×</button>
            </div>

            <div className="job-tags" style={{ marginBottom: 16 }}>
              <span className="job-tag type">{modal.type}</span>
              <span className="job-tag level">{modal.level}</span>
              <span className="job-tag loc">{modal.location}</span>
              <span className="job-tag salary">{modal.salary}</span>
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
              {modal.description} We're looking for a passionate individual to join our growing team. You'll collaborate with talented engineers and designers to deliver world-class products.
            </p>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Required Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {modal.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                className="btn-primary"
                style={{ flex: 2 }}
                id={`modal-apply-${modal.id}`}
                onClick={() => handleApply(modal)}
              >
                Apply Now 🚀
              </button>
              <button
                className={`btn-outline ${saved[modal.id] ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => toggleSave(modal.id, modal.title)}
                id={`modal-bookmark-${modal.id}`}
              >
                {saved[modal.id] ? '🔖 Saved' : '🔖 Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
