"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { BranchSelectorDialog } from "./branch-selector-dialog";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <BranchSelectorDialog customMessage="Halo, saya ingin bertanya tentang unit Apple.">
          <motion.button
            aria-label="Hubungi kami via WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/20 transition-colors hover:bg-brand-600 sm:bottom-6 sm:right-6"
          >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand-500/60 motion-reduce:hidden" />
            <WhatsAppIcon className="size-6" />
          </motion.button>
        </BranchSelectorDialog>
      )}
    </AnimatePresence>
  );
}
