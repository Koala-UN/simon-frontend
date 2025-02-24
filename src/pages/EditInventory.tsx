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
import { useAuth } from "../utils/getContext";
interface MenuItem {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  existencias: string;
  categoria: string;
  imageUrl?: string;
}

interface NewProduct {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: string;
  existencias: string;
  categoria: string;
  imageUrl: File | null;
}


function Inventory() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    nombre: "",
    descripcion: "",
    precio: "",
    existencias: "",
    categoria: "",
    imageUrl: null as File | null,
  });
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const { isAuthenticated, setIsLoading, user } = useAuth();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
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

        if (isAuthenticated) {
          setRestaurantId(user.id);
        } else {
          console.error("No autenticado o error en la API de auth-status.");
        }
      } catch (error) {
        console.error("Error al obtener auth-status:", error);
      }
    };

    fetchAuthStatus();
  }, [isAuthenticated, user.id]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!restaurantId) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/dish/restaurant/${restaurantId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
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
  }, [restaurantId, newProduct]);

  useEffect(() => {
    console.log("newProduct", newProduct);
  }, [newProduct]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      console.log("archivo cargado", fileList[0], "    ", fileList[0].name);
      setNewProduct({ ...newProduct, imageUrl: fileList[0] });
      console.log("newProduct", newProduct);
      setPreviewImage(fileList[0]);
      setImageUrl(URL.createObjectURL(fileList[0]));
    } else {
      setPreviewImage(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dish/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setMenuItems((prev) => prev.filter((item) => item.id !== id));
        const data = await response.json();
        console.log("EXITO, datos recibidos: ", data);
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
      !newProduct.categoria ||
      !newProduct.imageUrl
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("nombre", newProduct.nombre);
      formData.append("descripcion", newProduct.descripcion);
      formData.append("precio", newProduct.precio);
      formData.append("existencias", newProduct.existencias);
      formData.append("categoria", newProduct.categoria);
      formData.append("restauranteId", restaurantId.toString());
      if (newProduct.imageUrl) {
        formData.append("imageUrl", newProduct.imageUrl);
      }
      console.log("formData para el plato: ");
      formData.forEach((value, key) => console.log(key, ": ", value));
  
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/dish", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("EXITO, datos recibidos: ", data);
        setMenuItems((prev) => [...prev, data.data]);
        setNewProduct({
          nombre: "",
          descripcion: "",
          precio: "",
          existencias: "",
          categoria: "",
          imageUrl: null,
        });
        setPreviewImage(null);
      } else {
        console.log(response);
        console.error("Error al agregar el producto.");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al intentar agregar el producto:", error);
    }
  };

  function handleEdit(item: MenuItem): void {
    setEditMode(true);
  
    const fetchImageAsFile = async (url: string) => {
      const newUrl = url && typeof url === 'string' ? url.replace(/^http:/, 'https:') : url;
      const response = await fetch(newUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      return file;
    };
  
    const updateProductWithImage = async () => {
      const imageFile = item.imageUrl ? await fetchImageAsFile(item.imageUrl) : null;
      setNewProduct({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio,
        existencias: item.existencias,
        categoria: item.categoria,
        imageUrl: imageFile,
      });
      setPreviewImage(imageFile);
    };
  
    updateProductWithImage();
  }

  const handleEditSend = async () => {
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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("nombre", newProduct.nombre);
      formData.append("descripcion", newProduct.descripcion);
      formData.append("precio", newProduct.precio);
      formData.append("existencias", newProduct.existencias);
      formData.append("categoria", newProduct.categoria);
      formData.append("restauranteId", restaurantId.toString());
      if (newProduct.imageUrl) {
        formData.append("imageUrl", newProduct.imageUrl);
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dish/${newProduct.id}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("EXITO EDIT, datos recibidos: ", data);
        setMenuItems((prev) =>
          prev.map((item) => (item.id === data.data.id ? data.data : item))
        );
        setNewProduct({
          nombre: "",
          descripcion: "",
          precio: "",
          existencias: "",
          categoria: "",
          imageUrl: null,
        });
        setPreviewImage(null);
        setEditMode(false);
      } else {
        console.log(response);
        const dataerror = await response.json();
        console.log(dataerror);
        console.error("Error al actualizar el producto.");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al intentar actualizar el producto:", error);
    }

  }

  return (
    <div className="flex flex-col lg:flex-row justify-between min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <Sidebar />
      <div className="flex flex-col  px-4 py-2 lg:flex-row w-full">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:mb-0 w-full">
          <Typography
            variant="h4"
            className="font-bold text-blue-600 mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}          >
            Gestión de inventario
          </Typography>
          <Typography
            variant="h5"
            className="font-semibold mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}          >
            Items del menú
          </Typography>

          <div className="grid xl:grid-cols-3 gap-1 md:grid-cols-2
          grid-cols-1 w-full"       >
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="flex flex-col items-center p-5 shadow-sm border rounded-lg hover:shadow-lg transition" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}              >
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="w-full h-auto max-w-xs rounded-lg overflow-hidden" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}                >
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/80"}
                    alt={item.nombre}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody className="text-center" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
                  <Typography variant="h6" className="font-bold truncate" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
                    {item.nombre || "Producto sin nombre"}
                  </Typography>
                  <Typography className="text-sm truncate text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
                    {item.descripcion || "Sin descripción"}
                  </Typography>
                  <Typography className="font-semibold" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
                    ${parseFloat(item.precio).toLocaleString()} COP
                  </Typography>
                </CardBody>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => handleEdit(item)}
                    children={<FaPen className="text-gray-500 cursor-pointer" />}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={() => {}}
                  />
                  <Button
                    size="sm"
                    variant="text"
                    onClick={() => handleDelete(item.id)}
                    children={<FaTrashAlt color="red" />}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                     onPointerLeaveCapture= {()=> {}}                  >

                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 m-0 mt-0 w-full lg:w-1/2 sm:mx-0  md:mx-4">
          <Typography
            variant="h6"
            className="text-blue-600 font-semibold mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}          >
            {editMode ? (
              <div className="relative">
                Actualizar producto
                <button
                  className="absolute top-0 right-0 bg-blue-500 text-white rounded-full px-4 flex items-center justify-center"
                  onClick={() => {

                    setNewProduct({
                      nombre: "",
                      descripcion: "",
                      precio: "",
                      existencias: "",
                      categoria: "",
                      imageUrl: null,
                    });
                    setPreviewImage(null);
                    setEditMode(false);
                  }}
                >
                  Salir del modo editor
                </button>
              </div>
            ) : (
              "Agregar nuevo producto"
            )}
          </Typography>
          <div className="grid grid-cols-1 gap-4">
            {previewImage && (
              <div className="flex justify-center mb-4 relative">
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => setPreviewImage(null)}
                >
                  X
                </button>
                
                <img
                  src={imageUrl && typeof imageUrl === 'string' ? imageUrl.replace(/^http:/, 'https:') : imageUrl}
                  alt="Vista previa de la foto de perfil"
                  className="w-32 h-32 object-cover rounded-sm shadow-md"
                />
                
              </div>
            )}
            <div className="flex justify-center">
              <label className="w-full flex flex-col items-center px-4 py-1 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg className="w-8 h-8 py-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 4.707 5.293a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                </svg>
                <span className="my-1 text-base leading-normal">Selecciona una foto</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
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
              onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
            {editMode? <Button
              color="blue"
              onClick={handleEditSend}
              className="w-full mt-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}            >
              Guardar cambios
            </Button> : <Button
              color="blue"
              onClick={handleAddProduct}
              className="w-full mt-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}            >
              Agregar Producto
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
