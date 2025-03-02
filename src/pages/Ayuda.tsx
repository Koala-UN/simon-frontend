

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
        {
            question: "¿Qué hago si mi reserva no está disponible cuando llego al restaurante?",
            answer: "SIMON actúa como intermediario y no garantiza la disponibilidad de mesas, ya que esto depende exclusivamente del restaurante. Te recomendamos contactar directamente al restaurante con los datos proporcionados en el correo de confirmación para resolver cualquier inconveniente."
        },
        {
            question: "¿Cómo puedo cancelar una reserva hecha a través de SIMON?",
            answer: "La cancelación de reservas debe realizarse directamente con el restaurante. En el correo de confirmación que recibiste al hacer la reserva, encontrarás los datos de contacto del restaurante para gestionar la cancelación."
        },
        {
            question: "¿Quién es responsable si mi pedido llega incompleto o en mal estado?",
            answer: "Los aliados comerciales son los responsables de la calidad, cantidad y estado de los productos. SIMON solo facilita la comunicación del pedido y el pago, por lo que cualquier problema con el pedido debe resolverse directamente con el restaurante."
        },
        {
            question: "¿Qué pasa si el método de pago que registré no funciona?",
            answer: "Debes asegurarte de que el método de pago esté autorizado y cuente con fondos suficientes. Si hay un problema, verifica los detalles con tu banco o selecciona otro método de pago habilitado en la plataforma SIMON para completar la transacción."
        },
        {
            question: "¿Cómo recibo el pago por los pedidos como aliado comercial?",
            answer: "SIMON transfiere diariamente lo producido por tus pedidos, descontando una tarifa de servicio del 2%. Los pagos se procesan a través de los métodos habilitados en la plataforma y se depositan en la cuenta registrada por el aliado comercial."
        },
        {
            question: "¿Qué hago si olvidé mi contraseña de acceso a SIMON?",
            answer: "Si olvidaste tu contraseña, utiliza la opción de recuperación de cuenta en la plataforma. Si el problema persiste, puedes contactar al Centro de Ayuda en koalasimonapp@gmail.com para recibir asistencia."
        },
        {
            question: "¿SIMON cobra alguna tarifa adicional al cliente por usar la plataforma?",
            answer: "SIMON no cobra tarifas adicionales directamente a los clientes. Sin embargo, al confirmar tu solicitud en el Check-Out, se te informará claramente el costo total, que incluye el precio de los productos o servicios y cualquier tarifa adicional aplicada por el aliado comercial, si corresponde."
        },
        {
            question: "¿Cuánto tiempo tarda SIMON en responder a una queja o reclamo?",
            answer: "SIMON se compromete a responder en un plazo máximo de 10 días hábiles. Si no es posible responder en ese tiempo, se te informará el motivo de la demora y se dará una nueva fecha de respuesta, que no excederá 5 días hábiles adicionales."
        },
        {
            question: "¿Puedo usar SIMON para pedir comida a domicilio?",
            answer: "No, SIMON está diseñada exclusivamente para gestionar pedidos de clientes que se encuentren físicamente en el restaurante del aliado comercial. No ofrece servicios de entrega a domicilio."
        },
        {
            question: "¿Qué pasa si un aliado comercial no actualiza la disponibilidad de su menú?",
            answer: "Los aliados comerciales son responsables de mantener actualizada la información de sus menús, incluyendo disponibilidad y precios. SIMON no garantiza la exactitud de esta información, por lo que te sugerimos confirmar directamente con el restaurante antes de realizar tu pedido."
        },
        {
            question: "¿Menores de edad pueden usar SIMON?",
            answer: "Sí, pero los representantes legales de los menores son responsables por el uso que estos hagan de la plataforma, incluyendo cualquier transacción o interacción con los aliados comerciales."
        },
        {
            question: "¿Qué hago si detecto un uso no autorizado de mi cuenta?",
            answer: "Debes notificar inmediatamente a SIMON a través del Centro de Ayuda (koalasimonapp@gmail.com). Como usuario, eres responsable de custodiar tu información de acceso, y SIMON te recomienda aceptar notificaciones para detectar actividad sospechosa."
        },
        {
            question: "¿Por qué me suspendieron el acceso a la plataforma?",
            answer: "SIMON se reserva el derecho de suspender o desactivar cuentas que incumplan los Términos y Condiciones, como proporcionar información falsa, realizar actividades ilícitas o no cumplir con los pagos de suscripción (en el caso de aliados comerciales). Si tienes dudas, contacta al Centro de Ayuda para más detalles."
        },
        {
            question: "¿SIMON almacena los datos de mi tarjeta de crédito?",
            answer: "No, SIMON no almacena información de tarjetas de crédito o débito. Todos los pagos se procesan a través de pasarelas de pago seguras, y cualquier problema relacionado con el pago debe gestionarse con el aliado comercial o tu entidad bancaria."
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