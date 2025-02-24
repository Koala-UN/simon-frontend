import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../utils/getContext";

const VerifyEmailFinal = () => {
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");
    const { setIsLoading } = useAuth();
    const [verified, setVerified] = useState<boolean>(false);
    const [reloaded, setReloaded] = useState<boolean>(false); // Estado para evitar recarga infinita


    useEffect(() => {
        const verifyEmail = async () => {
            console.log("🚀 ~ Verificando email con token:", token);
            setIsLoading(true);

            if (token) {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/verify-email?token=${token}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                        }
                    );
                    const data = await response.json();
                    if (data.status === "success") {
                        setVerified(true);
                    } else {
                        setVerified(false);
                    }
                } catch (error) {
                    console.error("Error verifying email:", error);
                }
            } else {
                setVerified(false);
            }
            setIsLoading(false);
        };

        verifyEmail();
    }, [setIsLoading, token]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
                {verified ? (
                    <>
                        <p className="text-3xl font-bold mb-4">¡Tu correo ha sido verificado exitosamente!</p>
                        <a href="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Ir a inicio
                        </a>
                    </>
                ) : (
                    <>
                        <p className="text-3xl font-bold mb-4">
                            Error al verificar el correo. Por favor, inténtalo de nuevo.
                        </p>
                        <a href="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Ir a inicio
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmailFinal;
