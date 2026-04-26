'use client';

import { useState } from 'react';
import { ChevronUp, Lightbulb, MessageSquarePlus } from 'lucide-react';
import styles from './page.module.css';

// Demo suggestions (will be replaced with Supabase data in Phase 2)
const DEMO_SUGGESTIONS = [
  {
    id: '1',
    title: 'How Spark Shuffles Data Across Partitions',
    description: 'A visual deep-dive into shuffle operations — the most expensive operation in distributed computing. Show partition-level data movement.',
    category: 'Apache Spark',
    status: 'in_progress' as const,
    vote_count: 24,
    author: 'Community',
  },
  {
    id: '2',
    title: 'dbt Incremental Models — Visual Walkthrough',
    description: 'Step-by-step visualization of how dbt incremental models decide what data to process vs. skip.',
    category: 'dbt',
    status: 'open' as const,
    vote_count: 18,
    author: 'Community',
  },
  {
    id: '3',
    title: 'Snowflake Micro-Partitions Explained',
    description: 'Interactive diagram showing how Snowflake organizes data into micro-partitions and how clustering keys affect pruning.',
    category: 'Snowflake',
    status: 'open' as const,
    vote_count: 15,
    author: 'Community',
  },
  {
    id: '4',
    title: 'CDC Patterns — Capturing Change Data',
    description: 'Compare CDC approaches: log-based, timestamp-based, and trigger-based. Show data flow for each pattern.',
    category: 'Pipeline Design',
    status: 'open' as const,
    vote_count: 12,
    author: 'Community',
  },
  {
    id: '5',
    title: 'Python Generators for Large Data Processing',
    description: 'Visualize memory usage difference between list comprehensions and generators when processing millions of rows.',
    category: 'Python / Pandas',
    status: 'published' as const,
    vote_count: 31,
    author: 'Community',
  },
];

const categories = [
  'Apache Spark', 'Snowflake', 'dbt', 'Python / Pandas',
  'Data Modeling', 'Pipeline Design', 'SQL', 'MLOps',
];

const statusConfig = {
  open: { label: 'Open', className: styles.statusOpen },
  in_progress: { label: 'In Progress', className: styles.statusInProgress },
  published: { label: 'Published', className: styles.statusPublished },
  declined: { label: 'Declined', className: styles.statusDeclined },
};

export default function SuggestPage() {
  const [suggestions, setSuggestions] = useState(DEMO_SUGGESTIONS);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('');

  const handleVote = (id: string) => {
    setSuggestions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const alreadyVoted = votedIds.has(id);
        return { ...s, vote_count: s.vote_count + (alreadyVoted ? -1 : 1) };
      })
    );
    setVotedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDesc || !formCategory) return;

    const newSuggestion = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDesc,
      category: formCategory,
      status: 'open' as const,
      vote_count: 1,
      author: 'You',
    };

    setSuggestions((prev) => [newSuggestion, ...prev]);
    setVotedIds((prev) => new Set(prev).add(newSuggestion.id));
    setFormTitle('');
    setFormDesc('');
    setFormCategory('');
  };

  const sorted = [...suggestions].sort((a, b) => b.vote_count - a.vote_count);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Suggest a Topic</h1>
          <p className={styles.subtitle}>
            Help shape the curriculum! Suggest topics you want to see visualized,
            and vote on ideas from the community.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Suggestion List */}
          <div className={styles.list}>
            {sorted.length > 0 ? (
              sorted.map((suggestion) => {
                const status = statusConfig[suggestion.status];
                const isVoted = votedIds.has(suggestion.id);

                return (
                  <div
                    key={suggestion.id}
                    className={styles.suggestionCard}
                    id={`suggestion-${suggestion.id}`}
                  >
                    <div className={styles.voteSection}>
                      <button
                        className={`${styles.voteBtn} ${isVoted ? styles.voteBtnActive : ''}`}
                        onClick={() => handleVote(suggestion.id)}
                        aria-label={`Vote for ${suggestion.title}`}
                        id={`vote-${suggestion.id}`}
                      >
                        <ChevronUp size={18} />
                      </button>
                      <span className={styles.voteCount}>{suggestion.vote_count}</span>
                    </div>

                    <div className={styles.suggestionContent}>
                      <h3 className={styles.suggestionTitle}>{suggestion.title}</h3>
                      <p className={styles.suggestionDesc}>{suggestion.description}</p>
                      <div className={styles.suggestionMeta}>
                        <span className={`${styles.statusBadge} ${status.className}`}>
                          {status.label}
                        </span>
                        <span className={styles.categoryBadge}>{suggestion.category}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.empty}>
                <Lightbulb size={40} style={{ margin: '0 auto var(--space-4)', opacity: 0.3 }} />
                <h2 className={styles.emptyTitle}>No suggestions yet</h2>
                <p className={styles.emptyDesc}>Be the first to suggest a topic!</p>
              </div>
            )}
          </div>

          {/* Sidebar Form */}
          <div className={styles.sidebar}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>
                <MessageSquarePlus size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                New Suggestion
              </h2>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="suggestion-title" className={styles.formLabel}>Title</label>
                  <input
                    id="suggestion-title"
                    className={styles.formInput}
                    type="text"
                    placeholder="e.g., How Spark handles broadcast joins"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    minLength={10}
                    maxLength={200}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="suggestion-category" className={styles.formLabel}>Category</label>
                  <select
                    id="suggestion-category"
                    className={styles.formSelect}
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category…</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="suggestion-desc" className={styles.formLabel}>Description</label>
                  <textarea
                    id="suggestion-desc"
                    className={styles.formTextarea}
                    placeholder="What should this article cover? What visual would help explain it?"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    required
                    minLength={20}
                    maxLength={2000}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!formTitle || !formDesc || !formCategory}
                  id="submit-suggestion"
                >
                  Submit Suggestion
                </button>

                <p className={styles.authNote}>
                  📝 This is a demo. Supabase auth &amp; persistence will be connected in Phase 2.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
