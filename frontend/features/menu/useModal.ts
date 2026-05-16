import { useEffect, useRef, useState, type RefObject } from "react";

interface UseModalReturn {
  isOpen: boolean;
  triggerRef: RefObject<HTMLDivElement | null>;
  modalRef: RefObject<HTMLDivElement | null>;
  openModal: () => void;
}

export default function useModal(): UseModalReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // TODO: Trap focus inside modal

  useEffect(() => {
    if (!modalRef.current || !triggerRef.current || !isOpen) return;
    const modal = modalRef.current!;
    const trigger = triggerRef.current!;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (modal.contains(target) || trigger.contains(target)) return;
      closeModal();
    };
    const onEscapeKey = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== "Escape") return;
      closeModal();
    };
    modal.addEventListener("click", openModal);
    window.addEventListener("click", onClickOutside);
    window.addEventListener("keydown", onEscapeKey);
    return () => {
      modal.removeEventListener("click", openModal);
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [isOpen]);

  return { isOpen, triggerRef, modalRef, openModal };
}
