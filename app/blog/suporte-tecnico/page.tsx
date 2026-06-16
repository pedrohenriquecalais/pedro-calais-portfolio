"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

function CompanyMarker({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 my-8">
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-30)] shrink-0" />
      <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-[var(--text-30)]">
        {name}
      </span>
      <div className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

export default function BlogSuporteTecnico() {
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return (
    <div className="min-h-screen text-[var(--text)] bg-[var(--bg)]">
      <CustomCursor />

      <main className="max-w-[760px] mx-auto px-6 py-12">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-40)] hover:text-[var(--text-60)] transition-colors mb-8 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Voltar ao portfólio
        </Link>

        {/* Hero card */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden mb-10 card-surface">
          <div className="grid grid-cols-[1fr_auto] min-h-[260px]">
            {/* Left: title area */}
            <div className="p-8 flex flex-col justify-between">
              <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-[var(--text-25)]">
                Dev Blog
              </p>
              <div>
                <h1
                  className="text-[2.1rem] leading-[1.15] text-[var(--text)] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Minha trajetória no suporte técnico e o que aprendi
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-30)]">Fev 2026</span>
                  <span className="text-[var(--text-15)]">·</span>
                  <span className="text-xs text-[var(--text-30)]">Pedro Calais</span>
                  <span className="text-[var(--text-15)]">·</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[var(--text-20)] border border-[var(--border)] rounded-full px-2.5 py-0.5">
                    Suporte Técnico
                  </span>
                </div>
              </div>
            </div>

            {/* Right: gif */}
            <div className="w-[260px] shrink-0 relative overflow-hidden border-l border-[var(--border)]">
              <img
                src="/posts/suporte.gif"
                alt="Suporte técnico"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Article */}
        <article className="text-[var(--text-60)] text-[0.9375rem] leading-[1.85]">

          <p>
            Tem uma coisa engraçada que acontece quando você está no suporte técnico: no começo, você
            acha que vai aprender sobre computadores. E aprende, sim. Mas o que ninguém te conta antes
            é que você vai aprender muito mais sobre como resolver problemas sob pressão, como se
            comunicar com alguém que está estressado, e como encontrar calma num ambiente que raramente
            tem.
          </p>

          <p className="mt-5">
            Nos últimos meses, passei por três experiências distintas dentro da área de suporte — e
            cada uma me ensinou algo diferente. Esse texto é um registro honesto dessa jornada.
          </p>

          {/* Azapfy */}
          <CompanyMarker name="Azapfy" />

          <p>
            Minha primeira parada foi na{" "}
            <span className="text-[var(--text)] font-semibold">Azapfy</span>, uma startup de
            logística. O trabalho parecia simples no papel: atender usuários, tirar dúvidas, resolver
            travamentos. Mas a realidade foi bem mais interessante do que isso.
          </p>

          <p className="mt-5">
            Num sistema de logística, tudo está conectado. Um campo errado num formulário pode
            emperrar uma entrega inteira. Foi ali que comecei a entender de verdade o que significa
            banco de dados no mundo real — não como conceito de sala de aula, mas como algo que
            impacta diretamente o negócio. Aprendi a fazer consultas em MySQL e MongoDB, não porque
            alguém me pediu para estudar, mas porque sem isso eu não conseguia resolver os chamados.
          </p>

          <blockquote className="my-7 border-l-2 border-[var(--border-subtle)] pl-5 text-[var(--text-45)] italic">
            "O usuário nunca te diz o problema real. Ele te diz o sintoma. Você precisa descobrir o
            resto."
          </blockquote>

          <p>
            Outra coisa que a Azapfy me ensinou foi analisar logs de produção. A sensação de olhar
            para um arquivo enorme de registros e identificar exatamente onde uma requisição falhou é,
            de certa forma, satisfatória — é trabalho de detetive. E essa habilidade de ler o que o
            sistema está "dizendo" ficou comigo para sempre.
          </p>

          {/* MCSA */}
          <CompanyMarker name="Marcelo Candiotto — MCSA" />

          <p>
            Depois da Azapfy, fui estagiar no escritório de advocacia{" "}
            <span className="text-[var(--text)] font-semibold">Marcelo Candiotto</span> — o{" "}
            <span className="text-[var(--text)] font-semibold">MCSA</span>. Parecia uma mudança de
            ritmo — e era. Mas foi justamente aí que aprendi a trabalhar com infraestrutura de
            verdade.
          </p>

          <p className="mt-5">
            Manutenção de estações de trabalho, organização de inventário de equipamentos,
            configuração de servidores Windows. Atividades que, para muita gente, soam entediantes,
            mas que me ensinaram algo valioso: consistência. Num ambiente onde a infraestrutura
            precisa funcionar para que dezenas de pessoas consigam trabalhar, você entende o peso de
            um sistema estável.
          </p>

          <p className="mt-5">
            Aprendi também que documentar e organizar equipamentos é tão técnico quanto configurá-los.
            Um inventário bagunçado é um problema esperando para acontecer. Um servidor Windows mal
            administrado é uma vulnerabilidade que pode custar caro. Essas lições parecem básicas, mas
            formam a espinha dorsal de qualquer ambiente de TI saudável.
          </p>

          {/* Connecta */}
          <CompanyMarker name="Connecta" />

          <p>
            A experiência mais recente foi na{" "}
            <span className="text-[var(--text)] font-semibold">Connecta</span>, em São João del-Rei.
            E foi a mais técnica de todas. Suporte a redes de verdade: diagnóstico de falhas de
            conectividade, configuração de equipamentos, monitoramento de desempenho.
          </p>

          <p className="mt-5">
            Redes são fascinantes porque a maior parte do que você faz é invisível. Ninguém agradece
            quando a internet está funcionando. Mas quando cai, todo mundo percebe. Trabalhar nessa
            área me deu um respeito enorme pela pilha de protocolos TCP/IP — algo que estudei na
            teoria e passei a aplicar no dia a dia.
          </p>

          <p className="mt-5">
            Aprendi que a maior parte dos problemas de rede não é técnica. É de comunicação: entre
            dispositivos, entre equipes, entre o equipamento e a realidade do ambiente onde ele está
            instalado.
          </p>

          <p className="mt-5">
            Também usei AWS nesse período, o que abriu uma janela para o mundo de cloud que eu mal
            tinha tocado antes. Ver a infraestrutura física e a infraestrutura em nuvem coexistindo no
            mesmo ambiente foi uma das experiências mais ricas que tive até hoje.
          </p>

          {/* Conclusão */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <p>
            Se eu olhar para trás e tentar resumir o que aprendi nesses meses, vai além de uma lista
            de tecnologias. Aprendi a ser metódico quando estou sob pressão. Aprendi a fazer a pergunta
            certa antes de sair resolvendo. Aprendi que um ambiente de produção não perdoa pressa.
          </p>
        </article>

        {/* Footer */}
        <div className="mt-14 pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-40)] hover:text-[var(--text-60)] transition-colors group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Voltar ao portfólio
          </Link>
          <span className="text-xs font-mono text-[var(--text-20)] tracking-[0.2em]">
            FEV 2026
          </span>
        </div>

      </main>
    </div>
  );
}
