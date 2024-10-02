import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ModalContentProps, ModalFooterProps, ModalProps } from '@/interfaces/modal';
import { ReactChildrenProp } from '@/interfaces/utils';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleX } from 'lucide-react';

export const Modal = ({ children, onOpenChange, open }: Readonly<ModalProps>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const ModalTrigger = ({ children }: Readonly<ReactChildrenProp>) => <DialogTrigger asChild>{children}</DialogTrigger>;
const ModalContent = ({
  children,
  classnames,
  showOverlay = true,
  modalTitle,
  animation,
}: Readonly<ModalContentProps>) => {
  return (
    <AnimatePresence>
      <DialogContent
        showOverlay={showOverlay}
        className={cn('top-20 translate-y-0 rounded-none border-none p-0 shadow-none', classnames)}
      >
        <motion.div
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ cubicBezier: [0.4, 0, 0.2, 1], duration: animation.duration }}
          className="rounded-lg border bg-white p-6 shadow-lg"
        >
          <DialogHeader>
            <DialogTitle className="mb-4 font-bold">{modalTitle}</DialogTitle>
          </DialogHeader>
          {children}
        </motion.div>
      </DialogContent>
    </AnimatePresence>
  );
};

const ModalFooter = ({ children, modalCloseText }: Readonly<ModalFooterProps>) => {
  return (
    <DialogFooter className="mt-4">
      {children}
      <DialogClose asChild>
        <Button variant="destructive" className="flex items-center gap-1">
          <CircleX size={18} />
          {modalCloseText}
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
