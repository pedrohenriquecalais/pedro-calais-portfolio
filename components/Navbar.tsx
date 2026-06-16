"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Sun, Moon, ChevronDown } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  onThemeToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  email?: string;
  whatsapp?: string;
}

const navLinks = [
  { label: "Conteúdo", id: "content" },
  { label: "Projetos", id: "projects" },
  { label: "Trajetória", id: "journey" },
  { label: "Certificações", id: "certifications" },
];

export default function Navbar({
  theme,
  onThemeToggle,
  activeSection,
  onSectionChange,
  email,
  whatsapp,
}: NavbarProps) {
  const [version] = useState("V1");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    onSectionChange(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "calc(100% - 2.5rem)",
        maxWidth: scrolled ? "40rem" : "64rem",
        transition: "max-width 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease, background-color 0.3s ease",
        boxShadow: scrolled ? "none" : "0 8px 40px rgba(0,0,0,0.35)",
      }}
      className="flex items-center justify-between px-6 py-4 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] card-surface backdrop-blur-md"
    >
      <div className="flex items-center gap-8">
        <div className="w-9 h-9 rounded-full bg-[var(--invert-bg)] flex items-center justify-center text-[var(--invert-text)] text-sm select-none shrink-0" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
          PC
        </div>
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`text-sm transition-colors whitespace-nowrap ${
                  activeSection === id
                    ? "text-[var(--text)]"
                    : "text-[var(--text-50)] hover:text-[var(--text-60)]"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 shrink-0 min-w-0">
        <button
          className={`flex items-center gap-1.5 text-xs text-[var(--text-50)] hover:text-[var(--text-60)] transition-all duration-300 overflow-hidden ${scrolled ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"}`}
        >
          <RefreshCw size={13} />
          {version}
        </button>

        <button
          onClick={onThemeToggle}
          className="p-1.5 rounded-full hover:bg-[var(--hover-bg-sm)] transition-colors shrink-0"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <Sun size={15} className="text-[var(--text-60)]" />
          ) : (
            <Moon size={15} className="text-[var(--text-60)]" />
          )}
        </button>

        <a
          href={whatsapp ?? (email ? `mailto:${email}` : "#")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--invert-bg)] text-[var(--invert-text)] text-sm font-medium hover:opacity-85 transition-opacity shrink-0 whitespace-nowrap"
        >
          Contact
          <ChevronDown size={14} />
        </a>
      </div>
    </nav>
  );
}
