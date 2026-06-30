import { createFileRoute } from "@tanstack/react-router";
import { Printer, Activity, ListChecks, Ban, Pill, AlertTriangle, Users, Phone } from "lucide-react";
import { emergencias, equipeIdeal, type Severity } from "@/data/emergencies";
import { AppHeader } from "@/components/AppHeader";
import logoLiga from "@/assets/logo-liga.png";
import logoAnhanguera from "@/assets/logo-anhanguera.png";

export const Route = createFileRoute("/fichas")({
  head: () => ({
    meta: [
      { title: "Book de Fichas — FAST-RESPONSE Odontologia S.B.O." },
      { name: "description", content: "Book de acesso rápido com todas as fichas de urgências e emergências sistêmicas em odontologia, formatadas para impressão A4." },
    ],
  }),
  component: FichasPage,
});

const sevLabel: Record<Severity, string> = {
  critica: "CRÍTICA",
  alta: "ALTA",
  moderada: "MODERADA",
};

const sevPrintColor: Record<Severity, string> = {
  critica: "#c0392b",
  alta: "#d68910",
  moderada: "#1e8449",
};

const GRUPOS: { sev: Severity; titulo: string; descricao: string }[] = [
  { sev: "critica", titulo: "Emergências Críticas", descricao: "Risco iminente de morte — acionar SAMU 192 imediatamente" },
  { sev: "alta", titulo: "Urgências de Alta Prioridade", descricao: "Conduta imediata; reavaliar necessidade de transferência" },
  { sev: "moderada", titulo: "Urgências Moderadas", descricao: "Estabilização no consultório; encaminhamento conforme evolução" },
];

// Tabela de pulseiras de identificação hospitalar (referência)
type PulseiraKey = "vermelha" | "amarela" | "laranja" | "azul" | "verde" | "roxa";

const PULSEIRAS: {
  key: PulseiraKey;
  nome: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  corTexto: string;
}[] = [
  { key: "vermelha", nome: "Vermelha", subtitulo: "Alergias",
    descricao: "Alerta crítico. Paciente com alergia grave a medicamentos, alimentos ou outras substâncias.",
    cor: "#c0392b", corTexto: "#ffffff" },
  { key: "amarela", nome: "Amarela", subtitulo: "Risco de Queda",
    descricao: "Pacientes idosos, sedados, com dificuldade de locomoção ou sob efeito de medicamentos que alteram o equilíbrio.",
    cor: "#f1c40f", corTexto: "#1a1a1a" },
  { key: "laranja", nome: "Laranja", subtitulo: "Segurança Geral / Protocolo",
    descricao: "Associada ao Dia Mundial da Segurança do Paciente (OMS) ou a riscos assistenciais moderados.",
    cor: "#e67e22", corTexto: "#ffffff" },
  { key: "azul", nome: "Azul", subtitulo: "Precaução por Aerossóis / Isolamento",
    descricao: "Pacientes em isolamento respiratório (tuberculose, doenças de transmissão aérea) ou com risco de lesão por pressão.",
    cor: "#2e86c1", corTexto: "#ffffff" },
  { key: "verde", nome: "Verde", subtitulo: "Precaução por Gotículas",
    descricao: "Isolamento por transmissão via gotículas (meningite, influenza, etc.).",
    cor: "#1e8449", corTexto: "#ffffff" },
  { key: "roxa", nome: "Roxa / Outras Cores", subtitulo: "Restrições / Cuidados Especiais",
    descricao: "Restrição de membros (ex.: não puncionar veia em braço com mastectomia) ou outras comorbidades específicas.",
    cor: "#7d3c98", corTexto: "#ffffff" },
];

// Liga cada ficha às pulseiras pertinentes (ligação direta de cor)
const PULSEIRAS_POR_FICHA: Record<string, PulseiraKey[]> = {
  anafilaxia: ["vermelha"],
  "edema-angioneurotico": ["vermelha"],
  sincope: ["amarela"],
  hipotensao: ["amarela"],
  hipoglicemia: ["amarela"],
  avc: ["amarela"],
  convulsao: ["amarela", "roxa"],
  broncoespasmo: ["azul"],
  "obstrucao-via-aerea": ["azul"],
  aspiracao: ["azul"],
  hiperventilacao: ["verde"],
  "intoxicacao-anestesico": ["roxa"],
  "reacao-vasoconstritor": ["roxa"],
  "crise-hipertensiva": ["laranja"],
  angina: ["laranja"],
  iam: ["laranja", "vermelha"],
  pcr: ["laranja"],
  hiperglicemia: ["laranja"],
};

function pulseirasDe(id: string): typeof PULSEIRAS {
  const keys = PULSEIRAS_POR_FICHA[id] ?? [];
  return PULSEIRAS.filter((p) => keys.includes(p.key));
}

function FichasPage() {
  let n = 0;
  const numMap = new Map<string, number>();
  GRUPOS.forEach((g) =>
    emergencias.filter((e) => e.severidade === g.sev).forEach((e) => {
      n += 1;
      numMap.set(e.id, n);
    })
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="print:hidden">
        <AppHeader />
      </div>

      <section className="max-w-5xl mx-auto px-5 pt-8 pb-6 print:hidden">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Acesso rápido — referência impressa
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Book de <span className="text-primary">Fichas Clínicas</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl text-sm">
              {emergencias.length} fichas de bolso — uma por página A4. Use o botão abaixo para imprimir
              o book completo ou salvar como PDF (selecione "Salvar como PDF" no diálogo de impressão).
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Printer className="w-4 h-4" /> Imprimir book / Salvar PDF
          </button>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-5 pb-20 print:p-0 print:max-w-none">
        {/* Capa */}
        <article className="ficha-page cover-page">
          <div className="flex flex-col items-center justify-center text-center h-full gap-8">
            <img src={logoLiga} alt="Liga Acadêmica" className="w-32 h-32 rounded-full object-cover" />
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">FAST-RESPONSE</div>
              <h1 className="text-4xl font-bold tracking-tight leading-tight">
                Book de Fichas Clínicas
              </h1>
              <p className="text-lg mt-3 text-muted-foreground">
                Urgências e Emergências Sistêmicas em Odontologia
              </p>
            </div>
            <div className="text-sm text-foreground/80 max-w-md">
              {emergencias.length} protocolos de bolso · Sinais · Conduta · Medicamentos · O que NÃO fazer
            </div>
            <div className="mt-auto pt-8 flex flex-col items-center gap-4">
              <img src={logoAnhanguera} alt="Anhanguera" className="h-14 w-auto" />
              <p className="text-sm font-semibold">Prof. Juliana Lance / Prof. Francisco Menezes</p>
              <p className="text-xs text-muted-foreground">Odontologia Santa Bárbara D'Oeste</p>
            </div>
          </div>
        </article>

        {/* Tabela de Referência — Pulseiras de Identificação */}
        <article className="ficha-page">
          <FichaHeader title="Pulseiras de Identificação" subtitle="Tabela de referência — cores e significados" />
          <p className="mt-4 text-sm text-muted-foreground">
            Sistema de pulseiras coloridas adotado em ambiente hospitalar para sinalizar riscos e cuidados
            especiais. As mesmas cores são reaplicadas nas fichas correspondentes deste book.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3">
            {PULSEIRAS.map((p) => (
              <div
                key={p.key}
                className="rounded-lg overflow-hidden border break-inside-avoid flex"
                style={{ borderColor: p.cor }}
              >
                <div
                  className="w-3 shrink-0"
                  style={{ background: p.cor }}
                  aria-hidden
                />
                <div className="flex-1 p-3 flex items-start gap-3">
                  <span
                    className="shrink-0 inline-block w-6 h-6 rounded-full mt-0.5 ring-2 ring-white shadow"
                    style={{ background: p.cor }}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: p.cor, color: p.corTexto }}
                      >
                        {p.nome}
                      </span>
                      <span className="text-sm font-semibold">{p.subtitulo}</span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/90 leading-snug">{p.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-muted-foreground italic">
            Fonte: padrões hospitalares de identificação de pacientes (referências: Proqualis/Fiocruz, Unimed, OMS).
          </div>
          <FichaFooter />
        </article>

        {/* Índice */}
        <article className="ficha-page">
          <FichaHeader title="Índice" subtitle="Agrupado por classificação" />
          <div className="mt-5 space-y-5">
            {GRUPOS.map((g) => {
              const itens = emergencias.filter((e) => e.severidade === g.sev);
              return (
                <div key={g.sev} className="break-inside-avoid">
                  <div
                    className="flex items-center justify-between gap-3 px-3 py-1.5 rounded text-white text-xs font-bold uppercase tracking-wider"
                    style={{ background: sevPrintColor[g.sev] }}
                  >
                    <span>{g.titulo}</span>
                    <span>{itens.length} fichas</span>
                  </div>
                  <ol className="mt-2 text-sm">
                    {itens.map((e) => (
                      <li key={e.id} className="flex justify-between gap-3 py-1 border-b border-dashed border-border">
                        <span>
                          <span className="font-semibold mr-2 text-muted-foreground">
                            {String(numMap.get(e.id)!).padStart(2, "0")}.
                          </span>
                          {e.nome}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0">{e.categoria}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
          <FichaFooter />
        </article>

        {/* Grupos: divisória colorida + fichas */}
        {GRUPOS.map((g) => {
          const itens = emergencias.filter((e) => e.severidade === g.sev);
          if (itens.length === 0) return null;
          return (
            <div key={g.sev}>
              <article
                className="ficha-page divider-page"
                style={{ background: sevPrintColor[g.sev], color: "white", borderColor: sevPrintColor[g.sev] }}
              >
                <div className="flex flex-col items-center justify-center text-center h-full gap-5 py-16">
                  <div className="text-xs uppercase tracking-[0.3em] opacity-80">Seção</div>
                  <h1 className="text-5xl font-bold tracking-tight leading-tight max-w-2xl">{g.titulo}</h1>
                  <p className="text-lg opacity-90 max-w-xl px-6">{g.descricao}</p>
                  <div className="mt-6 text-7xl font-black opacity-30">{itens.length}</div>
                  <div className="text-sm uppercase tracking-widest opacity-80">
                    {itens.length === 1 ? "ficha nesta seção" : "fichas nesta seção"}
                  </div>
                </div>
              </article>

              {itens.map((e) => {
                const equipe = equipeIdeal(e);
                return (
                  <article key={e.id} className="ficha-page">
                    <FichaHeader
                      title={e.nome}
                      subtitle={e.categoria}
                      badge={sevLabel[e.severidade]}
                      badgeColor={sevPrintColor[e.severidade]}
                      index={numMap.get(e.id)!}
                    />

                    {pulseirasDe(e.id).length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                          Pulseiras:
                        </span>
                        {pulseirasDe(e.id).map((p) => (
                          <span
                            key={p.key}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                            style={{ background: p.cor, color: p.corTexto, borderColor: p.cor }}
                          >
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-white/80"
                              aria-hidden
                            />
                            {p.nome} · {p.subtitulo}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/40">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold">Equipe ideal: {equipe.numero} {equipe.numero === 1 ? "pessoa" : "pessoas"}</span>
                  <span className="text-muted-foreground"> — {equipe.descricao}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-5">
                <Section icon={<Activity className="w-3.5 h-3.5" />} title="Sinais e Sintomas">
                  <ul className="space-y-1.5">
                    {e.sinais.map((s, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <span className="text-primary font-bold shrink-0">·</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section icon={<Ban className="w-3.5 h-3.5" />} title="O que NÃO fazer" danger>
                  <ul className="space-y-1.5">
                    {e.naoFazer.map((n, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <Ban className="w-3 h-3 mt-1 shrink-0" style={{ color: "#c0392b" }} />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>

              <div className="mt-5">
                <Section icon={<ListChecks className="w-3.5 h-3.5" />} title="Conduta — passo a passo">
                  <ol className="space-y-1.5">
                    {e.conduta.map((c, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ol>
                </Section>
              </div>

              {e.medicamentos.length > 0 && (
                <div className="mt-5">
                  <Section icon={<Pill className="w-3.5 h-3.5" />} title="Medicamentos">
                    <div className="grid grid-cols-2 gap-2">
                      {e.medicamentos.map((m, idx) => (
                        <div key={idx} className="p-2 rounded border border-border bg-secondary/40 text-xs">
                          <div className="font-semibold text-sm">{m.nome}</div>
                          <div className="text-muted-foreground mt-0.5">
                            <strong className="text-foreground">Dose:</strong> {m.dose}
                          </div>
                          <div className="text-muted-foreground">
                            <strong className="text-foreground">Via:</strong> {m.via}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
              )}

              {e.observacoes && (
                <div className="mt-5 p-3 rounded-lg border" style={{ borderColor: "#d68910", background: "rgba(214,137,16,0.08)" }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#d68910" }} />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Atenção</div>
                      <p className="text-sm">{e.observacoes}</p>
                    </div>
                  </div>
                </div>
              )}

              {e.severidade === "critica" && (
                <div className="mt-5 p-3 rounded-lg flex items-center justify-center gap-2 text-white font-bold text-sm" style={{ background: "#c0392b" }}>
                  <Phone className="w-4 h-4" /> ACIONAR SAMU — 192
                </div>
              )}

                    <FichaFooter />
                  </article>
                );
              })}
            </div>
          );
        })}
      </main>

      <style>{`
        .ficha-page {
          background: white;
          color: #1a1a1a;
          border: 1px solid hsl(var(--border, 0 0% 90%));
          border-radius: 12px;
          padding: 28px 32px;
          margin-bottom: 24px;
          min-height: 1000px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.1);
        }
        .cover-page { min-height: 1100px; }

        @media print {
          @page { size: A4; margin: 14mm; }
          html, body { background: white !important; }
          .ficha-page {
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
            page-break-after: always;
            break-after: page;
          }
          .ficha-page:last-child { page-break-after: auto; break-after: auto; }
        }
      `}</style>
    </div>
  );
}

function FichaHeader({
  title, subtitle, badge, badgeColor, index,
}: { title: string; subtitle?: string; badge?: string; badgeColor?: string; index?: number }) {
  return (
    <header className="flex items-start justify-between gap-4 pb-3 border-b-2 border-foreground/80">
      <div className="flex items-center gap-3">
        <img src={logoLiga} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
        <div>
          {subtitle && (
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              {subtitle}
            </div>
          )}
          <h2 className="text-xl font-bold leading-tight">{title}</h2>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        {badge && (
          <span
            className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: badgeColor }}
          >
            {badge}
          </span>
        )}
        {index !== undefined && (
          <span className="text-[10px] text-muted-foreground">
            Ficha {String(index).padStart(2, "0")} / {emergencias.length}
          </span>
        )}
      </div>
    </header>
  );
}

function FichaFooter() {
  return (
    <footer className="mt-auto pt-4 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
      <span>FAST-RESPONSE · Odontologia Santa Bárbara D'Oeste</span>
      <span>Prof. Juliana Lance / Prof. Francisco Menezes</span>
    </footer>
  );
}

function Section({
  icon, title, danger, children,
}: { icon: React.ReactNode; title: string; danger?: boolean; children: React.ReactNode }) {
  return (
    <section>
      <h3
        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-border"
        style={danger ? { color: "#c0392b", borderColor: "#c0392b40" } : undefined}
      >
        {icon} {title}
      </h3>
      {children}
    </section>
  );
}