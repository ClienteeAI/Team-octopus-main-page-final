export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export const articles: Article[] = [
  {
    id: "ai-v-hr",
    title: "Budoucnost náboru: Role AI v moderním HR",
    excerpt: "Umělá inteligence už není jen sci-fi. V náboru zaměstnanců se stává klíčovým nástrojem pro zrychlení procesu a zvýšení kvality výběru.",
    date: "1. dubna 2026",
    readTime: "6 min čtení",
    category: "Technologie",
    image: "/hr_ai_recruitment.png",
    content: `
      <h2>Revoluce v náborovém procesu</h2>
      <p>Vstupujeme do éry, kde umělá inteligence (AI) přestává být futuristickým konceptem a stává se každodenním partnerem personalistů. V dnešním dynamickém trhu práce, kde rychlost a přesnost rozhodují o úspěchu firmy, nabízí AI řešení, která byla ještě před deseti lety nepředstavitelná.</p>

      <h3>Efektivita nadevšé</h3>
      <p>Tradiční nábor často trpí zdlouhavým procesem screeningu životopisů. Průměrný personalista věnuje jednomu životopisu pouhých 6 až 7 sekund. S pomocí moderních algoritmů dokáže Team Octopus analyzovat tisíce profilů během mžiku, přičemž se nezaměřuje pouze na klíčová slova, ale i na hlubší souvislosti v profesní historii kandidáta.</p>

      <h3>Odhalení skrytého potenciálu</h3>
      <p>Jedním z největších přínosů AI je schopnost predikovat úspěch kandidáta na základě dat. Namísto intuitivního pocitu ("ten člověk se mi líbí") nastupuje analýza kompetencí a kulturní shody. AI nástroje dokáží rozpoznat vzorce chování a dovedností, které vedly k úspěchu u stávajících špičkových zaměstnanců, a hledat podobné charakteristiky u nových uchazečů.</p>

      <h3>Lidskost na prvním místě</h3>
      <p>Častou obavou je, že AI nahradí lidi a proces se stane chladným a robotickým. Opak je však pravdou. Tím, že AI převezme administrativní zátěž a rutinní úkoly, získávají personalisté více času na to nejdůležitější – budování vztahů. Namísto papírování se mohou věnovat hloubkovým rozhovorům, empatii a pochopení motivace kandidátů.</p>

      <h3>Etika a transparentnost</h3>
      <p>Budoucnost AI v HR však s sebou nese i zodpovědnost. Je nezbytné, aby algoritmy byly trénovány na objektivních datech a nepřenášely do výběru nevědomé předsudky. V Team Octopus klademe důraz na etické využívání technologií tak, aby každému kandidátovi byla dána férová šance na úspěch.</p>

      <h3>Závěr</h3>
      <p>AI v náboru není o nahrazení personalisty, ale o jeho "upgrade". Je to nástroj, který nám umožňuje vidět dál, rozhodovat se lépe a tvořit týmy, které jsou skutečně kompatibilní. Ti, kteří tuto technologii adoptují nyní, získají v boji o talenty náskok, který bude v budoucnu nedostižný.</p>
    `
  },
  {
    id: "well-being",
    title: "Well-being zaměstnanců: Klíč k udržení talentů",
    excerpt: "Spokojený zaměstnanec je produktivní zaměstnanec. V roce 2026 už well-being není bonus, ale strategická nutnost každé moderní firmy.",
    date: "28. března 2026",
    readTime: "5 min čtení",
    category: "Kultura",
    image: "/hr_wellbeing.png",
    content: `
      <h2>Proč na duševním zdraví záleží?</h2>
      <p>Doba, kdy jedinou motivací zaměstnance byl plat, je nenávratně pryč. Moderní talenty hledají v práci smysl a prostředí, které respektuje jejich osobní život a psychické zdraví. Koncept well-beingu se tak přesouvá z okraje zájmu do centra HR strategie.</p>

      <h3>Víc než jen ovoce v kanceláři</h3>
      <p>Mnoho firem si plete well-being s benefity jako je stolní fotbálek nebo miska s jablky v kuchyňce. Skutečný well-being je však hlubší. Zahrnuje psychologické bezpečí na pracovišti, možnost flexibilního rozvržení práce, podporu duševního zdraví a kulturu, kde je v pořádku říct "dneska mi není dobře".</p>

      <h3>Investice s vysokou návratností</h3>
      <p>Studie ukazují, že každá koruna investovaná do programů na podporu duševního zdraví se firmě vrátí průměrně čtyřikrát v podobě nižší fluktuace, méně dnů nemoci a vyšší angažovanosti. Zaměstnanci, kteří cítí, že o ně firma skutečně pečuje, jsou lojálnější a kreativnější.</p>

      <h3>Role lídrů</h3>
      <p>Well-being začíná u managementu. Pokud lídři sami nerespektují volný čas a vykazují známky vyhoření, žádný program nebude fungovat. Autentické vedení, které projevuje empatii a zranitelnost, vytváří základ pro zdravou firemní kulturu. V Team Octopus pomáháme lídrům tyto dovednosti rozvíjet.</p>

      <h3>Závěr</h3>
      <p>Budování prostředí zaměřeného na well-being není jednorázový úkol, ale kontinuální proces naslouchání a adaptace. V tržním prostředí, kde je nedostatek kvalifikovaných lidí, se péče o lidi stává tou nejsilnější konkurenční výhodou.</p>
    `
  },
  {
    id: "hybridni-prace",
    title: "Hybridní práce a firemní kultura",
    excerpt: "Jak udržet tým kompaktní, když polovina lidí pracuje z domova a druhá z kanceláře? Výzvy a řešení pro model 2026.",
    date: "25. března 2026",
    readTime: "7 min čtení",
    category: "Management",
    image: "/hr_hybrid_culture.png",
    content: `
      <h2>Nová norma: Hybridní model</h2>
      <p>Pandemie změnila svět práce navždy. Hybridní model, kombinující práci z domova a z kanceláře, se stal standardem, na který uživatelé trvají. Přináší však zásadní otázku: Jak udržet firemní kulturu a pocit sounáležitosti, když se tým fyzicky nepotkává každý den?</p>

      <h3>Problém "dvou světů"</h3>
      <p>Největším rizikem hybridní práce je vznik propasti mezi lidmi v kanceláři a těmi na dálku. Lidé v kanceláři mají přirozený přístup k neformálním informacím ("u kávovaru"), zatímco ti doma se mohou cítit izolovaní. Klíčem je digitální inkluze – každý proces, schůzka i oslava úspěchu musí být přístupná digitálně stejnou měrou.</p>

      <h3>Záměrnost namísto náhody</h3>
      <p>Kultura v hybridním prostředí už nemůže být náhodným výsledkem společného pobytu v jedné budově. Musí být vědomě budována. To znamená plánované online teambuildingy, pravidelné 1-na-1 schůzky zaměřené nejen na úkoly, ale i na pocity, a transparentní komunikaci v digitálních kanálech.</p>

      <h3>Technologie jako most</h3>
      <p>V Team Octopus využíváme pokročilé platformy pro spolupráci, které umožňují asynchronní práci bez ztráty kontextu. Technologie nám pomáhají udržovat přehled o cílech a zároveň umožňují neformální interakci, která je pro zdravý tým nezbytná.</p>

      <h3>Důvěra jako základní kámen</h3>
      <p>Hybridní práce definitivně pohřbila styl řízení založený na kontrole přítomnosti u stolu. Personalistika a management se musí orientovat na výsledky a výstupy. Základem je důvěra – věřit svým lidem, že dělají maximum bez ohledu na to, kde se právě nacházejí.</p>

      <h3>Závěr</h3>
      <p>Hybridní model není hrozbou pro kulturu, ale příležitostí ji přehodnotit a postavit na pevných základech důvěry a svobody. Firmy, které tento přechod zvládnou, získají přístup k talentům bez hranic a vytvoří odolnější a spokojenější týmy.</p>
    `
  }
];
