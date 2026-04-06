import React from "react";
import styles from "./ConfirmModal.module.css";
import iconClose from "../../assets/icons/icon-close.svg";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onCancel}>
          <img src={iconClose} alt="Close" />
        </button>
        <h2 className={styles.title}>Log out</h2>
        <p className={styles.subtitle}>Are you sure you want to log out?</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
