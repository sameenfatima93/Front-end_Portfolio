# 🌟 Sameen Fatima — Portfolio v2

Dark Galaxy theme with Glassmorphism cards, Gold accents & Playfair Display font.

---

## 🚀 How to Run

```bash
npm install
npm start
```

---

## ✏️ HOW TO UPDATE YOUR DATA (Easy!)

**Only edit ONE file: `src/data/portfolio.js`**

### 📸 Add Your Photo
1. Place your photo in `/public/images/sameen.jpg`
2. In `portfolio.js` find `heroImage: null`
3. Change it to: `heroImage: "/images/sameen.jpg"`

### 🖼️ Add Project Screenshots
1. Place screenshots in `/public/images/` folder (e.g. `chrono.png`)
2. In the project object, set:
   - `emoji: "/images/chrono.png"`
   - `useImage: true`

### 📄 Add Your Resume PDFs
1. Place PDF files in `/public/resumes/` folder
2. The links are already set in `RESUMES` array
3. Just put the matching PDF files there!

### 🔗 Update Project Links
- Find the project in `PROJECTS` array
- Change `liveLink: null` to `liveLink: "https://yoursite.netlify.app"`

### ➕ Add a New Project
Copy this template into the PROJECTS array:
```js
{
  emoji: "🎯",           // emoji OR image path
  useImage: false,       // true if using image
  bg: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(45,212,191,0.2))",
  badge: "Live Project",
  title: "Your Project Name",
  desc: "Short description of what you built.",
  techs: ["React", "Tailwind", "Firebase"],
  liveLink: "https://yoursite.netlify.app",
  behanceLink: null,
  inProgress: false,
},
```

### ➕ Add a New Skill Tag
In the SKILLS array, add to the `tags` array:
```js
{ label: "New Skill", color: "purple" }  // purple, teal, or gold
```

---

## 🌐 Deploy on Netlify

```bash
npm run build
```
Then drag the `build` folder to netlify.com → Done! 🎉

Or connect GitHub for auto-deploy on every push.

---

## 📁 File Structure

```
src/
  data/
    portfolio.js   ← ✏️ EDIT ALL YOUR DATA HERE
  components/
    Navbar.jsx     ← Navigation (mobile responsive)
    Hero.jsx       ← Hero section with your photo
    Sections.jsx   ← Skills, Projects, Resume, Contact, Footer
  App.jsx
  index.css        ← Global styles & CSS variables
public/
  images/          ← Put your photos & screenshots here
  resumes/         ← Put your PDF resumes here
```
