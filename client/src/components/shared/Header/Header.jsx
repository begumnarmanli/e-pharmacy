import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import LogoFull from "../../../assets/icons/logo-full.svg?react";
import iconHamburger from "../../../assets/icons/icon-hamburger.svg";
import iconClose from "../../../assets/icons/icon-close.svg";
import iconCart from "../../../assets/icons/icon-cart.svg";
import { useCart } from "../../../context/CartContext";
import ConfirmModal from "../../modals/ConfirmModal";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const isHomePage = location.pathname === "/home";

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleUserChange = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutConfirm(false);
    closeMenu();
    navigate("/home");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMenuOpen]);

  const headerClass = `${styles.header} ${isHomePage ? styles.homeHeader : styles.otherHeader}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoLink}>
            <LogoFull className={styles.logo} />
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/medicine-store"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Medicine store
            </NavLink>
            <NavLink
              to="/medicine"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              Medicine
            </NavLink>
          </nav>

          <div className={styles.actions}>
            {user && (
              <Link to="/cart" className={styles.cartWrapper}>
                <img src={iconCart} alt="cart" className={styles.cartIcon} />
                <span className={styles.cartBadge}>{cartCount || 0}</span>
              </Link>
            )}

            {user ? (
              <>
                <div className={styles.userIcon}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <button
                  className={styles.logoutBtn}
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className={styles.registerBtn}>
                  Register
                </Link>
                <Link to="/login" className={styles.loginBtn}>
                  Login
                </Link>
              </>
            )}
          </div>

          <div className={styles.mobileRight}>
            {user && (
              <Link
                to="/cart"
                className={styles.cartWrapper}
                onClick={closeMenu}
              >
                <img src={iconCart} alt="cart" className={styles.cartIcon} />
                <span className={styles.cartBadge}>{cartCount || 0}</span>
              </Link>
            )}
            {user && (
              <div className={styles.userIcon}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              className={styles.hamburger}
              onClick={toggleMenu}
              aria-label="Open menu"
              style={{ visibility: isMenuOpen ? "hidden" : "visible" }}
            >
              <img src={iconHamburger} alt="Menu" />
            </button>
          </div>
        </div>

        <div
          className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.menuOpen : ""}`}
          onClick={closeMenu}
        >
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.mobileMenuHeader}>
              <button
                className={styles.closeBtn}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <img src={iconClose} alt="Close" />
              </button>
            </div>

            <nav className={styles.mobileNav}>
              <Link
                to="/home"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/medicine-store"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                Medicine store
              </Link>
              <Link
                to="/medicine"
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                Medicine
              </Link>
            </nav>

            <div className={styles.mobileActions}>
              {user ? (
                <button
                  className={styles.mobileLogoutBtn}
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className={styles.mobileRegisterBtn}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className={styles.mobileLoginBtn}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {showLogoutConfirm && (
        <ConfirmModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
};

export default Header;
