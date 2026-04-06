import React from "react";
import styles from "./Stats.module.css";

const stats = [
  { id: 1, number: "70%", label: "Huge Sale", link: "Shop now" },
  { id: 2, number: "100%", label: "Secure delivery", link: "Read more" },
  { id: 3, number: "35%", label: "Off", link: "Shop now" },
];

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      {stats.map((stat) => (
        <div key={stat.id} className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statIndex}>{stat.id}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
          <div className={styles.statFooter}>
            <span className={styles.statNumber}>{stat.number}</span>
            <a href="#" className={styles.statLink}>
              {stat.link}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Stats;
