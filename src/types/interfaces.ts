export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    existencias: number;
    rating: number;
    image?: string;
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

  export interface Restaurant {
    id: number;
    name: string;
    category: string;
    address: {
        direccion: string;
        ciudad: {
          nombre: string;
        };
      };
    descripcion: string;
    image: string;
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

export interface FullRestaurant {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    estado: string;
    idAutenticacion?: number | null;
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
    suscripcion: {
        id: number;
        tipo: string;
        fecha_suscripcion: string;
        fecha_vencimiento: string;
    };
    imageUrl: string;
}

export interface User {
    id: number;
    nombre: string;
    correo: string;
    imageUrl: string;
}
export interface CartItem extends Dish {
    quantity: number;
  }