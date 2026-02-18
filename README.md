# Atik's Professional Portfolio

A modern, fully responsive personal portfolio showcasing projects in robotics, machine learning, and full-stack web development. Built with HTML, CSS, JavaScript, and Python Flask.

## 🎯 Features

### Professional Branding
- **Unique Positioning**: Software Engineer | Robotics & ML Enthusiast | Full-Stack Developer
- **Hero Section**: Compelling headline with clear value proposition
- **Social Links**: GitHub, LinkedIn, and CV download

### Comprehensive Sections
1. **Hero Section** - First impression with floating cards
2. **About Me** - Technical journey and expertise
3. **Skills** - Categorized with animated progress bars
4. **Featured Projects** - 6 best projects with filtering
5. **Experience** - Timeline of achievements and competitions
6. **GitHub Stats** - Live stats from GitHub API
7. **Contact** - Multiple ways to connect

### Interactive Features
- 🎨 **3D Animations** - Smooth hover effects and transitions
- 🔍 **Project Filtering** - Filter by Robotics, ML, or Web
- 📊 **Animated Progress Bars** - Skill visualization
- ⭐ **GitHub Integration** - Live project statistics
- 📱 **Fully Responsive** - Mobile, tablet, and desktop
- ✨ **Smooth Scrolling** - Professional navigation

### Design
- Dark theme with blue/purple accents
- Glowing buttons and hover effects
- Terminal-style aesthetic
- Gradient backgrounds
- Smooth animations throughout

## 📁 Project Structure

```
├── index.html          # Main portfolio page
├── styles.css          # Responsive styling with animations
├── script.js           # Frontend functionality
├── app.py              # Flask backend server
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## 🚀 Quick Start

### Option 1: Frontend Only (No Backend)
Simply open `index.html` in your browser. No installation needed!

### Option 2: With Flask Server

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**
   ```bash
   python app.py
   ```

3. **Open in browser:**
   ```
   http://localhost:5000
   ```

## 📋 Sections Breakdown

### Hero Section
- Bold headline: "Hi, I'm Atik. I build intelligent systems using code and creativity."
- Professional positioning
- Call-to-action buttons
- Social media links

### About Me
- Technical journey overview
- Robotics competition experience
- ML and automation focus
- Linux expertise
- Key highlights with checkmarks
- Statistics cards

### Skills
Four categories with animated progress bars:
- **Programming**: Python, JavaScript, C#, TypeScript
- **Web Development**: HTML/CSS, React, Node.js, Flask/Django
- **Machine Learning**: NumPy, Pandas, Scikit-learn, TensorFlow
- **Tools**: Git, Linux (Kali), Docker, VS Code

### Featured Projects
6 curated projects with filtering:

**Robotics:**
- Line Following Robot
- Robo Soccer Bot

**Machine Learning:**
- Agriculture Yield Prediction
- Cat vs Dog Detection

**Web Development:**
- Portfolio with GitHub API
- EarnSkill Course Platform

Each project shows:
- Category badge
- Description
- Tech stack
- Impact statement
- GitHub and live links

### Experience Timeline
- National Robotics Championship
- NSU Tech Fest (Second Round)
- Founder - TechMart
- Full-Stack Developer

### GitHub Stats
Live statistics:
- Total repositories
- Total stars
- Total forks
- Languages used

### Contact
- Email
- Location
- GitHub profile
- Contact form

## 🎨 Customization

### Change GitHub Username
Edit `script.js`:
```javascript
const GITHUB_API_URL = 'https://api.github.com/users/YOUR_USERNAME/repos';
```

### Update Featured Projects
Edit the `FEATURED_PROJECTS` array in `script.js`:
```javascript
const FEATURED_PROJECTS = [
    {
        id: 1,
        name: 'Your Project',
        description: 'Description',
        category: 'web', // robotics, ml, or web
        tech: ['Tech1', 'Tech2'],
        github: 'https://github.com/...',
        live: 'https://...',
        impact: 'Impact statement'
    },
    // ... more projects
];
```

### Customize Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #6366f1;      /* Main color */
    --secondary: #8b5cf6;    /* Secondary */
    --accent: #ec4899;       /* Accent */
    --dark: #0f172a;         /* Dark background */
    /* ... more colors */
}
```

### Update Contact Information
Edit the contact section in `index.html`:
```html
<a href="mailto:your-email@example.com">your-email@example.com</a>
<a href="https://github.com/your-username">github.com/your-username</a>
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grid)
- **Mobile**: Below 768px (single column)
- **Small Mobile**: Below 480px (optimized)

## 🔧 API Endpoints (Backend)

- `GET /` - Serve portfolio
- `GET /api/projects` - Get all projects
- `GET /api/projects/search` - Search projects
- `GET /api/projects/languages` - Get languages
- `GET /api/projects/stats` - Get statistics
- `GET /api/health` - Health check

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- Lazy loading of images
- GPU-accelerated animations
- Optimized CSS and JavaScript
- Minimal dependencies
- Fast GitHub API integration

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels
- Keyboard navigation
- High contrast colors
- Readable font sizes
- Focus indicators

## 🚀 Deployment

### Deploy Frontend (Netlify/Vercel)
1. Push to GitHub
2. Connect repository
3. Deploy automatically

### Deploy Backend (Heroku/Railway)
1. Add `Procfile`:
   ```
   web: python app.py
   ```
2. Deploy using platform CLI

## 📊 What Makes This Portfolio Stand Out

✅ **Specialized Positioning** - Not just a developer, but a specialist in intelligent systems
✅ **Comprehensive** - Covers all aspects: robotics, ML, web development
✅ **Professional** - Clean, modern design with smooth animations
✅ **Responsive** - Works perfectly on all devices
✅ **Interactive** - Engaging animations and filtering
✅ **Live Data** - GitHub stats update in real-time
✅ **Accessible** - Follows web accessibility standards

## 🎓 Learning Resources

This portfolio demonstrates:
- Modern CSS (Grid, Flexbox, Animations)
- Vanilla JavaScript (DOM manipulation, API calls)
- Responsive design principles
- Flask backend development
- GitHub API integration
- Professional web design

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

Feel free to fork and customize this portfolio for your own use!

---

**Built with ❤️ for showcasing intelligent systems and creative solutions**

**Software Engineer | Robotics & ML Enthusiast | Full-Stack Developer**
