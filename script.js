const GITHUB_API_URL = 'https://api.github.com/users/atik806/repos';

let allProjects = [];
let statsAnimated = false;

const CATEGORY_LABELS = {
    'fullstack': 'FULL-STACK',
    'ai': 'AI & ML',
    'robotics': 'ROBOTICS'
};

// Curated, CV-aligned featured projects.
// `repo` is matched against the GitHub API response to enrich stars/updated_at.
// These render even if GitHub is unreachable.
const FEATURED_PROJECTS = [
    {
        repo: 'dhaka_wholesale_frontend',
        title: 'CholoKini — E-Commerce Platform',
        description: 'Full e-commerce platform for a wholesale marketplace with product catalog, cart, order flow, and payment integration.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
        category: 'fullstack',
        live: 'https://cholo-kini-omega.vercel.app'
    },
    {
        repo: 'task-management-system',
        title: 'Task Management System',
        description: 'Collaborative task and project management app with role-based access, boards, and real-time updates.',
        tech: ['React', 'TypeScript', 'Node.js', 'JWT Auth'],
        category: 'fullstack',
        live: 'https://task-management-system-kohl-gamma.vercel.app'
    },
    {
        repo: 'blood-donation-website',
        title: 'Blood Donation Management',
        description: 'Platform connecting donors and recipients with a searchable donor registry and emergency request handling.',
        tech: ['React', 'Node.js', 'Supabase', 'PostgreSQL'],
        category: 'fullstack'
    },
    {
        repo: 'meal-panner',
        title: 'Meal Planner',
        description: 'Smart meal planning web app that generates weekly menus from dietary preferences and tracks nutrition.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        category: 'fullstack'
    },
    {
        repo: 'FitnessWeb',
        title: 'Fitness Web',
        description: 'Interactive fitness platform with workout tracking, progress dashboards, and personalized routines.',
        tech: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
        category: 'fullstack',
        live: 'https://fitness-web-peach.vercel.app'
    },
    {
        repo: 'TeacherRatingSyetemNLP',
        title: 'Teacher Rating System (NLP)',
        description: 'NLP-powered system that analyzes student feedback and generates automated teacher performance ratings.',
        tech: ['Python', 'NLP', 'Machine Learning'],
        category: 'ai'
    },
    {
        repo: 'Robotics-Lab',
        title: 'RoboTeam Hub',
        description: 'Team portal and codebase for competitive robotics — autonomous navigation, sensor integration, and strategy tooling.',
        tech: ['C++', 'Arduino', 'Robotics'],
        category: 'robotics'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchAndDisplayProjects();
    fetchGitHubStats();
    generateStarBackground();
    setupFormHandling();
    setupScrollSpy();
    setupNavbarScroll();
    setupScrollAnimations();
});

// Navigation
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
        const isOpen = navMenu.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeMenu);
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// Scroll spy for active nav link
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// Fetch and display curated featured projects, enriched with live GitHub stats.
async function fetchAndDisplayProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = '<div class="loading-projects"><div class="spinner"></div><p>Loading projects...</p></div>';

    // Best-effort enrichment from GitHub (backend proxy first, then direct API).
    const repoMap = new Map();
    try {
        let repos;
        try {
            const backendResponse = await fetch('/api/projects');
            if (backendResponse.ok) {
                const data = await backendResponse.json();
                if (data.success) {
                    repos = data.projects;
                } else {
                    throw new Error(data.error || 'Backend fetch failed');
                }
            } else {
                throw new Error('Backend unavailable');
            }
        } catch {
            // Fallback: fetch directly from GitHub API
            const directResponse = await fetch(GITHUB_API_URL + '?per_page=100');
            if (!directResponse.ok) throw new Error('Failed to fetch repos from GitHub');
            repos = await directResponse.json();
        }

        repos.filter(repo => !repo.fork).forEach(repo => {
            repoMap.set(repo.name, repo);
        });
    } catch (error) {
        // Non-fatal: curated cards still render, just without live star counts.
        console.warn('GitHub fetch failed — rendering curated projects without live stats.', error);
    }

    allProjects = FEATURED_PROJECTS.map(config => {
        const repo = repoMap.get(config.repo);
        return {
            id: repo?.id || config.repo,
            name: config.title,
            description: config.description,
            category: config.category,
            tech: config.tech,
            github: repo?.html_url || `https://github.com/atik806/${config.repo}`,
            live: config.live || null,
            stars: repo?.stargazers_count || 0,
            forks: repo?.forks_count || 0,
            updated: repo?.updated_at || '2026-01-01T00:00:00Z'
        };
    }).sort((a, b) => new Date(b.updated) - new Date(a.updated));

    displayProjects(allProjects);
    setupProjectFilters();
}

function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }

    grid.innerHTML = projects.map(project => createProjectCard(project)).join('');

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 40);
    });
}

function createProjectCard(project) {
    const date = new Date(project.updated);
    const timeAgo = getTimeAgo(date);

    return `
        <div class="project-card" data-category="${project.category}">
            <span class="project-category">${CATEGORY_LABELS[project.category] || project.category.toUpperCase()}</span>
            <h3 class="project-title">${escapeHtml(project.name)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
            </div>
            <p class="project-updated">Updated ${timeAgo}</p>
            <div class="project-stats">
                <span>&#9733; ${project.stars || 0}</span>
                <span>&#127860; ${project.forks || 0}</span>
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i> Code
                </a>
                ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live
                </a>` : ''}
            </div>
        </div>
    `;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
            displayProjects(filtered);
        });
    });
}

// Fetch GitHub Stats with Counter Animation
async function fetchGitHubStats() {
    try {
        // Try Flask backend stats endpoint first
        let repos;
        try {
            const backendResponse = await fetch('/api/projects/stats');
            if (backendResponse.ok) {
                const data = await backendResponse.json();
                if (data.success) {
                    const stats = data.stats;
                    const targets = {
                        totalRepos: stats.total_projects,
                        totalStars: stats.total_stars,
                        totalForks: stats.total_forks,
                        languages: stats.languages_used
                    };
                    Object.entries(targets).forEach(([key, value]) => {
                        const el = document.getElementById(key);
                        if (el) {
                            el.dataset.target = value;
                            el.textContent = '0';
                        }
                    });
                    setupStatsObserver();
                    return;
                }
            }
        } catch {
            // Fallback: fetch from GitHub API directly
        }

        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Failed to fetch');

        repos = await response.json();
        const nonForkRepos = repos.filter(repo => !repo.fork);

        const totalStars = nonForkRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = nonForkRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
        const languages = new Set(nonForkRepos.map(repo => repo.language).filter(Boolean));

        const stats = {
            totalRepos: nonForkRepos.length,
            totalStars: totalStars,
            totalForks: totalForks,
            languages: languages.size
        };

        // Store targets for counter animation
        Object.entries(stats).forEach(([key, value]) => {
            const el = document.getElementById(key === 'totalRepos' ? 'totalRepos' : key === 'totalStars' ? 'totalStars' : key === 'totalForks' ? 'totalForks' : 'languages');
            if (el) {
                el.dataset.target = value;
                el.textContent = '0';
            }
        });

        setupStatsObserver();
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

function setupStatsObserver() {
    const statsSection = document.getElementById('stats');
    if (!statsSection || statsAnimated) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

function animateCounters() {
    const counters = [
        { el: document.getElementById('totalRepos'), key: 'totalRepos' },
        { el: document.getElementById('totalStars'), key: 'totalStars' },
        { el: document.getElementById('totalForks'), key: 'totalForks' },
        { el: document.getElementById('languages'), key: 'languages' }
    ];

    counters.forEach(({ el }) => {
        if (!el) return;
        const target = parseInt(el.dataset.target) || 0;
        const duration = 1500;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    });
}

// Generate Star Background
function generateStarBackground() {
    const starsContainer = document.querySelector('.stars-background');
    if (!starsContainer) return;

    const isMobile = window.innerWidth <= 768;
    const isSmall = window.innerWidth <= 480;
    const starCount = isSmall ? 20 : isMobile ? 30 : 80;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 0.5;
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            ${isMobile ? '' : `animation: twinkle ${Math.random() * 4 + 2}s infinite ${Math.random() * 2}s;`}
        `;
        fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);

    if (!document.querySelector('style[data-stars]')) {
        const style = document.createElement('style');
        style.setAttribute('data-stars', 'true');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Form Handling with Validation
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
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

        try {
            const payload = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json().catch(() => ({}));

            if (response.ok && result.success) {
                form.reset();
                showToast('Message sent successfully! I\'ll get back to you soon.');
            } else if (response.status === 503 && result.fallback) {
                // SMTP not configured on the server — open the visitor's mail client instead
                const mailto = `${result.fallback}?subject=${encodeURIComponent('Portfolio contact from ' + payload.name)}&body=${encodeURIComponent(payload.message + '\n\n— ' + payload.name + ' (' + payload.email + ')')}`;
                window.location.href = mailto;
                showToast('Opened your email app — please hit send.');
            } else {
                showToast(result.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showToast('Network error. Please try again or email me directly at atikrj8@gmail.com.');
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
    field.classList.toggle('success', isValid && field.value.trim());

    return isValid;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 4000);
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.skill-category, .stat-card, .timeline-content, .stat-box, .contact-item').forEach(el => {
            if (!el.style.opacity) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(16px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            }
        });
    }, 100);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
