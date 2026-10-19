import { useEffect, useRef, useState } from "react";
import { profile, projects, techStrip, skills, services, about, heroStats } from "./data";
import "./App.css";
import useReveal from "./useReveal";
import {
  SiReact, SiVite, SiNodedotjs, SiExpress, SiFirebase, SiSupabase,
  SiCloudinary, SiGit, SiVercel, SiNetlify,
} from "react-icons/si";
import { FaCreditCard, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const techIcons = {
  React: SiReact,
  Vite: SiVite,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Firebase: SiFirebase,
  Supabase: SiSupabase,
  Paystack: FaCreditCard,
  Cloudinary: SiCloudinary,
  Git: SiGit,
  Vercel: SiVercel,
  Netlify: SiNetlify,
};

function Section({ id, label, children }) {
  return (
    <section id={id} className="section">
      <h2 data-reveal="up"><span className="prompt">&gt;</span> {label}</h2>
      {children}
    </section>
  );
}

function HeroLaptop() {
  const q = (text) => <span className="c-s">&quot;{text}&quot;</span>;

  const lines = [
    { indent: 0, node: <><span className="c-k">const</span> <span className="c-v">developer</span> = {"{"}</> },
    { indent: 1, node: <><span className="c-p">name:</span> {q(profile.name)},</> },
    { indent: 1, node: <><span className="c-p">role:</span> {q(profile.title)},</> },
    { indent: 1, node: <><span className="c-p">stack:</span> [{q("React")}, {q("Node.js")}, {q("Firebase")}],</> },
    { indent: 1, node: <><span className="c-p">openTo:</span> [{q("internships")}, {q("freelance")}],</> },
    { indent: 1, node: <><span className="c-f">hire</span>: () =&gt; {q("let's talk")}<span className="cursor">_</span></> },
    { indent: 0, node: <>{"}"};</> },
  ];

  return (
    <div className="hero-visual">
      <div className="rings" aria-hidden="true"><i /><i /><i /></div>
      <span className="orb o1" aria-hidden="true" />
      <span className="orb o2" aria-hidden="true" />
      <span className="orb o3" aria-hidden="true" />
      <span className="orb o4" aria-hidden="true" />
      <span className="cyl" aria-hidden="true" />

      <div className="laptop">
        <div className="laptop-lid">
          <div className="laptop-screen">
            <div className="code-bar">
              <span className="dots"><i /><i /><i /></span>
              <span className="mono">developer.js</span>
            </div>
            <div className="code-body mono">
              {lines.map((l, i) => (
                <div className="ln" key={i} style={{ paddingLeft: `${l.indent * 1.6}em` }}>
                  {l.node}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="laptop-base" />
      </div>
    </div>
  );
}

function Projects() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState("next");
  const [expanded, setExpanded] = useState(false);
  const touchX = useRef(null);
  const total = projects.length;
  const pad = (n) => String(n).padStart(2, "0");

  function go(target, direction) {
    setDir(direction);
    setIndex((target + total) % total);
  }
  const next = () => go(index + 1, "next");
  const prev = () => go(index - 1, "prev");

  function openDetails(i) {
    setIndex(i);
    setExpanded(true);
  }

  // After the timeline appears, scroll to the project that was tapped
  useEffect(() => {
    if (!expanded) return;
    const t = setTimeout(() => {
      document.getElementById(`project-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  function closeDetails() {
    // Reopen the slideshow on the project closest to the middle of the screen
    let best = index;
    let bestDist = Infinity;
    projects.forEach((_, i) => {
      const el = document.getElementById(`project-${i}`);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setDir("next");
    setIndex(best);
    setExpanded(false);
    setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  }

  const p = projects[index];

  return (
    <div data-reveal="up">
      {expanded ? (
        <div className="expanded">
          <button className="back-pill mono" type="button" onClick={closeDetails}>
            ← Back to slideshow
          </button>

          <div className="timeline in">
            {projects.map((proj, i) => (
              <article
                id={`project-${i}`}
                className={`t-item ${i % 2 === 1 ? "reverse" : ""}`}
                style={{ "--i": i }}
                key={proj.title}
              >
                <div className="t-media">
                  <div className="shot">
                    <div className="shot-bar">
                      <span className="dots"><i /><i /><i /></span>
                      <span className="mono">{proj.live.replace("https://", "")}</span>
                    </div>
                    <a href={proj.live} target="_blank" rel="noreferrer">
                      <img src={proj.image} alt={`${proj.title} screenshot`} />
                    </a>
                  </div>
                </div>

                <span className="t-node" />

                <div className="t-text">
                  <div className="t-card">
                    <div className="t-top">
                      <span className="t-num mono">{pad(i + 1)}</span>
                      <span className="live-chip"><i /> Live · {proj.year}</span>
                    </div>

                    <h3>{proj.title}</h3>
                    <p className="summary">{proj.summary}</p>

                    <ul className="metrics">
                      {(proj.metrics || []).map((m) => (
                        <li key={m.label}>
                          <strong>{m.value}</strong>
                          <span>{m.label}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="highlights">
                      {proj.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>

                    <p className="small"><strong>Role:</strong> {proj.role}</p>
                    <ul className="tags">
                      {proj.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>

                    <div className="links">
                      <a className="btn primary" href={proj.live} target="_blank" rel="noreferrer">View live ↗</a>
                      {proj.repo ? (
                        <a className="btn" href={proj.repo} target="_blank" rel="noreferrer">Code ↗</a>
                      ) : (
                        <span className="muted mono">Code: private</span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="pshow" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className={`pslide ${dir}`} key={index}>
            <div className="pslide-text">
              <span className="mono accent pslide-count">{pad(index + 1)} / {pad(total)}</span>
              <h3>{p.title}</h3>
              <p className="summary">{p.tagline || p.summary}</p>
              <ul className="tags">
                {p.stack.slice(0, 5).map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="actions">
                <button className="btn primary offset" type="button" onClick={() => openDetails(index)}>
                  View details
                </button>
                <a className="btn" href={p.live} target="_blank" rel="noreferrer">Live ↗</a>
              </div>
            </div>

            <button
              className="plaptop"
              type="button"
              onClick={() => openDetails(index)}
              aria-label={`Open ${p.title} details`}
            >
              <span className="plaptop-lid">
                <span className="plaptop-screen">
                  <img src={p.image} alt={`${p.title} screenshot`} />
                </span>
              </span>
              <span className="plaptop-base" />
              <span className="plaptop-hint mono">Tap to explore ↗</span>
            </button>
          </div>

          {total > 1 && (
            <div className="pcontrols">
              <button className="parrow" type="button" onClick={prev} aria-label="Previous project">←</button>
              <div className="pdots">
                {projects.map((proj, i) => (
                  <button
                    key={proj.title}
                    type="button"
                    className={i === index ? "active" : ""}
                    onClick={() => go(i, i >= index ? "next" : "prev")}
                    aria-label={`Show ${proj.title}`}
                  />
                ))}
              </div>
              <button className="parrow" type="button" onClick={next} aria-label="Next project">→</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Fallback until a Formspree endpoint is set: open the visitor's email app
    if (!profile.formEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry (${data.get("topic")}) from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          Name
          <input type="text" name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" required placeholder="you@example.com" />
        </label>
      </div>

      <label>
        What's this about?
        <select name="topic" defaultValue="Freelance project">
          <option>Freelance project</option>
          <option>Job or internship</option>
          <option>Something else</option>
        </select>
      </label>

      <label>
        Message
        <textarea name="message" rows="5" required placeholder="Tell me a bit about what you need..." />
      </label>

      {/* Spam trap: real visitors never see or fill this */}
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="hp" />

      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      {status === "success" && (
        <p className="form-note ok">Message sent. I'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="form-note err">
          Something went wrong. Please email me directly at {profile.email}.
        </p>
      )}
    </form>
  );
}

export default function App() {
  useReveal();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(profile.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <header className="nav">
        <a href="#top" className="logo" onClick={() => setMenuOpen(false)}>
          {"<"}{profile.name}{" />"}
        </a>

        <button
          className="menu-btn"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(false)}>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <div className="hero">
          <div className="hero-text">
            <span className="hero-bg-word" aria-hidden="true">DEVELOPER</span>
            <p className="mono accent">Hello, I'm</p>
            <h1 className="name">
              <span>{profile.name}</span>
              {profile.surname && <span className="name-2">{profile.surname}</span>}
            </h1>
            <p className="subtitle">
              I'm a <span className="hl">{profile.title}</span>
              <span className="cursor">_</span>
            </p>
            <p className="lead">{profile.tagline}</p>

            <div className="actions">
              <a className="btn primary offset" href="#contact">Contact me</a>
              <a className="btn" href="#projects">My work</a>
            </div>

            <div className="socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><FaEnvelope /></a>
              {profile.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              )}
            </div>

            <ul className="hero-stats">
              {heroStats.map((s) => (
                <li key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <HeroLaptop />
        </div>

        <div className="strip">
          {techStrip.map((t) => {
            const Icon = techIcons[t];
            return (
              <span key={t} className="tech">
                {Icon && <Icon />}
                {t}
              </span>
            );
          })}
        </div>

        <Section id="projects" label="projects">
          <Projects />
        </Section>

        <Section id="about" label="about">
          <div className="about">
            <div className="about-text" data-reveal="left">
              {about.paragraphs.map((para) => <p key={para}>{para}</p>)}
              <div className="actions">
                <a className="btn primary" href="#contact">Work with me</a>
                <a className="btn" href={profile.cv} download>Download CV</a>
              </div>
            </div>

            <div className="terminal" data-reveal="right" style={{ "--d": "0.15s" }}>
              <div className="terminal-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="mono">whoami.json</span>
              </div>
              <div className="terminal-body mono">
                <p><span className="accent">$</span> whoami</p>
                {about.facts.map(([k, v]) => (
                  <p key={k}>
                    <span className="key">{k}</span>
                    <span className="sep">:</span> {v}
                  </p>
                ))}
                <p><span className="accent">$</span> <span className="cursor">_</span></p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" label="skills">
          <div className="grid">
            {Object.entries(skills).map(([group, items], i) => (
              <div className="rv" data-reveal="up" style={{ "--d": `${i * 0.1}s` }} key={group}>
                <div className="card">
                  <h3>{group}</h3>
                  <ul className="tags">
                    {items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="services" label="services">
          <div className="grid">
            {services.map((s, i) => (
              <div className="rv" data-reveal="up" style={{ "--d": `${i * 0.1}s` }} key={s.name}>
                <div className="card">
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" label="contact">
          <div className="contact">
            <div className="contact-info" data-reveal="left">
              <h3>Let's talk about your project.</h3>
              <p className="lead">
                Open to internships, junior roles and freelance work. Send a message and I'll reply as soon as I can.
              </p>

              <ul className="contact-list">
                <li>
                  <FaEnvelope />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <button type="button" className="copy" onClick={copyEmail}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </li>
                <li>
                  <FaLinkedin />
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li>
                  <FaGithub />
                  <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                </li>
                {profile.whatsapp && (
                  <li>
                    <FaWhatsapp />
                    <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">
                      Chat on WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="contact-form" data-reveal="right" style={{ "--d": "0.15s" }}>
              <ContactForm />
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}