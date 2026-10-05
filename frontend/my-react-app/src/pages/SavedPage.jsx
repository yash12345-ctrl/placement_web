// src/pages/SavedPage.jsx
import { useState } from 'react';
import Layout from '../components/Layout';
import { JOBS } from '../data/jobsData';
import { BookmarkCheck, Trash2, Clock, MapPin } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function SavedPage() {
  const { showToast } = useToast();
  // Start with first 4 saved for demo
  const [saved, setSaved] = useState(JOBS.slice(0, 4));

  const remove = (id, title) => {
    setSaved(prev => prev.filter(j => j.id !== id));
    showToast(`"${title}" removed from saved jobs`, 'info');
  };

  return (
    <Layout title="Saved Jobs">
      <div className="page-header">
        <div>
          <h1 className="page-title">Saved Jobs</h1>
          <p className="page-subtitle">{saved.length} jobs bookmarked</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><BookmarkCheck size={52} strokeWidth={1.5} /></div>
          <h3>No saved jobs yet</h3>
          <p>Bookmark jobs while browsing to quickly access them later.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {saved.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-card-top">
                <div className="job-company-logo" style={{ background: job.logoColor }}>
                  {job.logo}
                </div>
                <div className="job-card-info">
                  <div className="job-title">{job.title}</div>
                  <div className="job-company">{job.company}</div>
                </div>
                <button
                  className="job-bookmark"
                  onClick={() => remove(job.id, job.title)}
                  title="Remove from saved"
                  id={`unsave-${job.id}`}
                >
                  <Trash2 size={17} color="var(--danger)" />
                </button>
              </div>
              <div className="job-tags">
                <span className="job-tag type">{job.type}</span>
                <span className="job-tag level">{job.level}</span>
                <span className="job-tag loc"><MapPin size={11} style={{ marginRight: 3 }} />{job.location}</span>
                <span className="job-tag salary">{job.salary}</span>
              </div>
              <div className="job-card-bottom">
                <span className="job-posted"><Clock size={12} />{job.posted}</span>
                <button
                  className="btn-apply"
                  onClick={() => {
                    showToast(`Applied to "${job.title}"! 🎉`, 'success');
                    remove(job.id, job.title);
                  }}
                  id={`apply-saved-${job.id}`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
