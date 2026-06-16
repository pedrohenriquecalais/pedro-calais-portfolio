"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import Navbar from "./Navbar";
import Clock from "./Clock";
import CustomCursor from "./CustomCursor";
import JourneySection from "./JourneySection";
import GlobeIcon from "./GlobeIcon";
import TechMarquee from "./TechMarquee";
import { profile, projects, showcase, recentContent, certifications } from "@/lib/mock-data";
import { FileText, Link, GitFork, Award, Mail, Phone, ZoomIn, X } from "lucide-react";

export default function PortfolioHome() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("content");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [summaryProject, setSummaryProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (saved && saved !== theme) setTheme(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!lightboxImage) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxImage(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxImage]);

  return (
    <div className="min-h-screen text-[var(--text)] relative">
      <CustomCursor />
      <Navbar
        theme={theme}
        onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        email={profile.email}
        whatsapp={profile.socials.whatsapp}
      />
      {/* Spacer para o navbar fixo */}
      <div className="h-20" />

      {/* Vertical side labels */}
      <div className="fixed left-2 inset-y-0 z-30 flex items-center pointer-events-none select-none">
        <span
          className="text-[10px] tracking-[0.4em] font-medium uppercase text-[var(--text-15)]"
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          FULL STACK
        </span>
      </div>
      <div className="fixed right-2 inset-y-0 z-30 flex items-center pointer-events-none select-none">
        <span
          className="text-[10px] tracking-[0.4em] font-medium uppercase text-[var(--text-15)]"
          style={{ writingMode: "vertical-lr" }}
        >
          FULL STACK DEVELOPER
        </span>
      </div>

      <main className="pt-4 px-10 pb-20 max-w-5xl mx-auto">
        {/* ── Hero grid: coluna esq completa + direita ── */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {/* COLUNA ESQUERDA */}
          <div className="flex flex-col gap-3">
            {/* Profile name card */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-7 flex flex-col justify-end flex-1 card-surface">
              <h1
                className="text-[4.2rem] leading-none tracking-tight text-[var(--text)]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
              >
                Pedro
                <br />
                Calais
              </h1>
              <p className="mt-3 text-sm text-[var(--text-40)]">— {profile.handle}</p>
            </div>

            {/* Location + clock */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4 flex items-center justify-between card-surface">
              <div className="flex items-center gap-2 text-sm text-[var(--text-50)]">
                <GlobeIcon size={28} theme={theme} />
                <span>{profile.location}</span>
                <span className="text-[var(--text-25)]">GMT-3</span>
              </div>
              <Clock />
            </div>

            {/* Social links grid */}
            <div className="grid grid-cols-2 gap-3" style={{ overflow: "visible" }}>
              {(
                [
                  { href: profile.socials.cv, Icon: FileText, label: "CV", external: true },
                  { href: profile.socials.linkedin, Icon: Link, label: "LinkedIn", external: true },
                  { href: profile.socials.github, Icon: GitFork, label: "GitHub", external: true },
                  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email", external: false },
                  { href: profile.socials.whatsapp, Icon: Phone, label: "WhatsApp", external: true },
                ] as const
              ).map(({ href, Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex items-center gap-2.5 text-sm text-[var(--text-50)] hover:bg-[var(--hover-bg)] hover:border-[var(--border-hover)] hover:scale-[1.05] hover:z-10 hover:text-[var(--text-60)] transition-all duration-200 relative card-surface"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA DIREITA */}
          <div className="col-span-2 flex flex-col gap-3">
            {/* Tags strip */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3.5 flex items-center justify-between card-surface">
              <div className="flex items-center flex-wrap gap-y-1">
                {profile.tags.map((tag, i) => (
                  <span key={tag} className="text-sm text-[var(--text-60)]">
                    {tag}
                    {i < profile.tags.length - 1 && (
                      <span className="text-[var(--text-20)] mx-2">/</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm ml-4 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[var(--text-60)]">Disponível</span>
              </div>
            </div>

            {/* Bio */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 card-surface">
              <h2 className="text-xl font-semibold mb-3 leading-snug text-[var(--text)]">
                {profile.title}
              </h2>
              <p className="text-sm text-[var(--text-50)] leading-relaxed mb-5">{profile.bio}</p>
              <div className="flex flex-wrap gap-2">
                {profile.stack.map((tech) => (
                  <span key={tech} className="text-xs border border-[var(--border-subtle)] rounded-full px-3 py-1 text-[var(--text-50)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects marquee */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden p-2.5 flex flex-col flex-1 min-h-[160px] card-surface">
            <div className="animate-marquee flex gap-2.5 flex-1" style={{ width: "max-content" }}>
              {[...showcase, ...showcase, ...showcase, ...showcase].map((project, i) => {
                const hasImage = Boolean(project.image);
                return (
                  <a
                    key={i}
                    href={project.link || undefined}
                    target={project.link ? "_blank" : undefined}
                    rel="noreferrer"
                    className="shrink-0 rounded-xl relative overflow-hidden"
                    style={{ width: 226, height: "100%", background: project.color }}
                  >
                    {hasImage && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    )}
                    {!hasImage && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-medium text-sm leading-tight">
                            {project.title}
                          </p>
                          <p className="text-white/50 text-xs mt-0.5">
                            {project.tags.join(" · ")}
                          </p>
                        </div>
                      </>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          </div>{/* fecha coluna direita */}
        </div>{/* fecha grid principal */}

        {/* ── Recent Content ── */}
        <section id="content" className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>Conteúdo Recente</h2>
            <span className="text-xs tracking-[0.25em] uppercase font-mono text-[var(--text-25)]">
              &gt;_ CREATOR
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {recentContent.map((item) => {
              const cardClass = "rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden hover:bg-[var(--hover-bg-xs)] hover:border-[var(--border-hover)] transition-colors card-surface flex flex-col shrink-0 snap-start";
              const cardStyle = { width: "calc(25% - 9px)" };
              const cardContent = (
                <>
                  {item.thumbnail && (
                    <div className="relative w-full h-36 shrink-0 overflow-hidden">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover object-center" />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${item.platform === "linkedin" ? "bg-[#0a66c2]" : "bg-red-600"}`}>
                        <Link size={11} className="text-white" />
                      </div>
                      <span className="text-xs text-[var(--text-30)] truncate">{item.handle}</span>
                      <span className="text-xs text-[var(--text-20)] ml-auto shrink-0">↗</span>
                    </div>
                    <h3 className="text-sm font-medium mb-2 leading-snug text-[var(--text)] line-clamp-3">{item.title}</h3>
                    {!item.thumbnail && (
                      <p className="text-xs text-[var(--text-45)] leading-relaxed line-clamp-2">{item.excerpt}</p>
                    )}
                    <p className="text-xs text-[var(--text-25)] mt-auto pt-3">{item.date}</p>
                  </div>
                </>
              );
              return item.link.startsWith("/") ? (
                <NextLink key={item.id} href={item.link} className={cardClass} style={cardStyle}>
                  {cardContent}
                </NextLink>
              ) : (
                <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className={cardClass} style={cardStyle}>
                  {cardContent}
                </a>
              );
            })}
          </div>
        </section>

        {/* ── Featured Projects ── */}
        <section id="projects" className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>Projetos Destaque</h2>
            <a href={projects.find(p => p.link)?.link || "#"} target="_blank" rel="noreferrer"
              className="text-sm text-[var(--text-40)] hover:text-[var(--text-60)] transition-colors flex items-center gap-1.5">
              Ver todos os projetos <span>→</span>
            </a>
          </div>

          {(() => {
            const f = projects.slice(0, 4);
            const Card = ({ p }: { p: typeof projects[0] }) => {
              const hasSummary = Boolean((p as any).summary);
              const htmlBanner: string | undefined = (p as any).htmlBanner;
              const Tag = (p.link && !hasSummary ? "a" : "div") as React.ElementType;
              return (
                <Tag
                  {...(p.link && !hasSummary ? { href: p.link, target: "_blank", rel: "noreferrer" } : {})}
                  onClick={hasSummary ? () => setSummaryProject(p) : undefined}
                  className="feat-card"
                  style={{ background: p.color }}
                >
                  {p.image && <img src={p.image} alt={p.title} />}
                  {!p.image && htmlBanner && (
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        src={htmlBanner}
                        className="border-0 pointer-events-none absolute top-0 overflow-hidden"
                        style={{
                          width: 860,
                          height: 480,
                          left: "50%",
                          marginLeft: -430,
                          transformOrigin: "top center",
                          transform: "scale(var(--banner-scale, 0.625))",
                        }}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {p.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wide bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-0.5 text-white/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-white font-semibold text-base leading-tight">{p.title}</h3>
                  </div>
                </Tag>
              );
            };

            return (
              <div className="flex flex-col gap-3">
                <div className="feat-row feat-row-1" style={{ height: 300 }}>
                  <Card p={f[0]} />
                  <Card p={f[1]} />
                </div>
                <div className="feat-row feat-row-2" style={{ height: 240 }}>
                  <Card p={f[2]} />
                  <Card p={f[3]} />
                </div>
              </div>
            );
          })()}
        </section>

        <JourneySection />

        <TechMarquee />

        {/* ── Certifications ── */}
        <section id="certifications">
          <h2 className="text-4xl mb-5" style={{ fontFamily: "var(--font-playfair)" }}>Certificações</h2>
          <div className="grid grid-cols-2 gap-3">
            {certifications.map((cert) => {
              const hasImage = !!cert.image;
              const hasLink = !!cert.link;
              return (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 flex items-center gap-4 hover:bg-[var(--hover-bg)] hover:border-[var(--border-hover)] hover:scale-[1.01] transition-all duration-200 group card-surface"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[var(--hover-bg-sm)] flex items-center justify-center">
                    {hasImage ? (
                      <Image src={cert.image} alt={cert.title} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <Award size={22} className="text-[var(--text-50)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-snug text-[var(--text)]">{cert.title}</h3>
                    <p className="text-xs text-[var(--text-40)] mt-0.5">{cert.issuer}</p>
                    <p className="text-xs text-[var(--text-25)] mt-1">{cert.date}</p>
                    {(hasImage || hasLink) && (
                      <div className="flex items-center gap-3 mt-2">
                        {hasImage && (
                          <button
                            onClick={() => setLightboxImage(cert.image)}
                            className="text-xs text-[var(--text-35)] hover:text-[var(--text-60)] transition-colors flex items-center gap-1"
                          >
                            <ZoomIn size={11} /> Ver certificado
                          </button>
                        )}
                        {hasImage && hasLink && (
                          <span className="text-[var(--text-15)] text-xs">·</span>
                        )}
                        {hasLink && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-[var(--text-35)] hover:text-[var(--text-60)] transition-colors flex items-center gap-1"
                          >
                            Seguir link <span>↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {summaryProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSummaryProject(null)}
        >
          <div
            className="relative bg-[var(--bg-elevated)] border border-[var(--border)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[var(--bg-elevated)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="font-semibold text-base text-[var(--text)]">{summaryProject.title}</h3>
              <button
                onClick={() => setSummaryProject(null)}
                className="w-8 h-8 rounded-full bg-[var(--hover-bg-sm)] hover:bg-[var(--border-hover)] flex items-center justify-center text-[var(--text-60)] hover:text-[var(--text)] transition-all"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-6">
              <p className="text-sm text-[var(--text-50)] leading-relaxed">
                {(summaryProject as any).summary.description}
              </p>

              {(["frontend", "backend", "database"] as const).map((section) => {
                const rows: { tech: string; uso: string }[] = (summaryProject as any).summary[section];
                if (!rows) return null;
                const labels: Record<string, string> = { frontend: "Frontend", backend: "Backend", database: "Banco de Dados" };
                return (
                  <div key={section}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-30)] font-mono mb-3">{labels[section]}</p>
                    <div className="rounded-xl border border-[var(--border)] overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)] bg-[var(--hover-bg-xs)]">
                            <th className="text-left px-4 py-2 text-xs text-[var(--text-40)] font-medium">Tecnologia</th>
                            <th className="text-left px-4 py-2 text-xs text-[var(--text-40)] font-medium">Uso</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row, i) => (
                            <tr key={row.tech} className={i < rows.length - 1 ? "border-b border-[var(--border-faint)]" : ""}>
                              <td className="px-4 py-2.5 text-[var(--text)] font-mono text-xs">{row.tech}</td>
                              <td className="px-4 py-2.5 text-[var(--text-45)] text-xs">{row.uso}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={() => setLightboxImage(null)}
          >
            <X size={18} />
          </button>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage}
              alt="Certificado"
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
