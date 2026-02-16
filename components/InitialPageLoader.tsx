"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type InitialPageLoaderProps = {
  children: React.ReactNode;
};

const EASE_OUT = [0.22, 1, 0.36, 1];

export default function InitialPageLoader({
  children,
}: InitialPageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("helpest-initial-load");

    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    sessionStorage.setItem("helpest-initial-load", "true");

    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="initial-loader"
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 3, ease: EASE_OUT },
            }}
            role="status"
            aria-live="polite"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#0b1f1b] via-[#092a24] to-black"
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,75,28,0.25),_transparent_55%)]" />

            <motion.div
              className="relative z-10 px-6 text-center text-white"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <motion.div
                className="mx-auto mb-6 h-20 w-20 rounded-full border border-white/25"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(249,75,28,0.0)",
                    "0 0 35px rgba(249,75,28,0.45)",
                    "0 0 0 rgba(249,75,28,0.0)",
                  ],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.p
                className="text-3xl font-semibold sm:text-4xl md:text-5xl"
                style={{ textShadow: "0 18px 40px rgba(0, 0, 0, 0.35)" }}
              >
                Restoring Dignity.
                <span className="mt-2 block">Rebuilding Hope.</span>
              </motion.p>

              <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-[#f94b1c]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease: EASE_OUT }}
                />
              </div>

              <motion.div
                className="mt-5 flex items-center justify-center gap-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Loading
                <motion.span
                  className="inline-flex gap-1"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div aria-hidden={isLoading}>{children}</div>
    </>
  );
}
