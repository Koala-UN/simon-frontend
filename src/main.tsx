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
import RecoveryPassword from "./pages/RecoveryPassword.tsx";
import  AuthProvider  from "./contexts/AuthContext.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import VerifyEmailFinal from "./pages/VerifyEmail.tsx";
import VerifyEmailSend from "./pages/VerifyEmailSend.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import ChangePassword from "./pages/ChangePassword.tsx";
import QrGenerator from "./components/QrGenerator.tsx";
import Ayuda from "./pages/Ayuda.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import PaymentProvider from "./contexts/PaymentContext.tsx";

// Verificar y actualizar la URL del backend
if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === undefined) {
  import.meta.env.VITE_BACKEND_URL = 'http://localhost:5000';
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PaymentProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/help" element={<Ayuda />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/plans" element={<SubscriptionPlans />} />
            <Route path="/data-privacy" element={<Tratamiento />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/login" element={<Authcard />} />
            <Route path="/ciudades" element={<Ciudades />} />
            <Route path="/restaurantes/:cityId" element={<SearchMenu />} />
            <Route path="/restaurantes/:cityId/:category" element={<SearchMenu />} />
            <Route path="/reserve/:restaurantId" element={<Reserve />} />
            <Route path="/menu/:restaurantId" element={<MenuExtendido />} />
            <Route path="/confirm-reserve/:restaurantId" element={<ConfirmReserve />} />
            <Route path="/about-us" element={<AboutUs/>}></Route>
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/restaurant/verify-email" element={<VerifyEmailFinal/>} />
            <Route path="/recover-password" element={<RecoveryPassword />} />
            <Route path="/restaurant/verify-email-send" element={<VerifyEmailSend />} />
            <Route element={<PrivateRoute />}> // Rutas PROTEGIDAS
              <Route path="/admin/inventory" element={<Inventory />} />
              <Route path="/admin/reserve" element={<AdminDashboard />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/admin/orders" element={<AdminDashboardOrders />} />
              <Route path="/qr" element={<QrGenerator />} />
              <Route path="/admin/edit-profile" element={<EditProfile/>} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </PaymentProvider>
    </AuthProvider>
  </React.StrictMode>
);
