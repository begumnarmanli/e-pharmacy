import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

const parseCartData = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.cart)) return data.cart;
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        setCartItems([]);
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(parseCartData(res.data));
      } catch (err) {
        if (err.response?.status !== 401) {
          if (import.meta.env.DEV) console.error("Failed to load cart:", err);
        }
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const checkout = async (formData) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/cart/checkout`, formData, {
        headers: getAuthHeader(),
      });
      setCartItems([]);
      return { success: true, data: res.data };
    } catch (err) {
      if (import.meta.env.DEV) console.error("Failed to place order:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Something went wrong",
      };
    }
  };
  const getCartTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        checkout,
        getCartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
