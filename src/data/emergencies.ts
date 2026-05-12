export type Severity = "critica" | "alta" | "moderada";

export type Emergency = {
  id: string;
  nome: string;
  categoria: string;
  severidade: Severity;
  sinais: string[];
  conduta: string[];
  medicamentos: { nome: string; dose: string; via: string }[];
  observacoes?: string;
};

export const emergencias: Emergency[] = [
  {
    id: "sincope",
    nome: "Síncope Vasovagal",
    categoria: "Cardiovascular",
    severidade: "moderada",
    sinais: [
      "Palidez, sudorese fria",
      "Náusea, tontura",
      "Bradicardia, hipotensão",
      "Perda transitória da consciência",
    ],
    conduta: [
      "Interromper o procedimento imediatamente",
      "Posição de Trendelenburg (decúbito dorsal com pernas elevadas)",
      "Afrouxar roupas e garantir vias aéreas",
      "Oferecer O₂ 100% sob máscara (5 L/min)",
      "Monitorar PA, FC e nível de consciência",
      "Recuperação geralmente em 1–2 minutos",
    ],
    medicamentos: [
      { nome: "Oxigênio", dose: "5 L/min", via: "Máscara facial" },
    ],
    observacoes: "Se não recuperar em 2 min, considerar outras causas e acionar SAMU 192.",
  },
  {
    id: "anafilaxia",
    nome: "Reação Anafilática",
    categoria: "Alérgica",
    severidade: "critica",
    sinais: [
      "Urticária, prurido, eritema generalizado",
      "Edema de face, lábios e glote",
      "Broncoespasmo, estridor, dispneia",
      "Hipotensão grave, taquicardia",
      "Perda de consciência",
    ],
    conduta: [
      "ACIONAR SAMU 192 imediatamente",
      "Adrenalina 1:1000 IM na face anterolateral da coxa",
      "Decúbito dorsal com MMII elevados",
      "Oxigênio 100% sob máscara (8–10 L/min)",
      "Repetir adrenalina a cada 5–15 min se necessário",
      "Monitorar sinais vitais continuamente",
      "RCP se houver parada cardiorrespiratória",
    ],
    medicamentos: [
      { nome: "Adrenalina 1:1000", dose: "0,3–0,5 mg (0,01 mg/kg)", via: "IM (vasto lateral)" },
      { nome: "Hidrocortisona", dose: "100–200 mg", via: "IV/IM" },
      { nome: "Prometazina", dose: "25–50 mg", via: "IM" },
    ],
    observacoes: "Adrenalina é a primeira linha. NUNCA atrasar para administrar anti-histamínico antes.",
  },
  {
    id: "hipoglicemia",
    nome: "Hipoglicemia",
    categoria: "Endócrina",
    severidade: "alta",
    sinais: [
      "Sudorese fria, tremores",
      "Confusão mental, irritabilidade",
      "Taquicardia, palidez",
      "Convulsão ou coma (casos graves)",
      "Glicemia < 70 mg/dL",
    ],
    conduta: [
      "Interromper o procedimento",
      "Paciente CONSCIENTE: 15–20 g de carboidrato VO (suco, açúcar, mel)",
      "Paciente INCONSCIENTE: NÃO oferecer nada VO",
      "Glicose 50% IV (20–50 mL) ou Glucagon IM",
      "Reavaliar glicemia em 15 minutos",
      "Acionar SAMU 192 se não houver recuperação",
    ],
    medicamentos: [
      { nome: "Glicose 50%", dose: "20–50 mL", via: "IV" },
      { nome: "Glucagon", dose: "1 mg", via: "IM/SC" },
    ],
  },
  {
    id: "crise-hipertensiva",
    nome: "Crise Hipertensiva",
    categoria: "Cardiovascular",
    severidade: "alta",
    sinais: [
      "PA ≥ 180/120 mmHg",
      "Cefaleia intensa, tontura",
      "Epistaxe, visão turva",
      "Dor torácica (urgência)",
      "Sintomas neurológicos (emergência)",
    ],
    conduta: [
      "Interromper o procedimento",
      "Posicionar paciente sentado e tranquilizá-lo",
      "Aferir PA em ambos os braços",
      "Captopril 25 mg sublingual (urgência)",
      "Oxigênio se houver desconforto",
      "Acionar SAMU 192 em caso de emergência hipertensiva (lesão de órgão-alvo)",
    ],
    medicamentos: [
      { nome: "Captopril", dose: "25 mg", via: "Sublingual" },
    ],
    observacoes: "NÃO usar nifedipino sublingual (risco de queda abrupta da PA).",
  },
  {
    id: "iam",
    nome: "Infarto Agudo do Miocárdio",
    categoria: "Cardiovascular",
    severidade: "critica",
    sinais: [
      "Dor torácica opressiva > 20 min",
      "Irradiação para braço E, mandíbula, dorso",
      "Sudorese fria, náusea, dispneia",
      "Sensação de morte iminente",
    ],
    conduta: [
      "ACIONAR SAMU 192 imediatamente",
      "MOV: Monitorar, Oxigênio, Veia",
      "AAS 200–300 mg VO (mastigar)",
      "Nitrato sublingual se PA sistólica > 100 mmHg",
      "Oxigênio 2–4 L/min sob cateter nasal",
      "Posição confortável (geralmente sentado)",
      "Preparar para RCP",
    ],
    medicamentos: [
      { nome: "AAS", dose: "200–300 mg (mastigar)", via: "VO" },
      { nome: "Isordil (dinitrato)", dose: "5 mg", via: "Sublingual" },
      { nome: "Oxigênio", dose: "2–4 L/min", via: "Cateter nasal" },
    ],
  },
  {
    id: "convulsao",
    nome: "Crise Convulsiva",
    categoria: "Neurológica",
    severidade: "alta",
    sinais: [
      "Perda súbita de consciência",
      "Movimentos tônico-clônicos",
      "Sialorreia, cianose",
      "Liberação esfincteriana",
      "Período pós-ictal: confusão e sonolência",
    ],
    conduta: [
      "Proteger o paciente de traumas (afastar instrumentais)",
      "NÃO conter movimentos, NÃO colocar nada na boca",
      "Lateralizar a cabeça para evitar broncoaspiração",
      "Aspirar secreções se necessário",
      "Cronometrar a crise (>5 min = estado de mal epiléptico)",
      "Diazepam 10 mg IV se prolongada",
      "Acionar SAMU 192",
    ],
    medicamentos: [
      { nome: "Diazepam", dose: "10 mg", via: "IV lento" },
      { nome: "Midazolam", dose: "5–10 mg", via: "IM/Bucal" },
    ],
  },
  {
    id: "broncoespasmo",
    nome: "Crise Asmática / Broncoespasmo",
    categoria: "Respiratória",
    severidade: "alta",
    sinais: [
      "Dispneia, sibilos audíveis",
      "Uso de musculatura acessória",
      "Taquipneia, taquicardia",
      "Cianose (casos graves)",
      "Incapacidade de falar frases completas",
    ],
    conduta: [
      "Interromper o procedimento",
      "Posição sentada, inclinada para frente",
      "Salbutamol spray: 4–8 jatos com espaçador",
      "Repetir a cada 20 min (até 3 vezes)",
      "Oxigênio 5–10 L/min",
      "Hidrocortisona IV em casos moderados/graves",
      "Acionar SAMU 192 se não responder",
    ],
    medicamentos: [
      { nome: "Salbutamol spray", dose: "4–8 jatos", via: "Inalatória" },
      { nome: "Hidrocortisona", dose: "100–200 mg", via: "IV" },
    ],
  },
  {
    id: "hiperventilacao",
    nome: "Síndrome de Hiperventilação",
    categoria: "Psicogênica",
    severidade: "moderada",
    sinais: [
      "Respiração rápida e profunda",
      "Parestesia perioral e nas extremidades",
      "Tontura, sensação de desmaio",
      "Espasmo carpopedal (tetania)",
      "Ansiedade intensa",
    ],
    conduta: [
      "Interromper o procedimento e tranquilizar",
      "Orientar respiração lenta e profunda",
      "Respirar em saco de papel (controverso, usar com cautela)",
      "NÃO administrar oxigênio",
      "Considerar benzodiazepínico se ansiedade intensa",
    ],
    medicamentos: [
      { nome: "Midazolam", dose: "7,5–15 mg", via: "VO" },
    ],
  },
  {
    id: "obstrucao-via-aerea",
    nome: "Obstrução de Via Aérea por Corpo Estranho",
    categoria: "Respiratória",
    severidade: "critica",
    sinais: [
      "Tosse súbita, engasgo",
      "Mãos no pescoço (sinal universal)",
      "Incapacidade de falar ou tossir (obstrução total)",
      "Cianose, perda de consciência",
    ],
    conduta: [
      "Obstrução PARCIAL: estimular tosse",
      "Obstrução TOTAL (consciente): Manobra de Heimlich",
      "Inconsciente: iniciar RCP imediatamente",
      "Inspecionar boca a cada ciclo (remover se visível)",
      "ACIONAR SAMU 192",
    ],
    medicamentos: [],
    observacoes: "Prevenção: uso de dique de borracha sempre que possível.",
  },
  {
    id: "pcr",
    nome: "Parada Cardiorrespiratória (PCR)",
    categoria: "Cardiovascular",
    severidade: "critica",
    sinais: [
      "Inconsciência",
      "Ausência de respiração ou gasping",
      "Ausência de pulso central (carotídeo)",
    ],
    conduta: [
      "ACIONAR SAMU 192 e solicitar DEA",
      "Iniciar RCP: 30 compressões / 2 ventilações",
      "Compressões: 100–120/min, profundidade 5–6 cm",
      "Permitir retorno completo do tórax",
      "Aplicar DEA assim que disponível e seguir orientações",
      "Manter RCP até chegada do socorro ou retorno da circulação",
    ],
    medicamentos: [
      { nome: "Adrenalina", dose: "1 mg a cada 3–5 min", via: "IV (suporte avançado)" },
    ],
    observacoes: "Cadeia de sobrevivência: reconhecimento precoce → RCP → desfibrilação → SAV.",
  },
];

export const categorias = Array.from(new Set(emergencias.map((e) => e.categoria)));