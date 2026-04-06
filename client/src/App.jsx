import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import SharedLayout from "./components/shared/SharedLayout/SharedLayout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Hero from "./components/Hero/Hero";
import Stats from "./components/Stats/Stats";
import PharmacyList from "./components/PharmacyList/PharmacyList";
import AddMedicine from "./components/AddMedicine/AddMedicine";
import Marquee from "./components/Marquee/Marquee";
import Reviews from "./components/Reviews/Reviews";
import Medicine from "./components/Medicine/Medicine";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./components/NotFound/NotFound";
import MedicineStore from "./components/MedicineStore/MedicineStore";
import Cart from "./components/Cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <>
                  <Hero />
                  <Stats />
                  <PharmacyList />
                  <AddMedicine />
                  <Marquee />
                  <Reviews />
                </>
              }
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route
              path="medicine-store"
              element={
                <div className="otherPage">
                  <MedicineStore />
                </div>
              }
            />
            <Route
              path="cart"
              element={
                <div className="otherPage">
                  <Cart />
                </div>
              }
            />
            <Route
              path="medicine"
              element={
                <div className="otherPage">
                  <Medicine />
                </div>
              }
            />
            <Route
              path="medicine/:id"
              element={
                <div className="otherPage">
                  <ProductDetail />
                </div>
              }
            />
            <Route
              path="privacy-policy"
              element={
                <div className="otherPage">
                  <PrivacyPolicy />
                </div>
              }
            />
            <Route
              path="terms-conditions"
              element={
                <div className="otherPage">
                  <TermsConditions />
                </div>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
