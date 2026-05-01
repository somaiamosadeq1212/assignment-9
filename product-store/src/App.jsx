import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";

import { useContext } from "react";
import { SettingsContext } from "./context/SettingsContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { state } = useContext(SettingsContext);

  return (
    <div
      style={{
        backgroundColor: state.darkMode ? "#0f0f0f" : "#f5f5f5",
        color: state.darkMode ? "#ffffff" : "#1a1a1a",
        minHeight: "100vh",
        transition: "0.3s ease",
      }}
    >
      <Navbar />

      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;