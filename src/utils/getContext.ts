import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PaymentContext } from '../contexts/PaymentContext';

import { AuthContextType, PaymentContextType } from '../types/interfaces';

const useAuth = ():AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};

// Hook para acceder fácilmente al contexto en cualquier parte de la app
const usePayment = (): PaymentContextType => {
    const context = useContext(PaymentContext);
    if (!context) {
      throw new Error("usePayment debe usarse dentro de un PaymentProvider");
    }
    return context;
  };

  export { useAuth, usePayment };