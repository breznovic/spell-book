import React from "react";
import s from "./Modal.module.css";
import Button from "../Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h2>Notification</h2>
        <p>{message}</p>
        <div className={s.buttons}>
          {onConfirm && <Button onClick={onConfirm} title="Confirm" />}
          <Button onClick={onClose} title="Close" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
