import { createContext, useContext, useState, ReactNode } from "react";

// Definimos la interfaz del contexto
interface PaymentContextType {
  paymentId: string;
  setPaymentId: (id: string) => void;
}

// Creamos el contexto con valores por defecto
const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// Provider que envuelve la app y permite acceder al contexto
/**
 * Componente `PaymentProvider` que proporciona un contexto de pago a sus componentes hijos.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {ReactNode} props.children - Los componentes hijos que estarán envueltos por el proveedor de contexto.
 *
 * @returns {JSX.Element} Un proveedor de contexto que envuelve a los componentes hijos.
 *
 * @component
 * @example
 * <PaymentProvider>
 *   <YourComponent />
 * </PaymentProvider>
 *
 * @remarks
 * Este componente utiliza el hook `useState` para manejar el estado del `paymentId`, 
 * que es un identificador de pago en forma de cadena de texto. El `PaymentContext.Provider` 
 * proporciona el `paymentId` y la función `setPaymentId` a los componentes hijos que consumen este contexto.
 */
export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [paymentId, setPaymentId] = useState<string>("");

  return (
    <PaymentContext.Provider value={{ paymentId, setPaymentId }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Hook para acceder fácilmente al contexto en cualquier parte de la app
export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment debe usarse dentro de un PaymentProvider");
  }
  return context;
};
