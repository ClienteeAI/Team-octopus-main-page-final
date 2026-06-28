// Katalog balíčků = jediný zdroj pravdy pro cenu, počet kreditů a platební link.
// Pozn.: `credits` = počet vyhodnocení / kandidátů, který se posílá do CRM a dál
// do RTM Lab jako `credits` (viz rtm-labs-partner-api).

export interface CheckoutPackage {
  id: "start" | "business" | "performance";
  name: string;
  /** Cena v Kč jako číslo (pro CRM/analytiku). */
  priceCzk: number;
  /** Cena pro zobrazení uživateli. */
  priceLabel: string;
  /** Počet vyhodnocení/kandidátů = RTM credits. */
  credits: number;
  /** FastPayDirect platební link pro tento balíček. */
  paymentLink: string;
}

export const PACKAGES: Record<CheckoutPackage["id"], CheckoutPackage> = {
  start: {
    id: "start",
    name: "START",
    priceCzk: 5985,
    priceLabel: "5 985 Kč",
    credits: 15,
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a1d34b303b17c94f5713dc2",
  },
  business: {
    id: "business",
    name: "BUSINESS",
    priceCzk: 12915,
    priceLabel: "12 915 Kč",
    credits: 35,
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a1d350003b17c94f5713dc3",
  },
  performance: {
    id: "performance",
    name: "PERFORMANCE",
    priceCzk: 27920,
    priceLabel: "27 920 Kč",
    credits: 80,
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a1d35185a9093aac76c5571",
  },
};
