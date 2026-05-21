import { useSelector } from "react-redux";
import { selectToasts } from "./toast.slice";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

export default function Toast() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const toasts = useSelector(selectToasts);

  return createPortal(
    <div
      className={`absolute w-full ${lang === "en" ? "max-w-85" : "max-w-95"} mx-auto top-12 left-[50%] translate-x-[-50%] flex flex-col gap-2`}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          return (
            <motion.div
              key={toast.id}
              role="status"
              className="w-full h-12 px-4 py-2 rounded-md z-9999 bg-gray-300 dark:bg-gray-700 text-black dark:text-white flex justify-center items-center font-mono font-bold italic"
              initial={{ opacity: 0, x: 0, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {t(`errors.${toast.error}`)}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
