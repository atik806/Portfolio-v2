document.documentElement.classList.add('js');

const GITHUB_USER = 'atik806';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;
const PAGE_SIZE = 9;

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

const CATEGORIES = {
    web: { label: 'Full-Stack Web', icon: 'fa-globe' },
    mobile: { label: 'Mobile', icon: 'fa-mobile-screen-button' },
    ai: { label: 'AI & ML', icon: 'fa-brain' },
    desktop: { label: 'Desktop & Tools', icon: 'fa-window-maximize' },
    game: { label: 'Games', icon: 'fa-gamepad' }
};

const ACCENTS = {
    violet: '124, 92, 255',
    cyan: '34, 211, 238',
    green: '52, 211, 153',
    pink: '244, 114, 182',
    amber: '251, 191, 36',
    blue: '79, 124, 255',
    rose: '251, 113, 133'
};

const LANG_COLORS = {
    TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26',
    CSS: '#663399', 'C#': '#178600', PHP: '#4F5D95', 'C++': '#f34b7d'
};

// Flagship products — rendered as large showcase cards at the top of the section.
const FLAGSHIPS = [
    {
        key: 'agentdeck',
        title: 'AgentDeck',
        tagline: 'One window for every AI coding agent.',
        description: 'A cross-platform desktop workspace for running Claude, Codex, Copilot, Gemini and other coding agents side by side in real terminal panes. It shows at a glance which agent is working, idle or waiting for you.',
        points: [
            'Isolated git worktree per agent, plus a review & merge panel so parallel agents never collide',
            'Plugins for GitHub, Jira, Linear, Google Drive and LinkedIn via MCP servers',
            'Local voice-to-text, routines, notes, layouts and a command palette',
            'Signed release pipeline for Windows, macOS & Linux with built-in auto-update'
        ],
        tech: ['Python', 'PySide6 / Qt', 'Git worktrees', 'MCP', 'GitHub Actions'],
        badge: 'Desktop app',
        accent: 'violet', accent2: 'cyan',
        image: 'Image/projects/agentdeck.webp',
        url: 'vibeflow.tech/agentdeck',
        live: 'https://vibeflow.tech/agentdeck',
        liveLabel: 'Download',
        github: 'https://github.com/atik806/AgentDeck-releases',
        githubLabel: 'Releases'
    },
    {
        key: 'dhaka-wholesale',
        title: 'Dhaka Wholesale',
        tagline: 'A production wholesale e-commerce platform.',
        description: 'Live storefront and admin platform for a Dhaka wholesale business: catalog, cart, checkout, orders, wishlist and reviews. A full admin dashboard gets live order updates.',
        points: [
            'Next.js 16 App Router storefront with ISR catalog pages, React 19 and Tailwind v4',
            'NestJS 11 REST API with Zod validation, Helmet, compression and rate limiting',
            'Supabase Postgres, JWT auth and Realtime for live admin updates'
        ],
        tech: ['Next.js 16', 'NestJS', 'TypeScript', 'Supabase', 'Zustand', 'SWR'],
        badge: 'E-commerce',
        accent: 'amber', accent2: 'violet',
        image: 'Image/projects/dhaka-wholesale.webp',
        url: 'dhakawholesale.com',
        live: 'https://dhakawholesale.com',
        github: 'https://github.com/atik806/dhaka_wholesale_frontend',
        githubLabel: 'Frontend',
        github2: 'https://github.com/atik806/dhaka_wholesale_backend',
        github2Label: 'API'
    },
    {
        key: 'vibeflow',
        title: 'VibeFlow',
        tagline: 'Software studio platform with a client portal.',
        description: 'Clients submit a request and track it to delivery. The platform includes a client portal, real-time notifications, an admin console, and the AgentDeck download & update site.',
        points: [
            'Client portal and admin dashboard on Supabase with real-time notifications',
            'Build-time prerendering, generated sitemaps and analytics for SEO',
            'Hosts AgentDeck downloads and playable projects such as Back Bencher'
        ],
        tech: ['React', 'Vite', 'Supabase', 'Vercel', 'SEO'],
        badge: 'SaaS platform',
        accent: 'cyan', accent2: 'violet',
        image: 'Image/projects/vibeflow.webp',
        url: 'vibeflow.tech',
        live: 'https://vibeflow.tech'
    },
    {
        key: 'sofol',
        title: 'SOFOL',
        tagline: 'Farmer credit-profile fintech app.',
        description: 'A React Native app and Express API for agricultural fintech in Bangladesh. Farmers build a digital credit history, record transactions and apply for loans. Admin, Bank Officer and Field Officer roles each get their own dashboard.',
        points: [
            'Expo Router mobile app with a single typed API client and global 401 handling',
            'Express 5 + TypeScript API: per-role guards, helmet, CORS allow-list, rate limiting',
            'Supabase PostgreSQL schema covering loans, verification and field visits'
        ],
        tech: ['React Native', 'Expo', 'Express 5', 'TypeScript', 'Supabase'],
        badge: 'Mobile · Fintech',
        accent: 'green', accent2: 'cyan',
        code: 'sofol',
        url: 'sofol-backend.vercel.app',
        github: 'https://github.com/atik806/MADFinalProject'
    },
    {
        key: 'postpilot',
        title: 'PostPilot',
        tagline: 'Create once. Publish everywhere.',
        description: 'An AI-powered social media publishing SaaS. You write a post once, pick your connected accounts, and PostPilot adapts, schedules and publishes it to each platform.',
        points: [
            'Provider-agnostic AI layer with Anthropic and OpenAI implementations',
            'Database-backed publishing queue with retries, exponential backoff and idempotency',
            'Supabase Postgres with RLS, encrypted platform tokens, Zod at every boundary'
        ],
        tech: ['Next.js 16', 'React 19', 'Supabase', 'TanStack Query', 'Zod', 'Vitest'],
        badge: 'AI SaaS',
        accent: 'pink', accent2: 'violet',
        code: 'postpilot',
        url: 'postpilot · app/api/cron/publish',
        github: 'https://github.com/atik806/postpilot'
    },
    {
        key: 'back-bencher',
        title: 'Back Bencher',
        tagline: 'A first-person comedy stealth game, in the browser.',
        description: 'Sit in an exam hall with a phone in your lap, photograph the question, ask a (fictional, sometimes wrong) AI, and don\'t let the invigilator catch you. Five exams of escalating difficulty.',
        points: [
            'Pure-TypeScript simulation engine with vision cones, patrols and suspicion, fully unit-tested',
            'Custom first-person renderer with a homography-mapped interactive question paper',
            'Synthesised WebAudio SFX, and a bot test that proves every level is beatable'
        ],
        tech: ['Next.js', 'TypeScript', 'Zustand', 'Canvas', 'Vitest'],
        badge: 'Browser game',
        accent: 'rose', accent2: 'amber',
        image: 'Image/projects/back-bencher.webp',
        url: 'vibeflow.tech/explore/fun-projects/back-bencher',
        live: 'https://vibeflow.tech/explore/fun-projects/back-bencher',
        liveLabel: 'Play now',
        github: 'https://github.com/atik806/back-bencher'
    }
];

// Every public project. `repo` is matched against the GitHub API to pull live
// stars and last-push dates; `pushed` is the fallback when GitHub is unreachable.
// tier: 1 = flagship, 2 = notable, 3 = coursework / small experiments.
const PROJECTS = [
    { repo: 'AgentDeck-releases', title: 'AgentDeck', category: 'desktop', tier: 1, pushed: '2026-10-06', lang: 'Python', accent: 'violet', icon: 'fa-terminal', image: 'Image/projects/agentdeck.webp', live: 'https://vibeflow.tech/agentdeck',
        description: 'Desktop workspace for running many AI coding agents side by side, with isolated git worktrees, MCP plugins and auto-update on Windows, macOS & Linux.',
        tech: ['Python', 'PySide6', 'MCP', 'CI/CD'] },
    { repo: null, title: 'VibeFlow', category: 'web', tier: 1, pushed: '2026-10-02', lang: 'JavaScript', accent: 'cyan', icon: 'fa-wave-square', image: 'Image/projects/vibeflow.webp', live: 'https://vibeflow.tech',
        description: 'Software studio platform: request intake, client portal, real-time notifications, admin console and the AgentDeck download site.',
        tech: ['React', 'Vite', 'Supabase', 'Vercel'] },
    { repo: 'back-bencher', title: 'Back Bencher', category: 'game', tier: 1, pushed: '2026-10-02', accent: 'rose', icon: 'fa-user-secret', image: 'Image/projects/back-bencher.webp', live: 'https://vibeflow.tech/explore/fun-projects/back-bencher',
        description: 'First-person comedy stealth game: cheat on five exams without getting caught. Unit-tested TypeScript engine and a custom renderer.',
        tech: ['Next.js', 'TypeScript', 'Zustand', 'Vitest'] },
    { repo: 'MADFinalProject', title: 'SOFOL: Farmer Credit Platform', category: 'mobile', tier: 1, pushed: '2026-09-20', accent: 'green', icon: 'fa-seedling',
        description: 'Agri-fintech mobile app: farmers build a credit history and apply for loans, with dashboards for admin, bank and field officers.',
        tech: ['React Native', 'Expo', 'Express 5', 'Supabase'] },
    { repo: 'dhaka_wholesale_frontend', title: 'Dhaka Wholesale: Storefront', category: 'web', tier: 1, pushed: '2026-08-30', accent: 'amber', icon: 'fa-store', image: 'Image/projects/dhaka-wholesale.webp', live: 'https://dhakawholesale.com',
        description: 'Live wholesale e-commerce storefront with catalog, cart, checkout, wishlist and reviews, served with ISR for fast pages.',
        tech: ['Next.js 16', 'React 19', 'Tailwind v4', 'Supabase'] },
    { repo: 'dhaka_wholesale_backend', title: 'Dhaka Wholesale: API', category: 'web', tier: 1, pushed: '2026-08-30', accent: 'amber', icon: 'fa-server',
        description: 'NestJS REST API behind the storefront and admin dashboard: products, orders, users, reviews, plus Realtime admin updates.',
        tech: ['NestJS 11', 'TypeScript', 'Zod', 'Supabase'] },
    { repo: 'postpilot', title: 'PostPilot', category: 'web', tier: 1, pushed: '2026-08-28', accent: 'pink', icon: 'fa-paper-plane',
        description: 'AI-powered social publishing SaaS: write once, adapt with AI, then schedule and publish to every connected platform via a resilient job queue.',
        tech: ['Next.js 16', 'Supabase', 'TanStack Query', 'AI'] },

    { repo: 'personal_task_manager-2026-', title: 'Daymark: Personal Task Manager', category: 'mobile', tier: 2, pushed: '2026-08-13', accent: 'blue', icon: 'fa-list-check',
        description: 'Single codebase for Android and web with a calm "Day Spine" timeline and 150–200 ms micro-interactions, backed by Supabase.',
        tech: ['React Native', 'Expo SDK 57', 'Supabase'] },
    { repo: 'QueueStorm-Investigator', title: 'QueueStorm Investigator', category: 'ai', tier: 2, pushed: '2026-06-26', accent: 'cyan', icon: 'fa-headset',
        description: 'AI/API SupportOps copilot for a digital-finance platform. It classifies tickets, analyses transactions and drafts safe replies. Built for SUST CSE Carnival 2026.',
        tech: ['NestJS', 'TypeScript', 'class-validator'] },
    { repo: 'Mock-Hackathon', title: 'QueueStorm Classifier', category: 'ai', tier: 2, pushed: '2026-06-25', accent: 'blue', icon: 'fa-tags',
        description: 'Support-ticket classification service for a digital-finance company: assigns case type, severity and department, and writes safe agent summaries.',
        tech: ['Node.js', 'TypeScript', 'Rules engine'] },
    { repo: 'IUT_Hackathon', title: 'Office Energy Monitor', category: 'web', tier: 2, pushed: '2026-07-04', accent: 'green', icon: 'fa-bolt',
        description: 'Hackathon build that simulates 15 devices across 3 rooms, tracks power usage and detects anomalies, with a Next.js dashboard and a Discord bot.',
        tech: ['NestJS', 'Next.js', 'Discord bot'] },
    { repo: 'FitnessApp', title: 'FitTrack Mobile', category: 'mobile', tier: 2, pushed: '2026-06-23', accent: 'green', icon: 'fa-dumbbell',
        description: 'Cross-platform fitness tracker shipped as an Android APK with over-the-air updates via EAS Update.',
        tech: ['Expo', 'React Native', 'Supabase', 'EAS'] },
    { repo: 'FitnessWeb', title: 'FitTrack Web', category: 'web', tier: 2, pushed: '2026-06-18', accent: 'green', icon: 'fa-heart-pulse', image: 'Image/projects/fitness-web.webp', live: 'https://fitness-web-peach.vercel.app',
        description: 'Fitness companion for the web: track workouts, monitor nutrition and analyse sleep in one dashboard.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
    { repo: 'meal-panner', title: 'BD Meal Plan', category: 'web', tier: 2, pushed: '2026-08-02', accent: 'amber', icon: 'fa-utensils',
        description: 'Bilingual Bangladeshi meal planner with drag-and-drop weekly plans, 80+ recipes, a serving scaler and auto-generated grocery lists.',
        tech: ['Next.js 16', 'React 19', 'Tailwind v4', 'Framer Motion'] },
    { repo: 'task-management-system', title: 'TaskFlow', category: 'web', tier: 2, pushed: '2026-08-02', accent: 'violet', icon: 'fa-table-columns', image: 'Image/projects/taskflow.webp', live: 'https://task-management-system-kohl-gamma.vercel.app',
        description: 'Task management dashboard with drag-and-drop boards, calendar, notes, shared workspaces and role-based permissions.',
        tech: ['JavaScript', 'Firebase', 'Auth'] },
    { repo: 'MAD-StudentDirectory', title: 'Student Directory', category: 'mobile', tier: 2, pushed: '2026-09-02', accent: 'blue', icon: 'fa-address-book',
        description: 'React Native + Expo student directory with its own server, built for AIUB Mobile App Development (Summer 2025-26).',
        tech: ['React Native', 'Expo', 'TypeScript'] },
    { repo: 'purrfect_Picks', title: 'Purrfect Picks', category: 'web', tier: 2, pushed: '2026-08-17', accent: 'pink', icon: 'fa-cat', image: 'Image/projects/purrfect-picks.webp', live: 'https://purrfect-picks-sigma.vercel.app',
        description: 'E-commerce store for cat accessories with cart, checkout and an admin panel on Firebase Realtime Database.',
        tech: ['Flask', 'Firebase', 'HTML/CSS'] },
    { repo: 'restaurant-reservations-Demo-', title: 'Restaurant Reservations', category: 'web', tier: 2, pushed: '2026-08-16', accent: 'rose', icon: 'fa-champagne-glasses',
        description: 'Restaurant booking site with table reservations backed by a Supabase Postgres schema.',
        tech: ['Next.js', 'TypeScript', 'Supabase'] },
    { repo: 'event-management-demo-website', title: 'Event Management', category: 'web', tier: 2, pushed: '2026-08-16', accent: 'violet', icon: 'fa-calendar-days',
        description: 'Event listing and management website built with the Next.js App Router.',
        tech: ['Next.js', 'TypeScript'] },
    { repo: 'Smart_Relief_BD', title: 'Smart Relief BD', category: 'web', tier: 2, pushed: '2026-04-24', accent: 'cyan', icon: 'fa-life-ring',
        description: 'Disaster-response dashboard for Bangladesh with an interactive map, live air quality, health guidance and civic issue reporting.',
        tech: ['React', 'Leaflet', 'Framer Motion', 'Open-Meteo'] },
    { repo: 'ChatWithBuddy', title: 'ChatWithBuddy', category: 'web', tier: 2, pushed: '2026-04-15', accent: 'blue', icon: 'fa-comments',
        description: 'Real-time chat app with email and Google OAuth sign-in, instant messaging and dark mode.',
        tech: ['React', 'Supabase Realtime', 'OAuth'] },
    { repo: 'blood-donation-website', title: 'Blood Donation Management', category: 'web', tier: 2, pushed: '2026-05-18', accent: 'rose', icon: 'fa-droplet',
        description: 'Connects donors with patients through role-based dashboards for donors, patients and admins, using JWT sessions.',
        tech: ['Next.js', 'JWT Auth', 'REST API'] },
    { repo: 'ByteShelf-v2', title: 'ByteShelf', category: 'web', tier: 2, pushed: '2026-03-16', accent: 'violet', icon: 'fa-book', image: 'Image/projects/byteshelf.webp', live: 'https://byte-shelf-v2-admin.vercel.app',
        description: 'CS knowledge platform where students access PDF books and resources, with an admin panel for content management.',
        tech: ['JavaScript', 'Node.js', 'Admin panel'] },
    { repo: 'software_selling_platform', title: 'Software Lagbe', category: 'web', tier: 2, pushed: '2026-02-18', accent: 'blue', icon: 'fa-laptop-code', image: 'Image/projects/software-lagbe.webp', live: 'https://software-selling-platform.vercel.app',
        description: 'Software-agency site with service showcase, meeting scheduler and an admin dashboard for contacts and bookings.',
        tech: ['Flask', 'Firebase', 'JavaScript'] },
    { repo: 'BuyFastBD', title: 'BuyFastBD', category: 'web', tier: 2, pushed: '2026-02-10', accent: 'amber', icon: 'fa-bag-shopping',
        description: 'Conversion-focused e-commerce platform with real-time product updates, a persistent cart and an admin console.',
        tech: ['React', 'Firebase'] },
    { repo: 'Multi-Terminal-Workspace', title: 'Multi-Terminal Workspace', category: 'desktop', tier: 2, pushed: '2026-06-11', accent: 'violet', icon: 'fa-table-cells-large',
        description: 'The original Python prototype of AgentDeck: several terminals tiled in one desktop window.',
        tech: ['Python', 'Qt'] },
    { repo: 'TeacherRatingSyetemNLP', title: 'Teacher Rating System (NLP)', category: 'ai', tier: 2, pushed: '2026-03-05', accent: 'amber', icon: 'fa-chalkboard-user',
        description: 'Predicts 1–5 star ratings and sentiment from student feedback written in English or Banglish.',
        tech: ['Python', 'NLP', 'scikit-learn'] },
    { repo: 'Healthcare', title: 'AI Healthcare Assistant', category: 'ai', tier: 2, pushed: '2025-05-06', accent: 'green', icon: 'fa-stethoscope',
        description: 'Bilingual (English/Bengali) healthcare assistant for Bangladesh with symptom analysis and medicine recommendations.',
        tech: ['Python', 'AI', 'Flask'] },
    { repo: 'NewsSummarizer', title: 'NewsSummarizer', category: 'ai', tier: 2, pushed: '2025-04-13', accent: 'cyan', icon: 'fa-newspaper',
        description: 'Aggregates articles from leading Bangladeshi newspapers and generates concise AI summaries.',
        tech: ['Python', 'AI', 'Web scraping'] },
    { repo: 'dog_and_cat_finder_using_ml', title: 'Cat vs Dog Classifier', category: 'ai', tier: 2, pushed: '2025-03-18', accent: 'pink', icon: 'fa-paw',
        description: 'Deep-learning image classifier using transfer learning on ResNet18, with drag-and-drop upload and confidence scores.',
        tech: ['Python', 'PyTorch', 'ResNet18'] },
    { repo: 'textToImage', title: 'AI Image Generator', category: 'ai', tier: 2, pushed: '2025-03-10', accent: 'violet', icon: 'fa-wand-magic-sparkles',
        description: 'Text-to-image generation with the FLUX.1 model via the Hugging Face inference API.',
        tech: ['Python', 'Hugging Face', 'FLUX.1'] },
    { repo: 'TaskManager-With-Python', title: 'Task Manager (Desktop)', category: 'desktop', tier: 2, pushed: '2026-03-14', accent: 'blue', icon: 'fa-clipboard-list',
        description: 'Multi-user desktop task and notes app with authentication, built on an MVC architecture.',
        tech: ['Python', 'CustomTkinter', 'MVC'] },
    { repo: 'Robotics-Lab', title: 'RoboTeam Hub', category: 'web', tier: 2, pushed: '2025-03-02', accent: 'cyan', icon: 'fa-robot',
        description: 'Hub for our robotics team: Robo Soccer, line followers, drones, competitions and recruitment.',
        tech: ['HTML', 'CSS', 'JavaScript'] },

    { repo: 'MAD-For-Officials', title: 'Officials Console (Expo)', category: 'mobile', tier: 3, pushed: '2026-06-27', accent: 'green', icon: 'fa-user-tie',
        description: 'Expo mobile app prototype for officials\' workflows, built during Mobile App Development coursework.',
        tech: ['React Native', 'Expo', 'TypeScript'] },
    { repo: 'MAD-student-card', title: 'Student Card App', category: 'mobile', tier: 3, pushed: '2026-06-11', accent: 'blue', icon: 'fa-id-card',
        description: 'Digital student ID card app built with Expo for Mobile App Development coursework.',
        tech: ['React Native', 'Expo'] },
    { repo: 'StudentDirectory', title: 'Student Directory (Lab)', category: 'mobile', tier: 3, pushed: '2026-07-01', accent: 'blue', icon: 'fa-users',
        description: 'Expo Router lab app listing students, with search and detail screens.',
        tech: ['React Native', 'Expo Router'] },
    { repo: 'MAD-LAB-6', title: 'Mobile Lab 6', category: 'mobile', tier: 3, pushed: '2026-08-19', accent: 'blue', icon: 'fa-flask',
        description: 'Mobile App Development lab exercise covering navigation, context state and components.',
        tech: ['React Native', 'Expo'] },
    { repo: 'AdvanceWebTech1', title: 'NestJS REST APIs', category: 'web', tier: 3, pushed: '2026-04-09', accent: 'rose', icon: 'fa-plug',
        description: 'Advanced Web Technologies coursework: product inventory, university system and course-management APIs.',
        tech: ['NestJS', 'TypeScript'] },
    { repo: 'React_Frontend', title: 'React Labs & Student Dashboard', category: 'web', tier: 3, pushed: '2026-04-28', accent: 'cyan', icon: 'fa-gauge',
        description: 'React + Vite lab work culminating in a student dashboard.',
        tech: ['React', 'Vite'] },
    { repo: 'WT_Fall-25-26-', title: 'Web Technologies Coursework', category: 'web', tier: 3, pushed: '2026-01-19', accent: 'violet', icon: 'fa-code',
        description: 'Mid- and final-term assignments, lab tasks and practice code for the Web Technologies course.',
        tech: ['PHP', 'JavaScript', 'HTML/CSS'] },
    { repo: 'PlumberDemoWebsite', title: 'Plumber Business Website', category: 'web', tier: 3, pushed: '2026-03-30', accent: 'blue', icon: 'fa-wrench',
        description: 'Landing page for a local plumbing business.',
        tech: ['HTML', 'CSS'] },
    { repo: 'PetShop', title: 'Pet Shop Management', category: 'desktop', tier: 3, pushed: '2025-09-13', accent: 'amber', icon: 'fa-dog',
        description: 'Windows Forms pet-shop management system on SQL Server.',
        tech: ['C#', 'WinForms', 'SQL Server'] },
    { repo: 'Community-Microloan-platform', title: 'Community Microloan Platform', category: 'desktop', tier: 3, pushed: '2025-07-02', accent: 'green', icon: 'fa-hand-holding-dollar',
        description: 'Lender, borrower and monitor roles collaborating on community microloans, with repayment tracking.',
        tech: ['C#', '.NET', 'SQL'] },
    { repo: 'EduBuilder', title: 'EduBuilder', category: 'web', tier: 3, pushed: '2025-07-27', accent: 'violet', icon: 'fa-graduation-cap',
        description: 'Website for an academic-project mentorship service covering software, hardware and research projects.',
        tech: ['HTML', 'CSS', 'JavaScript'] },
    { repo: 'react-login-signup-with-firebase-database-', title: 'React Auth with Firebase', category: 'web', tier: 3, pushed: '2025-07-17', accent: 'amber', icon: 'fa-right-to-bracket',
        description: 'Login and sign-up flow in React backed by Firebase Authentication and Database.',
        tech: ['React', 'Firebase'] },
    { repo: 'Academic-Excuse-Generator', title: 'Academic Excuse Generator', category: 'web', tier: 3, pushed: '2025-04-16', accent: 'pink', icon: 'fa-face-grin-squint',
        description: 'Tongue-in-cheek generator of academic excuses in three styles, with copy and download.',
        tech: ['Python', 'Flask', 'JavaScript'] },
    { repo: 'TO-do_list', title: 'To-Do List (WinForms)', category: 'desktop', tier: 3, pushed: '2025-04-10', accent: 'blue', icon: 'fa-square-check',
        description: 'Windows Forms to-do app with task details, status tracking and persistence.',
        tech: ['C#', 'WinForms'] },
    { repo: 'Weather', title: 'Weather + Gemini', category: 'web', tier: 3, pushed: '2025-03-26', accent: 'cyan', icon: 'fa-cloud-sun',
        description: 'Simple weather page enhanced with Google Gemini.',
        tech: ['HTML', 'JavaScript', 'Gemini API'] },
    { repo: 'Online_Quiz', title: 'Online Quiz', category: 'web', tier: 3, pushed: '2025-03-21', accent: 'violet', icon: 'fa-circle-question',
        description: 'Configurable quiz app pulling questions from the Open Trivia Database.',
        tech: ['JavaScript', 'REST API'] },
    { repo: 'unit-converter', title: 'Unit Converter', category: 'web', tier: 3, pushed: '2025-03-15', accent: 'green', icon: 'fa-right-left',
        description: 'Converts temperature, length, weight and currency, with live exchange rates.',
        tech: ['HTML', 'JavaScript', 'ExchangeRate API'] },
    { repo: 'expense-tracker', title: 'Expense Tracker', category: 'desktop', tier: 3, pushed: '2025-03-10', accent: 'amber', icon: 'fa-wallet',
        description: 'Tkinter expense tracker with CSV storage and category breakdowns.',
        tech: ['Python', 'Tkinter'] },
    { repo: 'TaskMasterPro', title: 'TaskMaster Pro', category: 'web', tier: 3, pushed: '2025-02-25', accent: 'blue', icon: 'fa-list-ul',
        description: 'Task manager with priorities, due dates and notes.',
        tech: ['JavaScript', 'HTML/CSS'] },
    { repo: 'snake_game', title: 'Snake (Pygame)', category: 'game', tier: 3, pushed: '2025-03-10', accent: 'green', icon: 'fa-worm',
        description: 'Classic Snake with sound effects, high score and start/game-over screens.',
        tech: ['Python', 'Pygame'] },
    { repo: 'snake-game-', title: 'Snake (Terminal)', category: 'game', tier: 3, pushed: '2025-08-10', accent: 'green', icon: 'fa-terminal',
        description: 'Terminal-based Snake game playable with arrow keys or WASD.',
        tech: ['Python', 'curses'] },
    { repo: 'Basic-Calculator-in-python', title: 'Calculator 3000', category: 'desktop', tier: 3, pushed: '2025-03-01', accent: 'violet', icon: 'fa-calculator',
        description: 'A deliberately over-engineered Python calculator.',
        tech: ['Python'] }
];

// Repos deliberately left off the portfolio (profile config, the portfolio itself,
// placeholder / empty repos and non-professional personal pages).
const HIDDEN_REPOS = new Set([
    'atik806', 'AgentDeck', 'Portfolio-v2', 'portfolio', 'test', 'a-little-question',
    'e-commerce-Website-', 'HelpHub_Basundhora-', 'Memories',
    'NestJsBackendForTesting', 'NEXTJSFRONTENDFORTESTING'
]);

const TYPED_PHRASES = [
    'production web platforms',
    'desktop tools for AI agents',
    'cross-platform mobile apps',
    'AI-powered products',
    'secure, scalable APIs'
];

const CODE_COVERS = {
    sofol: `<span class="c">// server/src/modules/farmer/loans.ts</span>
<span class="k">router</span>.<span class="f">post</span>(<span class="s">'/loans'</span>,
  <span class="f">requireAuth</span>, <span class="f">requireRole</span>(<span class="s">'farmer'</span>),
  <span class="k">async</span> (req, res) => {
    <span class="k">const</span> app = <span class="k">await</span> <span class="f">createLoanApplication</span>({
      farmerId: req.user.id,
      amount: req.body.amount,
      purpose: req.body.purpose,
    });
    res.<span class="f">status</span>(<span class="n">201</span>).<span class="f">json</span>(app);
  });`,
    postpilot: `<span class="c">// publishing queue — retries with backoff</span>
<span class="k">export async function</span> <span class="f">drainQueue</span>() {
  <span class="k">const</span> jobs = <span class="k">await</span> <span class="f">claimDueJobs</span>({ limit: <span class="n">25</span> });
  <span class="k">for</span> (<span class="k">const</span> job <span class="k">of</span> jobs) {
    <span class="k">try</span> {
      <span class="k">await</span> provider(job.platform).<span class="f">publish</span>(job);
      <span class="k">await</span> <span class="f">markPublished</span>(job.id);
    } <span class="k">catch</span> (err) {
      <span class="k">await</span> <span class="f">retryLater</span>(job, <span class="n">2</span> ** job.attempts);
    }
  }
}`
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let allProjects = [];
let activeFilter = 'all';
let searchQuery = '';
let visibleCount = PAGE_SIZE;
let statsAnimated = false;

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupNavbarScroll();
    setupScrollSpy();
    setupTyping();
    setupMarquee();
    setupPointerEffects();
    renderShowcase();
    initProjects();
    setupFormHandling();
    setupBackToTop();
    setupReveal();
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!hamburger || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 960 && navMenu.classList.contains('active')) closeMenu();
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const progress = document.querySelector('.scroll-progress');
    let ticking = false;

    function update() {
        const y = window.scrollY;
        if (navbar) navbar.classList.toggle('scrolled', y > 30);
        if (progress) {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
    update();
}

function setupScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}

// ---------------------------------------------------------------------------
// Hero & ambient effects
// ---------------------------------------------------------------------------

function setupTyping() {
    const el = document.getElementById('typed');
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // The first phrase is already in the markup; start by erasing it.
    let phrase = 0;
    let chars = TYPED_PHRASES[0].length;
    let deleting = true;

    function tick() {
        const text = TYPED_PHRASES[phrase];
        let delay;

        if (deleting) {
            chars--;
            delay = 35;
            if (chars === 0) {
                deleting = false;
                phrase = (phrase + 1) % TYPED_PHRASES.length;
                delay = 350;
            }
        } else {
            chars++;
            delay = 70;
            if (chars === text.length) {
                deleting = true;
                delay = 2200;
            }
        }

        el.textContent = TYPED_PHRASES[phrase].slice(0, chars);
        setTimeout(tick, delay);
    }

    setTimeout(tick, 2600);
}

function setupMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;
    // Duplicate the items so the -50% translate loops seamlessly.
    [...track.children].forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
}

function setupPointerEffects() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const glow = document.querySelector('.cursor-glow');
    let raf = null;
    let x = 0;
    let y = 0;

    document.addEventListener('pointermove', (e) => {
        x = e.clientX;
        y = e.clientY;
        document.body.classList.add('has-pointer');
        if (!raf) {
            raf = requestAnimationFrame(() => {
                if (glow) glow.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
                raf = null;
            });
        }

        const card = e.target.closest('.spot');
        if (card) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        }
    }, { passive: true });

    document.addEventListener('pointerleave', () => document.body.classList.remove('has-pointer'));
}

function setupReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        // Stagger siblings that enter together.
        const siblings = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains('reveal')) : [];
        const index = siblings.indexOf(el);
        if (index > 0) el.style.transitionDelay = `${Math.min(index, 6) * 70}ms`;
        observer.observe(el);
    });

    // Hero content is above the fold — reveal it immediately.
    requestAnimationFrame(() => {
        document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
    });
}

function setupBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 900);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------------------------------------------------------------------------
// Flagship showcase
// ---------------------------------------------------------------------------

function renderShowcase() {
    const container = document.getElementById('showcase');
    if (!container) return;

    container.innerHTML = FLAGSHIPS.map(project => {
        const media = project.image
            ? `<img src="${attr(project.image)}" alt="${attr(project.title)} screenshot" loading="lazy" width="960" height="600">`
            : `<pre class="code-cover">${CODE_COVERS[project.code] || ''}</pre>`;

        const links = [
            project.live ? `<a href="${attr(project.live)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${escapeHtml(project.liveLabel || 'Live site')} <i class="fas fa-arrow-up-right-from-square"></i></a>` : '',
            project.github ? `<a href="${attr(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="fab fa-github"></i> ${escapeHtml(project.githubLabel || 'Source')}</a>` : '',
            project.github2 ? `<a href="${attr(project.github2)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="fab fa-github"></i> ${escapeHtml(project.github2Label || 'Source')}</a>` : '',
            !project.github ? `<span class="btn btn-ghost" aria-disabled="true" title="Source is private"><i class="fas fa-lock"></i> Private source</span>` : ''
        ].join('');

        return `
            <article class="flagship spot reveal" style="--accent-rgb:${ACCENTS[project.accent]};--accent2-rgb:${ACCENTS[project.accent2]}">
                <div class="flagship-media">
                    <div class="browser">
                        <div class="browser-bar"><i></i><i></i><i></i><span class="browser-url">${escapeHtml(project.url)}</span></div>
                        ${media}
                    </div>
                </div>
                <div class="flagship-body">
                    <div class="flagship-kicker">
                        <span class="badge">${escapeHtml(project.badge)}</span>
                        ${project.live ? '<span class="badge badge-live">Live</span>' : ''}
                    </div>
                    <h3 class="flagship-title">${escapeHtml(project.title)}</h3>
                    <p class="flagship-tagline">${escapeHtml(project.tagline)}</p>
                    <p class="flagship-desc">${escapeHtml(project.description)}</p>
                    <ul class="flagship-points">${project.points.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>
                    <div class="chips">${project.tech.map(t => `<span class="chip chip-strong">${escapeHtml(t)}</span>`).join('')}</div>
                    <div class="flagship-links">${links}</div>
                </div>
            </article>`;
    }).join('');
}

// ---------------------------------------------------------------------------
// All projects grid
// ---------------------------------------------------------------------------

async function initProjects() {
    // Render the curated list immediately so the grid never waits on GitHub.
    allProjects = buildProjects(new Map());
    renderFilters();
    renderProjects();
    setupProjectControls();

    const repos = await fetchRepos();
    if (!repos) return;

    const repoMap = new Map(repos.filter(r => !r.fork).map(r => [r.name, r]));
    allProjects = buildProjects(repoMap);
    renderFilters();
    renderProjects();
    updateGitHubStats(repos.filter(r => !r.fork));
}

function buildProjects(repoMap) {
    const known = new Set(PROJECTS.map(p => p.repo).filter(Boolean));

    const curated = PROJECTS.map(p => {
        const repo = p.repo ? repoMap.get(p.repo) : null;
        return {
            ...p,
            github: p.repo ? (repo?.html_url || `https://github.com/${GITHUB_USER}/${p.repo}`) : null,
            lang: p.lang || repo?.language || null,
            stars: repo?.stargazers_count || 0,
            pushed: repo?.pushed_at || p.pushed
        };
    });

    // Any newer public repo that isn't curated yet still shows up automatically.
    const discovered = [...repoMap.values()]
        .filter(r => !known.has(r.name) && !HIDDEN_REPOS.has(r.name) && !r.fork && !r.archived && r.size > 0)
        .map(r => ({
            repo: r.name,
            title: prettifyName(r.name),
            description: r.description || 'A project from my GitHub.',
            category: guessCategory(r),
            tier: 2,
            lang: r.language,
            tech: [r.language, ...(r.topics || []).slice(0, 3)].filter(Boolean),
            accent: 'violet',
            icon: 'fa-code',
            github: r.html_url,
            live: r.homepage || null,
            stars: r.stargazers_count || 0,
            pushed: r.pushed_at
        }));

    return [...curated, ...discovered].sort((a, b) =>
        (a.tier - b.tier) || (new Date(b.pushed) - new Date(a.pushed))
    );
}

function guessCategory(repo) {
    const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
    if (/expo|react-native|android|ios|mobile/.test(text)) return 'mobile';
    if (/\b(ai|ml|nlp|llm|gpt|model|classifier)\b/.test(text)) return 'ai';
    if (/game/.test(text)) return 'game';
    if (['Python', 'C#', 'C++'].includes(repo.language)) return 'desktop';
    return 'web';
}

function prettifyName(name) {
    return name.replace(/[-_]+/g, ' ').replace(/\s+$/, '').replace(/\b\w/g, c => c.toUpperCase());
}

function filteredProjects() {
    const q = searchQuery.trim().toLowerCase();
    return allProjects.filter(p => {
        if (activeFilter !== 'all' && p.category !== activeFilter) return false;
        if (!q) return true;
        const haystack = `${p.title} ${p.description} ${p.tech.join(' ')} ${p.lang || ''} ${p.repo || ''}`.toLowerCase();
        return haystack.includes(q);
    });
}

function renderFilters() {
    const container = document.getElementById('projectFilters');
    if (!container) return;

    const counts = allProjects.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});

    const buttons = [{ key: 'all', label: 'All', count: allProjects.length }]
        .concat(Object.entries(CATEGORIES)
            .filter(([key]) => counts[key])
            .map(([key, cat]) => ({ key, label: cat.label, count: counts[key] })));

    container.innerHTML = buttons.map(b => `
        <button class="filter-btn${b.key === activeFilter ? ' active' : ''}" data-filter="${b.key}" aria-pressed="${b.key === activeFilter}">
            ${escapeHtml(b.label)} <small>${b.count}</small>
        </button>`).join('');
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const countEl = document.getElementById('projectCount');
    const loadMore = document.getElementById('loadMore');
    if (!grid) return;

    const list = filteredProjects();
    if (countEl) countEl.textContent = list.length;

    if (!list.length) {
        grid.innerHTML = '<p class="no-projects">No projects match your search.</p>';
        if (loadMore) loadMore.hidden = true;
        return;
    }

    const visible = list.slice(0, visibleCount);
    grid.innerHTML = visible.map((p, i) => createProjectCard(p, i)).join('');

    if (loadMore) {
        const remaining = list.length - visible.length;
        loadMore.hidden = remaining <= 0;
        loadMore.innerHTML = `Show ${Math.min(remaining, PAGE_SIZE)} more <span class="mono">(${remaining} left)</span> <i class="fas fa-chevron-down"></i>`;
    }
}

function createProjectCard(p, index) {
    const cat = CATEGORIES[p.category] || CATEGORIES.web;
    const accent = ACCENTS[p.accent] || ACCENTS.violet;
    const delay = (index % PAGE_SIZE) * 45;

    const cover = p.image
        ? `<img src="${attr(p.image)}" alt="${attr(p.title)} screenshot" loading="lazy" width="960" height="600">`
        : `<div class="cover-art"><span class="cover-icon"><i class="fas ${attr(p.icon || cat.icon)}"></i></span></div>
           ${p.lang ? `<span class="cover-lang"><span class="lang-dot" style="--lang:${LANG_COLORS[p.lang] || '#888'}"></span>${escapeHtml(p.lang)}</span>` : ''}`;

    const badges = `
        <div class="cover-badges">
            <span class="badge">${escapeHtml(cat.label)}</span>
            ${p.live ? '<span class="badge badge-live">Live</span>' : (p.tier === 1 ? '<span class="badge badge-muted">Featured</span>' : '')}
        </div>`;

    const links = [
        p.github ? `<a href="${attr(p.github)}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="${attr(p.title)} source code on GitHub"><i class="fab fa-github"></i></a>` : '',
        p.live ? `<a href="${attr(p.live)}" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Open ${attr(p.title)} live"><i class="fas fa-arrow-up-right-from-square"></i></a>` : ''
    ].join('');

    return `
        <article class="project-card spot" data-category="${attr(p.category)}" style="--accent-rgb:${accent};animation-delay:${delay}ms">
            <div class="card-cover">${cover}${badges}</div>
            <div class="card-body">
                <h4 class="card-title">${escapeHtml(p.title)}</h4>
                <p class="card-desc">${escapeHtml(p.description)}</p>
                <div class="chips">${p.tech.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('')}</div>
                <div class="card-foot">
                    <div class="card-meta">
                        <span title="Last updated"><i class="far fa-clock"></i> ${getTimeAgo(new Date(p.pushed))}</span>
                        ${p.stars ? `<span title="GitHub stars"><i class="far fa-star"></i> ${p.stars}</span>` : ''}
                    </div>
                    <div class="card-links">${links}</div>
                </div>
            </div>
        </article>`;
}

function setupProjectControls() {
    const filters = document.getElementById('projectFilters');
    const search = document.getElementById('projectSearch');
    const loadMore = document.getElementById('loadMore');

    if (filters) {
        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            activeFilter = btn.dataset.filter;
            visibleCount = PAGE_SIZE;
            filters.querySelectorAll('.filter-btn').forEach(b => {
                const active = b === btn;
                b.classList.toggle('active', active);
                b.setAttribute('aria-pressed', active);
            });
            renderProjects();
        });
    }

    if (search) {
        let timer;
        search.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                searchQuery = search.value;
                visibleCount = PAGE_SIZE;
                renderProjects();
            }, 120);
        });
    }

    if (loadMore) {
        loadMore.addEventListener('click', () => {
            visibleCount += PAGE_SIZE;
            renderProjects();
        });
    }
}

// ---------------------------------------------------------------------------
// GitHub data
// ---------------------------------------------------------------------------

async function fetchRepos() {
    // The Flask backend proxies (and caches) the GitHub API to avoid rate limits.
    try {
        const res = await fetch('/api/projects');
        if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.projects)) return data.projects;
        }
    } catch {
        // fall through to the public API
    }

    try {
        const res = await fetch(`${GITHUB_API_URL}?per_page=100&sort=pushed`);
        if (res.ok) return await res.json();
    } catch {
        // non-fatal
    }

    console.warn('GitHub unavailable — showing curated project data without live stats.');
    return null;
}

function updateGitHubStats(repos) {
    const stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const languages = new Set(repos.map(r => r.language).filter(Boolean)).size;
    const lastPush = repos.map(r => r.pushed_at).filter(Boolean).sort().pop();

    const targets = { totalRepos: repos.length, totalStars: stars, languages };
    Object.entries(targets).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.dataset.target = value;
    });

    const lastPushEl = document.getElementById('lastPush');
    if (lastPushEl && lastPush) lastPushEl.textContent = getTimeAgo(new Date(lastPush), true);

    document.querySelectorAll('[data-live="repos"]').forEach(el => {
        el.textContent = repos.length;
    });

    setupStatsObserver();
}

function setupStatsObserver() {
    const section = document.getElementById('stats');
    if (!section || statsAnimated) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(section);
}

function animateCounters() {
    ['totalRepos', 'totalStars', 'languages'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1400;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    });
}

function getTimeAgo(date, short = false) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (!Number.isFinite(seconds)) return '';
    const intervals = [
        { label: 'year', s: 31536000 },
        { label: 'month', s: 2592000 },
        { label: 'week', s: 604800 },
        { label: 'day', s: 86400 },
        { label: 'hour', s: 3600 },
        { label: 'minute', s: 60 }
    ];
    for (const { label, s } of intervals) {
        const count = Math.floor(seconds / s);
        if (count >= 1) {
            if (short) return `${count}${label === 'month' ? 'mo' : label[0]} ago`;
            return `${count} ${label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------

function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) validateField(input);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });
        if (!isValid) return;

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const payload = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success) {
                form.reset();
                inputs.forEach(i => i.classList.remove('success'));
                showToast('Message sent! I\'ll get back to you soon.');
            } else if (response.status === 503 && result.fallback) {
                // SMTP isn't configured on the server: open the visitor's mail client instead.
                const subject = encodeURIComponent(`Portfolio contact from ${payload.name}`);
                const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
                window.location.href = `${result.fallback}?subject=${subject}&body=${body}`;
                showToast('Opened your email app. Just hit send.');
            } else {
                showToast(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showToast('Network error. Email me directly at atikrj8@gmail.com.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return true;

    let isValid = true;
    if (field.required && !field.value.trim()) {
        isValid = false;
    } else if (field.type === 'email' && field.value) {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    }

    formGroup.classList.toggle('has-error', !isValid);
    field.classList.toggle('error', !isValid);
    field.classList.toggle('success', isValid && Boolean(field.value.trim()));
    return isValid;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('visible'), 4500);
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function escapeHtml(text) {
    return String(text ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function attr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
