

import { useState } from 'react';

const Ayuda = () => {
    const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

    const faqItems = [
        {
            question: "¿Cómo puedo contactar con el soporte?",
            answer: "Si necesitas ayuda o tienes alguna duda, contactar con nuestro equipo de soporte es muy sencillo y estamos encantados de ayudarte. La mejor manera de hacerlo es enviándonos un correo electrónico a koalasimonapp@gmail.com. Cuando nos escribas, te sugerimos que incluyas un poco de información sobre lo que necesitas resolver —por ejemplo, si tienes un problema con un pedido, una consulta sobre cómo usar la plataforma o cualquier otra inquietud. Esto nos ayuda a darte una respuesta más rápida y personalizada. Solemos responder en un plazo de 24 a 48 horas, pero si tu caso es urgente, no dudes en mencionarlo en el asunto del correo (algo como 'Urgente: ayuda con pedido') y trataremos de atenderte lo antes posible. Queremos que tu experiencia sea la mejor, así que no dudes en escribirnos cuando lo necesites."
        },
        {
            question: "¿Cómo puedo hacer un pedido?",
            answer: "Hacer un pedido con nosotros es un proceso práctico y directo. Para empezar, entra a nuestra plataforma —ya sea la web o la app— y dirígete a la sección de pedidos, que обычно está bien señalada en el menú. Allí encontrarás una lista con todos los productos o platos que ofrecemos; navega un poco y selecciona el que quieras haciendo clic en él. Luego, te pediremos que indiques la cantidad que deseas pedir —puede ser 1 unidad, 2, 5 o las que necesites, solo ajusta el número según lo que quieras. Cuando tengas tu pedido listo, pasamos al pago. Usamos Mercado Pago como nuestro método de pago, que es seguro y fácil de usar. Serás redirigido a su plataforma, donde podrás pagar con tu cuenta de Mercado Pago, tarjeta de débito o crédito. Una vez que completes la transacción, recibirás un comprobante con un ID único que empieza con '#', por ejemplo, '#1234'. Para verificar tu pedido con nosotros, solo toma los números después del '#' —en este caso, '1234'— y envíanos ese código por correo o en la sección de verificación de la plataforma. Así confirmamos que todo está en orden y tu pedido estará en camino en poco tiempo."
        },
 
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