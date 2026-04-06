import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import Loader from "../Loader/Loader";
import iconStarFilled from "../../assets/icons/icon-star-filled.svg";
import iconStarOutline from "../../assets/icons/icon-star-outline.svg";
import iconPlus from "../../assets/icons/icon-plus.svg";
import iconMinus from "../../assets/icons/icon-minus.svg";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );
        setProduct(data);
      } catch (error) {
        if (import.meta.env.DEV)
          console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const { data } = await axios.get("${import.meta.env.VITE_API_URL}/api/reviews");
        setReviews(data);
      } catch (error) {
        if (import.meta.env.DEV)
          console.error("Failed to load reviews:", error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setModal("login");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };
  if (loading) return <Loader />;
  if (!product) return <div className={styles.loader}>Product not found.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <div className={styles.imageBox}>
            <img
              src={product.photo}
              alt={product.name}
              className={styles.productImg}
              onError={(e) => {
                e.target.src = "https://placehold.co/150?text=No+Image";
              }}
            />
          </div>

          <div className={styles.infoBox}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.price}>₺{product.price}</p>
            </div>
            <p className={styles.brand}>Brand: {product.suppliers}</p>

            <div className={styles.actionRow}>
              <div className={styles.quantityRow}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <img src={iconMinus} alt="minus" width={16} height={16} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <img src={iconPlus} alt="plus" width={16} height={16} />
                </button>
              </div>
              <button className={styles.addBtn} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tabSection}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "description" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "description" ? (
              <div className={styles.descriptionWrapper}>
                {product.description.split(". ").map((sentence, index) => (
                  <p key={index} className={styles.descriptionParagraph}>
                    {sentence}
                    {sentence.endsWith(".") ? "" : "."}
                  </p>
                ))}
                <div className={styles.disclaimerBox}>
                  <p>
                    <strong>Disclaimer:</strong> This information is for
                    educational purposes only. Please consult with a healthcare
                    professional before starting any new medication or
                    treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.reviewList}>
                {reviews.map((review, index) => (
                  <div key={index} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                        {review.image ? (
                          <img
                            src={review.image}
                            alt={review.name}
                            className={styles.avatarImg}
                          />
                        ) : (
                          review.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className={styles.reviewName}>{review.name}</p>
                        <p className={styles.reviewDate}>2 days ago</p>
                      </div>
                      <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <img
                            key={star}
                            src={star <= 4 ? iconStarFilled : iconStarOutline}
                            alt="star"
                            width={16}
                            height={16}
                          />
                        ))}
                        <span>4</span>
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.testimonial}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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

export default ProductDetail;
