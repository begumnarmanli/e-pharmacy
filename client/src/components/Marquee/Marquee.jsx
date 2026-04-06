import React from "react";
import styles from "./Marquee.module.css";
import lightningIcon from "../../assets/icons/icon-lightning.svg";

const Marquee = () => {
  const items = [
    "Take user orders form online",
    "Create your shop profile",
    "Manage your store",
    "Get more orders",
    "Storage shed",
  ];

  const content = items.map((item, i) => (
    <div key={i} className={styles.item}>
      <img src={lightningIcon} alt="icon" />
      <span>{item}</span>
    </div>
  ));

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <div className={styles.content}>
          {content}
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
