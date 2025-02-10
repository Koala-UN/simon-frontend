import { Typography, Button } from "@material-tailwind/react";

const SubscriptionPlans = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <Typography
          variant="h4"
          className="font-extrabold text-center text-blue-700 mb-10"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Planes de Suscripción
        </Typography>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Mensualidad Base */}
          <div className="border border-blue-300 rounded-xl p-8 bg-blue-50 hover:bg-blue-100 shadow-md transition transform hover:scale-105">
            <Typography
              variant="h5"
              className="font-bold text-center text-blue-800 mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Mensualidad Base
            </Typography>
            <Typography className="text-gray-600 mb-2 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <strong>Precio:</strong> COP 45,000 al mes.
            </Typography>
            <Typography className="text-gray-600 mb-4 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <strong>Incluye:</strong> Gestión de reservas y pedidos, soporte
              multiplataforma, acceso de administradores y reportes básicos.
            </Typography>
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="gradient"
                color="blue"
                size="md"
                className="w-full"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Suscribirse
              </Button>
            </div>
          </div>

          {/* Plan Anual */}
          <div className="border border-blue-300 rounded-xl p-8 bg-yellow-50 hover:bg-yellow-100 shadow-md transition transform hover:scale-105">
            <Typography
              variant="h5"
              className="font-bold text-center text-yellow-800 mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Plan Anual
            </Typography>
            <Typography className="text-gray-600 mb-2 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <strong>Precio:</strong> COP 450,000 al año (descuento del 17% sobre el
              plan mensual).
            </Typography>
            <Typography className="text-gray-600 mb-2 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <strong>Incluye:</strong> Todo lo del plan mensual durante 12 meses.
            </Typography>
            <Typography className="text-gray-600 mb-4 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <strong>Beneficio:</strong> Equivale a un ahorro de COP 90,000 frente al
              pago mensual.
            </Typography>
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant="gradient"
                color="yellow"
                size="md"
                className="w-full"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Suscribirse
              </Button>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Typography variant="small" className="text-gray-600"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
    </div>
  );
};

export default SubscriptionPlans;
