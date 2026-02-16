"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  const t = useTranslations("ContactSection");
  const [status, setStatus] = useState<"idle" | "success">("idle");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("success");
    setFormData({ name: "", email: "", phone: "", message: "" });
    window.setTimeout(() => setStatus("idle"), 3000);
  };

  const contactItems = [
    {
      icon: Mail,
      label: t("details.email.label"),
      value: t("details.email.value"),
    },
    {
      icon: Phone,
      label: t("details.phone.label"),
      value: t("details.phone.value"),
    },
    {
      icon: MapPin,
      label: t("details.address.label"),
      value: t("details.address.value"),
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#f7f7f7] relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          <div>
            <SectionHeading
              subtitle={t("subtitle")}
              title={t("title")}
              highlight={t("highlight")}
              centered={false}
              className="!mb-6"
            />
            <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
              {t("description")}
            </p>

            <div className="mt-10 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm border border-slate-100"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="text-slate-700 font-semibold">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-[2.5rem] bg-white p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-slate-100"
          >
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("form.name")}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.email")}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("form.phone")}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.message")}
                rows={5}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-secondary"
              >
                {t("form.button")}
                <Send className="h-4 w-4" />
              </button>

              {status === "success" && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-semibold text-primary"
                >
                  {t("success")}
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
