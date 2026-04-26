import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

/* Inline brand SVG icons — lucide-react no longer ships brand icons */
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="main-footer">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#fg)" />
                <circle cx="10" cy="12" r="3" fill="white" opacity="0.9" />
                <circle cx="22" cy="12" r="3" fill="white" opacity="0.9" />
                <circle cx="16" cy="22" r="3" fill="white" opacity="0.9" />
                <line x1="12.5" y1="13.5" x2="20" y2="13.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <line x1="11" y1="14.5" x2="14.5" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <line x1="21" y1="14.5" x2="17.5" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
                <defs>
                  <linearGradient id="fg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" /><stop offset="1" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className={styles.logoText}>DataViz Academy</span>
            </div>
            <p className={styles.tagline}>
              Learn Data Science &amp; Engineering through interactive visualizations.
            </p>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Learn</h4>
            <Link href="/articles" className={styles.footerLink}>All Articles</Link>
            <Link href="/articles?category=spark" className={styles.footerLink}>Apache Spark</Link>
            <Link href="/articles?category=snowflake" className={styles.footerLink}>Snowflake</Link>
            <Link href="/articles?category=pipelines" className={styles.footerLink}>Pipeline Design</Link>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Community</h4>
            <Link href="/suggest" className={styles.footerLink}>Suggest a Topic</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} DataViz Academy. Built with <Heart size={14} className={styles.heartIcon} /> for the data community.
          </p>
          <div className={styles.socials}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}><GithubIcon /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}><TwitterIcon /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}><LinkedInIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
