'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import remarkGfm from 'remark-gfm';

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<Awaited<ReturnType<typeof serialize>> | null>(null);

  useEffect(() => {
    async function compileMDX() {
      const serialized = await serialize(source, {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [],
        },
      });
      setMdxSource(serialized);
    }
    compileMDX();
  }, [source]);

  if (!mdxSource) {
    return (
      <div style={{ padding: 'var(--space-10) 0', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        Loading article…
      </div>
    );
  }

  return <MDXRemote {...mdxSource} />;
}
