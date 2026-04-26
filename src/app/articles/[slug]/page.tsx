import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { getArticleBySlug, getArticleSlugs } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import styles from './page.module.css';
import type { Metadata } from 'next';

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.publishedAt,
      authors: [article.meta.author],
      tags: article.meta.tags,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const colors = categoryColors[article.meta.category] || {
    bg: 'rgba(99, 102, 241, 0.12)',
    text: '#6366F1',
  };

  const formattedDate = article.meta.publishedAt
    ? new Date(article.meta.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className={styles.page}>
      <article className={styles.container}>
        <Link href="/articles" className={styles.backLink}>
          <ArrowLeft size={14} />
          Back to Articles
        </Link>

        <header className={styles.articleHeader}>
          <span
            className={styles.category}
            style={{ background: colors.bg, color: colors.text }}
          >
            {article.meta.category}
          </span>
          <h1 className={styles.articleTitle}>{article.meta.title}</h1>
          <p className={styles.articleDescription}>{article.meta.description}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <User size={14} />
              {article.meta.author}
            </span>
            {formattedDate && (
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {formattedDate}
              </span>
            )}
            <span className={styles.metaItem}>
              <Clock size={14} />
              {article.meta.readingTime}
            </span>
          </div>
        </header>

        <div className={styles.prose}>
          <MDXContent source={article.content} />
        </div>
      </article>
    </div>
  );
}
