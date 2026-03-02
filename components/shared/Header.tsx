"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "./TopBar";
import Navbar from "./Navbar";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const isDarkHeaderPage =
    pathname?.includes("/blog") ||
    pathname?.includes("/projects") ||
    pathname?.includes("/gallery");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Initial Header (Static/Absolute) */}
      <div className="absolute top-0 left-0 w-full z-50">
        <TopBar />
        <Navbar isSticky={isDarkHeaderPage} />
      </div>

      {/* Sticky Header (Fixed on Scroll) */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full z-[100]"
          >
            <Navbar isSticky={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
