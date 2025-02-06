import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (token) {
            setToken(token);
            fetch(`http://localhost:5000/api/restaurant/verify-email?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        setMessage('Correo verificado exitosamente');
                    } else {
                        setMessage('Error al verificar el correo');
                    }
                })
                .catch(error => {
                    setMessage('Error al verificar el correo');
                });
        }
    }, [location]);

    return (
        <div>
            {token ? (
                <p>{message || 'Verificando tu correo electrónico...'}</p>
            ) : (
                <p>Token no válido o faltante.</p>
            )}
        </div>
    );
};

export default VerifyEmail;