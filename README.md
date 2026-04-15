# 🚀 Portfolio — React Edition

A dark, particle-powered personal portfolio for a **Full Stack Dev & AI/ML Enthusiast**.

## ✨ Features
- 250-star interactive particle field with mouse reactivity
- Shooting stars & connection lines
- Custom glowing cursor with lag ring
- Animated hero with typewriter effect
- Scroll-triggered section animations
- Dark cyberpunk theme (teal + purple)

## 📁 Project Structure
```
src/
├── components/
│   ├── StarCanvas.jsx     # Canvas particle animation
│   ├── CustomCursor.jsx   # Glowing custom cursor
│   ├── Navbar.jsx         # Fixed nav with scroll tracking
│   ├── Hero.jsx           # Animated hero + typewriter
│   ├── About.jsx          # About me + stats
│   ├── Experience.jsx     # Timeline with scroll-in
│   ├── Projects.jsx       # Project cards grid
│   ├── Skills.jsx         # Skills category grid
│   ├── Contact.jsx        # Contact + social links
│   └── Footer.jsx         # Footer
├── styles/
│   └── globals.css        # CSS variables + animations
├── App.jsx                # Root component
└── index.js               # Entry point
```

## 🛠 Setup & Run

### Prerequisites
- Node.js v16+
- npm or yarn

### Install & Start
```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```
The optimized build will be in the `build/` folder — ready to deploy on GitHub Pages, Vercel, or Netlify.

## 🎨 Customization

### Personal Details
Edit these files to replace placeholders with your info:

| File | What to change |
|------|---------------|
| `Hero.jsx` | Your name & title |
| `About.jsx` | Bio text, stats |
| `Experience.jsx` | Job history, companies, dates |
| `Projects.jsx` | Project names, descriptions, links |
| `Skills.jsx` | Your tech stack |
| `Contact.jsx` | Email, social links |
| `Footer.jsx` | Your name |

### Theme Colors
Edit CSS variables in `src/styles/globals.css`:
```css
--accent: #00f5d4;    /* Teal — main accent */
--accent2: #7c3aed;   /* Purple — secondary */
--accent3: #f59e0b;   /* Amber — highlights */
```

## 🚀 Deploy to GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json: "homepage": "https://yourusername.github.io/repo-name"
# Add scripts: "predeploy": "npm run build", "deploy": "gh-pages -d build"
npm run deploy
```
