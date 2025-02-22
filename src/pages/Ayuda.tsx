

import { useState } from 'react';

const Ayuda = () => {
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

    const faqItems = [
        {
            question: '¿Cómo puedo crear una cuenta?',
            answer: 'Para crear una cuenta, haz clic en el botón "Registrarse" en la página de inicio y sigue las instrucciones.'
        },
        {
            question: '¿Cómo puedo hacer una reserva?',
            answer: 'Para hacer una reserva, inicia sesión en tu cuenta, selecciona el restaurante y la fecha, y sigue las instrucciones.'
        },
        {
            question: '¿Cómo puedo contactar con el soporte?',
            answer: 'Puedes contactarnos a través de nuestro correo electrónico: koalasimonapp@gmail.com'
        }
    ];

    const toggleFAQ = (index: number) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    return (
        <div className="p-5 text-center max-w-5xl my-4 mx-auto">
            <h1 className="text-3xl font-bold mb-4">Ayuda y Soporte</h1>
            <p className="mb-6">
                Bienvenido a la página de ayuda de Simon. Aquí encontrarás respuestas a preguntas frecuentes, guías y tutoriales, y formas de contactarnos para obtener asistencia adicional.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes (FAQ)</h2>
            <ul>
                {faqItems.map((item, index) => (
                    <li key={index} className="mb-4">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="text-center w-full font-bold focus:outline-none bg-gray-300 text-black py-3 px-6 rounded hover:bg-gray-400"
                        >
                            {item.question}
                        </button>
                        {activeFAQ === index && (
                            <p className="mt-2">{item.answer}</p>
                        )}
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Guías y Tutoriales</h2>
            <p className="mb-4">
                Aquí tienes algunos enlaces a guías y tutoriales que te ayudarán a aprovechar al máximo Simon:
            </p>
            

            <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
            <p className="mb-6">
                ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:koalasimonapp@gmail.com" className="text-blue-500 hover:underline">koalasimonapp@gmail.com</a>
            </p>

            <h2 className="text-2xl font-semibold mb-4">Política de Privacidad y Términos de Servicio</h2>
            <p>
                Puedes consultar nuestra <a href="/politica-privacidad" className="text-blue-500 hover:underline">Política de Privacidad</a> y nuestros <a href="/terminos-servicio" className="text-blue-500 hover:underline">Términos de Servicio</a> para obtener más información sobre cómo manejamos tus datos y las condiciones de uso de nuestro servicio.
            </p>
        </div>
    );
};

export default Ayuda;