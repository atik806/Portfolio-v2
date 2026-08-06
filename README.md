# Atik Shahriar — Portfolio

A professional, fully responsive portfolio site for **Atik Shahriar**, Software Developer focused on full-stack web & AI solutions. Built with HTML, CSS, JavaScript, and a Python Flask backend.

Live at: https://portfolio-v2-smoky-xi.vercel.app/

## ✨ Features

- **Hero** — headline, social links (GitHub / LinkedIn), and CV download
- **About** — concise technical journey, education (BSc CSE at AIUB), highlight chips, and defensible stats
- **Skills** — proficiency tiers (Advanced / Intermediate) instead of percentage bars
- **Featured Projects** — 7 curated, CV-aligned projects with live GitHub stats, filterable by **Full-Stack / AI & ML / Robotics**
- **Experience** — timeline with year ranges (robotics competitions, TechMart, full-stack work)
- **GitHub Stats** — animated counters pulled live from the GitHub API (with server-side fallback)
- **Contact** — working form backed by a real **Flask + SMTP** endpoint, with a graceful `mailto:` fallback when mail isn't configured
- **SEO** — semantic meta tags, Open Graph + Twitter Card, JSON-LD `Person` schema, SVG favicon

## 🏗 Structure

```
├── app.py            # Flask server: static hosting + GitHub proxy + /api/contact (SMTP)
├── index.html        # Single-page markup + meta/SEO head
├── styles.css        # Dark theme, design tokens, responsive layout
├── script.js         # Curated projects, filters, stats counters, form handling
├── favicon.svg       # SVG favicon
├── requirements.txt
├── .env.example      # Environment variable template
└── CV/
    └── Atik_Shahriar_CV.docx   # Linked from the hero "Download CV" button
```

## 🚀 Running locally

```bash
pip install -r requirements.txt
python app.py
```

Then open http://localhost:5000.

By default the site runs with `FLASK_DEBUG=false` on port `5000`. Override with environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | GitHub API token (optional, raises the rate limit for repo/stats enrichment) |
| `MAIL_SERVER` | SMTP host, e.g. `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port, e.g. `587` |
| `MAIL_USERNAME` | SMTP login username |
| `MAIL_PASSWORD` | SMTP login password (use an app password for Gmail) |
| `MAIL_RECIPIENT` | Address the contact form delivers to, e.g. `atikrj8@gmail.com` |
| `FLASK_DEBUG` | `true` to enable debug mode |
| `PORT` | Server port (default `5000`) |

Copy `.env.example` to `.env` and fill in your credentials. If mail is not configured, the contact form shows a friendly message and opens the visitor's email app instead — the site never fails.

## 🧑‍💻 Projects

The featured projects grid shows 7 hand-curated, CV-aligned projects. Each card is enriched with live star/fork/update data from GitHub when available, and always renders (even if the GitHub API is down). Edit the `FEATURED_PROJECTS` array at the top of `script.js` to change what's displayed.

## 🔗 Deployment

Deploy as a standard Flask app. On Vercel, the backend endpoints (`/api/projects`, `/api/contact`) require the Flask server — configure the Vercel deployment to run `app.py` (or serve via a platform that supports WSGI). After deploying, update the canonical/OG URLs in the `<head>` of `index.html` to the real domain.

## 📄 License

MIT — feel free to use and modify.
