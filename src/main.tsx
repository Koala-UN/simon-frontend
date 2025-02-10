import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchMenu from "./components/SearchMenu.tsx";
import Reserve from "./pages/reserve.tsx";
import MenuExtendido from "./pages/MenuExtendido.tsx";
import "./styles/index.css"; // Ensure the path is correct
import ConfirmReserve from "./pages/ConfirmReserve.tsx";
import NavBar from "./components/Navbar.tsx";
import { Footer } from "./components/Footer.tsx";
import App from "./App.tsx";
import AdminDashboard from "./pages/adm.tsx";
import Inventory from "./pages/EditInventory.tsx";
import AdminDashboardOrders from "./pages/admpedidos.tsx";
import TermsAndConditions from "./pages/terminos.tsx";
import Authcard from "./components/AuthCard.tsx";
import Tratamiento from "./pages/tratamiento.tsx";
import RegisterForm from "./pages/Register.tsx";
import SubscriptionPlans from "./pages/Plans.tsx";
import Ciudades from "./pages/Ciudades.tsx";
import ChangePasswordForm from "./pages/Chgpassword.tsx";
import RecoverPasswordForm from "./pages/recovery.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";

// Verificar y actualizar la URL del backend
if (!import.meta.env.VITE_BACKEND_URL) {
  import.meta.env.VITE_BACKEND_URL = 'http://localhost:5000';
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/plans" element={<SubscriptionPlans />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/data-privacy" element={<Tratamiento />} />
        <Route path="/admin/reserve" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminDashboardOrders />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/login" element={<Authcard />} />
        <Route path="/ciudades" element={<Ciudades />} />
        <Route path="/restaurantes/:cityId" element={<SearchMenu />} />
        <Route path="/recover-password" element={<RecoverPasswordForm />} />
        <Route path="/reserve/:restaurantId" element={<Reserve />} />
        <Route path="/menu/:restaurantId" element={<MenuExtendido />} />
        <Route path="/confirm-reserve/:restaurantId" element={<ConfirmReserve />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  </React.StrictMode>
);
 