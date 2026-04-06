import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.capsuleRow}>
        <div className={styles.capsule}></div>
        <div className={styles.capsule}></div>
        <div className={styles.capsule}></div>
      </div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Loader;
