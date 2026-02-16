"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type InitialPageLoaderProps = {
  children: React.ReactNode;
};

const panelTransition = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1],
};

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
    }, 2000);

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
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            role="status"
            aria-live="polite"
          >
            <div className="absolute inset-0 flex">
              <motion.div
                className="h-full w-1/2 bg-secondary"
                initial={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={panelTransition}
              />
              <motion.div
                className="h-full w-1/2 bg-primary"
                initial={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={panelTransition}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/25" />
            <div className="relative z-10 px-6 text-center">
              <motion.p
                className="text-3xl font-semibold text-black sm:text-4xl md:text-5xl"
                style={{ textShadow: "0 20px 40px rgba(9, 20, 18, 0.35)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.4 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Restoring Dignity.
                <span className="mt-2 block">Rebuilding Hope.</span>
              </motion.p>
              <motion.span
                className="mx-auto mt-6 block h-px w-24 bg-white/70"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div aria-hidden={isLoading}>{children}</div>
    </>
  );
}
