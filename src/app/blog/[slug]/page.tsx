'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import PixelBlast from '@/components/react-bits/PixelBlast';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  author: string;
  published_at: string;
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (fetchError) {
        setError('Post not found');
        setLoading(false);
        return;
      }

      if (data) {
        setPost(data);
      }
      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <div className="fixed inset-0 z-0 opacity-70" style={{ minHeight: '100vh', height: '100%' }}>
          <PixelBlast 
            variant="square" 
            pixelSize={5} 
            color="#B19EEF" 
            patternScale={2} 
            patternDensity={0.8}
            enableRipples={false}
            transparent
            speed={2}
            antialias={false}
          />
        </div>
        <div className="fixed inset-0 z-[1] bg-black/40" />
        <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40">
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-zinc-900 rounded w-3/4" />
            <div className="h-4 bg-zinc-900 rounded w-1/2" />
            <div className="h-64 bg-zinc-900 rounded w-full" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <div className="fixed inset-0 z-0 opacity-70" style={{ minHeight: '100vh', height: '100%' }}>
          <PixelBlast 
            variant="square" 
            pixelSize={5} 
            color="#B19EEF" 
            patternScale={2} 
            patternDensity={0.8}
            enableRipples={false}
            transparent
            speed={2}
            antialias={false}
          />
        </div>
        <div className="fixed inset-0 z-[1] bg-black/40" />
        <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold lowercase sm:text-4xl">post not found</h1>
            <Link href="/blog" className="text-brand hover:text-white transition-colors lowercase">
              ← back to journal
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 opacity-70" style={{ minHeight: '100vh', height: '100%' }}>
        <PixelBlast 
          variant="square" 
          pixelSize={4} 
          color="#B19EEF" 
          patternScale={2} 
          patternDensity={1.2}
          enableRipples 
          transparent
          speed={8}
        />
      </div>
      
      {/* Black overlay for readability */}
      <div className="fixed inset-0 z-[1] bg-black/40" />

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            href="/blog" 
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium lowercase text-zinc-500 transition-colors hover:text-white sm:mb-12"
          >
            <ArrowLeft size={16} /> back to journal
          </Link>

          <article>
            <header className="mb-8 sm:mb-12">
              <h1 className="mb-5 break-words text-3xl font-bold tracking-tighter lowercase sm:mb-6 sm:text-5xl lg:text-7xl">
                {post.title}
              </h1>
              
              <div className="mb-6 flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 sm:mb-8 sm:gap-6 sm:text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span className="lowercase">
                    {new Date(post.published_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag size={14} />
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="lowercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-invert max-w-none break-words sm:prose-lg">
              {post.content ? (
                <div 
                  className="text-sm font-medium leading-relaxed lowercase text-zinc-300 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <p className="text-zinc-400 italic lowercase">content coming soon...</p>
              )}
            </div>
          </article>
        </motion.div>
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
        .bg-brand { background-color: #B19EEF; }
      `}</style>
    </div>
  );
}
