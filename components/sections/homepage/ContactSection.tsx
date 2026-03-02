"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { getContactSection } from "@/sanity/lib/getContactSection";
import { useForm } from "react-hook-form";
import { useState } from "react";
const ContactInput = ({ error, className, ...props }: any) => (
  <input
    {...props}
    className={`w-full rounded-2xl border bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-300 focus:ring-4 focus:outline-none ${
      error
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-primary focus:ring-primary/5"
    } ${className ?? ""}`}
  />
);

const ContactTextarea = ({ error, className, ...props }: any) => (
  <textarea
    {...props}
    className={`w-full rounded-2xl border bg-white px-5 py-3 text-sm font-medium text-slate-700 transition-all duration-300 focus:ring-4 focus:outline-none min-h-[180px] resize-none ${
      error
        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-primary focus:ring-primary/5"
    } ${className ?? ""}`}
  />
);

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations("ContactSection");
  const { data } = useQuery({
    queryKey: ["contactSection", locale],
    queryFn: () => getContactSection(locale),
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const values = watch();

  const onSubmit = async (formValues: ContactFormValues) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Failed to send contact request.");
      }
      setStatus("success");
      reset();
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-10 lg:px-18 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            {data?.subtitle ?? t("subtitle")}
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-secondary">
            {data?.title ?? t("title")}{" "}
            <span className="text-primary">
              {data?.highlight ?? t("highlight")}
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            {data?.description ?? t("description")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto rounded-[2.5rem] bg-white p-8 md:p-12 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)] border border-slate-200"
          >
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ContactInput
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder={data?.form?.name ?? t("form.name")}
                  error={errors.name}
                  {...register("name", { required: true })}
                  required
                />
                <ContactInput
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder={data?.form?.email ?? t("form.email")}
                  error={errors.email}
                  {...register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  required
                />
              </div>

              <ContactInput
                type="tel"
                name="phone"
                value={values.phone}
                placeholder={data?.form?.phone ?? t("form.phone")}
                error={errors.phone}
                {...register("phone")}
              />

              <ContactTextarea
                name="message"
                value={values.message}
                placeholder={data?.form?.message ?? t("form.message")}
                error={errors.message}
                {...register("message", { required: true })}
                required
              />
            </div>

            <div className="mt-10 flex flex-col items-center">
              <button
                type="submit"
                disabled={status === "loading" || isSubmitting}
                className="relative inline-flex items-center justify-center gap-3 rounded-full border border-primary px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-secondary transition-all hover:bg-primary hover:text-white disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {status === "loading" || isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </motion.div>
                  ) : status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Sent!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3"
                    >
                      {data?.form?.button ?? t("form.button")}
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-4 text-sm font-medium text-emerald-600 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {data?.success ?? t("success")}
                </motion.p>
              )}

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-4 text-sm font-medium text-red-600 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
