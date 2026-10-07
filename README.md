# Atik Shahriar — Portfolio

A professional, fully responsive portfolio site for **Atik Shahriar**, Software Developer focused on full-stack web & AI solutions. Built with HTML, CSS, JavaScript, and a Python Flask backend.

Live at: https://portfolio-v2-smoky-xi.vercel.app/

## ✨ Features

- **Hero** — animated aurora background, typed role line, portrait with floating highlight chips, CV download
- **About** — bento grid with bio, live repo count, education and current focus
- **Featured Projects** — six flagship showcases (AgentDeck, Dhaka Wholesale, VibeFlow, SOFOL, PostPilot, Back Bencher) with real screenshots, followed by **every** public project: category filters with counts, search, and "show more" paging
- **Skills** — grouped toolkit cards (frontend, backend, mobile & desktop, AI, DevOps, languages)
- **Experience** — timeline (AgentDeck, freelance/client work, hackathons, robotics, AIUB)
- **GitHub Activity** — live counters, last push, and contribution chart
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
    ├── Atik_Shahriar_CV.pdf    # Linked from the hero "Download CV" button
    └── Atik_Shahriar_CV.docx   # Editable source; export the PDF from it after edits
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

Project data lives at the top of `script.js`:

- `FLAGSHIPS` — the large showcase cards.
- `PROJECTS` — every public project with a curated title, description, tech and category. Cards render immediately from this list and are then enriched with live stars / last-push dates from GitHub.
- `HIDDEN_REPOS` — repos deliberately left off the site.

Any new public repo that is neither in `PROJECTS` nor `HIDDEN_REPOS` shows up automatically using its GitHub description, so the grid never falls behind. Project screenshots live in `Image/projects/` (960px WebP).

## 🔗 Deployment

Deployed on Vercel (Flask zero-config) — every push to `main` deploys automatically. The Flask app serves only public asset types (no source/env/VCS files) and caches GitHub API responses for 10 minutes.

## 📄 License

MIT — feel free to use and modify.
