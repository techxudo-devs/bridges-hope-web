"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronRight, MessageCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchDonateQuickPage } from "@/lib/api/campaigns";

type DonateQuickInlineProps = {
  locale: string;
  overrideDefaultAmount?: number;
  overrideAmountOptions?: number[];
};

type PaymentMethod = {
  key: string;
  label: string;
  href: string;
  detail?: string;
};

const fallbackWidget = {
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
      detail: "IBAN: TR00 0000 0000 0000 0000 0000 00",
    },
  ] as PaymentMethod[],
};

const DonateQuickInline = ({ locale, overrideDefaultAmount, overrideAmountOptions }: DonateQuickInlineProps) => {
  const { data } = useQuery({
    queryKey: ["donateQuickPage", locale],
    queryFn: () => fetchDonateQuickPage(locale),
    refetchInterval: 8000,
    refetchIntervalInBackground: true,
    retry: 1,
  });

  const widget = useMemo(() => {
    const paymentMethods =
      data?.paymentMethods
        ?.map((method) => ({
          key: method.key || "",
          label: method.label || "",
          href: method.href || "",
          detail: method.detail || "",
        }))
        .filter((method) => method.key && method.label) ||
      fallbackWidget.paymentMethods;

    return {
      amountTitle: data?.amountTitle || fallbackWidget.amountTitle,
      currencySymbol: data?.currencySymbol || fallbackWidget.currencySymbol,
      defaultAmount: overrideDefaultAmount ?? data?.defaultAmount ?? fallbackWidget.defaultAmount,
      amountOptions:
        overrideAmountOptions?.length && overrideAmountOptions.length >= 2
          ? overrideAmountOptions
          : data?.amountOptions?.length && data.amountOptions.length >= 3
          ? data.amountOptions
          : fallbackWidget.amountOptions,
      otherLabel: data?.otherLabel || fallbackWidget.otherLabel,
      confirmButtonLabel:
        data?.confirmButtonLabel || fallbackWidget.confirmButtonLabel,
      modalTitle: data?.modalTitle || fallbackWidget.modalTitle,
      totalLabel: data?.totalLabel || fallbackWidget.totalLabel,
      modalConfirmButtonLabel:
        data?.modalConfirmButtonLabel || fallbackWidget.modalConfirmButtonLabel,
      paymentMethods,
    };
  }, [data, overrideDefaultAmount, overrideAmountOptions]);

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
    <>
      <div className="mt-10 rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <h3 className="text-2xl md:text-3xl font-black text-secondary">
          {widget.amountTitle}
        </h3>

        <div className="mt-5 flex items-center rounded-full bg-slate-50 px-4 py-3">
          <span className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-xl font-black text-white">
            {widget.currencySymbol}
          </span>
          {isCustom ? (
            <input
              type="number"
              min={1}
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              className="w-full bg-transparent text-2xl font-semibold text-slate-800 outline-none"
              placeholder="0"
            />
          ) : (
            <span className="text-2xl font-semibold text-slate-800">{amount}</span>
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
                className={`rounded-full px-4 py-2.5 text-sm font-black transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-slate-50 text-secondary hover:bg-primary/10"
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
            className={`rounded-full px-4 py-2.5 text-sm font-black transition-colors ${
              isCustom
                ? "bg-primary text-white"
                : "bg-slate-50 text-secondary hover:bg-primary/10"
            }`}
          >
            {widget.otherLabel}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-black text-white transition-all hover:opacity-90"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
            <ChevronRight size={18} />
          </span>
          {widget.confirmButtonLabel}
        </button>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-5xl rounded-xl bg-white p-5 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h4 className="text-2xl md:text-3xl font-cairo font-bold text-slate-800">
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
              <p className="text-3xl text-slate-800 font-cairo font-semibold">
                {widget.totalLabel}: <span className="text-green-600">{resolvedAmount} TRY</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleConfirmPayment}
              className="mx-auto mt-7 flex w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black text-white hover:opacity-95"
            >
              {widget.modalConfirmButtonLabel}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DonateQuickInline;
