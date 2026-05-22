// ============================================================
//  ✏️  SAMEEN'S PORTFOLIO — EDIT ALL YOUR DATA HERE
//  This is the ONLY file you need to update!
// ============================================================

export const PERSONAL = {
  name: "Sameen Fatima",           // Your full name
  logo: "SF.",                      // Logo text in navbar
  tagline: "Available for Opportunities",
  roles: [                          // Typewriter roles (add/remove as you like)
    "UI/UX Designer",
    "Frontend Developer",
    "WordPress Expert",
    "React Developer",
  ],
  bio: "Based in Karachi, Pakistan — I design beautiful interfaces in Figma and bring them to life with React. From concept to code, I craft digital experiences that look great and feel intuitive.",
  location: "Karachi, Pakistan",
  heroImage: "/images/hero.png",  // Your animated avatar character
                    //   (placed in the /public/images/ folder)
  stats: [
    { num: "15+", label: "Projects Done" },
    { num: "3",   label: "Internships" },
    { num: "100%", label: "Colleagues & Owner Satisfaction" },
  ],
};

export const ABOUT = {
  greeting: "A Little About Me",
  headline: "Designer who codes. Developer who designs.",
  bio1: "I'm Sameen Fatima — a UI/UX Designer and Frontend Developer based in Karachi, Pakistan. I started my journey with a passion for making things look beautiful, and quickly discovered that I also love making them work beautifully too.",
  bio2: "With experience across Figma, React.js, WordPress, and Node.js, I bridge the gap between design and development. I've worked in real professional teams, delivered freelance projects internationally, and I'm always hungry to learn more.",
  bio3: "When I'm not designing or coding, I'm exploring new design trends, improving my skills at SMIT, and looking for opportunities to create meaningful digital products.",
  highlights: [
    { icon: "🎨", title: "Design First", desc: "Every project starts with understanding the user — wireframes, flows, and high-fidelity prototypes in Figma." },
    { icon: "⚛️", title: "Code It Live", desc: "I bring designs to life with React.js, Tailwind CSS, and GSAP animations that are smooth and performant." },
    { icon: "🌍", title: "Real Experience", desc: "Internships at Innovelous Solutions & DigiTech Offering, plus freelance work on Fiverr for global clients." },
    { icon: "📚", title: "Always Learning", desc: "Currently completing MERN Stack Development at SMIT Karachi — always pushing my skills further." },
  ],
};

export const CONTACT = {
  email: "sameen.fatima993@gmail.com",
  phone: "03422946953",
  behance: "https://www.behance.net/sameenfatima13",
  github: "https://github.com/sameenfatima93",
  linkedin: "https://www.linkedin.com/in/sameen-fatima-196a353b3/",
  portfolio: "https://luminous-faun-e1e571.netlify.app/",
  fiverr: "",   // Add your Fiverr link here if you want
};

export const SKILLS = [
  {
    icon: "🎨",
    name: "UI/UX Design",
    desc: "End-to-end design from user research and wireframes to polished high-fidelity prototypes.",
    tags: [
      { label: "Figma",       color: "purple" },
      { label: "Adobe XD",    color: "purple" },
      { label: "Prototyping", color: "teal" },
      { label: "Wireframing", color: "teal" },
      { label: "User Flows",  color: "gold" },
    ],
  },
  {
    icon: "⚛️",
    name: "Frontend Development",
    desc: "Building fast, animated, responsive web apps with React.js, Tailwind CSS, and GSAP animations.",
    tags: [
      { label: "React.js",    color: "purple" },
      { label: "Tailwind CSS",color: "teal" },
      { label: "JavaScript",  color: "purple" },
      { label: "GSAP",        color: "gold" },
      { label: "HTML5/CSS3",  color: "teal" },
    ],
  },
  {
    icon: "🌐",
    name: "WordPress Development",
    desc: "Custom WordPress sites with Elementor Pro, WooCommerce, SEO and full responsiveness.",
    tags: [
      { label: "WordPress",    color: "teal" },
      { label: "Elementor Pro",color: "purple" },
      { label: "WooCommerce",  color: "teal" },
      { label: "SEO",          color: "gold" },
    ],
  },
  {
    icon: "🗄️",
    name: "Backend & Tools",
    desc: "Consuming REST APIs, working with Node.js & MongoDB, version control with Git & GitHub.",
    tags: [
      { label: "Node.js",   color: "teal" },
      { label: "MongoDB",   color: "purple" },
      { label: "Git/GitHub",color: "gold" },
      { label: "REST APIs", color: "teal" },
    ],
  },
];

export const PROJECTS = [
  {
    emoji: "/images/chorono store.png",               // ← Replace with image path e.g. "/images/chrono.png"
    useImage: true,           // ← Set true when using image instead of emoji
    bg: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(45,212,191,0.2))",
    badge: "🔥 Team Project",
    title: "Chrono Store",
    desc: "Full-stack smartwatch e-commerce — user shopping + complete admin panel. Built in a real cross-functional team at Innovelous Solutions.",
    techs: ["React.js", "Tailwind", "Node.js", "MongoDB", "GSAP"],
    liveLink: null,            // ← Add link when deployed e.g. "https://chronostore.netlify.app"
    behanceLink: null,
    inProgress: true,
  },
  {
    emoji: "/images/ecommerce-ui.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(255,215,0,0.15),rgba(124,58,237,0.2))",
    badge: "UI/UX Design",
    title: "E-Commerce App UI",
    desc: "Complete Figma design system — product listing, cart, checkout flows with consistent UI and design tokens.",
    techs: ["Figma", "UI Design", "Prototyping"],
    liveLink: null,
    behanceLink: "https://www.behance.net/sameenfatima13",
    inProgress: false,
  },
  {
    emoji: "/images/tere.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(45,212,191,0.2),rgba(124,58,237,0.15))",
    badge: "Live Project",
    title: "Tere Ride-Sharing",
    desc: "Figma to code — responsive landing page with modern card layout, flex/grid and smooth JavaScript interactions.",
    techs: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://dulcet-cocada-0a4035.netlify.app/?",
    behanceLink: null,
    inProgress: false,
  },
  {
    emoji: "/images/postapp.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(255,215,0,0.1),rgba(45,212,191,0.2))",
    badge: "Live Project",
    title: "Post App",
    desc: "Post App” is a responsive web application developed using HTML, CSS, JavaScript, and Supabase with user authentication functionality.",
    techs: ["HTML", "CSS", "JS", "API"],
    liveLink: "https://neon-piroshki-0779a7.netlify.app/",
    behanceLink: null,
    inProgress: false,
  },
  {
    emoji: "/images/healtcare.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(255,215,0,0.1))",
    badge: "UI/UX Design",
    title: "Healthcare Website",
    desc: "Healthcare and wellness landing page design in Figma featuring responsive layouts, service showcase sections, appointment booking flow, customer reviews, and a clean modern visual identity.",
    techs: ["Figma", "Brand Design", "UI/UX"],
    liveLink: null,
    behanceLink: "https://www.behance.net/sameenfatima13",
    inProgress: false,
  },
  {
    emoji: "/images/resumeCraft.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(45,212,191,0.15),rgba(255,215,0,0.15))",
    badge: "Live Project",
    title: "Resume Craft (Hackathon Poject)",
    desc: "ResumeCraft” is a modern and responsive resume builder website designed to help users create professional resumes with an easy and user-friendly interface.",
    techs: ["HTML", "CSS", "JavaScript", "localStorage" , "Bootstrap"],
    liveLink: "https://sameenfatima93.github.io/ResumeCraftWebsite/",
    behanceLink: null,
    inProgress: false,
  },
   {
    emoji: "/images/studentPortal.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(45,212,191,0.15),rgba(255,215,0,0.15))",
    badge: "Live Project",
    title: "Student Portal (Hackathon Poject)",
    desc: " Student Portal” is a responsive web application developed for both students and administrators to manage academic information efficiently.",
    techs: ["HTML", "CSS", "JavaScript", "localStorage" , "Bootstrap", "Supabas"],
    liveLink: "https://sameenfatima93.github.io/ResumeCraftWebsite/",
    behanceLink: null,
    inProgress: false,
  },
  {
    emoji: "/images/nexcent.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(45,212,191,0.15))",
    badge: "Live Project",
    title: "Nexcent SaaS Landing",
    desc: "Clean, responsive SaaS platform landing page with clear CTAs, feature highlights and stat sections.",
    techs: ["HTML", "CSS", "JavaScript"],
    liveLink: "brilliant-torte-e89590.netlify.app ",
    behanceLink: null,
    inProgress: false,
  },
  {
    emoji: "/images/athlete.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(255,215,0,0.1),rgba(124,58,237,0.2))",
    badge: "Live Project",
    title: "Athlete's Edge",
    desc: "Modern responsive sports & fitness webResumeCraft” is asite with dynamic layout for cricket, basketball and more.",
    techs: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://effervescent-tapioca-fab50c.netlify.app/",
    behanceLink: null,
    inProgress: false,
  },
   {
    emoji: "/images/athlete.png",
    useImage: true,
    bg: "linear-gradient(135deg,rgba(255,215,0,0.1),rgba(124,58,237,0.2))",
    badge: "Live Project",
    title: "Athlete's Edge",
    desc: "Modern responsive sports & fitness webResumeCraft” is asite with dynamic layout for cricket, basketball and more.",
    techs: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://effervescent-tapioca-fab50c.netlify.app/",
    behanceLink: null,
    inProgress: false,
  },
];

export const RESUMES = [
  {
    icon: "🎨",
    title: "UI/UX Designer",
    sub: "Design & Figma focused",
    // ← Add your PDF link here: "/resumes/sameen-uiux-resume.pdf"
    // Place the PDF in the /public/resumes/ folder
    link: "/resumes/sameen-uiux-resume.pdf",
  },
  {
    icon: "💻",
    title: "Frontend Developer",
    sub: "React & JS focused",
    link: "/resumes/sameen-frontend-resume.pdf",
  },
  {
    icon: "🌐",
    title: "WordPress Developer",
    sub: "CMS & web focused",
    link: "/resumes/sameen-wordpress-resume.pdf",
  },
];
