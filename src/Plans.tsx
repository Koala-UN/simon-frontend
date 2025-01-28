import { Typography, Button } from "@material-tailwind/react";

const SubscriptionPlans = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <Typography
          variant="h4"
          className="font-bold text-center text-blue-800 mb-8"
        >
          Planes de Suscripción
        </Typography>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Mensualidad Base */}
          <div className="border border-blue-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition">
            <Typography
              variant="h5"
              className="font-bold text-center text-blue-800 mb-4"
            >
              Mensualidad Base
            </Typography>
            <Typography className="text-gray-700 mb-2">
              <strong>Precio:</strong> COP 45,000 al mes.
            </Typography>
            <Typography className="text-gray-700 mb-4">
              <strong>Incluye:</strong> Gestión de reservas y pedidos, soporte
              multiplataforma, acceso de administradores y reportes básicos.
            </Typography>
            <div className="flex flex-col items-center space-y-3">
              <Button
                variant="filled"
                color="blue"
                size="sm"
                className="w-full md:w-auto"
              >
                Suscribirse
              </Button>
              <Button
                variant="outlined"
                color="blue"
                size="sm"
                className="w-full md:w-auto"
              >
                Pagar
              </Button>
            </div>
          </div>

          {/* Plan Anual */}
          <div className="border border-blue-300 rounded-lg p-6 shadow-sm hover:shadow-lg transition">
            <Typography
              variant="h5"
              className="font-bold text-center text-blue-800 mb-4"
            >
              Plan Anual
            </Typography>
            <Typography className="text-gray-700 mb-2">
              <strong>Precio:</strong> COP 450,000 al año (descuento del 17%
              sobre el plan mensual).
            </Typography>
            <Typography className="text-gray-700 mb-2">
              <strong>Incluye:</strong> Todo lo del plan mensual durante 12
              meses.
            </Typography>
            <Typography className="text-gray-700 mb-4">
              <strong>Beneficio:</strong> Equivale a un ahorro de COP 90,000
              frente al pago mensual.
            </Typography>
            <div className="flex flex-col items-center space-y-3">
              <Button
                variant="filled"
                color="blue"
                size="sm"
                className="w-full md:w-auto"
              >
                Suscribirse
              </Button>
              <Button
                variant="outlined"
                color="blue"
                size="sm"
                className="w-full md:w-auto"
              >
                Pagar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
