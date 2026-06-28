// Napojení nákupního flow na CRM.
//
// Tok (bez n8n, web mluví jen s CRM):
//  1) Webhook 1 (CRM_WEBHOOK_CREATE)  – po vyplnění formuláře vytvoří zákazníka, status "pending".
//  2) Webhook 2 (CRM_WEBHOOK_UPDATE)  – po potvrzení souhrnu upraví zákazníka, status "awaiting_payment",
//     pak web přesměruje na FastPayDirect platební link.
//  3) Úspěch platby hlásí do CRM samotný FastPayDirect (NE tento web) – CRM podle `customer_code`
//     (předaného v platebním linku) přepne status na "success" a spustí RTM provisioning.
//
// CRM = LeadConnector (GoHighLevel) inbound webhooky.
// Webhook 1 – po vyplnění formuláře (vytvoření zákazníka, status "pending"), nese customer_code (UUID).
export const CRM_WEBHOOK_CREATE =
  "https://services.leadconnectorhq.com/hooks/1Xk9ipNiKsPEOxUjjsrN/webhook-trigger/2ae43dcd-c7e5-4da5-bbf5-47b8329a434a";
// Webhook 2 – po potvrzení souhrnu / změnách údajů (status "awaiting_payment"), STEJNÉ customer_code.
export const CRM_WEBHOOK_UPDATE =
  "https://services.leadconnectorhq.com/hooks/1Xk9ipNiKsPEOxUjjsrN/webhook-trigger/356598f8-e5e9-4ce8-8cc4-4aa2c4312d50";

// Předvyplnění platební stránky FastPayDirect + předání unikátního kódu pro párování v CRM.
// Názvy parametrů ověřené empiricky na FastPayDirect platebním linku (camelCase): firstName, lastName, email.
// `phone` je nejlepší odhad (testovací link pole telefon neměl) – pokud se nepředvyplní, nevadí, ignoruje se.
// `client_reference_id` = naše UUID pro spárování platby se zákazníkem v CRM.
export interface PaymentPrefill {
  customerCode: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export const buildPaymentUrl = (paymentLink: string, prefill: PaymentPrefill): string => {
  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", prefill.customerCode);
  if (prefill.firstName) url.searchParams.set("firstName", prefill.firstName);
  if (prefill.lastName) url.searchParams.set("lastName", prefill.lastName);
  if (prefill.email) url.searchParams.set("email", prefill.email);
  if (prefill.phone) url.searchParams.set("phone", prefill.phone);
  return url.toString();
};
