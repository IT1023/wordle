import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import useModal from "./useModal";

interface ModalProps {
  trigger: React.ReactNode;
  component: React.ReactNode;
  modalLabel?: string;
}

export default function Modal({
  trigger,
  component,
  modalLabel = "openMenu",
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
        role="button"
        aria-label={t(`${modalLabel}`)}
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
