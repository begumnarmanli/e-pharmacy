import React from "react";
import styles from "./LegalPages.module.css";

const TermsConditions = () => {
  return (
    <div className={styles.legalContainer}>
      <h1 className={styles.legalTitle}>Terms & Conditions</h1>
      <p className={styles.legalDate}>
        <strong>Last Updated:</strong> April 6, 2026
      </p>
      <hr className={styles.legalDivider} />

      <section className={styles.legalSection}>
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using the E-Pharmacy platform, you agree to be bound
          by these terms and conditions. If you do not agree, please do not use
          our services.
        </p>
      </section>

      <section className={styles.legalSection}>
        <h3>2. Medical Disclaimer</h3>
        <p>
          The content provided on this site is for informational purposes only
          and is not intended as medical advice. Always seek the advice of a
          qualified healthcare provider regarding any medical condition.
        </p>
      </section>

      <section className={styles.legalSection}>
        <h3>3. Limitation of Liability</h3>
        <p>
          E-Pharmacy shall not be liable for any damages resulting from the use
          or inability to use the materials on this site.
        </p>
      </section>

      <div className={styles.legalNotice}>
        <p>
          <strong>Disclaimer:</strong> This is a <strong>Developer Demo</strong>
          . Products listed are for display purposes only. Orders placed will
          not be fulfilled.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
