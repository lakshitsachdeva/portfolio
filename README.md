# Portfolio - Lakshit Sachdeva

A minimalistic portfolio website built with Next.js 15, featuring interactive components and a dark aesthetic.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion, Three.js
- **Database**: Supabase (PostgreSQL)
- **Components**: Custom React Bits (PixelBlast, PixelCard, ClickSpark, BlurText, SpotlightCard)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd portfolio-lakshit
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase:
- Follow instructions in `SUPABASE_SETUP_QUICK.md`
- Run the SQL from `SUPABASE_SQL.sql` in Supabase SQL Editor

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

Quick deploy to Vercel:
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── about/        # About page
│   ├── blog/         # Blog listing and posts
│   ├── experience/   # Experience page
│   └── page.tsx      # Home page
├── components/       # React components
│   ├── react-bits/   # Custom interactive components
│   └── ui/           # UI components
└── lib/              # Utilities and configs
```

## License

© 2026 Lakshit Sachdeva
