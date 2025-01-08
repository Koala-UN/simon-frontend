import { useState } from 'react';

const RecoveryPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el correo de recuperación de contraseña
        // Por ejemplo, una llamada a una API que maneje la recuperación de contraseñas
        try {
            const response = await fetch('http://localhost:5000/api/restaurant/rec-password', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo: email }),
                });
                const data = await response.json();
            setMessage('Se ha enviado un correo de recuperación a su dirección de correo electrónico.');
        } catch (error) {
            setMessage('Hubo un error al intentar enviar el correo de recuperación.');
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RecoveryPassword;