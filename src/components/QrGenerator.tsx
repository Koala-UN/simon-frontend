import { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import { useAuth } from '../utils/getContext';
import Sidebar from './Sidebar';

const QrGenerator = () => {
  const [link, setLink] = useState<string>('');
  const [, setUserData] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user } = useAuth();

  // 🔹 Función para obtener el ID del usuario autenticado
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        

        setUserData(user); // Guardamos la respuesta para mostrarla en la UI

        if (isAuthenticated) {
          const userId = user.id;
          const reservationLink = `https://simon-frontend-xi.vercel.app/reserve/${userId}`;
          setLink(reservationLink);
          console.log("✅ Link generado:", reservationLink);
        } else {
          setError("⚠️ Usuario no autenticado. Inicia sesión para obtener el código QR.");
          console.error("❌ Error: Usuario no autenticado.");
        }
      } catch (err) {
        setError("❌ Error al obtener el estado de autenticación.");
        console.error("❌ Error al conectar con la API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [isAuthenticated, user]);

  // 🔹 Función para descargar el QR como imagen
  const handleDownload = async () => {
    if (qrRef.current === null) return;

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      console.error("❌ Error generando la imagen del QR:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Código QR</h1>

            {loading ? (
              <p className="text-gray-600">🔄 Cargando...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-md flex justify-center">
                  <QRCode value={link} />
                </div>
                <p className="text-sm text-gray-600 mt-4">Escanea este código QR para acceder a tu portal.</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleDownload}
                >
                  Descargar Código QR
                </button>


              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
