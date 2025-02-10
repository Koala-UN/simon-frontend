import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import Sidebar from "../components/Sidebar";

interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  existencias: string;
  categoria: string;
  imageUrl?: string;
}


function Inventory() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    existencias: "",
    categoria: "",
  });
  const [restaurantId, setRestaurantId] = useState<number | null>(null);

  const categories = [
    "Entradas",
    "Sopas y Cremas",
    "Ensaladas",
    "Platos Fuertes",
    "Guarniciones",
    "Bebidas",
    "Postres",
    "Snacks",
    "Sándwiches y Hamburguesas",
    "Pastas",
    "Pizzas",
    "Tacos y Antojitos",
    "Parrilladas y Asados",
    "Mariscos",
    "Comida Saludable",
  ];

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/restaurant/auth-status",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (response.ok && data.authenticated) {
          setRestaurantId(data.user.id);
        } else {
          console.error("No autenticado o error en la API de auth-status.");
        }
      } catch (error) {
        console.error("Error al obtener auth-status:", error);
      }
    };

    fetchAuthStatus();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!restaurantId) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/dish/restaurant/${restaurantId}`
        );
        const data = await response.json();

        if (response.ok && data.status === "success") {
          setMenuItems(data.data);
        } else {
          console.error("Error al obtener los platos:", data.message);
        }
      } catch (error) {
        console.error("Error al cargar los platos:", error);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dish/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error("Error al eliminar el plato.");
      }
    } catch (error) {
      console.error("Error al intentar eliminar el plato:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!restaurantId) {
      console.error("No se encontró el ID del restaurante.");
      return;
    }

    if (
      !newProduct.nombre ||
      !newProduct.descripcion ||
      !newProduct.precio ||
      !newProduct.existencias ||
      !newProduct.categoria
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/dish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          precio: parseFloat(newProduct.precio),
          existencias: parseInt(newProduct.existencias),
          restauranteId: restaurantId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMenuItems((prev) => [...prev, data.data]);
        setNewProduct({
          nombre: "",
          descripcion: "",
          precio: "",
          existencias: "",
          categoria: "",
        });
      } else {
        console.error("Error al agregar el producto.");
      }
    } catch (error) {
      console.error("Error al intentar agregar el producto:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar />
      <div className="flex flex-col lg:w-3/4 px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Typography
            variant="h4"
            className="font-bold text-blue-600 mb-4 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Inventory Management
          </Typography>
          <Typography
            variant="h5"
            className="font-semibold mb-4 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Menu Items
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col items-center p-4 shadow-sm border rounded-lg hover:shadow-lg transition"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="w-32 h-32 rounded-lg overflow-hidden"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80"}
                    alt={item.nombre}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Typography variant="h6" className="font-bold truncate"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {item.nombre || "Producto sin nombre"}
                  </Typography>
                  <Typography className="text-sm truncate text-gray-600"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {item.descripcion || "Sin descripción"}
                  </Typography>
                  <Typography className="font-semibold" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    ${parseFloat(item.precio).toLocaleString()} COP
                  </Typography>
                </CardBody>
                <div className="flex gap-2">
                  <FaPen className="text-gray-500 cursor-pointer" />
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => handleDelete(item.id)} 
                    children={<FaTrashAlt color="red" />} 
                    placeholder={undefined} 
                    onPointerEnterCapture={undefined} 
                    onPointerLeaveCapture={undefined}                  >
                    
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <Typography
            variant="h6"
            className="text-blue-600 font-semibold mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            Add New Product
          </Typography>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={newProduct.nombre}
              onChange={(e) =>
                setNewProduct({ ...newProduct, nombre: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Product Name"
            />
            <input
              type="text"
              value={newProduct.descripcion}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  descripcion: e.target.value,
                })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Product Description"
            />
            <input
              type="number"
              value={newProduct.precio}
              onChange={(e) =>
                setNewProduct({ ...newProduct, precio: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Price"
            />
            <input
              type="number"
              value={newProduct.existencias}
              onChange={(e) =>
                setNewProduct({ ...newProduct, existencias: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Stock Quantity"
            />
            <Select
              value={newProduct.categoria}
              onChange={(value) => setNewProduct({ ...newProduct, categoria: value || "" })}
              className="border rounded-lg"
              placeholder="Select a Category" 
              onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
            <Button
              color="blue"
              onClick={handleAddProduct}
              className="w-full mt-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
