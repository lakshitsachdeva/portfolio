'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import PixelBlast from '@/components/react-bits/PixelBlast';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published_at: string;
  tags: string[];
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (data) setBlogs(data);
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background */}
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

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter mb-8 lowercase">journal</h1>
          <p className="text-zinc-400 text-xl font-medium tracking-tight max-w-xl lowercase">
            thoughts, experiments, and things i'm learning
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-zinc-900 rounded w-3/4 mb-4" />
                <div className="h-4 bg-zinc-900 rounded w-1/2 mb-8" />
                <div className="h-20 bg-zinc-900 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard 
                  className="custom-spotlight-card" 
                  spotlightColor="rgba(177, 158, 239, 0.2)"
              >
                  <Link href={`/blog/${blog.slug}`} className="block group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-4">
                    <h2 className="text-3xl font-bold group-hover:text-brand transition-colors tracking-tight lowercase">
                      {blog.title}
                    </h2>
                    <span className="text-zinc-500 text-xs font-medium lowercase whitespace-nowrap">
                      {new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-2xl font-medium lowercase">
                    {blog.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex items-center gap-2 text-zinc-500">
                        <Tag size={12} className="text-brand" />
                        <div className="flex gap-2">
                          {blog.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-medium lowercase">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white transition-colors">
                      <span className="text-[10px] font-medium lowercase">read more</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
                </SpotlightCard>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
        .bg-brand { background-color: #B19EEF; }
      `}</style>
    </div>
  );
}
