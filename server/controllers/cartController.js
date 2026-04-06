import Order from "../models/Order.js";

export const getCart = async (req, res) => {
  try {
    const order = await Order.findOne({ user: req.user.id, status: "pending" });
    if (!order) return res.json([]);
    res.json(order.items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = await Order.findOne({ user: req.user.id, status: "pending" });
    if (!order) return res.status(404).json({ message: "Cart not found" });

    const item = order.items.find((i) => i.productId === productId);
    if (item) item.quantity = quantity;

    await order.save();
    res.json(order.items);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { name, email, phone, address, paymentMethod, items, total } =
      req.body;

    const order = new Order({
      user: req.user.id,
      items,
      shippingInfo: { name, email, phone, address },
      paymentMethod,
      total,
      status: "completed",
    });

    const saved = await order.save();
    res.json({ success: true, message: "Order received", order: saved });
  } catch (err) {
    console.error("Checkout error:", err);
    res
      .status(500)
      .json({ message: "Order could not be placed.", error: err.message });
  }
};
