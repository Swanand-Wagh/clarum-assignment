'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface CustomModalTitleProps {
  modalTitle: string;
  modalDescription?: string;
}

export const CustomModalTitle: React.FC<Readonly<CustomModalTitleProps>> = ({ modalTitle, modalDescription }) => {
  return (
    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
      <h2 className="mb-4 text-lg font-bold leading-none tracking-tight">{modalTitle}</h2>
      {modalDescription && <p className="text-sm text-muted-foreground">{modalDescription}</p>}
    </div>
  );
};

interface CustomModalFooterProps {
  children?: React.ReactNode;
  onClose: () => void;
}

export const CustomModalFooter: React.FC<Readonly<CustomModalFooterProps>> = ({ children, onClose }) => {
  return (
    <div className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      {children ?? null}
      <Button variant="destructive" type="button" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-x mr-1"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m15 9-6 6"></path>
          <path d="m9 9 6 6"></path>
        </svg>
        Close
      </Button>
    </div>
  );
};

interface CustomModalContentProps extends CustomModalTitleProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classnames?: string;
  animationVariants: {
    hidden: object;
    visible: object;
    exit: object;
  };
}

export const CustomModalContent: React.FC<Readonly<CustomModalContentProps>> = ({
  modalTitle,
  modalDescription,
  open: isOpen,
  onClose,
  children,
  classnames,
  animationVariants,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const focusedElementBeforeModal = useRef<HTMLElement | null>(null);

  const getFocusableElements = (container: HTMLElement | Document) => {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );
  };

  useEffect(() => {
    if (isOpen) {
      focusedElementBeforeModal.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      const backgroundFocusableElements = getFocusableElements(document).filter(
        (el) => !modalRef.current?.contains(el)
      );

      backgroundFocusableElements.forEach((el) => el.setAttribute('tabindex', '-1'));
      modalRef.current?.focus();

      document.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
      const backgroundFocusableElements = getFocusableElements(document).filter(
        (el) => !modalRef.current?.contains(el)
      );
      backgroundFocusableElements.forEach((el) => el.removeAttribute('tabindex'));
      focusedElementBeforeModal.current?.focus();

      document.removeEventListener('keydown', handleEscKey);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const trapFocus = (e: React.KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements?.[0];
    const lastFocusableElement = focusableElements?.[focusableElements.length - 1];

    if (!focusableElements || focusableElements.length === 0) return;

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement?.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-labelledby={modalTitle}
          aria-describedby={modalDescription}
          data-state={isOpen ? 'open' : 'closed'}
          data-aria-hidden={!isOpen}
          aria-hidden={!isOpen}
          onKeyDown={trapFocus}
          className={cn(
            'fixed left-1/2 top-20 z-50 grid w-full max-w-lg gap-4 rounded-lg border bg-white p-6 shadow-lg transition-transform duration-150',
            classnames
          )}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ ease: 'linear', duration: 0.08 }}
        >
          <CustomModalTitle modalTitle={modalTitle} modalDescription={modalDescription} />
          {children}
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onClose}
          >
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface CustomModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  showOverlay?: boolean;
}

export const CustomModal: React.FC<Readonly<CustomModalProps>> = ({
  children,
  open: isOpen,
  onClose,
  showOverlay = true,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <React.Fragment>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-state={isOpen ? 'open' : 'closed'}
            data-aria-hidden={!isOpen}
            aria-hidden={!isOpen}
            className={cn('fixed inset-0 z-10 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', {
              'bg-black/25 backdrop-blur-sm': showOverlay,
            })}
            onClick={handleBackdropClick}
            initial={{ opacity: 0.75 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.75 }}
            transition={{ ease: 'easeInOut', duration: 0.075 }}
          ></motion.div>
        )}
      </AnimatePresence>
      {children}
    </React.Fragment>
  );
};
