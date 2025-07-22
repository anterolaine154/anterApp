import { createContext, useContext } from 'react';
import type { ModalProps } from './modal.types';

type ModalContextType = Omit<ModalProps, 'children'>;

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider. Wrap your components with <Modal />.');
  }
  return context;
};

export { ModalContext, useModalContext };
