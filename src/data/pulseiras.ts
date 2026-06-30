export type PulseiraKey =
  | "vermelha"
  | "laranja"
  | "amarela"
  | "azul"
  | "roxa"
  | "rosa"
  | "marrom"
  | "verde"
  | "dourada"
  | "branca"
  | "cinza"
  | "preta";

export type Pulseira = {
  key: PulseiraKey;
  nome: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  corTexto: string;
  precaucoes: string[];
};

export const PULSEIRAS: Pulseira[] = [
  { key: "vermelha", nome: "Vermelho", subtitulo: "Alergia medicamentosa/alimentar",
    descricao: "Alergia medicamentosa ou alimentar severa.",
    cor: "#c0392b", corTexto: "#ffffff",
    precaucoes: [
      "Confirmar o agente alérgico antes de qualquer prescrição ou anestésico.",
      "Adrenalina IM 0,3-0,5 mg disponível à beira do leito (anafilaxia).",
      "Evitar AINEs, betalactâmicos ou látex se houver histórico cruzado.",
      "Registrar alergia em prontuário e comunicar toda a equipe.",
    ] },
  { key: "laranja", nome: "Laranja", subtitulo: "Alergia ao Látex (Latex Free)",
    descricao: "Alergia ao látex — nada de borracha natural.",
    cor: "#e67e22", corTexto: "#ffffff",
    precaucoes: [
      "Usar luvas, dique de borracha e garrote 100% livres de látex (nitrila/vinil).",
      "Conferir seringas, ampolas e tampas de frascos — muitas têm látex.",
      "Primeiro atendimento do dia (menor carga de partículas no ar).",
      "Ter adrenalina e anti-histamínico prontos para uso.",
    ] },
  { key: "amarela", nome: "Amarelo", subtitulo: "Alto risco de quedas",
    descricao: "Idosos, tonturas, pós-operatório imediato.",
    cor: "#f1c40f", corTexto: "#1a1a1a",
    precaucoes: [
      "Subir/descer da cadeira sempre acompanhado.",
      "Elevar a cadeira de forma lenta e gradual (evitar hipotensão postural).",
      "Aguardar 1-2 minutos sentado antes de liberar.",
      "Piso seco, calçados firmes, iluminação adequada.",
    ] },
  { key: "azul", nome: "Azul", subtitulo: "Risco de Lesão por Pressão",
    descricao: "Paciente precisa de mudança de posição.",
    cor: "#2e86c1", corTexto: "#ffffff",
    precaucoes: [
      "Reposicionar a cada 20-30 min em consultas longas.",
      "Usar coxins em calcâneos, sacro e cotovelos.",
      "Inspecionar a pele antes e depois do procedimento.",
      "Evitar manter cadeira totalmente reclinada por longos períodos.",
    ] },
  { key: "roxa", nome: "Roxo", subtitulo: "Broncoaspiração / DNR",
    descricao: "Risco de broncoaspiração (engasgo) ou ordem de Não Reanimar.",
    cor: "#7d3c98", corTexto: "#ffffff",
    precaucoes: [
      "Aspirador de alta potência sempre ligado e testado.",
      "Dique de borracha e gaze de proteção em todo procedimento.",
      "Cadeira com pouca reclinação; cabeceira lateralizada se necessário.",
      "Conferir e respeitar diretrizes antecipadas de vontade (DNR).",
    ] },
  { key: "rosa", nome: "Rosa", subtitulo: "Membro restrito",
    descricao: "Não puncionar nem aferir pressão neste braço.",
    cor: "#e91e63", corTexto: "#ffffff",
    precaucoes: [
      "NÃO aferir PA, puncionar acesso ou coletar sangue no membro marcado.",
      "Usar o membro contralateral para todo acesso venoso.",
      "Sinalizar o membro com faixa visível durante o atendimento.",
      "Comunicar todos os profissionais que se aproximarem do paciente.",
    ] },
  { key: "marrom", nome: "Marrom", subtitulo: "Dificuldade de comunicação",
    descricao: "Surdez, cegueira ou barreira idiomática.",
    cor: "#795548", corTexto: "#ffffff",
    precaucoes: [
      "Identificar a barreira (auditiva, visual ou idiomática) antes de iniciar.",
      "Usar pranchas de comunicação, libras, intérprete ou acompanhante.",
      "Descrever em voz alta cada passo (deficiência visual).",
      "Combinar sinais simples de pausa/dor antes do procedimento.",
    ] },
  { key: "verde", nome: "Verde", subtitulo: "Sem alterações dignas de nota",
    descricao: "Paciente sem alterações clínicas dignas de nota.",
    cor: "#1e8449", corTexto: "#ffffff",
    precaucoes: [
      "Mesmo sem alterações, manter anamnese atualizada a cada consulta.",
      "Aferir PA e revisar medicações em uso de rotina.",
      "Reforçar precauções padrão de biossegurança.",
      "Orientar sinais de alerta entre consultas.",
    ] },
  { key: "dourada", nome: "Dourada", subtitulo: "Risco de hemorragia",
    descricao: "Alto risco de sangramento.",
    cor: "#c9a227", corTexto: "#1a1a1a",
    precaucoes: [
      "Checar INR/anticoagulantes/antiagregantes nas últimas 24-72 h.",
      "Hemostáticos locais prontos: ácido tranexâmico, esponja, sutura.",
      "Técnica atraumática, suturar mesmo extrações simples.",
      "Orientar compressão prolongada e contato imediato em sangramento.",
    ] },
  { key: "branca", nome: "Branca + Vermelha", subtitulo: "Hipertenso (HAS)",
    descricao: "Paciente hipertenso — monitorar PA, evitar vasoconstritor em excesso.",
    cor: "#b0bec5", corTexto: "#1a1a1a",
    precaucoes: [
      "Aferir PA antes, durante (se longa) e após o procedimento.",
      "Adiar atendimento eletivo se PA ≥ 180/110 mmHg.",
      "Limitar vasoconstritor: máx. 2 tubetes de lidocaína 2% com epinefrina 1:100.000.",
      "Confirmar uso regular dos anti-hipertensivos no dia da consulta.",
    ] },
  { key: "cinza", nome: "Cinza + Azul", subtitulo: "Diabético (DM)",
    descricao: "Paciente diabético — risco de hipo/hiperglicemia, atenção ao jejum.",
    cor: "#607d8b", corTexto: "#ffffff",
    precaucoes: [
      "NÃO atender em jejum prolongado — orientar alimentação prévia.",
      "Glicosímetro disponível; aferir glicemia se sinais de hipo/hiperglicemia.",
      "Ter glicose VO/IV e glucagon prontos para hipoglicemia.",
      "Atendimento curto, matinal, com bom controle de ansiedade e dor.",
    ] },
  { key: "preta", nome: "Preta", subtitulo: "Uso de substâncias ilícitas",
    descricao: "Uso de drogas ilícitas — risco anestésico e interações (cocaína, crack, anfetaminas).",
    cor: "#1a1a1a", corTexto: "#ffffff",
    precaucoes: [
      "Adiar atendimento eletivo se uso recente (<24 h de cocaína/crack/anfetamina).",
      "EVITAR anestésico com vasoconstritor — risco de crise hipertensiva/arritmia/IAM.",
      "Monitorar PA, FC e nível de consciência durante todo o procedimento.",
      "Abordagem sem julgamento; orientar e encaminhar para suporte clínico.",
    ] },
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