export const profile = {
  name: "Christopher",
  surname: "Eze",
  title: "Full-Stack Developer",
  tagline:
    "I build web platforms and AI-powered tools. Final-year Electronic and Computer Technology student at the University of Calabar, open to internships and freelance projects.",
  email: "you@example.com", // <-- YOUR VALUE
  github: "https://github.com/XHris2005",
  linkedin: "https://www.linkedin.com/in/eze-christopher-bb5995384?utm_source=share_via&utm_content=profile&utm_medium=member_android", // <-- YOUR VALUE
  cv: "/cv.pdf", // put your CV in /public
  formEndpoint: "https://formspree.io/f/xnpjrznp", // paste your Formspree URL here, e.g. "https://formspree.io/f/abcdwxyz"
  whatsapp: "2348144379877",     // optional: country code + number, no plus or spaces, e.g. "234XXXXXXXXXX"
};

export const heroStats = [
  { value: "3", label: "Live platforms" },
  { value: "5", label: "User roles in Recova" },
  { value: "11", label: "Tools & technologies" },
];

export const projects = [
  {
    title: "Recova",
    year: "2026",
    tagline: "AI-powered lost-and-found matching for the University of Calabar.",
    image: "/recova.png",
    summary:
      "AI-powered lost-and-found platform for the University of Calabar. Reports are matched automatically by combining image and text similarity, with real-time notifications, in-app chat and secure ownership verification.",
    metrics: [
      { value: "5", label: "user roles" },
      { value: "3", label: "signals fused in matching" },
    ],
    highlights: [
      "Multimodal matching that fuses image and text embeddings, with a two-tier threshold for admin review and auto-approval",
      "Five user roles: students, lecturers, admins, business owners and visitors",
      "Institutional email verification, push notifications and real-time chat",
    ],
    role: "Solo developer (final-year project)",
    stack: ["React", "Vite", "Node.js", "Express", "Firebase", "Cloudinary", "CLIP", "SBERT"],
    live: "https://recova-sigma.vercel.app",
    repo: "https://github.com/XHris2005/campus-lost-found   ", // private repository
  },
  {
    title: "HomeBasics",
    year: "2026",
    tagline: "E-commerce with retail, wholesale and member pricing, plus an admin dashboard.",
    image: "/homebasics.png",
    summary:
      "E-commerce platform for a Nigerian depot with retail, wholesale and member pricing, a membership code system, and a full admin dashboard.",
    metrics: [
      { value: "3", label: "customer tiers" },
      { value: "8", label: "admin modules" },
    ],
    highlights: [
      "Bulk-purchase pricing per unit and product variants (size, fragrance, stock)",
      "Paystack payments, Google sign-in and Nigerian state/LGA/area address selection",
      "Admin panel for orders, products, customers, memberships, delivery and analytics",
    ],
    role: "Full-stack developer (team project using feature branches and PRs)",
    stack: ["React", "Vite", "Supabase", "Paystack", "Cloudinary", "Netlify"],
    live: "https://home-basics.netlify.app",
    repo: "https://github.com/XHris2005/home-basics",
  },
  {
    title: "Physics Portal",
    year: "2026",
    tagline: "Role-based result management system for the Department of Physics.",
    image: "/physicsportal.png",
    summary:
      "Role-based academic result management system for the Department of Physics, University of Calabar. It covers course registration, result upload, review and publishing, and student results with CGPA, and includes a built-in academic advisor chatbot that understands English and Nigerian Pidgin.",
    metrics: [
      { value: "4", label: "user roles" },
      { value: "3", label: "programmes" },
      { value: "~20", label: "Firestore collections" },
    ],
    highlights: [
      "Multi-stage result workflow: lecturer draft, admin review with grade charts and CSV export, then publication. Students only ever see published results",
      "Grading engine with CA 30% + Exam 70%, a 5-point scale, CGPA and degree classification, credit limits and carryover locking",
      "Secured staff access with passkey-gated registration, super-admin approval, session limits and audit logging, enforced by Firestore security rules",
    ],
    role: "Full-stack developer",
    stack: ["React", "Vite", "Firebase", "Firestore", "Vercel"],
    live: "https://physics-portal-86799.web.app",
    repo: null, // add your GitHub URL here if the repository is public
  },
];

export const techStrip = [
  "React", "Vite", "Node.js", "Express", "Firebase", "Supabase",
  "Paystack", "Cloudinary", "Git", "Vercel", "Netlify",
];

export const skills = {
  Frontend: ["React", "JavaScript", "HTML/CSS", "Responsive UI"],
  Backend: ["Node.js", "Express", "REST APIs", "Firebase", "Supabase"],
  "AI & Integrations": ["Embedding-based matching", "Payments (Paystack)", "Push notifications", "Image handling"],
  Electronics: ["Circuit analysis", "Physics", "Embedded basics"],
};

export const services = [
  { name: "Web apps", text: "Full-stack web applications built around your business needs." },
  { name: "E-commerce", text: "Online stores with payments, product management and admin dashboards." },
  { name: "AI features", text: "Smart search, matching or automation added to an existing product." },
];

export const about = {
  paragraphs: [
    "I'm a final-year Electronic and Computer Technology student at the University of Calabar who builds full-stack web platforms and AI-powered tools.",
    "My background in physics and electronics shapes how I work: I like understanding a system from the circuit level up to the interface, and I care about things that are reliable, not just good-looking.",
    "I've worked on client-facing commercial projects, and my biggest builds are Recova, HomeBasics and the Physics Portal. All three are live.",
  ],
  facts: [
    ["name", "Christopher"],
    ["education", "Electronic & Computer Technology, UNICAL (final year)"],
    ["focus", "full-stack web, AI-assisted features"],
    ["stack", "React, Node.js, Firebase, Supabase"],
    ["status", "open to internships & freelance work"],
  ],
};