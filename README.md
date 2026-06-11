# Circinus

Personal finance blog. Next.js 14, deployed on Vercel, monetized with Adsterra.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in values
3. `npm install`
4. `npm run dev`

## Environment variables

- `ADMIN_SECRET` — admin dashboard password (set in Vercel)
- `NEXT_PUBLIC_ADSTERRA_POPUNDER` — Adsterra popunder placement ID
- `NEXT_PUBLIC_ADSTERRA_BANNER` — Adsterra banner placement ID
- `NEXT_PUBLIC_ADSTERRA_RECTANGLE` — Adsterra rectangle placement ID

## Admin dashboard

Access at `/admin`. Protected by the `ADMIN_SECRET` env var.

- View pageview statistics and top posts
- Create new posts with the built-in editor
- Edit or delete existing posts

## Monetization stack

- **Adsterra Popunder** — highest RPM format, fires once per session sitewide
- **Adsterra Display Ads** — banner (728x90), rectangle (300x250) in sidebar and articles
- **Affiliate links** — within articles (Amazon, SaaS tools, financial products)
- **Newsletter** — email list for recurring traffic and future monetization
