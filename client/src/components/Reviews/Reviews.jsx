import React, { useState, useEffect } from "react";
import styles from "./Reviews.module.css";
import mariaImg from "../../assets/images/maria-tkachuk.webp";
import sergeyImg from "../../assets/images/sergey-rybachok.webp";
import nataliaImg from "../../assets/images/natalia-chatuk.webp";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const getAvatar = (name) => {
    if (name.includes("Maria")) return mariaImg;
    if (name.includes("Sergey")) return sergeyImg;
    if (name.includes("Natalia")) return nataliaImg;
    return "";
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => {
        if (import.meta.env.DEV) console.error("Failed to fetch reviews:", err);
      });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Reviews</h2>
        <p className={styles.subtitle}>
          Our customers' experiences with our platform
        </p>

        <div className={styles.reviewsGrid}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.avatarWrapper}>
                <img
                  src={getAvatar(review.name)}
                  alt={review.name}
                  className={styles.avatar}
                />
              </div>
              <h3 className={styles.userName}>{review.name}</h3>
              <p className={styles.userText}>{review.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
