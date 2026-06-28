import React, { useEffect, useState } from "react";
import {
  X,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Hash,
  Globe,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { submitToCrm } from "../../utils/api";
import {
  CRM_WEBHOOK_CREATE,
  CRM_WEBHOOK_UPDATE,
  buildPaymentUrl,
} from "../../config/integrations";
import type { CheckoutPackage } from "../../data/packages";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: CheckoutPackage | null;
}

type Step = "form" | "review" | "redirect";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "+420 ",
  companyName: "",
  ico: "",
  webpage: "",
  companyAddress: "",
};

export default function CheckoutModal({ isOpen, onClose, pkg }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [customerCode, setCustomerCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Unikátní kód zákazníka vygenerujeme jednou při otevření a držíme ho po celé flow.
  useEffect(() => {
    if (isOpen && !customerCode) {
      setCustomerCode(
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `oct-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      );
    }
  }, [isOpen, customerCode]);

  const resetAndClose = () => {
    onClose();
    // Reset až po doběhnutí zavírací animace.
    setTimeout(() => {
      setStep("form");
      setForm({ ...EMPTY_FORM });
      setCustomerCode("");
      setStatus("idle");
      setErrorMessage("");
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!pkg) return null;

  const buildPayload = (
    event: "registration" | "checkout_confirmed",
    paymentStatus: "pending" | "awaiting_payment",
  ) => ({
    customer_code: customerCode,
    event,
    payment_status: paymentStatus,
    package: {
      id: pkg.id,
      name: pkg.name,
      price_czk: pkg.priceCzk,
      credits: pkg.credits,
    },
    owner: {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      phone_number: form.phone.trim(),
      language: "cs",
    },
    company: {
      name: form.companyName.trim(),
      ico: form.ico.trim() || null,
      address: form.companyAddress.trim() || null,
      webpage: form.webpage.trim() || null,
    },
  });

  // Krok 1 -> CRM vytvoří zákazníka (pending), pak souhrn.
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");
    try {
      await submitToCrm(CRM_WEBHOOK_CREATE, buildPayload("registration", "pending"));
      setStatus("idle");
      setStep("review");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Nepodařilo se uložit údaje. Zkuste to prosím znovu.");
    }
  };

  // Krok 2 -> CRM update (awaiting_payment), pak platební brána.
  const handleConfirmAndPay = async () => {
    setErrorMessage("");
    setStatus("loading");
    try {
      await submitToCrm(
        CRM_WEBHOOK_UPDATE,
        buildPayload("checkout_confirmed", "awaiting_payment"),
      );
      const payUrl = buildPaymentUrl(pkg.paymentLink, {
        customerCode,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      });
      const width = 600;
      const height = 800;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        payUrl,
        "PaymentGateway",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
      );
      setStatus("idle");
      setStep("redirect");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Něco se nepovedlo. Zkuste to prosím znovu.");
    }
  };

  const inputClass =
    "w-full bg-octopus-cream border border-transparent rounded-2xl pl-14 pr-5 py-4 text-octopus-navy placeholder-octopus-navy/30 font-medium focus:outline-none focus:border-octopus-gold/40 transition-all";

  const summaryRow = (label: string, value: string) => (
    <div className="flex justify-between gap-6 py-3 border-b border-octopus-navy/5">
      <span className="text-octopus-navy/40 text-sm font-medium">{label}</span>
      <span className="text-octopus-navy font-semibold text-sm text-right">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-octopus-navy/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl my-8 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-octopus-navy/5"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-octopus-gold" />

            <button
              onClick={resetAndClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-octopus-cream flex items-center justify-center text-octopus-navy/50 hover:text-octopus-navy hover:bg-octopus-gold transition-all z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-12">
              {/* Hlavička s balíčkem */}
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-octopus-gold/10 text-octopus-gold text-[10px] font-bold uppercase tracking-widest border border-octopus-gold/20">
                  Balíček {pkg.name} · {pkg.credits} kandidátů
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-octopus-navy mt-5 tracking-tight">
                  {step === "review"
                    ? "Zkontrolujte si údaje"
                    : step === "redirect"
                      ? "Dokončete platbu"
                      : "Objednávka balíčku"}
                </h2>
                <p className="text-octopus-navy/50 font-medium mt-2">
                  {step === "review"
                    ? "Vše sedí? Potvrďte a přejděte k platbě. Údaje můžete ještě upravit."
                    : step === "redirect"
                      ? "V novém okně jsme otevřeli zabezpečenou platební bránu."
                      : "Vyplňte fakturační a kontaktní údaje. Cenu uvidíte před platbou."}
                </p>
              </div>

              {/* KROK 1 – FORMULÁŘ */}
              {step === "form" && (
                <form onSubmit={handleContinue} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="firstName" placeholder="Jméno *" required value={form.firstName} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="lastName" placeholder="Příjmení *" required value={form.lastName} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="email" type="email" placeholder="E-mail *" required value={form.email} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="phone" type="tel" placeholder="Telefon *" required value={form.phone} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="relative">
                    <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                    <input name="companyName" placeholder="Název společnosti *" required value={form.companyName} onChange={handleChange} className={inputClass} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="ico" placeholder="IČO" value={form.ico} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                      <input name="webpage" placeholder="Webová stránka" value={form.webpage} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-octopus-navy/20 w-5 h-5" />
                    <input name="companyAddress" placeholder="Adresa společnosti" value={form.companyAddress} onChange={handleChange} className={inputClass} />
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-sm font-bold text-center">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-octopus-navy text-white rounded-2xl py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={20} className="animate-spin" /> Ukládám...</>
                    ) : (
                      <>Pokračovat k souhrnu <ArrowRight size={18} /></>
                    )}
                  </button>

                  <p className="text-center text-octopus-navy/20 text-[10px] font-bold uppercase tracking-widest">
                    Odesláním souhlasíte se zpracováním osobních údajů.
                  </p>
                </form>
              )}

              {/* KROK 2 – SOUHRN */}
              {step === "review" && (
                <div className="space-y-6">
                  <div className="bg-octopus-cream/50 rounded-3xl p-6">
                    {summaryRow("Jméno", `${form.firstName} ${form.lastName}`.trim())}
                    {summaryRow("E-mail", form.email)}
                    {summaryRow("Telefon", form.phone)}
                    {summaryRow("Společnost", form.companyName)}
                    {summaryRow("IČO", form.ico)}
                    {summaryRow("Web", form.webpage)}
                    {summaryRow("Adresa", form.companyAddress)}
                  </div>

                  <div className="flex items-center justify-between bg-octopus-navy text-white rounded-3xl px-7 py-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        Balíček {pkg.name}
                      </div>
                      <div className="text-sm font-medium text-white/70 mt-1">
                        {pkg.credits} kandidátů k vyhodnocení
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold tracking-tight">{pkg.priceLabel}</div>
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-sm font-bold text-center">{errorMessage}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => { setErrorMessage(""); setStep("form"); }}
                      disabled={status === "loading"}
                      className="sm:w-auto px-8 bg-octopus-cream text-octopus-navy rounded-2xl py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-octopus-navy/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      <ArrowLeft size={18} /> Upravit údaje
                    </button>
                    <button
                      onClick={handleConfirmAndPay}
                      disabled={status === "loading"}
                      className="flex-1 bg-octopus-navy text-white rounded-2xl py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={20} className="animate-spin" /> Připravuji platbu...</>
                      ) : (
                        <><ShieldCheck size={18} /> Potvrdit a zaplatit</>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* KROK 3 – PŘESMĚROVÁNÍ NA PLATBU */}
              {step === "redirect" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-octopus-green/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-octopus-green" />
                  </div>
                  <p className="text-octopus-navy/60 font-medium leading-relaxed max-w-md mx-auto mb-8">
                    Otevřeli jsme platební bránu v novém okně. Pokud se neotevřela
                    (mohl ji zablokovat prohlížeč), klikněte na tlačítko níže.
                  </p>
                  <a
                    href={buildPaymentUrl(pkg.paymentLink, {
                      customerCode,
                      firstName: form.firstName.trim(),
                      lastName: form.lastName.trim(),
                      email: form.email.trim(),
                      phone: form.phone.trim(),
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-octopus-navy text-white rounded-2xl px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-octopus-gold hover:text-octopus-navy transition-all shadow-xl"
                  >
                    <ExternalLink size={18} /> Otevřít platbu ({pkg.priceLabel})
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
