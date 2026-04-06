import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";
import notFoundImg from "../../assets/images/not-found.webp";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={notFoundImg} alt="404 Not Found" className={styles.image} />

        <div className={styles.info}>
          <p className={styles.description}>
            Oops! The medicine or page you are looking for is currently out of
            stock or moved to another shelf.
          </p>

          <button onClick={() => navigate("/")} className={styles.homeBtn}>
            Back to Pharmacy Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
