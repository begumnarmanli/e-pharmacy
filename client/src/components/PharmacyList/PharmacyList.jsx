import React, { useEffect, useState } from "react";
import iconLocation from "../../assets/icons/icon-location.svg";
import iconPhone from "../../assets/icons/icon-phone.svg";
import iconStar from "../../assets/icons/icon-star-filled.svg";
import bgDecor from "../../assets/icons/bg-decor.svg";
import styles from "./PharmacyList.module.css";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/nearest_pharmacies")
      .then((res) => res.json())
      .then((data) => setPharmacies(data))
      .catch((err) => {
        if (import.meta.env.DEV) console.error("Failed to load data:", err);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.mainTitle}>Your Nearest Medicine Store</h2>
      <p className={styles.subTitle}>
        Search for Medicine, Filter by your location
      </p>

      <div className={styles.grid}>
        {pharmacies.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{item.name}</h3>
              <div className={styles.ratingGroup}>
                <img src={iconStar} alt="star" className={styles.iconStar} />
                <span>{item.rating}</span>
              </div>
              <button className={styles.openBtn}>OPEN</button>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.infoLine}>
                <img
                  src={iconLocation}
                  alt="location"
                  className={styles.iconSmall}
                />
                <p>
                  {item.address}, {item.city}
                </p>
              </div>

              <div className={styles.infoLine}>
                <img src={iconPhone} alt="phone" className={styles.iconSmall} />
                <p>{item.phone}</p>
              </div>
            </div>
            <img src={bgDecor} className={styles.bgDecor} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PharmacyList;
