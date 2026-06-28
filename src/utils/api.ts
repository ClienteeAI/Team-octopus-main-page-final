export const CONSUMER_DOMAINS = [
  "gmail.com",
  "seznam.cz",
  "centrum.cz",
  "email.cz",
  "atlas.cz",
  "volny.cz",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "me.com",
  "msn.com",
  "live.com"
];

export const isCorporateEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !CONSUMER_DOMAINS.includes(domain);
};

export const submitToWebhook = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: "main-web",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit form");
  }

  return response.json();
};

// Odeslání do CRM webhooku v rámci nákupního flow.
// Když URL není nastavená (viz config/integrations.ts), request se přeskočí a jen zaloguje,
// aby šlo UX otestovat ještě před dodáním reálných webhooků.
export const submitToCrm = async (url: string, data: any) => {
  if (!url) {
    console.warn("[checkout] CRM webhook URL není nastavená – odeslání přeskočeno.", data);
    return { skipped: true };
  }

  const body = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString(),
    source: "main-web",
  });

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch (networkErr) {
    // Síťová/CORS chyba (LeadConnector webhook často nevrací CORS hlavičky pro čtení odpovědi).
    // Fire-and-forget fallback: request projde, jen nepřečteme odpověď.
    console.warn("[checkout] přímý fetch selhal, zkouším no-cors fallback.", networkErr);
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body,
    });
    return { ok: true, opaque: true };
  }

  if (!response.ok) {
    throw new Error("CRM webhook failed: " + response.status);
  }

  // CRM webhook může vrátit prázdné tělo.
  try {
    return await response.json();
  } catch {
    return { ok: true };
  }
};
