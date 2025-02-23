import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../utils/getContext';

const VerifyEmailSend = () => {
    const { setIsLoading } = useAuth();
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const {isAuthenticated, user } = useAuth();
    const userRef = useRef(user);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        const sendVerificationEmail = async () => {
            setIsLoading(true);
            try {
                if (!isAuthenticated || !userRef.current?.correo) {
                    console.error('User is not authenticated or does not have an email' , userRef.current, isAuthenticated);
                    setEmailSent(false);
                    setIsLoading(false);
                    return;
                }
                console.log("🚀 ~ file: VerifyEmailSend.tsx ~ line 33 ~ sendVerificationEmail ~ user", userRef.current, isAuthenticated)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/verify-email-send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({correo: userRef.current?.correo}),
                    credentials: 'include',
                });
                const data = await response.json();
                console.log("🚀 ~ file: VerifyEmailSend.tsx ~ line 43 ~ sendVerificationEmail ~ data", data)
                if (data.status === 'success') {
                    setEmailSent(true);
                } else {
                    setEmailSent(false);
                }
            } catch (error) {
                console.error('Error sending verification email:', error);
                setEmailSent(false);
            }
            setIsLoading(false);
        };
        sendVerificationEmail();
    }, [isAuthenticated, setIsLoading]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Enviar Verificación de Correo</h1>
                {emailSent ? (
                    <p className="text-3xl font-bold mb-4">Hemos enviado un correo de verificación a tu bandeja de entrada, por favor revisa tu correo.</p>
                ) : (
                    <p className="text-3xl font-bold mb-4">Error al enviar el correo de verificación. Por favor, inténtalo de nuevo.</p>
                )}
                <a href="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Ir a inicio</a>
            </div>
        </div>
    );
};

export default VerifyEmailSend;