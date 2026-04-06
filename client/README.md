# 💊 E-Pharmacy – Full-Stack Health & Wellness Platform

**E-Pharmacy** is a modern Full-Stack e-commerce application designed to provide a seamless user experience for browsing pharmaceutical products, managing a digital cart, and finding local pharmacy services.

---

## 🌟 Key Features

* **User Authentication:** Secure Login and Registration system using **JWT** and **Cookie-parser**.
* **Dynamic Cart Management:** Real-time cart updates powered by **React Context API**.
* **Pharmacy Discovery:** Dedicated endpoints for fetching nearest pharmacies and user reviews.
* **Legal Compliance:** Accessible pages for Privacy Policy and Terms & Conditions.
* **Modern UI/UX:** High-fidelity interface based on **Figma** designs, featuring custom **CSS Modules** and smooth animations.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.

---

## 🛠️ Technical Stack

### Frontend
* **React + Vite:** Leveraging High-Speed HMR for an optimized development workflow.
* **React Router Dom:** Handling SPA navigation and protected routes.
* **Context API:** Global state management for user sessions and cart data.
* **CSS Modules:** Scoped and maintainable styling.

### Backend
* **Node.js & Express:** Robust and scalable server-side architecture.
* **MongoDB & Mongoose:** NoSQL database management for products and users.
* **RESTful API:** Standardized endpoints for seamless communication.

---

## 📁 Project Structure
```text
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Global State Providers
│   │   ├── pages/         # Page-level components
│   │   └── assets/        # Custom branding & icons
├── server/                # Node.js Backend
│   ├── config/            # DB connection logic
│   ├── controllers/       # Business logic
│   ├── models/            # Mongoose schemas
│   └── routes/            # Express route definitions
```

---

## ⚙️ Installation & Setup

You can get the project running locally by following these steps in order:
```bash
# 1. Clone the repository
git clone https://github.com/begumnarmanli/e-pharmacy.git
cd e-pharmacy

# 2. Install dependencies (Client & Server)
cd client && npm install
cd ../server && npm install

# 3. Environment Variables
# Create a .env file in the /server directory with MONGODB_URI and PORT

# 4. Run the application
# Start Backend (Open a new terminal)
cd server && npm run dev

# Start Frontend (Open another terminal)
cd client && npm run dev
```