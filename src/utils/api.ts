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
