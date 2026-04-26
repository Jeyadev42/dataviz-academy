import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  author: string;
  tags: string[];
  readingTime: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

/**
 * Get all article slugs from the content directory.
 * Scans nested category folders for .mdx files.
 */
export function getArticleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs: string[] = [];

  const categories = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const catPath = path.join(CONTENT_DIR, cat.name);
    const files = fs.readdirSync(catPath);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        slugs.push(file.replace(/\.mdx$/, ''));
      }
    }
  }

  return slugs;
}

/**
 * Get the raw MDX content and frontmatter for a specific article by slug.
 */
export function getArticleBySlug(slug: string): { meta: ArticleMeta; content: string } | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;

  const categories = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;
    const filePath = path.join(CONTENT_DIR, cat.name, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        meta: {
          slug,
          title: data.title || slug,
          description: data.description || '',
          category: data.category || cat.name,
          publishedAt: data.publishedAt || '',
          author: data.author || 'DataViz Academy',
          tags: data.tags || [],
          readingTime: stats.text,
        },
        content,
      };
    }
  }

  return null;
}

/**
 * Get all articles with their metadata, sorted by date (newest first).
 */
export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs();
  const articles: ArticleMeta[] = [];

  for (const slug of slugs) {
    const article = getArticleBySlug(slug);
    if (article) {
      articles.push(article.meta);
    }
  }

  return articles.sort((a, b) => {
    if (!a.publishedAt || !b.publishedAt) return 0;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}
