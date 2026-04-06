import React from "react";
import styles from "./LegalPages.module.css";
const PrivacyPolicy = () => {
  return (
    <div className={styles.legalContainer}>
      <h1 className={styles.legalTitle}>Privacy Policy</h1>
      <p className={styles.legalDate}>
        <strong>Last Updated:</strong> April 6, 2026
      </p>
      <hr className={styles.legalDivider} />

      <section className={styles.legalSection}>
        <h3>1. Information We Collect</h3>
        <p>
          We only collect essential information required to process your orders,
          such as your name, email address, shipping address, and phone number.
        </p>
      </section>

      <section className={styles.legalSection}>
        <h3>2. How We Use Your Data</h3>
        <p>
          Your data is used strictly for order fulfillment, account management,
          and providing customer support. We do not sell or rent your personal
          information to third parties.
        </p>
      </section>

      <section className={styles.legalSection}>
        <h3>3. Data Security</h3>
        <p>
          We implement a variety of security measures, including SSL encryption,
          to maintain the safety of your personal information.
        </p>
      </section>

      <div className={styles.legalNotice}>
        <p>
          <strong>Note:</strong> This website is a{" "}
          <strong>Portfolio Project Demo</strong>. No real personal data is
          being processed, and no actual commercial transactions take place.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
