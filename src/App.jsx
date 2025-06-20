// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import "keen-slider/keen-slider.min.css";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Review from "./components/Review";
import Footer from "./components/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import FormPembayaranPage from "./components/FormPembayaranPage";
import QRISPage from "./components/QRISPage";
import { CartProvider } from "./context/CartContext";
import AdminDashboard from "./components/AdminDashboard";

const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // jeda agar elemen sempat render
      }
    }
  }, [location]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <ScrollToSection />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div id="home"><Home /></div>
              <div id="menu"><Menu /></div>
              <div id="about"><About /></div>
              <div id="review"><Review /></div>
              <Footer />
            </>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/form-pembayaran" element={<FormPembayaranPage />} />
        <Route path="/qris" element={<QRISPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;
