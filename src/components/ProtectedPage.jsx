import React, { useEffect, useState } from 'react';
import Logout from './Logout';
import { isAuthenticated } from '../services/authService';

const ProtectedPage = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/restaurant/protected', {
            method: 'GET',
            credentials: 'include', // Incluye cookies en la solicitud
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">Bienvenido</h1>
                <p className="lead">Esta es una página protegida.</p>
                <hr className="my-4" />
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando...</p>}
            </div>
            <Logout />
        </div>
    );
};

export default ProtectedPage;