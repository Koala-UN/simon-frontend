import { Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { usePayment } from "../utils/getContext";
import Checkin from "../components/Checkin";

const SubscriptionPlans = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCheckin, setShowCheckin] = useState<boolean>(false);
  const [showVerifyButton, setShowVerifyButton] = useState<boolean>(false);
  const { setPaymentId } = usePayment();

  const createPreference = async (unitPrice: number): Promise<string | undefined> => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/payment/create_preference", {
        title: "Plan de Suscripción",
        quantity: 1,
        unit_price: unitPrice,
      });
      console.log("Preferencia creada:", response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      return undefined;
    }
  };

  const handlePay = async (unitPrice: number, subscriptionType: string) => {
    setIsProcessing(true);

    const id = await createPreference(unitPrice);
    if (id) {
      setPaymentId(id); // Almacenar el ID del pago en el contexto
      localStorage.setItem("subscriptionType", subscriptionType); // Store subscription type
      window.open(
        `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${id}`,
        "_blank"
      );
      setShowVerifyButton(true); // Show verify button after payment
    } else {
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <Typography
          variant="h4"
          className="font-extrabold text-center text-blue-700 mb-10"
        >
          Planes de Suscripción
        </Typography>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Mensualidad Base */}
          <div className="border border-blue-300 rounded-xl p-8 bg-blue-50 hover:bg-blue-100 shadow-md transition transform hover:scale-105 flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                className="font-bold text-center text-blue-800 mb-4"
              >
                Mensualidad Base
              </Typography>
              <Typography className="text-gray-600 mb-2 text-center">
                <strong>Precio:</strong> COP 45,000 al mes.
              </Typography>
              <Typography className="text-gray-600 mb-4 text-center">
                <strong>Incluye:</strong> Gestión de reservas y pedidos, soporte
                multiplataforma, acceso de administradores y reportes básicos.
              </Typography>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
              <Button
                variant="gradient"
                color="blue"
                size="md"
                className="w-full"
                onClick={() => handlePay(45000, "MENSUAL")}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Suscribirse"}
              </Button>
            </div>
          </div>

          {/* Plan Anual */}
          <div className="border border-blue-300 rounded-xl p-8 bg-yellow-50 hover:bg-yellow-100 shadow-md transition transform hover:scale-105 flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                className="font-bold text-center text-yellow-800 mb-4"
              >
                Plan Anual
              </Typography>
              <Typography className="text-gray-600 mb-2 text-center">
                <strong>Precio:</strong> COP 450,000 al año (descuento del 17% sobre el
                plan mensual).
              </Typography>
              <Typography className="text-gray-600 mb-2 text-center">
                <strong>Incluye:</strong> Todo lo del plan mensual durante 12 meses.
              </Typography>
              <Typography className="text-gray-600 mb-4 text-center">
                <strong>Beneficio:</strong> Equivale a un ahorro de COP 90,000 frente al
                pago mensual.
              </Typography>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-4">
              <Button
                variant="gradient"
                color="yellow"
                size="md"
                className="w-full"
                onClick={() => handlePay(450000, "ANUAL")}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : "Suscribirse"}
              </Button>
            </div>
          </div>
        </div>

        {/* Verify Payment Button */}
        {showVerifyButton && (
          <div className="flex flex-col items-center mt-8">
            <Button
              variant="gradient"
              color="green"
              size="md"
              className="w-full"
              onClick={() => setShowCheckin(true)}
            >
              Verificar Pago
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <Typography variant="small" className="text-gray-600">
            ¿Tienes dudas? Contáctanos en{" "}
            <a
              href="mailto:soporte@simon.com"
              className="text-blue-500 hover:underline"
            >
              soporte@simon.com
            </a>
          </Typography>
        </div>
      </div>
      {showCheckin && <Checkin />}
    </div>
  );
};

export default SubscriptionPlans;
