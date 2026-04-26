'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, BookOpen, MessageSquarePlus } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initial = saved || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="main-header">
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="logo-link">
          <div className={styles.logoIcon}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
              <circle cx="10" cy="12" r="3" fill="white" opacity="0.9" />
              <circle cx="22" cy="12" r="3" fill="white" opacity="0.9" />
              <circle cx="16" cy="22" r="3" fill="white" opacity="0.9" />
              <line x1="12.5" y1="13.5" x2="20" y2="13.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <line x1="11" y1="14.5" x2="14.5" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <line x1="21" y1="14.5" x2="17.5" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className={styles.logoText}>
            DataViz <span className={styles.logoAccent}>Academy</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link href="/articles" className={styles.navLink} id="nav-articles">
            <BookOpen size={16} />
            Articles
          </Link>
          <Link href="/suggest" className={styles.navLink} id="nav-suggest">
            <MessageSquarePlus size={16} />
            Suggest a Topic
          </Link>
        </div>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            id="theme-toggle"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
        <Link
          href="/articles"
          className={styles.mobileNavLink}
          onClick={() => setMobileOpen(false)}
          id="mobile-nav-articles"
        >
          <BookOpen size={18} />
          Articles
        </Link>
        <Link
          href="/suggest"
          className={styles.mobileNavLink}
          onClick={() => setMobileOpen(false)}
          id="mobile-nav-suggest"
        >
          <MessageSquarePlus size={18} />
          Suggest a Topic
        </Link>
      </div>
    </header>
  );
}
