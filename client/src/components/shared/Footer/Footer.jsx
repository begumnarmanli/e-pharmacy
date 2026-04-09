import React from "react";
import { Link } from "react-router-dom";
import logoFull from "../../../assets/icons/logo-full.svg";
import iconFacebook from "../../../assets/icons/icon-facebook.svg";
import iconInstagram from "../../../assets/icons/icon-instagram.svg";
import iconYoutube from "../../../assets/icons/icon-youtube.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainSection}>
          <div className={styles.leftCol}>
            <div className={styles.logoWrapper}>
              <img
                src={logoFull}
                alt="E-Pharmacy Logo"
                className={styles.logo}
              />
            </div>
            <p className={styles.slogan}>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </p>
          </div>

          <div className={styles.rightCol}>
            <nav className={styles.nav}>
              <Link to="/home" className={styles.navLink}>
                Home
              </Link>
              <Link to="/medicine-store" className={styles.navLink}>
                Medicine store
              </Link>
              <Link to="/medicine" className={styles.navLink}>
                Medicine
              </Link>
            </nav>

            <ul className={styles.socialIcons}>
              <li>
                <a
                  href="https://www.facebook.com/goITclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Facebook"
                >
                  <img src={iconFacebook} alt="Facebook" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/goitclub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Instagram"
                >
                  <img src={iconInstagram} alt="Instagram" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/c/GoIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="YouTube"
                >
                  <img src={iconYoutube} alt="YouTube" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © E-Pharmacy 2023. All Rights Reserved
          </p>
          <span className={styles.separator}>|</span>
          <Link to="/privacy-policy" className={styles.policyLink}>
            Privacy Policy
          </Link>
          <span className={styles.separator}>|</span>
          <Link to="/terms-conditions" className={styles.policyLink}>
            Terms & Conditions
          </Link>
          <a
            href="https://github.com/begumnarmanli"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.developerSignature}
          >
            Developed by{" "}
            <span className={styles.nameGradient}>Begüm Narmanlı</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
