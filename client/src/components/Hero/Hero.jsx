import React from "react";
import styles from "./Hero.module.css";
import heroPills from "../../assets/images/hero-pills.webp";

const Hero = () => {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Your medication delivered</h1>
        <p className={styles.subtitle}>
          Say goodbye to all your healthcare worries with us
        </p>
      </div>

      <div className={styles.heroImageWrapper}>
        <img
          src={heroPills}
          alt="Floating medical capsules"
          className={styles.heroPills}
        />
      </div>
    </section>
  );
};

export default Hero;
