"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { getContactSection } from "@/sanity/lib/getContactSection";

const ContactInfoItem = ({ icon: Icon, title, detail, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/50 transition-colors duration-300"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
        {title}
      </h4>
      <p className="text-slate-600 leading-relaxed">{detail}</p>
    </div>
  </motion.div>
);

const FloatingInput = ({ label, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div className="relative group">
      <label
        className={`absolute left-5 transition-all duration-200 pointer-events-none ${
          isFocused || hasValue
            ? "-top-6 text-lg font-bold text-primary bg-white px-2 py-0.5 rounded-md "
            : "top-4 text-slate-400 text-sm"
        }`}
      >
        {label}
      </label>
      {props.type === "textarea" ? (
        <textarea
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-2 text-sm font-medium text-slate-700 placeholder:black transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none min-h-[150px] resize-none"
        />
      ) : (
        <input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full rounded-2xl border placeholder:black border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-2 text-sm font-medium text-slate-700 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none"
        />
      )}
    </div>
  );
};

export default function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations("ContactSection");
  const { data } = useQuery({
    queryKey: ["contactSection", locale],
    queryFn: () => getContactSection(locale),
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "" });
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-10 lg:px-18 bg-[#fcfcfd] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* Left Column: Content & Info */}
          <div className="space-y-10">
            <div>
              <SectionHeading
                subtitle={data?.subtitle ?? t("subtitle")}
                title={data?.title ?? t("title")}
                highlight={data?.highlight ?? t("highlight")}
                centered={true}
                className="!mb-6"
              />
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                {data?.description ?? t("description")}
              </p>
            </div>

            <div className="space-y-4">
              <ContactInfoItem
                icon={Mail}
                title={data?.info?.emailTitle ?? t("info.emailTitle")}
                detail={data?.info?.emailDetail ?? t("info.emailDetail")}
                delay={0.1}
              />
              <ContactInfoItem
                icon={MapPin}
                title={data?.info?.visitTitle ?? t("info.visitTitle")}
                detail={data?.info?.visitDetail ?? t("info.visitDetail")}
                delay={0.2}
              />
              <ContactInfoItem
                icon={Clock}
                title={data?.info?.hoursTitle ?? t("info.hoursTitle")}
                detail={data?.info?.hoursDetail ?? t("info.hoursDetail")}
                delay={0.3}
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Form Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-secondary/10 blur-2xl rounded-[3rem] -z-10" />

            <form
              onSubmit={handleSubmit}
              className="rounded-[2.5rem] bg-white p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100"
            >
              <div className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingInput
                    label={data?.form?.name ?? t("form.name")}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    label={data?.form?.email ?? t("form.email")}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <FloatingInput
                  label={data?.form?.phone ?? t("form.phone")}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <FloatingInput
                  label={data?.form?.message ?? t("form.message")}
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-10 py-5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-primary hover:shadow-xl hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
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
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
