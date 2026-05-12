import { createFileRoute } from "@tanstack/react-router";
import { Syringe, Wind, Pill, Droplet, AlertTriangle, CheckCircle2, Ban } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

export const Route = createFileRoute("/acessos")({
  head: () => ({
    meta: [
      { title: "Acessos & Vias de Administração — Fast-Response Odontologia Anhanguera" },
      { name: "description", content: "Como obter acessos venosos, intramusculares, sublinguais e demais vias de administração de medicamentos em emergências odontológicas." },
    ],
  }),
  component: AcessosPage,
});

type Via = {
  id: string;
  nome: string;
  icon: typeof Syringe;
  indicacao: string;
  materiais: string[];
  passos: string[];
  cuidados: string[];
  exemplos: string[];
};

const vias: Via[] = [
  {
    id: "iv",
    nome: "Acesso Venoso Periférico (IV)",
    icon: Syringe,
    indicacao: "Via mais rápida e confiável para emergências graves. Permite reposição volêmica e medicação de ação imediata.",
    materiais: [
      "Cateter venoso (jelco) Nº 18, 20 ou 22",
      "Garrote",
      "Algodão e clorexidina alcoólica 0,5% / álcool 70%",
      "Esparadrapo / película transparente",
      "Equipo de soro e SF 0,9% 250–500 mL",
      "Seringa com SF para teste de permeabilidade",
      "Luvas de procedimento",
    ],
    passos: [
      "Higienizar as mãos e calçar luvas",
      "Selecionar veia: preferir membros superiores (cefálica, basílica, dorso da mão)",
      "Aplicar garrote 5–10 cm acima do local",
      "Antissepsia da pele em movimentos circulares (centro → periferia)",
      "Tracionar a pele e puncionar com bisel para cima em 15–30°",
      "Observar refluxo de sangue → avançar o cateter retirando a agulha",
      "Soltar o garrote, conectar o equipo ou salinizar",
      "Fixar com película transparente e datar",
    ],
    cuidados: [
      "Trocar local de punção a cada 72–96h",
      "Observar sinais de flebite (dor, calor, rubor)",
      "Sempre testar permeabilidade antes de medicar",
    ],
    exemplos: ["Adrenalina (PCR)", "Glicose 50%", "Hidrocortisona", "Diazepam", "SF 0,9% para reposição"],
  },
  {
    id: "im",
    nome: "Via Intramuscular (IM)",
    icon: Syringe,
    indicacao: "Via de escolha quando NÃO há acesso venoso disponível. Absorção rápida (5–15 min). Primeira linha na anafilaxia.",
    materiais: [
      "Seringa de 3 ou 5 mL",
      "Agulha 25x7 (40x8 em obesos)",
      "Algodão com álcool 70%",
      "Luvas de procedimento",
    ],
    passos: [
      "Higienizar as mãos e calçar luvas",
      "Escolher local: vasto lateral da coxa (emergência - melhor absorção) ou deltoide",
      "Antissepsia da pele",
      "Estabilizar a pele entre os dedos",
      "Inserir agulha em 90°, com firmeza",
      "Aspirar levemente — se refluxo de sangue, recuar e repuncionar",
      "Injetar lentamente (1 mL a cada 10 segundos)",
      "Retirar agulha rapidamente e comprimir com algodão",
    ],
    cuidados: [
      "Volume máximo: 3 mL no deltoide, 5 mL no vasto lateral",
      "Adrenalina IM SEMPRE no vasto lateral em anafilaxia",
      "Não massagear após injeção de adrenalina",
    ],
    exemplos: ["Adrenalina 1:1000 (anafilaxia)", "Hidrocortisona", "Prometazina", "Glucagon", "Midazolam"],
  },
  {
    id: "sl",
    nome: "Via Sublingual (SL)",
    icon: Pill,
    indicacao: "Absorção rápida pela mucosa sublingual (1–5 min). Evita primeira passagem hepática. Útil quando IV não disponível.",
    materiais: ["Comprimido ou spray sublingual", "Luvas (se manipular medicação)"],
    passos: [
      "Solicitar ao paciente que abra a boca",
      "Posicionar o comprimido sob a língua",
      "Orientar a NÃO mastigar, NÃO engolir e NÃO falar",
      "Manter em posição até dissolução completa (3–5 min)",
      "Para spray: aplicar 1 jato sob a língua",
    ],
    cuidados: [
      "Mucosa deve estar úmida — molhar com água se ressecada",
      "Não usar em paciente inconsciente",
      "Cuidado com hipotensão após nitratos (sentar/deitar o paciente)",
    ],
    exemplos: ["Captopril 25 mg (crise hipertensiva)", "Isordil 5 mg (angina/IAM)", "Midazolam (sedação)"],
  },
  {
    id: "vo",
    nome: "Via Oral (VO)",
    icon: Pill,
    indicacao: "Via mais segura. Indicada para paciente CONSCIENTE, com reflexo de deglutição preservado.",
    materiais: ["Medicamento", "Copo de água"],
    passos: [
      "Confirmar nível de consciência e capacidade de deglutir",
      "Posicionar o paciente sentado",
      "Oferecer o medicamento com água",
      "Observar deglutição completa",
    ],
    cuidados: [
      "NUNCA usar em paciente inconsciente, sonolento ou com convulsão",
      "Cuidado em pacientes com disfagia",
      "Início de ação mais lento (30–60 min)",
    ],
    exemplos: ["AAS 200–300 mg mastigável (IAM)", "Carboidrato (hipoglicemia)", "Midazolam VO (ansiedade)"],
  },
  {
    id: "inalatoria",
    nome: "Via Inalatória",
    icon: Wind,
    indicacao: "Ação tópica e rápida na via aérea. Indicada para broncoespasmo e oxigenoterapia.",
    materiais: [
      "Spray dosimetrado (Salbutamol)",
      "Espaçador (aerocâmara) — recomendado",
      "Cilindro de O₂ com fluxômetro",
      "Máscara facial / cateter nasal",
    ],
    passos: [
      "Salbutamol: agitar o frasco, acoplar ao espaçador, aplicar 1 jato e inspirar lentamente",
      "Aguardar 30 segundos entre os jatos (4–8 jatos por dose)",
      "Oxigênio: ajustar fluxo conforme indicação (cateter nasal 1–5 L/min, máscara 5–10 L/min)",
      "Verificar saturação se possível (alvo SpO₂ ≥ 94%)",
    ],
    cuidados: [
      "Espaçador melhora muito a deposição pulmonar",
      "Cuidado com O₂ alto fluxo em DPOC (pode causar narcose)",
      "Nunca usar perto de chamas ou faíscas",
    ],
    exemplos: ["Salbutamol (broncoespasmo)", "O₂ (síncope, IAM, anafilaxia, PCR)"],
  },
  {
    id: "outras",
    nome: "Outras Vias",
    icon: Droplet,
    indicacao: "Vias alternativas em situações específicas.",
    materiais: ["Conforme via escolhida"],
    passos: [
      "Subcutânea (SC): tecido subcutâneo, 45° — Glucagon, vacinas",
      "Bucal/jugal: midazolam em crise convulsiva sem acesso IV",
      "Retal: diazepam em crianças com convulsão",
      "Intraóssea: emergências extremas sem acesso venoso (uso hospitalar)",
    ],
    cuidados: ["Vias avançadas exigem treinamento específico"],
    exemplos: ["Glucagon SC", "Midazolam bucal", "Diazepam retal pediátrico"],
  },
];

const checklist = [
  "Cilindro de oxigênio com máscara e cateter nasal",
  "Ambu (bolsa-válvula-máscara) adulto e pediátrico",
  "DEA (Desfibrilador Externo Automático)",
  "Glicosímetro com tiras e lancetas",
  "Esfigmomanômetro e estetoscópio",
  "Oxímetro de pulso",
  "Termômetro",
  "Material de acesso venoso (jelcos 18/20/22, garrote, equipo, SF 0,9%)",
  "Seringas (1, 3, 5, 10 mL) e agulhas (13x4,5; 25x7; 40x8)",
  "Adrenalina 1:1000 ampola",
  "Hidrocortisona 100 e 500 mg",
  "Glicose 50% ampola",
  "Captopril 25 mg comprimido",
  "Salbutamol spray + espaçador",
  "AAS 100 mg",
  "Isordil 5 mg sublingual",
  "Midazolam ampola e VO",
  "Glucagon 1 mg",
  "Soro fisiológico 0,9% 250 e 500 mL",
];

export default function AcessosPage() {
  return <AcessosContent />;
}

function AcessosContent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />

      <section className="max-w-6xl mx-auto px-5 pt-10 pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-3">
          <Syringe className="w-3.5 h-3.5" />
          Vias de administração
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Acessos & <span className="text-primary">Administração</span> de Medicamentos
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Guia prático para obter acesso venoso, IM, sublingual, oral e inalatório no consultório odontológico durante emergências.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-12 space-y-5">
        {vias.map((v) => (
          <article
            key={v.id}
            className="rounded-2xl bg-card border border-border overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <header className="px-6 py-5 flex items-center gap-4 border-b border-border">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
                style={{ background: "var(--gradient-calm)" }}
              >
                <v.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{v.nome}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.indicacao}</p>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Materiais</h4>
                <ul className="space-y-1.5 text-sm">
                  {v.materiais.map((m, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Passo a passo</h4>
                <ol className="space-y-2 text-sm">
                  {v.passos.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="md:col-span-2 grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning" /> Cuidados
                  </h4>
                  <ul className="space-y-1.5 text-sm">
                    {v.cuidados.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Ban className="w-3 h-3 text-warning mt-1 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                  <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Medicamentos comuns
                  </h4>
                  <ul className="space-y-1.5 text-sm">
                    {v.exemplos.map((e, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-success mt-2 shrink-0" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div
          className="rounded-2xl bg-card border border-border p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold">Kit de Emergência — Checklist do Consultório</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Conforme recomendações do CFO. Verifique mensalmente validades e funcionamento.
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {checklist.map((item, i) => (
              <label key={i} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition cursor-pointer">
                <input type="checkbox" className="mt-1 accent-primary" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="max-w-6xl mx-auto px-5 py-8 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Fast-Response Odontologia Anhanguera</p>
          <p>Os procedimentos descritos exigem treinamento clínico. Em dúvida, prefira a via menos invasiva e acione o SAMU 192.</p>
        </div>
      </footer>
    </div>
  );
}
