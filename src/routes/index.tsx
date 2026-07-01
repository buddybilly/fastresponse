import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search, AlertTriangle, Activity, Pill, ListChecks, X, ChevronRight, Ban, Phone, User, Users,
} from "lucide-react";
import { emergencias, categorias, equipeIdeal, type Emergency, type Severity } from "@/data/emergencies";
import { PULSEIRAS, pulseirasDe, type Pulseira } from "@/data/pulseiras";
import { AppHeader } from "@/components/AppHeader";
import logoLiga from "@/assets/logo-liga.png";
import logoAnhanguera from "@/assets/logo-anhanguera.png";
import watermark from "@/assets/watermark-fast-response.png";
import nspLogo from "@/assets/nsp-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FAST-RESPONSE - Odontologia Santa Bárbara — Urgências Sistêmicas" },
      { name: "description", content: "Guia clínico de bolso para urgências e emergências sistêmicas no consultório odontológico: protocolos, sinais, condutas, medicamentos e o que NÃO fazer." },
    ],
  }),
  component: Index,
});

const severityStyle: Record<Severity, { label: string; cls: string; dot: string }> = {
  critica: { label: "Crítica", cls: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive" },
  alta: { label: "Alta", cls: "bg-warning/15 text-warning-foreground border-warning/30", dot: "bg-warning" },
  moderada: { label: "Moderada", cls: "bg-success/15 text-success-foreground border-success/30", dot: "bg-success" },
};

function TeamBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border bg-accent/40 border-border text-accent-foreground" title={`Equipe ideal: ${n} pessoas`}>
      {Array.from({ length: Math.min(n, 5) }).map((_, i) => (
        <User key={i} className="w-2.5 h-2.5" />
      ))}
      <span className="ml-0.5">{n}</span>
    </span>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [selected, setSelected] = useState<Emergency | null>(null);
  const [pulseira, setPulseira] = useState<Pulseira | null>(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return emergencias.filter((e) => {
      const matchesCat = !cat || e.categoria === cat;
      const matchesQ =
        !q ||
        e.nome.toLowerCase().includes(q) ||
        e.categoria.toLowerCase().includes(q) ||
        e.sinais.some((s) => s.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [query, cat]);

  const criticos = emergencias.filter((e) => e.severidade === "critica");

  return (
    <>
    {showSplash && (
      <div
        onClick={() => setShowSplash(false)}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background animate-in fade-in cursor-pointer px-6"
      >
        <img
          src={watermark}
          alt="FAST-RESPONSE TEAM — Odontologia S.B.O."
          className="w-full max-w-md object-contain"
        />
        <div className="flex items-center gap-6">
          <img src={logoLiga} alt="Liga Acadêmica" className="h-20 w-20 rounded-full object-cover ring-1 ring-border" />
          <img src={logoAnhanguera} alt="Anhanguera Santa Bárbara D'Oeste" className="h-14 w-auto" />
          <img src={nspLogo.url} alt="Núcleo de Segurança do Paciente" className="h-20 w-auto" />
        </div>
        <p className="text-xs text-muted-foreground tracking-wide uppercase">Toque para continuar</p>
      </div>
    )}
    <div
      className="min-h-screen bg-background text-foreground relative"
      style={{
        backgroundImage: `url(${watermark})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 30%",
        backgroundSize: "min(680px, 85%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-background/85 -z-0" />
      <div className="relative z-10">
      <AppHeader />

      <section className="max-w-6xl mx-auto px-5 pt-10 pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-3">
          <Activity className="w-3.5 h-3.5" />
          Referência rápida — atualize seu protocolo
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Urgências e Emergências <span className="text-primary">Sistêmicas</span> em Odontologia
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          {emergencias.length} protocolos clínicos com sinais, condutas, medicamentos, doses e o que <strong className="text-destructive">NÃO fazer</strong> em cada situação.
        </p>

        <div className="mt-8 relative max-w-2xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por sintoma, nome ou categoria..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-card border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-sm"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setCat(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              !cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"
            }`}
          >
            Todas ({emergencias.length})
          </button>
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c === cat ? null : c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
            Identificação em cores no prontuário
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {PULSEIRAS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPulseira(p)}
              className="flex items-center gap-2 rounded-lg border bg-card px-2.5 py-2 text-left hover:-translate-y-0.5 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              style={{ borderColor: `${p.cor}55`, background: `${p.cor}10` }}
              title={`${p.descricao} — toque para ver precauções`}
              aria-label={`Precauções: ${p.nome}`}
            >
              <span className="flex items-center -space-x-1 shrink-0" aria-hidden>
                <span
                  className="w-3 h-3 rounded-full ring-1 ring-border"
                  style={{ background: p.cor }}
                />
                {p.cor2 && (
                  <span
                    className="w-3 h-3 rounded-full ring-1 ring-border"
                    style={{ background: p.cor2 }}
                  />
                )}
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold leading-tight" style={{ color: p.cor }}>
                  {p.nome}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight truncate">
                  {p.subtitulo}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {!query && !cat && (
        <section className="max-w-6xl mx-auto px-5 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-destructive">Acesso rápido — Críticas</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {criticos.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className="text-left p-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/40 transition-all group"
              >
                <div className="text-xs font-medium text-destructive mb-1">{e.categoria}</div>
                <div className="font-semibold text-sm leading-tight">{e.nome}</div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <TeamBadge n={equipeIdeal(e).numero} />
                  <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-destructive">
                    Abrir <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => {
            const sev = severityStyle[e.severidade];
            const pulseiras = pulseirasDe(e.id);
            const tint = pulseiras[0]?.cor;
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className="text-left p-5 rounded-2xl bg-card border hover:-translate-y-0.5 transition-all relative overflow-hidden"
                style={{
                  boxShadow: "var(--shadow-card)",
                  borderColor: tint ? `${tint}55` : undefined,
                  background: tint ? `linear-gradient(180deg, ${tint}0D, transparent 60%), var(--card, #fff)` : undefined,
                }}
              >
                {tint && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{
                      background:
                        pulseiras.length > 1
                          ? `linear-gradient(180deg, ${pulseiras.map((p) => p.cor).join(", ")})`
                          : tint,
                    }}
                  />
                )}
                {pulseiras.length > 0 && (
                  <div className="absolute top-2 right-2 flex -space-x-1.5">
                    {pulseiras.map((p) => (
                      <span
                        key={p.key}
                        title={`${p.nome} — ${p.subtitulo}`}
                        aria-label={p.nome}
                        className="w-5 h-5 rounded-full ring-2 ring-card shadow-sm"
                        style={{
                          background: p.cor2
                            ? `linear-gradient(90deg, ${p.cor} 50%, ${p.cor2} 50%)`
                            : p.cor,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">{e.categoria}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sev.cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                    {sev.label}
                  </span>
                </div>
                <h4 className="font-semibold text-lg leading-tight mb-2">{e.nome}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{e.sinais[0]}{e.sinais[1] ? ` · ${e.sinais[1]}` : ""}</p>
                {pulseiras.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pulseiras.map((p) => (
                      <span
                        key={p.key}
                        title={p.descricao}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border"
                        style={{ background: p.cor, color: p.corTexto, borderColor: p.cor }}
                      >
                        <span
                          className="w-2 h-2 rounded-full ring-1 ring-white/70"
                          style={{ background: p.corTexto }}
                        />
                        {p.nome}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <TeamBadge n={equipeIdeal(e).numero} />
                  <span className="text-primary font-medium flex items-center gap-1">
                    Abrir <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            Nenhuma emergência encontrada para "{query}".
          </div>
        )}
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-5 py-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-5 mb-5">
            <img src={logoLiga} alt="Liga Acadêmica de Cirurgia e Traumatologia Bucomaxilofaciais" className="h-16 w-16 rounded-full object-cover ring-1 ring-border" />
            <img src={logoAnhanguera} alt="Anhanguera Santa Bárbara D'Oeste" className="h-12 w-auto" />
          </div>
          <p className="font-medium text-foreground mb-1">FAST-RESPONSE - Odontologia Santa Bárbara — Aviso clínico</p>
          <p>Este aplicativo é uma referência educacional. As condutas devem ser sempre ajustadas ao contexto clínico individual e seguir as diretrizes vigentes do CFO, AHA e protocolos institucionais.</p>
          <p className="mt-3 text-foreground font-medium">Prof. Juliana Lance / Prof. Francisco Menezes</p>
        </div>
      </footer>

      {selected && <ProtocolModal emergency={selected} onClose={() => setSelected(null)} />}
      {pulseira && <PulseiraModal pulseira={pulseira} onClose={() => setPulseira(null)} />}
      </div>
    </div>
    </>
  );
}

function PulseiraModal({ pulseira, onClose }: { pulseira: Pulseira; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 md:p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto border shadow-2xl animate-in slide-in-from-bottom"
        style={{ borderColor: `${pulseira.cor}66` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="px-6 py-4 flex items-start justify-between gap-4"
          style={{ background: pulseira.cor, color: pulseira.corTexto }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-8 rounded-full ring-2"
              style={{ background: pulseira.corTexto, borderColor: pulseira.corTexto }}
              aria-hidden
            />
            <div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">Identificação</div>
              <h3 className="text-xl font-bold leading-tight">{pulseira.nome}</h3>
              <div className="text-xs opacity-90">{pulseira.subtitulo}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-black/10 transition-colors"
            aria-label="Fechar"
            style={{ color: pulseira.corTexto }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <p className="text-sm text-muted-foreground">{pulseira.descricao}</p>
          <section>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <ListChecks className="w-4 h-4" /> Medidas de precaução
            </h4>
            <ol className="space-y-2.5">
              {pulseira.precaucoes.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ background: pulseira.cor, color: pulseira.corTexto }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{m}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProtocolModal({ emergency, onClose }: { emergency: Emergency; onClose: () => void }) {
  const sev = severityStyle[emergency.severidade];
  const equipe = equipeIdeal(emergency);
  const pulseiras = pulseirasDe(emergency.id);
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-foreground/40 backdrop-blur-sm p-0 md:p-6 animate-in fade-in" onClick={onClose}>
      <div
        className="bg-card w-full md:max-w-2xl md:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto border border-border shadow-2xl animate-in slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">{emergency.categoria}</span>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sev.cls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                {sev.label}
              </span>
            </div>
            <h3 className="text-xl font-bold leading-tight">{emergency.nome}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* Equipe ideal */}
          <section className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">Equipe ideal</div>
                  <div className="text-sm font-semibold leading-tight">
                    {equipe.numero} {equipe.numero === 1 ? "pessoa" : "pessoas"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: equipe.numero }).map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{equipe.descricao}</p>
          </section>

          {pulseiras.length > 0 && (
            <section>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                <Activity className="w-4 h-4" /> Identificação em cores no prontuário
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {pulseiras.map((p) => (
                  <div
                    key={p.key}
                    className="flex items-start gap-3 rounded-xl border p-3"
                    style={{ borderColor: `${p.cor}66`, background: `${p.cor}12` }}
                  >
                    <span className="mt-0.5 flex items-center -space-x-2 shrink-0" aria-hidden>
                      <span
                        className="w-9 h-9 rounded-full ring-2 ring-white shadow"
                        style={{ background: p.cor }}
                      />
                      {p.cor2 && (
                        <span
                          className="w-9 h-9 rounded-full ring-2 ring-white shadow"
                          style={{ background: p.cor2 }}
                        />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-tight" style={{ color: p.cor }}>
                        {p.nome}
                      </div>
                      <div className="text-[11px] font-medium text-foreground/80 leading-tight">
                        {p.subtitulo}
                      </div>
                      <div className="text-[11px] text-muted-foreground leading-snug mt-1">
                        {p.descricao}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 italic">
                Associe sempre a cor de identificação ao quadro clínico — ajuda a memorizar e a comunicar o risco rapidamente à equipe.
              </p>
            </section>
          )}

          <section>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Activity className="w-4 h-4" /> Sinais e Sintomas
            </h4>
            <ul className="space-y-2">
              {emergency.sinais.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <ListChecks className="w-4 h-4" /> Conduta
            </h4>
            <ol className="space-y-2.5">
              {emergency.conduta.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{c}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-destructive mb-3">
              <Ban className="w-4 h-4" /> O que NÃO fazer
            </h4>
            <ul className="space-y-2">
              {emergency.naoFazer.map((n, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <Ban className="w-3.5 h-3.5 text-destructive mt-0.5 shrink-0" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </section>

          {emergency.medicamentos.length > 0 && (
            <section>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                <Pill className="w-4 h-4" /> Medicamentos
              </h4>
              <div className="space-y-2">
                {emergency.medicamentos.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="font-semibold text-sm">{m.nome}</div>
                    <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                      <span><strong className="text-foreground">Dose:</strong> {m.dose}</span>
                      <span><strong className="text-foreground">Via:</strong> {m.via}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {emergency.observacoes && (
            <section className="p-4 rounded-xl bg-warning/10 border border-warning/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1">Atenção</div>
                  <p className="text-sm">{emergency.observacoes}</p>
                </div>
              </div>
            </section>
          )}

          {emergency.severidade === "critica" && (
            <a
              href="tel:192"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-destructive-foreground font-semibold text-sm"
              style={{ background: "var(--gradient-emergency)", boxShadow: "var(--shadow-emergency)" }}
            >
              <Phone className="w-4 h-4" /> Ligar SAMU 192
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
