const GITHUB_API_URL = 'https://api.github.com/users/atik806/repos';

// Store all projects (fetched from GitHub)
let allProjects = [];

// Language to category mapping
const LANGUAGE_CATEGORY_MAP = {
    'Python': 'ml',
    'Jupyter Notebook': 'ml',
    'C++': 'robotics',
    'C': 'robotics',
    'Arduino': 'robotics',
    'JavaScript': 'web',
    'TypeScript': 'web',
    'HTML': 'web',
    'CSS': 'web',
    'React': 'web',
    'Vue': 'web',
    'PHP': 'web',
    'Java': 'web',
    'Ruby': 'web'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initializing...');
    try {
        setupNavigation();
        console.log('Navigation setup complete');
        fetchAndDisplayProjects(); // Fetch all GitHub repos
        console.log('Projects fetching...');
        fetchGitHubStats();
        console.log('GitHub stats fetching...');
        generateStarBackground();
        console.log('Star background generated');
        setupFormHandling();
        console.log('Form handling setup complete');
        console.log('Portfolio fully loaded!');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Fetch and Display All GitHub Projects
async function fetchAndDisplayProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) {
        console.error('Projects grid element not found!');
        return;
    }
    
    // Show loading state
    grid.innerHTML = '<div class="loading-projects"><div class="spinner"></div><p>Loading projects from GitHub...</p></div>';
    
    try {
        const response = await fetch(GITHUB_API_URL + '?per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const repos = await response.json();
        
        // Filter out forks and transform to project format
        allProjects = repos
            .filter(repo => !repo.fork)
            .map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                category: getCategory(repo.language),
                tech: [repo.language || 'Unknown'].filter(Boolean),
                github: repo.html_url,
                live: repo.homepage || null,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: repo.updated_at,
                language: repo.language
            }))
            .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recent
        
        console.log('Fetched', allProjects.length, 'projects from GitHub');
        displayProjects(allProjects);
        setupProjectFilters();
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        grid.innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
    }
}

// Get category based on language
function getCategory(language) {
    if (!language) return 'web';
    return LANGUAGE_CATEGORY_MAP[language] || 'web';
}

// Display projects
function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    if (projects.length === 0) {
        grid.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }
    
    grid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    
    // Add initial opacity and transform for animation
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Create Project Card
function createProjectCard(project) {
    const categoryLabel = {
        'robotics': '🤖 ROBOTICS',
        'ml': '🧠 ML',
        'web': '🌐 WEB'
    };
    
    return `
        <div class="project-card" data-category="${project.category}">
            <span class="project-category">${categoryLabel[project.category] || project.category.toUpperCase()}</span>
            <h3 class="project-title">${escapeHtml(project.name)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span>⭐ ${project.stars || 0}</span>
                <span>🍴 ${project.forks || 0}</span>
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i> GitHub
                </a>
                ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live
                </a>` : ''}
            </div>
        </div>
    `;
}

// Setup Project Filters
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            if (filter === 'all') {
                // Show all projects
                displayProjects(allProjects);
            } else {
                // Filter by category
                const filteredProjects = allProjects.filter(p => p.category === filter);
                displayProjects(filteredProjects);
            }
        });
    });
}

// Fetch GitHub Stats
async function fetchGitHubStats() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Failed to fetch');

        const repos = await response.json();
        const nonForkRepos = repos.filter(repo => !repo.fork);

        const totalStars = nonForkRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = nonForkRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
        const languages = new Set(nonForkRepos.map(repo => repo.language).filter(Boolean));

        const totalReposEl = document.getElementById('totalRepos');
        const totalStarsEl = document.getElementById('totalStars');
        const totalForksEl = document.getElementById('totalForks');
        const languagesEl = document.getElementById('languages');

        if (totalReposEl) totalReposEl.textContent = nonForkRepos.length;
        if (totalStarsEl) totalStarsEl.textContent = totalStars;
        if (totalForksEl) totalForksEl.textContent = totalForks;
        if (languagesEl) languagesEl.textContent = languages.size;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        // Set fallback values on error
        const totalReposEl = document.getElementById('totalRepos');
        const totalStarsEl = document.getElementById('totalStars');
        const totalForksEl = document.getElementById('totalForks');
        const languagesEl = document.getElementById('languages');

        if (totalReposEl) totalReposEl.textContent = '0';
        if (totalStarsEl) totalStarsEl.textContent = '0';
        if (totalForksEl) totalForksEl.textContent = '0';
        if (languagesEl) languagesEl.textContent = '0';
    }
}

// Generate Star Background
function generateStarBackground() {
    const starsContainer = document.querySelector('.stars-background');
    if (!starsContainer) return;
    
    const starCount = window.innerWidth > 768 ? 100 : 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        starsContainer.appendChild(star);
    }

    // Add CSS animation if not exists
    if (!document.querySelector('style[data-stars]')) {
        const style = document.createElement('style');
        style.setAttribute('data-stars', 'true');
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup Form Handling
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Smooth scroll for navigation
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

// Observe elements after DOM is ready
setTimeout(() => {
    document.querySelectorAll('.skill-category, .stat-card, .timeline-content').forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        }
    });
}, 100);
