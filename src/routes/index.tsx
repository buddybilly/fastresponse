import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, AlertTriangle, Activity, Pill, ListChecks, X, ChevronRight, Ban, Phone,
} from "lucide-react";
import { emergencias, categorias, type Emergency, type Severity } from "@/data/emergencies";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fast-Response Odontologia Anhanguera — Urgências Sistêmicas" },
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

function Index() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [selected, setSelected] = useState<Emergency | null>(null);

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
    <div className="min-h-screen bg-background text-foreground">
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
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1 group-hover:text-destructive">
                  Ver protocolo <ChevronRight className="w-3 h-3" />
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
            return (
              <button
                key={e.id}
                onClick={() => setSelected(e)}
                className="text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:-translate-y-0.5 transition-all"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-xs font-medium text-muted-foreground">{e.categoria}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sev.cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                    {sev.label}
                  </span>
                </div>
                <h4 className="font-semibold text-lg leading-tight mb-2">{e.nome}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{e.sinais[0]}{e.sinais[1] ? ` · ${e.sinais[1]}` : ""}</p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <ListChecks className="w-3.5 h-3.5" />
                    {e.conduta.length} passos
                  </span>
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
          <p className="font-medium text-foreground mb-1">Fast-Response Odontologia Anhanguera — Aviso clínico</p>
          <p>Este aplicativo é uma referência educacional. As condutas devem ser sempre ajustadas ao contexto clínico individual e seguir as diretrizes vigentes do CFO, AHA e protocolos institucionais.</p>
        </div>
      </footer>

      {selected && <ProtocolModal emergency={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ProtocolModal({ emergency, onClose }: { emergency: Emergency; onClose: () => void }) {
  const sev = severityStyle[emergency.severidade];
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
