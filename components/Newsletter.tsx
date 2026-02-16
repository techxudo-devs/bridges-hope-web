"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "./SectionHeading";

export default function Newsletter() {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <SectionHeading
              subtitle={t("subtitle")}
              title={t("title")}
              highlight={t("highlight")}
              centered={false}
              dark={true}
              className="!mb-0"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="relative group lg:max-w-xl lg:ml-auto"
            >
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary transition-colors">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder")}
                    className="w-full bg-white/5 border border-white/20 px-16 py-5 rounded-[2rem] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-white text-white hover:text-primary px-10 py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95"
                >
                  {t("button")}
                  <Send size={16} />
                </button>
              </div>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-primary font-bold flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {t("success")}
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
