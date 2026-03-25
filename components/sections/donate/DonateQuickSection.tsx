"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronRight, MessageCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchDonateQuickPage } from "@/lib/api/campaigns";
import { urlFor } from "@/sanity/lib/image";

type DonateQuickSectionProps = {
  locale: string;
};

type PaymentMethod = {
  key: string;
  label: string;
  href: string;
  detail?: string;
};

const fallbackWidget = {
  leftMessage: "A little from you can do a lot for others.",
  amountTitle: "Choose donation amount",
  currencySymbol: "₺",
  defaultAmount: 50,
  amountOptions: [20, 50, 100],
  otherLabel: "Other",
  confirmButtonLabel: "Confirm Donation",
  modalTitle: "Confirm Donation",
  totalLabel: "Total Donation",
  modalConfirmButtonLabel: "Go to Payment",
  paymentMethods: [
    {
      key: "creditCard",
      label: "Credit Card (ATM as usual)",
      href: "https://example.com/donate?amount={amount}",
    },
    {
      key: "whatsapp",
      label: "Whatsapp",
      href: "https://wa.me/9050163666641?text=I%20want%20to%20donate%20{amount}%20TRY",
    },
    {
      key: "bankTransfer",
      label: "Bank Transfer",
      href: "",
      detail: "Bank: Türkiye Vakıflar Bankası\nBranch: Vatan Caddesi İstanbul\nSWIFT: TVBATR2A\nAccount: Umut Köprüleri Gelişim ve Rehabilitasyon Derneği\n\n$ USD\nTR15 0001 5001 5804 8017 4949 00\n\n€ EUR\nTR86 0001 5001 5804 8017 4841 16\n\n₺ TRY\nTR96 0001 5001 5800 7308 4781 52",
    },
  ] as PaymentMethod[],
};

const DonateQuickSection = ({ locale }: DonateQuickSectionProps) => {
  const { data: donatePageData } = useQuery({
    queryKey: ["donateQuickPage", locale],
    queryFn: () => fetchDonateQuickPage(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const widget = useMemo(() => {
    const apiWidget = donatePageData;

    const paymentMethods =
      apiWidget?.paymentMethods
        ?.map((method) => ({
          key: method.key || "",
          label: method.label || "",
          href: method.href || "",
          detail: method.detail || "",
        }))
        .filter((method) => method.key && method.label) ||
      fallbackWidget.paymentMethods;

    return {
      leftImage: apiWidget?.leftImage,
      leftMessage: apiWidget?.leftMessage || fallbackWidget.leftMessage,
      amountTitle: apiWidget?.amountTitle || fallbackWidget.amountTitle,
      currencySymbol:
        apiWidget?.currencySymbol || fallbackWidget.currencySymbol,
      defaultAmount: apiWidget?.defaultAmount || fallbackWidget.defaultAmount,
      amountOptions:
        apiWidget?.amountOptions?.length >= 3
          ? apiWidget.amountOptions
          : fallbackWidget.amountOptions,
      otherLabel: apiWidget?.otherLabel || fallbackWidget.otherLabel,
      confirmButtonLabel:
        apiWidget?.confirmButtonLabel || fallbackWidget.confirmButtonLabel,
      modalTitle: apiWidget?.modalTitle || fallbackWidget.modalTitle,
      totalLabel: apiWidget?.totalLabel || fallbackWidget.totalLabel,
      modalConfirmButtonLabel:
        apiWidget?.modalConfirmButtonLabel ||
        fallbackWidget.modalConfirmButtonLabel,
      paymentMethods,
    };
  }, [donatePageData]);

  const [amount, setAmount] = useState<number>(widget.defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    widget.paymentMethods[0]?.key || "creditCard",
  );

  useEffect(() => {
    setAmount(widget.defaultAmount);
    setSelectedMethod(widget.paymentMethods[0]?.key || "creditCard");
    setIsCustom(false);
    setCustomAmount("");
  }, [widget.defaultAmount, widget.paymentMethods]);

  const selectedPaymentMethod =
    widget.paymentMethods.find((method) => method.key === selectedMethod) ||
    widget.paymentMethods[0];

  const imageUrl = widget.leftImage
    ? urlFor(widget.leftImage).width(1200).quality(80).url()
    : "/hero-1.webp";

  const resolvedAmount = isCustom
    ? Number.parseFloat(customAmount || "0") || 0
    : amount;

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod) return;

    if (selectedPaymentMethod.key === "whatsapp") {
      const phoneMatch = selectedPaymentMethod.href.match(/wa\.me\/(\d+)/);
      const phone = phoneMatch ? phoneMatch[1] : "905016366641";
      const waMessages: Record<string, string> = {
        ar: `أريد التبرع بمبلغ ${resolvedAmount} ${widget.currencySymbol}`,
        tr: `${resolvedAmount} ${widget.currencySymbol} bağış yapmak istiyorum`,
        en: `I want to donate ${resolvedAmount} ${widget.currencySymbol}`,
      };
      const text = waMessages[locale] ?? waMessages.en;
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }

    if (!selectedPaymentMethod.href) return;

    const href = selectedPaymentMethod.href.replace(
      "{amount}",
      String(resolvedAmount),
    );

    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl min-h-[320px]">
              <img
                src={imageUrl}
                alt={widget.leftMessage}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-white/60" />
              <div className="relative z-10 flex h-full items-center justify-center p-10 text-center">
                <h3 className="text-3xl font-cairo font-bold text-secondary max-w-md">
                  {widget.leftMessage}
                </h3>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f2f2f4] p-6 md:p-8">
              <h3 className="text-4xl font-cairo font-bold text-secondary">
                {widget.amountTitle}
              </h3>

              <div className="mt-6 flex items-center rounded-full bg-white px-4 py-3">
                <span className="mr-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-black text-white">
                  {widget.currencySymbol}
                </span>
                {isCustom ? (
                  <input
                    type="number"
                    min={1}
                    value={customAmount}
                    onChange={(event) => setCustomAmount(event.target.value)}
                    className="w-full bg-transparent text-3xl font-semibold text-slate-800 outline-none"
                    placeholder="0"
                  />
                ) : (
                  <span className="text-3xl font-semibold text-slate-800">
                    {amount}
                  </span>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {widget.amountOptions.map((option) => {
                  const isActive = !isCustom && option === amount;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setAmount(option);
                        setIsCustom(false);
                      }}
                      className={`rounded-full px-4 py-2.5 text-lg font-black transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-white text-secondary hover:bg-primary/10"
                      }`}
                    >
                      {widget.currencySymbol}
                      {option}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    setIsCustom(true);
                    setCustomAmount("");
                  }}
                  className={`rounded-full px-4 py-2.5 text-lg font-black transition-colors ${
                    isCustom
                      ? "bg-primary text-white"
                      : "bg-white text-secondary hover:bg-primary/10"
                  }`}
                >
                  {widget.otherLabel}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xl font-black text-white transition-all hover:opacity-90"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
                  <ChevronRight size={20} />
                </span>
                {widget.confirmButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-5xl rounded-xl bg-white p-5 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h4 className="text-4xl font-cairo font-bold text-slate-800">
                {widget.modalTitle}
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={28} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
              {widget.paymentMethods.map((method) => {
                const isActive = selectedMethod === method.key;

                return (
                  <button
                    key={method.key}
                    type="button"
                    onClick={() => setSelectedMethod(method.key)}
                    className="inline-flex items-center gap-3 font-bold text-secondary"
                  >
                    <span
                      className={`h-5 w-5 rounded-full border border-secondary/70 ${
                        isActive ? "bg-primary" : "bg-white"
                      }`}
                    />
                    {method.key === "whatsapp" ? (
                      <MessageCircle size={16} className="text-green-600" />
                    ) : null}
                    {method.label}
                  </button>
                );
              })}
            </div>

            {selectedPaymentMethod?.key === "bankTransfer" &&
            selectedPaymentMethod?.detail ? (
              <div className="mx-auto mt-6 max-w-2xl rounded-md border border-slate-200 bg-slate-50 p-4">
                <pre className="whitespace-pre-wrap text-sm font-semibold text-slate-700 text-start font-cairo">
                  {selectedPaymentMethod.detail}
                </pre>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPaymentMethod.detail ?? "");
                    setCopiedIban(true);
                    setTimeout(() => setCopiedIban(false), 2000);
                  }}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition-colors"
                >
                  {copiedIban ? "✓ Copied!" : "Copy IBAN"}
                </button>
              </div>
            ) : null}

            <div className="mx-auto mt-8 max-w-xl rounded-md border border-slate-200 p-8 text-center">
              <p className="text-4xl text-slate-800 font-cairo font-semibold">
                {widget.totalLabel}:{" "}
                <span className="text-green-600">{resolvedAmount} TRY</span>
              </p>
            </div>

            {selectedPaymentMethod?.key === "whatsapp" ? (
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="mx-auto mt-8 flex w-full max-w-2xl items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-xl font-black text-white hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {(() => {
                  const waMessages: Record<string, string> = {
                    ar: `أريد التبرع بمبلغ ${resolvedAmount} ${widget.currencySymbol}`,
                    tr: `${resolvedAmount} ${widget.currencySymbol} bağış yapmak istiyorum`,
                    en: `I want to donate ${resolvedAmount} ${widget.currencySymbol}`,
                  };
                  return waMessages[locale] ?? waMessages.en;
                })()}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="mx-auto mt-7 flex w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xl font-black text-white hover:opacity-95"
              >
                {widget.modalConfirmButtonLabel}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default DonateQuickSection;
