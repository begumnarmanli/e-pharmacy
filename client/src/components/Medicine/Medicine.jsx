import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Medicine.module.css";
import { useCart } from "../../context/CartContext";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import Loader from "../Loader/Loader";
import iconSearch from "../../assets/icons/icon-search.svg";
import iconFilter from "../../assets/icons/icon-filter.svg";
import chevronDown from "../../assets/icons/chevron-down.svg";
import iconFirst from "../../assets/icons/icon-pagination-first.svg";
import iconPrev from "../../assets/icons/icon-pagination-prev.svg";
import iconNext from "../../assets/icons/icon-pagination-next.svg";
import iconLast from "../../assets/icons/icon-pagination-last.svg";
import notFoundImg from "../../assets/images/not-found.webp";

const CATEGORIES = [
  "All",
  "Medicine",
  "Heart",
  "Head",
  "Hand",
  "Leg",
  "Supplements",
];

const Medicine = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const dropdownRef = useRef(null);
  const { addToCart } = useCart();
  const [modal, setModal] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
        params: {
          category: category !== "All" ? category : undefined,
          search: searchTerm || undefined,
        },
      });
      setProducts(data);
      setCurrentPage(1);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, [category, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setModal("login");
      return;
    }
    addToCart(product);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setDropdownOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Medicine</h1>

      <div className={styles.filterSection}>
        <div className={styles.selectWrapper} ref={dropdownRef}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <span className={category === "All" ? styles.placeholderText : ""}>
              {category === "All" ? "Product category" : category}
            </span>
            <img
              src={chevronDown}
              alt="chevron"
              className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronUp : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.dropdownItem} ${category === cat ? styles.dropdownItemActive : ""}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat === "All" ? "Product category" : cat}
                  {category === cat && (
                    <span className={styles.dropdownCheck}>✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className={styles.searchWrapper} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search medicine"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.iconSearchButton}>
            <img src={iconSearch} alt="search" />
          </button>
        </form>

        <button className={styles.filterBtn} onClick={fetchProducts}>
          <img src={iconFilter} alt="filter" /> Filter
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.productList}>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div key={product._id} className={styles.productCard}>
                  <div className={styles.imageBox}>
                    <img
                      src={product.photo}
                      alt={product.name}
                      className={styles.productImg}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/150?text=No+Image";
                      }}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.namePrice}>
                      <h3 className={styles.name}>{product.name}</h3>
                      <span className={styles.price}>₺{product.price}</span>
                    </div>
                    <p className={styles.categoryName}>{product.category}</p>
                    <div className={styles.cardFooter}>
                      <button
                        className={styles.addBtn}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </button>
                      <Link
                        to={`/medicine/${product._id}`}
                        className={styles.detailsBtn}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResultContainer}>
                <img
                  src={notFoundImg}
                  alt="No Results"
                  className={styles.noResultImage}
                />
                <div className={styles.noResultTextWrapper}>
                  <h3 className={styles.noResultTitle}>No products found</h3>
                  <p className={styles.noResultText}>
                    We couldn't find any medicine matching your search or
                    category.
                  </p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => {
                      setCategory("All");
                      setSearchTerm("");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {products.length > productsPerPage && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className={styles.arrowBtn}
              >
                <img
                  src={iconFirst}
                  alt="First"
                  className={currentPage === 1 ? styles.disabledIcon : ""}
                />
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.arrowBtn}
              >
                <img
                  src={iconPrev}
                  alt="Prev"
                  className={currentPage === 1 ? styles.disabledIcon : ""}
                />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`${styles.pageNumber} ${currentPage === number ? styles.activePage : ""}`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={styles.arrowBtn}
              >
                <img
                  src={iconNext}
                  alt="Next"
                  className={
                    currentPage === totalPages ? styles.disabledIcon : ""
                  }
                />
              </button>

              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={styles.arrowBtn}
              >
                <img
                  src={iconLast}
                  alt="Last"
                  className={
                    currentPage === totalPages ? styles.disabledIcon : ""
                  }
                />
              </button>
            </div>
          )}
        </>
      )}
      {modal === "login" && (
        <LoginModal
          onClose={() => setModal(null)}
          onSwitchToRegister={() => setModal("register")}
          onSuccess={() => setModal(null)}
        />
      )}
      {modal === "register" && (
        <RegisterModal
          onClose={() => setModal(null)}
          onSwitchToLogin={() => setModal("login")}
        />
      )}
    </div>
  );
};

export default Medicine;
