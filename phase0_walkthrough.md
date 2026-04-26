# Phase 0 — Build Complete ✅

DataViz Academy foundation is up and running at **http://localhost:3000**.

## What Was Built

### 🏗️ Project Foundation (F-001, F-004, F-005, F-006)

| Component | Status | Details |
|---|---|---|
| **Next.js 15** (App Router, TypeScript) | ✅ | Turbopack dev server running |
| **Design System** (CSS Variables) | ✅ | Light/dark mode, Inter + JetBrains Mono fonts, full token system |
| **Header** | ✅ | Logo (SVG), nav links, dark/light toggle, responsive mobile menu |
| **Footer** | ✅ | Brand section, navigation, social icons (GitHub, X, LinkedIn) |
| **MDX Pipeline** | ✅ | `next-mdx-remote` + `gray-matter` + `reading-time` + `remark-gfm` |

### 📄 Pages

| Page | Route | What It Shows |
|---|---|---|
| **Landing Page** | `/` | Hero with animated data pipeline visualization, category grid (8 categories), feature cards, community CTA |
| **Articles Listing** | `/articles` | Card grid with category badges, reading time, tags |
| **Article Detail** | `/articles/[slug]` | Full prose rendering of MDX with code blocks, tables, blockquotes |
| **Suggestion Board** | `/suggest` | Voteable suggestion list + submission form (demo data, Supabase in Phase 2) |

### 📝 Seed Content (3 Articles)

| Article | Category | Level |
|---|---|---|
| How Spark Handles Lazy Evaluation | spark | Beginner |
| The Medallion Architecture Explained | pipelines | Beginner |
| Snowflake Query Profiling | snowflake | Intermediate |

## Project File Tree

```
dataviz-academy/
├── content/articles/              ← MDX articles (add new ones here!)
│   ├── spark/lazy-evaluation.mdx
│   ├── pipelines/medallion-architecture.mdx
│   └── snowflake/query-profiling.mdx
├── src/
│   ├── app/
│   │   ├── globals.css            ← Design system tokens
│   │   ├── layout.tsx             ← Root layout with Header/Footer
│   │   ├── page.tsx               ← Landing page
│   │   ├── page.module.css
│   │   ├── articles/
│   │   │   ├── page.tsx           ← Article listing
│   │   │   ├── page.module.css
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       ← Article detail (SSG)
│   │   │       └── page.module.css
│   │   └── suggest/
│   │       ├── page.tsx           ← Suggestion board
│   │       └── page.module.css
│   ├── components/
│   │   ├── layout/Header.tsx      ← Nav + theme toggle
│   │   ├── layout/Footer.tsx      ← Footer with social links
│   │   └── mdx/MDXContent.tsx     ← MDX renderer
│   └── lib/mdx.ts                 ← Article utilities
└── package.json
```

## How to Add a New Article

1. Create a new `.mdx` file in `content/articles/<category>/`:

```mdx
---
title: "Your Article Title"
description: "A brief description"
category: spark
publishedAt: "2026-05-10"
author: "DataViz Academy"
tags: ["spark", "topic"]
---

# Your content here

Write Markdown as usual. Tables, code blocks, blockquotes all work.
```

2. Push to Git → Vercel auto-deploys → Article is live.

## What's Next

| Phase | Focus | Key Deliverable |
|---|---|---|
| **Phase 1** (Weeks 2–3) | Content Engine | React Flow viz components, category filters, search, 3 more articles |
| **Phase 2** (Week 4) | Community Features | Supabase auth + real-time suggestion board |
| **Phase 3** (Week 5) | Polish & Launch | SEO, performance, animations, custom domain |
