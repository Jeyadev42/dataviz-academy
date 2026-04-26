import Link from 'next/link';
import { ArrowRight, Lightbulb, GitBranch, BarChart3, Workflow, Database, Code2, Brain, Layers } from 'lucide-react';
import styles from './page.module.css';

const categories = [
  { name: 'Apache Spark', slug: 'spark', icon: '⚡', color: '#E25A1C', count: 'Coming soon' },
  { name: 'Snowflake', slug: 'snowflake', icon: '❄️', color: '#29B5E8', count: 'Coming soon' },
  { name: 'dbt', slug: 'dbt', icon: '🔧', color: '#FF694A', count: 'Coming soon' },
  { name: 'Python / Pandas', slug: 'python', icon: '🐍', color: '#3776AB', count: 'Coming soon' },
  { name: 'Data Modeling', slug: 'modeling', icon: '📐', color: '#10B981', count: 'Coming soon' },
  { name: 'Pipeline Design', slug: 'pipelines', icon: '🔀', color: '#8B5CF6', count: 'Coming soon' },
  { name: 'SQL', slug: 'sql', icon: '🗃️', color: '#F59E0B', count: 'Coming soon' },
  { name: 'MLOps', slug: 'mlops', icon: '🤖', color: '#EC4899', count: 'Coming soon' },
];

const features = [
  {
    icon: <Workflow size={24} />,
    title: 'Interactive Pipeline Diagrams',
    description: 'Explore data architectures with zoomable, pannable diagrams built with React Flow. See how data flows through each stage.',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Annotated Code Walkthroughs',
    description: 'Syntax-highlighted code blocks with line-by-line explanations. Copy snippets directly into your projects.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Concept Visualizations',
    description: 'Understand lazy evaluation, shuffle operations, and query plans through animated, step-by-step visual breakdowns.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Open Source &amp; Free
            </div>

            <h1 className={styles.heroTitle}>
              Master Data Engineering{' '}
              <span className="gradient-text">Through Visual Learning</span>
            </h1>

            <p className={styles.heroDescription}>
              Stop reading walls of text. Understand Spark DAGs, pipeline architectures,
              and data models through interactive diagrams and visual walkthroughs built
              for beginners and intermediate practitioners.
            </p>

            <div className={styles.heroCTA}>
              <Link href="/articles" className={styles.btnPrimary} id="cta-explore">
                Explore Articles <ArrowRight size={16} />
              </Link>
              <Link href="/suggest" className={styles.btnSecondary} id="cta-suggest">
                Suggest a Topic
              </Link>
            </div>
          </div>

          {/* Animated Data Flow Visualization */}
          <div className={styles.heroRight}>
            <div className={styles.vizContainer}>
              {/* Connection Lines */}
              <svg className={styles.vizLines} viewBox="0 0 500 500">
                <line className={styles.vizLine} x1="230" y1="60" x2="100" y2="170" />
                <line className={styles.vizLine} x1="260" y1="60" x2="380" y2="170" />
                <line className={styles.vizLine} x1="120" y1="200" x2="200" y2="300" />
                <line className={styles.vizLine} x1="370" y1="200" x2="250" y2="300" />
                <line className={styles.vizLine} x1="225" y1="330" x2="225" y2="420" />
              </svg>

              {/* Floating Particles */}
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />

              {/* Nodes */}
              <div className={`${styles.vizNode} ${styles.nodeSource}`}>
                <Database size={16} />
                <span>Read CSV</span>
                <span className={styles.vizNodeLabel}>Source</span>
              </div>
              <div className={`${styles.vizNode} ${styles.nodeTransform1}`}>
                <GitBranch size={16} />
                <span>Filter</span>
                <span className={styles.vizNodeLabel}>Transform</span>
              </div>
              <div className={`${styles.vizNode} ${styles.nodeTransform2}`}>
                <Layers size={16} />
                <span>GroupBy</span>
                <span className={styles.vizNodeLabel}>Transform</span>
              </div>
              <div className={`${styles.vizNode} ${styles.nodeJoin}`}>
                <Brain size={16} />
                <span>Join</span>
                <span className={styles.vizNodeLabel}>Shuffle</span>
              </div>
              <div className={`${styles.vizNode} ${styles.nodeAction}`}>
                <BarChart3 size={16} />
                <span>.count()</span>
                <span className={styles.vizNodeLabel}>Action!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories Section ─── */}
      <section className={styles.categories} id="categories">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Topics</p>
            <h2 className={styles.sectionTitle}>Explore by Category</h2>
            <p className={styles.sectionSubtitle}>
              Dive into the tools and concepts that power modern data platforms — each explained visually.
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <Link
                href={`/articles?category=${cat.slug}`}
                key={cat.slug}
                className={styles.categoryCard}
                id={`category-${cat.slug}`}
              >
                <div
                  className={styles.categoryIcon}
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryCount}>{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section className={styles.features} id="features">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Why DataViz Academy</p>
            <h2 className={styles.sectionTitle}>Learning That Sticks</h2>
            <p className={styles.sectionSubtitle}>
              Visual explanations help you build intuition faster than reading documentation alone.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((feature, i) => (
              <div key={i} className={styles.featureCard} id={`feature-${i}`}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className={styles.cta} id="cta">
        <div className={styles.sectionContainer}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Have a Topic in Mind?</h2>
            <p className={styles.ctaDescription}>
              Help shape the curriculum! Suggest topics you want to see visualized and vote on community ideas.
            </p>
            <Link href="/suggest" className={styles.btnPrimary} id="cta-suggest-bottom">
              Submit a Suggestion <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
