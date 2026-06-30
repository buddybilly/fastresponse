export type PulseiraKey =
  | "vermelha"
  | "laranja"
  | "amarela"
  | "azul"
  | "roxa"
  | "rosa"
  | "marrom"
  | "verde"
  | "dourada";

export type Pulseira = {
  key: PulseiraKey;
  nome: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  corTexto: string;
};

export const PULSEIRAS: Pulseira[] = [
  { key: "vermelha", nome: "Vermelho", subtitulo: "Alergia medicamentosa/alimentar",
    descricao: "Alergia medicamentosa ou alimentar severa.",
    cor: "#c0392b", corTexto: "#ffffff" },
  { key: "laranja", nome: "Laranja", subtitulo: "Alergia ao Látex (Latex Free)",
    descricao: "Alergia ao látex — nada de borracha natural.",
    cor: "#e67e22", corTexto: "#ffffff" },
  { key: "amarela", nome: "Amarelo", subtitulo: "Alto risco de quedas",
    descricao: "Idosos, tonturas, pós-operatório imediato.",
    cor: "#f1c40f", corTexto: "#1a1a1a" },
  { key: "azul", nome: "Azul", subtitulo: "Risco de Lesão por Pressão",
    descricao: "Paciente precisa de mudança de posição.",
    cor: "#2e86c1", corTexto: "#ffffff" },
  { key: "roxa", nome: "Roxo", subtitulo: "Broncoaspiração / DNR",
    descricao: "Risco de broncoaspiração (engasgo) ou ordem de Não Reanimar.",
    cor: "#7d3c98", corTexto: "#ffffff" },
  { key: "rosa", nome: "Rosa", subtitulo: "Membro restrito",
    descricao: "Não puncionar nem aferir pressão neste braço.",
    cor: "#e91e63", corTexto: "#ffffff" },
  { key: "marrom", nome: "Marrom", subtitulo: "Dificuldade de comunicação",
    descricao: "Surdez, cegueira ou barreira idiomática.",
    cor: "#795548", corTexto: "#ffffff" },
  { key: "verde", nome: "Verde", subtitulo: "Sem alterações dignas de nota",
    descricao: "Paciente sem alterações clínicas dignas de nota.",
    cor: "#1e8449", corTexto: "#ffffff" },
  { key: "dourada", nome: "Dourada", subtitulo: "Risco de hemorragia",
    descricao: "Alto risco de sangramento.",
    cor: "#c9a227", corTexto: "#1a1a1a" },
];

export const PULSEIRAS_POR_FICHA: Record<string, PulseiraKey[]> = {
  anafilaxia: ["vermelha"],
  "edema-angioneurotico": ["vermelha"],
  sincope: ["amarela"],
  hipotensao: ["amarela"],
  hipoglicemia: ["amarela"],
  avc: ["amarela", "roxa"],
  convulsao: ["amarela", "roxa"],
  broncoespasmo: ["roxa"],
  "obstrucao-via-aerea": ["roxa"],
  aspiracao: ["roxa"],
  pcr: ["roxa"],
  "choque-hemorragico": ["dourada"],
  eclampsia: ["amarela", "dourada"],
  iam: ["vermelha"],
  "intoxicacao-anestesico": ["vermelha"],
};

export function pulseirasDe(id: string): Pulseira[] {
  const keys = PULSEIRAS_POR_FICHA[id] ?? [];
  return PULSEIRAS.filter((p) => keys.includes(p.key));
}