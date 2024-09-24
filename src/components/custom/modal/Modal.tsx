import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  ModalContentProps,
  ModalFooterProps,
  ModalProps,
} from "@/interfaces/modal";
import { ReactChildrenProp } from "@/interfaces/utils";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";

export const Modal = ({
  children,
  onOpenChange,
  open,
}: Readonly<ModalProps>) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const ModalTrigger = ({ children }: Readonly<ReactChildrenProp>) => (
  <DialogTrigger asChild>{children}</DialogTrigger>
);

const ModalContent = ({
  children,
  classnames,
  showOverlay = true,
  modalTitle,
}: Readonly<ModalContentProps>) => {
  return (
    <DialogContent
      showOverlay={showOverlay}
      className={cn("top-20 translate-y-0", classnames)}
    >
      <DialogHeader>
        <DialogTitle className="font-bold">{modalTitle}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

const ModalFooter = ({
  children,
  modalCloseText,
}: Readonly<ModalFooterProps>) => {
  return (
    <DialogFooter>
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
