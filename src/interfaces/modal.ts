import React from 'react';
import { ReactChildrenProp } from './utils';

export interface ModalProps extends ReactChildrenProp {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalContentProps extends ReactChildrenProp {
  showOverlay: boolean;
  modalTitle: string;
  classnames?: string;
  animation: {
    initial: object;
    animate: object;
    exit: object;
    duration: number;
  };
}

export interface ModalFooterProps extends Partial<ReactChildrenProp> {
  modalCloseText: string;
}
