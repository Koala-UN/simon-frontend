import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../utils/getContext";
import {
// Card,
// CardHeader,
// CardBody,
Typography,
Button,
Input,
} from "@material-tailwind/react";
// import QrGenerator from "../components/QrGenerator";
import { FullRestaurant } from "../types/interfaces";

function EditProfile() {
const [profile, setProfile] = useState<FullRestaurant | null>(null);
const { isAuthenticated, user } = useAuth();
const [previewImage, setPreviewImage] = useState<File | null>(null);
// const [editMode, setEditMode] = useState<boolean>(false);
// const [imageUrl, setImageUrl] = useState<string>("");
// const [editMode, setEditMode] = useState<boolean>(false);
// const [formData, setFormData] = useState<FormData>({
//     nombre: "",
//     correo: "",
//     telefono: "",
//     descripcion: "",
//     fotoPerfil: null,
//   }: FormData;


// const [previewImage, setPreviewImage] = useState<File | null>(null);

// const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileList = event.target.files;
//     if (fileList && fileList.length > 0) {
//       setPreviewImage(fileList[0]);
//       setFormData({ ...formData, fotoPerfil: fileList[0] });
//     } else {
//       setPreviewImage(null);
//     }
//   };

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
                console.log("🚀 ~ file: EditProfile.tsx ~ line 64 ~ fetchProfile ~ data", data)
            } else {
                console.error("Error fetching profile:", data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    fetchProfile();
}, [isAuthenticated, user.id]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (profile) {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }
};

const handleSave = async () => {
    if (!profile) return;

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profile),
            }
        );

        if (response.ok) {
            alert("Profile updated successfully!");
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
                    className="font-bold text-blue-600 mb-4 text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                    Perfil del restaurante
                </Typography>
                {profile && (
                    <>
                        { previewImage && (
                            <div className="flex justify-center mb-4 relative">
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    X
                                </button>
                                <img
                                    src={"https://res.cloudinary.com/dnljvvheg/image/upload/f_auto,q_auto/simon-logo"}
                                    alt="Vista previa de la foto de perfil"
                                    className=" h-32 w-32 object-cover rounded-full shadow-md"
                                />
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 gap-4">
                            <Input
                                type="text"
                                name="nombre"
                                value={profile.nombre}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Name" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
                            <Input
                                type="email"
                                name="email"
                                value={profile.correo}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Email" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
                            <Input
                                type="text"
                                name="phone"
                                value={profile.telefono}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Phone" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
                            <Input
                                type="text"
                                name="address"
                                value={profile.descripcion}
                                onChange={handleInputChange}
                                className="border rounded-lg px-3 py-2"
                                placeholder="Address" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
                            <Button
                                color="blue"
                                onClick={handleSave}
                                className="w-full mt-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                Guardar cambios
                            </Button>
                        </div>
                    </>
                )}
           {/* <QrGenerator /> */}
        </div>
    </div>
);
}

export default EditProfile;