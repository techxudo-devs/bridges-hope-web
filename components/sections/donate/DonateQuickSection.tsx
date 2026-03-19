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
      detail: "IBAN: TR00 0000 0000 0000 0000 0000 00",
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
    : "https://images.unsplash.com/photo-1509095087301-02c74a001b06?q=80&w=1200";

  const resolvedAmount = isCustom
    ? Number.parseFloat(customAmount || "0") || 0
    : amount;

  const handleConfirmPayment = () => {
    if (!selectedPaymentMethod?.href) return;

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
              <div className="mx-auto mt-6 max-w-2xl rounded-md border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  {selectedPaymentMethod.detail}
                </p>
              </div>
            ) : null}

            <div className="mx-auto mt-8 max-w-xl rounded-md border border-slate-200 p-8 text-center">
              <p className="text-4xl text-slate-800 font-cairo font-semibold">
                {widget.totalLabel}:{" "}
                <span className="text-green-600">{resolvedAmount} TRY</span>
              </p>
            </div>

            <p className="mt-6 text-center text-lg text-slate-500">
              {selectedPaymentMethod?.label}
            </p>

            <button
              type="button"
              onClick={handleConfirmPayment}
              className="mx-auto mt-7 flex w-full max-w-2xl items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xl font-black text-white hover:opacity-95"
            >
              {widget.modalConfirmButtonLabel}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default DonateQuickSection;
