import React, { useState } from "react";
import axios from "axios";
import { usePayment, useAuth } from "../utils/getContext";
import { useNavigate } from "react-router-dom";

const Checkin = () => {
  console.log('Checkin component rendered');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { paymentId } = usePayment();
  const { login, setIsLoading, setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const [manualPaymentId, setManualPaymentId] = useState<string>(paymentId);

  const verifyPayment = async () => {
    console.log('verifyPayment function called with paymentId:', manualPaymentId);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${manualPaymentId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_MERCADO_PAGO}`,
          },
        }
      );
      console.log('Payment verification response:', response.data);
      setPaymentStatus(response.data.status);

      if (response.data.status === "approved") {
        console.log('Payment approved, registering user');
        const formDataToSend = localStorage.getItem("formDataToSend");
        if (formDataToSend) {
          await registerUser(formDataToSend);
        }
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
      setErrorMessage("Error verifying payment");
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (formDataToSend: string) => {
    console.log('registerUser function called with formDataToSend:', formDataToSend);
    try {
      const parsedFormData = JSON.parse(formDataToSend);
      const formData = new FormData();
      for (const key in parsedFormData) {
        formData.append(key, parsedFormData[key]);
      }

      // Add suscriptionData to formData
      const subscriptionType = localStorage.getItem("subscriptionType");
      formData.set("suscriptionData", JSON.stringify({ tipo: subscriptionType }));
      console.log('formData suscriptionData:', formData.get("suscriptionData"));

      // Print formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const registerResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log('User registration response:', registerResponse.data);
      const { success, message, user } = registerResponse.data;
      console.log('User:', user);

      console.log('User registration successful, logging in user');
      // Extract email and password from restaurantData (stored as JSON string)
      const restaurantDataObj = JSON.parse(parsedFormData.restaurantData);
      const email = restaurantDataObj.correo;
      const password = restaurantDataObj.contrasena;
      console.log('Email:', email, 'Password:', password);

      const loginResponse = await login(email, password);
      console.log('Login response:', loginResponse);
      if (loginResponse.success) {
        setIsAuthenticated(true);
        setUser(user);
        navigate("/restaurant/verify-email-send");
         window.location.reload();
      } else {
        setErrorMessage(loginResponse.message);
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setErrorMessage("Error al enviar datos");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Verificar Pago</h1>
        <input
          type="text"
          value={manualPaymentId}
          onChange={(e) => {
            console.log('manualPaymentId input changed:', e.target.value);
            setManualPaymentId(e.target.value);
          }}
          placeholder="Ingrese el ID del pago"
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <button
          onClick={() => {
            console.log('Verificar button clicked');
            verifyPayment();
          }}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Verificar
        </button>
        {paymentStatus && (
          <p className="text-3xl font-bold mb-4">
            {paymentStatus === "approved" ? "Pago exitoso" : "Error en el pago"}
          </p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Checkin;
