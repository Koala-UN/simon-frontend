export interface Dish {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  existencias: number;
  restauranteId?: number;
  categoria: string;
  imageUrl?: string;
  rating?: number;
}

  
  export interface Reservation {
    id: number;
    fecha: string;
    hora: string;
    nombre: string;
    cantidad: number;
    telefono: string;
    estado: string;
    mesaEtiqueta?: string; // Campo opcional
  }
  
  export interface Order {
    id: number;
    fecha: string;
    hora: string;
    estado: string;
    total: number;
  }
  
  
  export interface FullRestaurant {
      id: number;
      nombre: string;
      correo: string;
      telefono: string;
      estado: string;
      idAutenticacion?: number;
      capacidadReservas: number;
      direccionId: number;
      categoria: string;
      descripcion: string;
      address: {
          id: number;
          ciudadId: number;
          direccion: string;
          ciudad: {
              id: number;
              departamentoId: number;
              nombre: string;
          };
          departamento: {
              id: number;
              paisId: number;
              nombre: string;
          };
          pais: {
              id: number;
              nombre: string;
          };
      };
      suscripcion?: {
          id?: number;
          tipo?: string;
          fecha_suscripcion?: string;
          fecha_vencimiento?: string;
      };
      imageUrl?: string;
  }
  export interface Restaurant {
    id: number;
    nombre: string;
    categoria: string;
    address: {
        direccion: string;
        ciudad: {
          nombre: string;
        };
      };
    descripcion: string;
    imageUrl: string;
    tag?: string;
    photo?: string;
    price?: string;
  }

export interface FormattedRestaurant {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    tag: string;
    address: string;
    city: string;
    onClick: () => void;
}

export interface User {
    id: number;
    nombre?: string;
    correo: string;
    imageUrl?: string;
}
export interface CartItem extends Dish {
    quantity: number;
  }

  export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    user: User;
    setUser: (value: User) => void;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string; }>;
    logout: () => Promise<Response>;
    register: (formData: FormData) => Promise<{ success: boolean; message: string; }> ;
    setIsLoading: (value: boolean) => void;
    postAuthStatus: (user: User) => Promise<void>;
    isAdminMenuOpen: boolean;
    setIsAdminMenuOpen: (value: boolean) => void;
  }

  // Definimos la interfaz del contexto
 export interface PaymentContextType {
    paymentId: string;
    setPaymentId: (id: string) => void;
  }