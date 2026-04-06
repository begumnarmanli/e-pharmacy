import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LoginModal.module.css";
import iconClose from "../../assets/icons/icon-close.svg";

const LoginModal = ({ onClose, onSwitchToRegister, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
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
      window.dispatchEvent(new Event("userChanged"));
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src={iconClose} alt="Close" />
        </button>
        <h2 className={styles.title}>Log in to your account</h2>
        <p className={styles.subtitle}>
          Please login to your account before continuing.
        </p>
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
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <span onClick={onSwitchToRegister}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
