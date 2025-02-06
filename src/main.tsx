import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchMenu from "./SearchMenu.tsx";
import Reserve from "./reserve.tsx";
import MenuExtendido from "./MenuExtendido.tsx";
import "./index.css"; // Ensure the path is correct
import ConfirmReserve from "./ConfirmReserve.tsx";
import NavBar from "./Navbar.tsx";
import { Footer } from "./Footer.tsx";
import App from "./App.tsx";
import AdminDashboard from "./adm.tsx";
import Inventory from "./EditInventory.tsx";
import AdminDashboardOrders from "./admpedidos.tsx";
import TermsAndConditions from "./terminos.tsx";
import Authcard from "./AuthCard.tsx";
import Tratamiento from "./tratamiento.tsx";
import RegisterForm from "./Register.tsx";
import SubscriptionPlans from "./Plans.tsx";
import Ciudades from "./Ciudades.tsx";
import ChangePasswordForm from "./Chgpassword.tsx";
import RecoverPasswordForm from "./recovery.tsx";
import { AuthProvider } from "./AuthContext.tsx";

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
 