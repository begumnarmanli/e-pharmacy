import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroPill from "../../assets/images/hero-pill.webp";
import logoFull from "../../assets/icons/logo-full.svg";
import bgDecor from "../../assets/icons/bg-decor.svg";
import styles from "./Auth.module.css";

const AUTH_ANIM_MS = 3000;
const AUTH_SWAP_MS = Math.round(AUTH_ANIM_MS * 0.45);

const Login = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), AUTH_ANIM_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleSwitch = () => {
    if (isAnimating || isOpening) return;
    setIsAnimating(true);
    window.setTimeout(() => navigate("/register"), AUTH_SWAP_MS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/users/login",
        {
          email,
          password,
        },
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name, email: data.email }),
      );
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div
        className={`${styles.curtain} ${isOpening ? styles.curtainTowardLogin : ""} ${isAnimating ? styles.curtainTowardRegister : ""}`}
        style={isOpening ? { animationDelay: `-${AUTH_SWAP_MS}ms` } : {}}
      />

      <div className={styles.infoSection}>
        <div
          className={`${styles.infoAnimLayer} ${isAnimating ? styles.infoAnimTowardRegister : ""}`}
        >
          <div className={styles.logoContainer}>
            <img
              src={logoFull}
              alt="E-Pharmacy Logo"
              className={styles.logoIcon}
            />
          </div>
          <div className={styles.infoContent}>
            <h1>
              Your medication, delivered Say goodbye to all{" "}
              <span className={styles.highlight}>your healthcare</span> worries
              with us
            </h1>
          </div>
          <div className={styles.pillImageContainer}>
            <img
              src={heroPill}
              alt="Medication"
              className={styles.floatingPill}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <img src={bgDecor} alt="" className={styles.formDecor} />
        <div
          className={`${styles.formWrapper} ${isAnimating ? styles.formAnimTowardRegister : ""}`}
        >
          <h2 className={styles.formTitle}>Log in</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button type="submit" className={styles.primaryBtn}>
              Log in
            </button>
          </form>
          <p className={styles.switchAuth}>
            Don't have an account?{" "}
            <span
              onClick={handleSwitch}
              style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
