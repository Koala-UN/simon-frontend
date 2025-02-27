import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../utils/getContext";
import {
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { FullRestaurant } from "../types/interfaces";
import defaultUserImage from "../assets/sign.png";
import RestaurantImages from "../components/RestaurantImages";
const departamentos = [
  { id: 1, nombre: "Cundinamarca" },
  { id: 2, nombre: "Norte de Santander" },
  { id: 3, nombre: "Tolima" },
];

const ciudades = [
  { id: 1, departamentoId: 1, nombre: "Bogotá" },
  { id: 2, departamentoId: 2, nombre: "Cúcuta" },
  { id: 3, departamentoId: 3, nombre: "Ibagué" },
];
interface ciudadesType {
  id: number;
  departamentoId: number;
  nombre: string;
}

interface EditProfileType {
  id: number;
  nombre: string;
  telefono: string;
  capacidadReservas: number;
  descripcion: string;
  categoria: string;
  direccion: string;
  ciudadId: number;
  departamentoId: number;
  imageUrl: File | null;
};
interface Image {
    url: string;
    }

function EditProfile() {
  const [profile, setProfile] = useState<FullRestaurant | null>(null);
  const [editProfile, setEditProfile] = useState<EditProfileType | null>(null);
  const { isAuthenticated, user, setUser } = useAuth();
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [departamentoId, setDepartamentoId] = useState<number>(0);
  const [imagenesRestaurante, setImagenesRestaurante] = useState<Image[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user.id) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (response.ok) {
          setProfile(data.data);
          console.log("🚀 ~ file: Editprofile.tsx ~ line 64 ~ fetchProfile ~ data", data)
          // descargamos la imagen para hacerla ObjectURL y listo:
          const responseImage = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/proxy/github-image?url=${encodeURIComponent(data.data.imageUrl)}`
          );
            const blob = await responseImage.blob();
            const file = new File([blob], "imageUrl");
            setPreviewImage(file);
          setEditProfile({
            id: data.data.id,
            nombre: data.data.nombre,
            telefono: data.data.telefono,
            capacidadReservas: data.data.capacidadReservas,
            descripcion: data.data.descripcion,
            categoria: data.data.categoria,
            direccion: data.data.address.direccion,
            ciudadId: data.data.address.ciudadId,
            departamentoId: data.data.address.ciudad.departamentoId,
            imageUrl: file,
          });
          setDepartamentoId(data.data.address.ciudad.departamentoId);
          // hagamos lo de previewImage

        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log("🚀 ~ file: Editprofile.tsx ~ line 94 ~ handleInputChange ~ e", e.target.name, e.target.value)
    if (editProfile) {
      if (e.target.name === "departamentoId") {
        setDepartamentoId(Number(e.target.value));
      }
      setEditProfile({
        ...editProfile,
        [e.target.name]: e.target.value,
      });
      console.log("🚀 ~ file: Editprofile.tsx ~ line 101 ~ handleInputChange ~ editProfile", editProfile)
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      console.log("archivo cargado", fileList[0], "    ", fileList[0].name);
      setEditProfile({ ...editProfile, imageUrl: fileList[0] } as EditProfileType);
      console.log("newProduct", editProfile);
      setPreviewImage(fileList[0]);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpdateImages = async () => {
    if (!editProfile) return;
    try {
      // solo enviar la lista

      const lista = imagenesRestaurante.map((image) => image.url);
      // si la lista esta vacia, no enviar nada
      if (lista.length === 0) return
      
        console.log("🚀 ~ file: Editprofile.tsx ~ line 123 ~ handleUpdateImages ~ lista", lista)
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}/images/restaurant`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ images: lista }),
            headers: {
                "Content-Type": "application/json",
            },
        }
      );

      if (response.ok) {
       // alert("Imágenes actualizadas exitosamente!");
      } else {
        console.error("Error updating images.");
      }
    } catch (error) {
      console.error("Error updating images:", error);
    }
  }

  const handleSave = async () => {
    if (!editProfile) return;

    try {
        console.log("AQUI ESTA LA LISTA DE IMAGENES: ", imagenesRestaurante);
        await handleUpdateImages();
      const formData = new FormData();
      formData.append("id", editProfile.id.toString());
      formData.append("nombre", editProfile.nombre?? "");
      formData.append("telefono", editProfile.telefono?? "");
      formData.append("capacidadReservas", editProfile.capacidadReservas? editProfile.capacidadReservas.toString() : "0");
      formData.append("descripcion", editProfile.descripcion?? "");
      formData.append("categoria", editProfile.categoria?? "");
      formData.append("direccion", editProfile.direccion?? "");
      formData.append("ciudadId", editProfile.ciudadId.toString());
      formData.append("departamentoId", editProfile.departamentoId.toString());
      if (previewImage) {
        formData.append("imageUrl", previewImage);
      }else{
        // usar defaultUserImage
        const responseImage = await fetch(defaultUserImage);
        const blob = await responseImage.blob();
        const file = new File([blob], "imageUrl");
        formData.append("imageUrl", file);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {

        const data = await response.json();
        
        setProfile(data.data);
        console.log("🚀 ~ file: Editprofile.tsx ~ line 153 ~ handleSave ~ data", data)
        setUser({ ...user, nombre: data.data.nombre, imageUrl: data.data.imageUrl });
        alert("Perfil actualizado exitosamente!");
      } else {
        console.error("Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

    return (
        <div className="flex flex-col lg:flex-row justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
            <Sidebar />
            <div className="flex flex-col lg:w-3/4 px-4 py-6">
                <Typography
                    variant="h4"
                    className="font-bold text-blue-600 mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
                    Perfil del restaurante
                </Typography>
                {profile && (
                    <>
                        {previewImage && (
                            <div className="flex justify-center mb-4 relative">
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    X
                                </button>
                                <img
                                    src={URL.createObjectURL(previewImage)}
                                    alt="Vista previa de la foto de perfil"
                                    className="h-32 w-32 object-cover rounded-full shadow-md"
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
                        <div className="grid grid-cols-1 gap-4">
                            <Input onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                type="text"
                                name="nombre"
                                value={editProfile? editProfile.nombre : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Nombre" crossOrigin={undefined} />

                                {/* seccion de las imagenes pero antes un titulo, antes de las imagenes: */}
                                <div className="text-center mt-1 pt-4 ">
                                    <p className="font-sans text-2xl leading-snug font-bold text-blue-600 mb-4 text-center ">Imágenes del restaurante</p>
                                </div>

                                <RestaurantImages images={imagenesRestaurante
                                } 
                                setImages={setImagenesRestaurante} />
                                
                                
                            <Input onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                type="text"
                                name="telefono"
                                value={editProfile? editProfile.telefono : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Teléfono" crossOrigin={undefined} />
                            <Input onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                type="number"
                                name="capacidadReservas"
                                value={editProfile? editProfile.capacidadReservas : 0}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Capacidad de Reservas" crossOrigin={undefined} />
                            <textarea
                                name="descripcion"
                                value={editProfile? editProfile.descripcion : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Descripción"
                            />
                            <Input onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                type="text"
                                name="direccion"
                                value={editProfile? editProfile.direccion : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Dirección" crossOrigin={undefined} />
                            <select
                                name="categoria"
                                value={editProfile? editProfile.categoria : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="" disabled>
                                    Selecciona una categoría
                                </option>
                                <option value="Comida Rápida">Comida Rápida</option>
                                <option value="Casual Dining">Casual Dining</option>
                                <option value="Fine Dining">Fine Dining</option>
                                <option value="Cafetería">Cafetería</option>
                                <option value="Bar y Grill">Bar y Grill</option>
                                <option value="Pizzería">Pizzería</option>
                                <option value="Marisquería">Marisquería</option>
                                <option value="Buffet">Buffet</option>
                                <option value="Restaurante Temático">Restaurante Temático</option>
                                <option value="Food Truck">Food Truck</option>
                                <option value="Vegetariano/Vegano">Vegetariano/Vegano</option>
                                <option value="Asador/Parrilla">Asador/Parrilla</option>
                                <option value="Panadería y Repostería">Panadería y Repostería</option>
                                <option value="Cocina Internacional">Cocina Internacional</option>
                                <option value="Cocina Regional">Cocina Regional</option>
                            </select>
                            <select
                                name="departamentoId"
                                value={editProfile? editProfile.departamentoId : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="" disabled>
                                    Selecciona un departamento
                                </option>
                                {departamentos.map((departamento) => (
                                    <option key={departamento.id} value={departamento.id}>
                                        {departamento.nombre}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="ciudadId"
                                value={editProfile? editProfile.ciudadId : ""}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                            >
                                <option value="" disabled>
                                    Selecciona una ciudad
                                </option>
                                {ciudades
                                    .filter((ciudad: ciudadesType) => ciudad.departamentoId === departamentoId)
                                    .map((ciudad: { id: number; nombre: string }) => (
                                        <option key={ciudad.id} value={ciudad.id}>
                                            {ciudad.nombre}
                                        </option>
                                    ))}
                            </select>
                            <Button
                                color="blue"
                                onClick={handleSave}
                                className="w-full mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                                Guardar cambios
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditProfile;