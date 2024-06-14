import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
