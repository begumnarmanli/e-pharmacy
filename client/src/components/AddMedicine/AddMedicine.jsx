import { useState } from "react";
import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import { useNavigate } from "react-router-dom";
import styles from "./AddMedicine.module.css";
import doctorImage from "../../assets/images/doctor-consultation.webp";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const handleBuyMedicine = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setModal("login");
      return;
    }
    navigate("/medicine");
  };

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Add the medicines you need online now
          </h2>
          <p className={styles.subtitle}>
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>
          <button className={styles.btn} onClick={handleBuyMedicine}>
            Buy medicine
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <clipPath id="curveClip" clipPathUnits="objectBoundingBox">
                <path d="M 0,0 C 0,0 0.08,0.35 0.08,0.5 C 0.08,0.65 0,1 0,1 L 1,1 L 1,0 Z" />
              </clipPath>
            </defs>
          </svg>
          <img
            src={doctorImage}
            alt="Woman consulting doctor online"
            className={styles.image}
          />
        </div>
      </div>

      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToRegister={() => setModal("register")}
          onSuccess={() => navigate("/medicine")}
        />
      )}
      {modal === "register" && (
        <RegisterModal
          onClose={() => setModal(null)}
          onSwitchToLogin={() => setModal("login")}
          onSuccess={() => navigate("/medicine")}
        />
      )}
    </section>
  );
};

export default AddMedicine;
