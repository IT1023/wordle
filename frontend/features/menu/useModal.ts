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
    /* ----------------------------- Focusable Elements ----------------------------- */
    const FOCUSABLE_ELEMENTS = [
      "a[href]",
      "button:not([disabled])",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const focusables = Array.from(
      modal.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
    ).filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
    );

    /* ----------------------------- First element focus ----------------------------- */
    focusables[0]?.focus();
    /* ----------------------------- Focus trap ----------------------------- */
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !modal.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }
    };
    modal.addEventListener("click", openModal);
    modal.addEventListener("keydown", handleFocusTrap);
    window.addEventListener("click", onClickOutside);
    window.addEventListener("keydown", onEscapeKey);
    return () => {
      modal.removeEventListener("click", openModal);
      modal.removeEventListener("keydown", handleFocusTrap);
      window.removeEventListener("click", onClickOutside);
      window.removeEventListener("keydown", onEscapeKey);
    };
  }, [isOpen]);

  return { isOpen, triggerRef, modalRef, openModal };
}
