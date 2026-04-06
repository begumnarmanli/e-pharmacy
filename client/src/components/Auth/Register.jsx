import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroPill from "../../assets/images/hero-pill.webp";
import logoFull from "../../assets/icons/logo-full.svg";
import bgDecor from "../../assets/icons/bg-decor.svg";
import styles from "./Auth.module.css";

const AUTH_ANIM_MS = 3000;
const AUTH_SWAP_MS = Math.round(AUTH_ANIM_MS * 0.45);

const Register = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), AUTH_ANIM_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleSwitch = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    window.setTimeout(() => navigate("/login"), AUTH_SWAP_MS);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError(
        "Password must contain at least one special character (!@#$%^&*).",
      );
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          name,
          email,
          phone,
          password,
        },
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ _id: data._id, name: data.name, email: data.email }),
      );
      window.dispatchEvent(new Event("userChanged"));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className={`${styles.authContainer} ${styles.registerMode}`}>
      <div
        className={`${styles.curtain} ${isOpening ? styles.curtainTowardRegister : ""} ${isAnimating ? styles.curtainTowardLogin : ""}`}
        style={isOpening ? { animationDelay: `-${AUTH_ANIM_MS * 0.45}ms` } : {}}
      />

      <div className={styles.infoSection}>
        <div
          className={`${styles.infoAnimLayer} ${isAnimating ? styles.infoAnimTowardLogin : ""}`}
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
          className={`${styles.formWrapper} ${isAnimating ? styles.formAnimTowardLogin : ""}`}
        >
          <h2 className={styles.formTitle}>Register</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="05XX XXX XX XX"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{11}"
              maxLength={11}
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
            {success && <p className={styles.successText}>{success}</p>}
            <button type="submit" className={styles.primaryBtn}>
              Register
            </button>
          </form>
          <p className={styles.switchAuth}>
            Already have an account?{" "}
            <span
              onClick={handleSwitch}
              style={{ pointerEvents: isAnimating ? "none" : "auto" }}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
