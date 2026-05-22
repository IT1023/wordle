import { useTranslation } from "react-i18next";
import useModal from "./useModal";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  trigger: React.ReactNode;
  component: React.ReactNode;
  modalKey?: string;
}

export default function Modal({
  trigger,
  component,
  modalKey = "openMenu",
}: ModalProps) {
  const { isOpen, modalRef, triggerRef, openModal } = useModal();
  const { t } = useTranslation("");

  const onEnterKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    openModal();
  };

  return (
    <>
      <div
        className="w-fit h-fit"
        ref={triggerRef}
        onClick={openModal}
        onKeyDown={onEnterKey}
        tabIndex={0}
        aria-label={t(`${modalKey}`)}
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className="w-full overflow-hidden rounded-r-2xl absolute top-0 left-0 max-w-100 h-screen bg-[#f7f7f7] dark:bg-[#1B1B1B]"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {component}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
