import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { getAllArticles } from '@/lib/mdx';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Browse visual guides on Spark, Snowflake, dbt, pipeline design, and more.',
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  spark: { bg: 'rgba(226, 90, 28, 0.12)', text: '#E25A1C' },
  snowflake: { bg: 'rgba(41, 181, 232, 0.12)', text: '#29B5E8' },
  dbt: { bg: 'rgba(255, 105, 74, 0.12)', text: '#FF694A' },
  python: { bg: 'rgba(55, 118, 171, 0.12)', text: '#3776AB' },
  modeling: { bg: 'rgba(16, 185, 129, 0.12)', text: '#10B981' },
  pipelines: { bg: 'rgba(139, 92, 246, 0.12)', text: '#8B5CF6' },
  sql: { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B' },
  mlops: { bg: 'rgba(236, 72, 153, 0.12)', text: '#EC4899' },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Articles</h1>
          <p className={styles.subtitle}>
            Visual guides to Data Engineering and Data Science concepts.
          </p>
        </div>

        {articles.length > 0 ? (
          <div className={styles.grid}>
            {articles.map((article) => {
              const colors = categoryColors[article.category] || {
                bg: 'rgba(99, 102, 241, 0.12)',
                text: '#6366F1',
              };

              return (
                <Link
                  href={`/articles/${article.slug}`}
                  key={article.slug}
                  className={styles.card}
                  id={`article-${article.slug}`}
                >
                  <span
                    className={styles.cardCategory}
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    {article.category}
                  </span>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardDescription}>{article.description}</p>
                  <div className={styles.cardMeta}>
                    <span>{article.readingTime}</span>
                    <div className={styles.cardTags}>
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            <BookOpen size={48} style={{ margin: '0 auto var(--space-4)', opacity: 0.3 }} />
            <h2 className={styles.emptyTitle}>Articles Coming Soon</h2>
            <p>We&apos;re working on visual guides. Check back shortly!</p>
          </div>
        )}
      </div>
    </div>
  );
}
