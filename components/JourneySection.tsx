"use client";

import { useRef } from "react";
import { journey } from "@/lib/mock-data";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 14;
    const y = ((e.clientY - top) / height - 0.5) * -14;
    el.style.transition = "transform 0.06s ease";
    el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
    el.style.setProperty("border-color", "var(--border-hover)");
  };

  const onLeave = () => {
    const el = ref.current!;
    el.style.transition = "transform 0.5s ease, border-color 0.3s ease";
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.removeProperty("border-color");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated-2)] p-5 card-surface-sm"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

function CompanyIcon({
  shortName,
  color,
  logo,
}: {
  shortName: string;
  color: string;
  logo?: string;
}) {
  return (
    <div
      className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center overflow-hidden"
      style={{ background: color }}
    >
      {logo ? (
        <img
          src={logo}
          alt={shortName}
          className="w-full h-full object-contain p-1.5"
        />
      ) : (
        <span className="text-xs font-bold text-white/60 tracking-wide">
          {shortName.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default function JourneySection() {
  return (
    <section id="journey" className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>Trajetória Profissional</h2>
        <span className="hidden sm:block text-xs tracking-[0.25em] uppercase font-mono text-[var(--text-25)]">
          &gt;_ FORMAÇÃO &amp; EXPERIÊNCIA
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Formação Acadêmica */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex flex-col gap-4 card-surface">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-30)] font-mono">
              ⊕ FORMAÇÃO ACADÊMICA
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {journey.education.map((item) => (
              <TiltCard key={item.id}>
                <div className="flex items-start gap-3 mb-3">
                  <CompanyIcon shortName={item.shortName} color={item.color} logo={item.logo} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm leading-tight text-[var(--text)]">{item.institution}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.current && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        )}
                        <span className="text-[11px] text-[var(--text-35)] font-mono whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-50)] mt-0.5">{item.degree}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-45)] leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] border border-[var(--border-subtle)] rounded-full px-2.5 py-0.5 text-[var(--text-40)] tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Experiência Profissional */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 flex flex-col gap-4 card-surface">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-30)] font-mono">
              ⊕ EXPERIÊNCIA PROFISSIONAL
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {journey.experience.map((item) => (
              <TiltCard key={item.id}>
                <div className="flex items-start gap-3 mb-3">
                  <CompanyIcon shortName={item.company} color={item.color} logo={item.logo} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm leading-tight text-[var(--text)]">{item.company}</span>
                      <span className="text-[11px] text-[var(--text-35)] font-mono whitespace-nowrap shrink-0">
                        {item.period}
                      </span>
                    </div>
                    {item.roles ? (
                      <div className="flex flex-col mt-2 pl-0.5">
                        {item.roles.map((r, i) => (
                          <div key={r.title} className="flex items-start gap-2.5">
                            <div className="flex flex-col items-center shrink-0" style={{ width: 10 }}>
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${r.current ? "bg-green-400" : "bg-[var(--border-hover)]"}`}
                              />
                              {i < item.roles!.length - 1 && (
                                <span className="w-px flex-1 bg-[var(--border)] my-0.5" style={{ minHeight: 14 }} />
                              )}
                            </div>
                            <div className="flex items-baseline justify-between gap-2 flex-1 pb-1.5">
                              <p className={`text-xs leading-tight ${r.current ? "text-[var(--text)] font-medium" : "text-[var(--text-35)]"}`}>
                                {r.title}
                              </p>
                              <span className="text-[10px] text-[var(--text-25)] font-mono whitespace-nowrap shrink-0">{r.period}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {item.current && <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />}
                        <p className="text-xs text-[var(--text-50)]">{item.role}</p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[var(--text-45)] leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] border border-[var(--border-subtle)] rounded-full px-2.5 py-0.5 text-[var(--text-40)] tracking-wide uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
