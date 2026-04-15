export interface AuditQuestion {
  id: number;
  text: string;
  options?: string[];
  type: 'select' | 'text' | 'email' | 'phone' | 'number';
  weight?: number;
}

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  // Prepended Lead Gen Questions
  { id: 101, text: "Jaké je vaše jméno?", type: "text" },
  { id: 102, text: "Jaké je vaše příjmení?", type: "text" },
  // Audit Q1 (Employees) - Needed for Business Case
  { id: 1, text: "Kolik zaměstnanců má vaše firma aktuálně?", options: ["1–5", "6–10", "11–25", "26–50", "více než 50"], type: "select" },
  // Email (4th question)
  { id: 103, text: "Váš firemní email", type: "email" },
  // Audit Q2-Q4
  { id: 2, text: "Kdo ve vaší firmě nese hlavní odpovědnost za nábor?", options: ["majitel", "manažer", "HR specialista", "administrativa", "externě"], type: "select" },
  { id: 3, text: "Jak často potřebujete obsazovat nové pozice?", options: ["několikrát ročně", "1x měsíčně", "několikrát měsíčně", "průběžně"], type: "select" },
  { id: 4, text: "Jakým způsobem obvykle hledáte nové zaměstnance?", options: ["portály", "sítě", "doporučení", "agentury", "vlastní databáze"], type: "select" },
  // Phone (After 7th question - which is 4th audit question)
  // Wait, user said "after 7's questions". If we count prepended ones:
  // 1: Name, 2: Last Name, 3: Audit Q1, 4: Email, 5: Audit Q2, 6: Audit Q3, 7: Audit Q4
  // So Phone is 8th.
  { id: 104, text: "Vaše telefonní číslo", type: "phone" },
  // Audit Q5-Q24
  { id: 5, text: "Jak byste popsal současný náborový proces?", options: ["definovaný", "existuje (nedodržuje se)", "individuální", "nedefinovaný"], type: "select" },
  { id: 6, text: "Jak dlouho trvá obsadit novou pozici?", options: ["< 1 týden", "1–2 týdny", "2–4 týdny", "> měsíc"], type: "select" },
  { id: 7, text: "Jak evidujete kandidáty?", options: ["HR systém (ATS)", "tabulka/Excel", "email", "jiný způsob"], type: "select" },
  { id: 8, text: "Kolik lidí rozhoduje o přijetí kandidáta?", options: ["1", "2", "3–4", "více než 4"], type: "select" },
  { id: 9, text: "Kolik času týdně věnujete náboru?", options: ["< 2 hodiny", "2–5 h", "5–10 h", "> 10 h"], type: "select" },
  { id: 10, text: "Kolik kroků má výběrové řízení?", options: ["1", "2", "3", "více než 3"], type: "select" },
  { id: 11, text: "Jakým způsobem probíhá první kontakt?", options: ["telefonicky", "email", "online", "osobně"], type: "select" },
  { id: 12, text: "Jak dlouho trvá rozhodnutí po prvním pohovoru?", options: ["do 24 hod", "1–3 dny", "do týdně", "déle"], type: "select" },
  { id: 13, text: "Jak často obsazujete stejnou pozici znovu brzy?", options: ["nikdy", "občas", "často", "velmi často"], type: "select" },
  { id: 14, text: "Kolik zaměstnanců odejde ve zkušební době?", options: ["0–5 %", "6–15 %", "16–30 %", "více než 30 %"], type: "select" },
  { id: 15, text: "Znáte přesnou cenu za jeden nábor (Cost per Hire)?", options: ["ano", "odhad", "nevíme/nesledujeme"], type: "select" },
  { id: 16, text: "Používáte nějaký HR software (ATS)?", options: ["moderní ATS", "vlastní systém", "Excel", "nic"], type: "select" },
  { id: 17, text: "Jaká část komunikace probíhá přes AI/automatizaci?", options: ["> 50 %", "částečně (šablony)", "minimálně", "manuálně"], type: "select" },
  { id: 18, text: "Jak pracujete s nezískanými kandidáty (Talent Pool)?", options: ["databáze+oslovování", "databáze (nevyužitá)", "nemáme"], type: "select" },
  { id: 19, text: "Jak dlouho trvá Onboarding (zaškolení)?", options: ["do týdne", "2–4 týdny", "1–3 měsíce", "> 3 měsíce"], type: "select" },
  { id: 20, text: "Měříte zpětnou vazbu od kandidátů?", options: ["ano systémově", "náhodně", "neměříme"], type: "select" },
  { id: 21, text: "Hlavní strategický limit náboru?", type: "text" },
  { id: 22, text: "Plánujete navyšovat počet zaměstnanců (6 měs.)?", options: ["o > 20 %", "o 5–20 %", "stabilizovat", "snižovat"], type: "select" },
  { id: 23, text: "Jak důležité je zefektivnění náboru pomocí AI?", options: ["priorita", "střední", "jiné priority", "vůbec"], type: "select" },
  { id: 24, text: "Jste osoba s rozhodovací pravomocí pro investice?", options: ["ano", "částečně", "ne"], type: "select" },
];

export const calculateMaturityScore = (answers: Record<number, string>) => {
  let score = 50;

  // Strategie (Q5)
  if (answers[5] === "definovaný") score += 25;
  else if (answers[5] === "existuje (nedodržuje se)") score += 10;

  // Technologie (Q16)
  if (answers[16] === "moderní ATS" || answers[16] === "vlastní systém") score += 15;

  // Komunikace & Rychlost (Q17 & Q12)
  if (answers[17] === "> 50 %" || answers[17] === "částečně (šablony)") score += 10;
  if (answers[12] === "do 24 hod") score += 10;
  else if (answers[12] === "1–3 dny") score += 5;

  // Databáze (Q18)
  if (answers[18] === "databáze+oslovování") score += 15;

  // Rizika (Q14)
  if (answers[14] === "16-30 %" || answers[14] === "více než 30 %") score -= 15;

  return Math.min(98, Math.max(15, score));
};

export const getClassification = (score: number) => {
  if (score >= 85) return { label: "Lídr trhu", desc: "Efektivní kombinace AI a lidí." };
  if (score >= 60) return { label: "Solidní základ", desc: "Manuální práce stále brzdí růst." };
  return { label: "Manuální proces", desc: "Vysoké riziko chyb a pomalé obsazování." };
};

export const calculateSavings = (employeesRange: string) => {
  let count = 0;
  if (employeesRange === "1–5") count = 3;
  else if (employeesRange === "6–10") count = 8;
  else if (employeesRange === "11–25") count = 18;
  else if (employeesRange === "26–50") count = 38;
  else count = 75; // "více než 50"

  return (count * 1200) + 15000;
};

export const getRadarIndices = (answers: Record<number, string>) => {
  return [
    { name: 'Technologie', value: answers[16] === 'moderní ATS' || answers[16] === 'vlastní systém' ? 95 : 35 },
    { name: 'Komunikace', value: (answers[17] === '> 50 %' || answers[12] === 'do 24 hod') ? 92 : 45 },
    { name: 'Zkušenost (CX)', value: answers[20] === 'ano systémově' ? 90 : 30 },
    { name: 'Onboarding', value: (answers[19] === 'do týdne' || answers[19] === '2–4 týdny') ? 95 : 55 },
    { name: 'Strategie', value: answers[5] === 'definovaný' ? 98 : 40 },
    { name: 'Rychlost', value: (answers[6] === '< 1 týden' || answers[6] === '1–2 týdny') ? 100 : 40 },
  ];
};
