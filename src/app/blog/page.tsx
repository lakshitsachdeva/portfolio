'use client';

import PixelBlast from '@/components/react-bits/PixelBlast';
import { motion } from 'framer-motion';

export default function BlogPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background */}
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
      
      {/* Black overlay for readability */}
      <div className="fixed inset-0 z-[1] bg-black/40" />

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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10"
        >
          <p className="text-2xl sm:text-3xl font-medium tracking-tight lowercase text-zinc-200">
            coming soon.
          </p>
          <p className="mt-4 text-zinc-400 font-medium lowercase max-w-2xl leading-relaxed">
            i'm still setting this up — will start posting writeups, experiments, and little breakdowns here.
          </p>
        </motion.div>
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
        .bg-brand { background-color: #B19EEF; }
      `}</style>
    </div>
  );
}
