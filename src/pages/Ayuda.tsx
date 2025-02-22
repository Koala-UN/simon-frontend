

const Ayuda = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Ayuda y Soporte</h1>
            <p>
                Bienvenido a la página de ayuda de Simon. Aquí encontrarás respuestas a preguntas frecuentes, guías y tutoriales, y formas de contactarnos para obtener asistencia adicional.
            </p>

            <h2>Preguntas Frecuentes (FAQ)</h2>
            <ul>
                <li>
                    <strong>¿Cómo puedo crear una cuenta?</strong><br />
                    Para crear una cuenta, haz clic en el botón "Registrarse" en la página de inicio y sigue las instrucciones.
                </li>
                <li>
                    <strong>¿Cómo puedo hacer una reserva?</strong><br />
                    Para hacer una reserva, inicia sesión en tu cuenta, selecciona el restaurante y la fecha, y sigue las instrucciones.
                </li>
                <li>
                    <strong>¿Cómo puedo contactar con el soporte?</strong><br />
                    Puedes contactarnos a través de nuestro correo electrónico: <a href="mailto:koalasimonapp@gmail.com">koalasimonapp@gmail.com</a>
                </li>
            </ul>

            <h2>Guías y Tutoriales</h2>
            <p>
                Aquí tienes algunos enlaces a guías y tutoriales que te ayudarán a aprovechar al máximo Simon:
            </p>
            <ul>
                <li><a href="/guia-crear-cuenta">Cómo crear una cuenta</a></li>
                <li><a href="/guia-hacer-reserva">Cómo hacer una reserva</a></li>
                <li><a href="/guia-contactar-soporte">Cómo contactar con el soporte</a></li>
            </ul>

            <h2>Contáctanos</h2>
            <p>
                ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:koalasimonapp@gmail.com">koalasimonapp@gmail.com</a>
            </p>

            <h2>Política de Privacidad y Términos de Servicio</h2>
            <p>
                Puedes consultar nuestra <a href="/politica-privacidad">Política de Privacidad</a> y nuestros <a href="/terminos-servicio">Términos de Servicio</a> para obtener más información sobre cómo manejamos tus datos y las condiciones de uso de nuestro servicio.
            </p>
        </div>
    );
};

export default Ayuda;