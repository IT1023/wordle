import { useTranslation } from "react-i18next";
import useModal from "./useModal";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  trigger: React.ReactNode;
  modal: React.ReactNode;
  modalKey?: string;
}

export default function Modal({
  trigger,
  modal,
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
      {isOpen && (
        <AnimatePresence>
          <motion.div
            ref={modalRef}
            className="absolute top-0 left-0 min-w-100 h-screen bg-[#f7f7f7] dark:bg-[#1B1B1B]"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {modal}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
