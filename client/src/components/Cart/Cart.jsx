import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import iconPlus from "../../assets/icons/icon-plus.svg";
import iconMinus from "../../assets/icons/icon-minus.svg";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, checkout } =
    useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    setError("");

    const result = await checkout({
      ...formData,
      items: cartItems,
      total: getCartTotal(),
    });

    setLoading(false);

    if (result.success) {
      toast.success("Your order has been placed successfully!");
      navigate("/medicine");
    } else {
      setError(result.message);
      toast.error(result.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Cart</h1>
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <button
            className={styles.placeOrderBtn}
            onClick={() => navigate("/medicine")}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Cart</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.mainOrderCard}>
            <section className={styles.innerSection}>
              <h2 className={styles.sectionTitle}>Enter shipping info</h2>
              <p className={styles.sectionSub}>
                Enter your delivery address where you get the product. You can
                also send any other location where you send the products.
              </p>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter text"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter text"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter text"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter text"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            <div className={styles.divider} />

            <section className={styles.innerSection}>
              <h2 className={styles.sectionTitle}>Payment method</h2>
              <p className={styles.sectionSub}>
                You can pay us in a multiple way in our payment gateway system.
              </p>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleInputChange}
                  />
                  <span className={styles.customRadio}></span> Cash On Delivery
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
                    onChange={handleInputChange}
                  />
                  <span className={styles.customRadio}></span> Bank
                </label>
              </div>
            </section>

            <div className={styles.divider} />

            <section className={styles.innerSection}>
              <h2 className={styles.sectionTitle}>Order details</h2>
              <p className={styles.sectionSub}>
                Shipping and additionnal costs are calculated based on values
                you have entered.
              </p>

              <div className={styles.totalBox}>
                <span>Total:</span>
                <span>₺ {getCartTotal().toFixed(2)}</span>
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              <button
                className={styles.placeOrderBtn}
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Sending..." : "Place order"}
              </button>
            </section>
          </div>
        </div>

        <div className={styles.rightColumn}>
          {cartItems.map((item) => (
            <div key={item._id} className={styles.productItem}>
              <div className={styles.productImgWrapper}>
                <img src={item.photo} alt={item.name} />
              </div>

              <div className={styles.productDetails}>
                <div className={styles.productTopRow}>
                  <h3>{item.name}</h3>
                  <p className={styles.productPrice}>₺ {item.price}</p>
                </div>

                <p className={styles.productDesc}>{item.category}</p>

                <div className={styles.productBottomRow}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <img src={iconMinus} alt="decrease" />
                    </button>
                    <span className={styles.qtyNumber}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <img src={iconPlus} alt="increase" />
                    </button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
