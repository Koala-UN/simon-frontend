import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button, Select, Option } from "@material-tailwind/react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import Sidebar from "./Sidebar";

function Inventory() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
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

  // Obtener el ID del restaurante desde la API auth-status
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurant/auth-status", {
          method: "GET",
          credentials: "include",
        });
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

  // Obtener los platos del restaurante
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

  // Eliminar un plato
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

  // Agregar un nuevo producto
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
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
      <Sidebar/>
      <div className="w-3/4  md:w-3/4 bg-white rounded-lg shadow-lg m-6 ">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Panel izquierdo */}
          <div className="col-span-2 p-4">
            <Typography
              variant="h4"
              className="font-bold text-blue-600 mb-6 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Inventory Management
            </Typography>
            <Typography
              variant="h5"
              className="font-semibold mb-4 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              Menu Items
            </Typography>
            <div className="border-b border-gray-300 my-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="w-full flex flex-col sm:flex-row items-center p-2 shadow-sm border rounded-lg hover:shadow-lg transition"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-24 h-24 shrink-0 rounded-lg overflow-hidden"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/80"}
                      alt={item.nombre}
                      className="h-full w-full object-cover"
                    />
                  </CardHeader>

                  <CardBody className="flex-1 flex flex-col gap-1 px-4 py-2"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-sm font-semibold truncate"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      {item.nombre || "Producto sin nombre"}
                    </Typography>
                    <Typography
                      color="gray"
                      className="text-xs truncate"
                      style={{ maxWidth: "200px" }}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      {item.descripcion || "Sin descripción"}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-sm font-bold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      ${parseFloat(item.precio).toLocaleString()} COP
                    </Typography>
                  </CardBody>

                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <FaPen className="text-gray-500 cursor-pointer" />
                    <Button
                      size="sm"
                      className="bg-transparent p-1 w-6 h-6 flex justify-center items-center rounded-full"
                      onClick={() => handleDelete(item.id)}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      <FaTrashAlt color="red" className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Panel derecho */}
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <Typography variant="h6" className="mb-4 text-blue-700 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Add New Product
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography className="text-sm font-semibold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Name</Typography>
                <input
                  type="text"
                  value={newProduct.nombre}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, nombre: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Description
                </Typography>
                <input
                  type="text"
                  value={newProduct.descripcion}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter product description"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Price</Typography>
                <input
                  type="number"
                  value={newProduct.precio}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, precio: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter product price"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Stock Quantity
                </Typography>
                <input
                  type="number"
                  value={newProduct.existencias}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, existencias: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <Typography className="text-sm font-semibold"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  Category
                </Typography>
                <Select
                  value={newProduct.categoria}
                  onChange={(value) =>
                    setNewProduct({ ...newProduct, categoria: value || "" }) // Ensures it's always a string
                  }
            className="w-full"
                  placeholder="Select a category"   onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </div>
              <Button
                size="lg"
                color="blue"
                className="w-full mt-6"
                onClick={handleAddProduct}   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;