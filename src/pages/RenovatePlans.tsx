import { Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { usePayment } from "../utils/getContext";
import CheckinForRenovate from "../components/CheckinForRenovate";

const RenovatePlans = () => {
  console.log('RenovatePlans component rendered');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCheckin, setShowCheckin] = useState<boolean>(false);
  const [showVerifyButton, setShowVerifyButton] = useState<boolean>(false);
  const { setPaymentId } = usePayment();
  //const { user } = useAuth();

  const createPreference = async (unitPrice: number): Promise<string | undefined> => {
    console.log('Creating preference for price:', unitPrice);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create_preference`,
        {
          title: "Renovación de Plan",
          quantity: 1,
          unit_price: unitPrice,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Preferencia creada:", response.data.id);
      return response.data.id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      return undefined;
    }
  };

  const handlePay = async (unitPrice: number, subscriptionType: string) => {
    console.log('handlePay called with:', { unitPrice, subscriptionType });
    setIsProcessing(true);

    const id = await createPreference(unitPrice);
    if (id) {
      setPaymentId(id);
      localStorage.setItem("subscriptionType", subscriptionType);
      window.open(
        `https://www.mercadopago.com.co/checkout/v1/redirect?preference-id=${id}`,
        "_blank"
      );
      setShowVerifyButton(true);
    } else {
      alert("Error al procesar el pago. Inténtalo de nuevo.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <Typography
          variant="h4"
          className="font-extrabold text-center text-blue-700 mb-10"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Renovación de Plan
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Mensual */}
          <div className="border border-blue-300 rounded-xl p-8 bg-blue-50 hover:bg-blue-100 shadow-md transition transform hover:scale-105 flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                className="font-bold text-center text-blue-800 mb-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Renovación Mensual
              </Typography>
              <Typography
                className="text-gray-600 mb-2 text-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <strong>Precio:</strong> COP 45,000
              </Typography>
              <Typography
                className="text-gray-600 mb-4 text-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <strong>Incluye:</strong>
                <ul className="list-disc text-left pl-5 mt-2">
                  <li>Gestión de reservas ilimitadas</li>
                  <li>Sistema de pedidos en tiempo real</li>
                  <li>Panel de administración completo</li>
                  <li>Soporte técnico 24/7</li>
                  <li>Estadísticas y reportes básicos</li>
                </ul>
              </Typography>
            </div>
            <Button
              variant="gradient"
              color="blue"
              size="md"
              className="w-full"
              onClick={() => handlePay(45000, "MENSUAL")}
              disabled={isProcessing}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isProcessing ? "Procesando..." : "Renovar"}
            </Button>
          </div>

          {/* Plan Anual */}
          <div className="border border-blue-300 rounded-xl p-8 bg-yellow-50 hover:bg-yellow-100 shadow-md transition transform hover:scale-105 flex flex-col justify-between">
            <div>
              <Typography
                variant="h5"
                className="font-bold text-center text-yellow-800 mb-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Renovación Anual
              </Typography>
              <Typography
                className="text-gray-600 mb-2 text-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <strong>Precio:</strong> COP 450,000 (¡Ahorra 90,000!)
              </Typography>
              <Typography
                className="text-gray-600 mb-4 text-center"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <strong>Incluye:</strong>
                <ul className="list-disc text-left pl-5 mt-2">
                  <li>Todos los beneficios del plan mensual</li>
                  <li>Descuento del 17% sobre el precio mensual</li>
                  <li>Prioridad en soporte técnico</li>
                  <li>Reportes avanzados de análisis</li>
                  <li>Capacitación personalizada</li>
                </ul>
              </Typography>
            </div>
            <Button
              variant="gradient"
              color="yellow"
              size="md"
              className="w-full"
              onClick={() => handlePay(450000, "ANUAL")}
              disabled={isProcessing}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isProcessing ? "Procesando..." : "Renovar"}
            </Button>
          </div>
        </div>

        {showVerifyButton && (
          <div className="flex flex-col items-center mt-8">
            <Button
              variant="gradient"
              color="green"
              size="md"
              className="w-full max-w-md"
              onClick={() => setShowCheckin(true)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Verificar Pago
            </Button>
          </div>
        )}
      </div>

      {showCheckin && (
        <CheckinForRenovate
          onSuccess={() => {
            setShowCheckin(false);
            setShowVerifyButton(false);
          }}
         // restaurantId={user?.restauranteId || 0}
        />
      )}
    </div>
  );
};

export default RenovatePlans;
