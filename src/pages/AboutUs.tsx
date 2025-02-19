import React from 'react';
import { Typography } from "@material-tailwind/react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Luis Alfonso Pedraos Suarez",
      role: "Backend Developer",
      // We'll use a placeholder until you can provide local images
      imagePath: "src/assets/luis.jpg"
    },
    {
      name: "Haider Mayorga Vela",
      role: "Developer",
      imagePath: "src/assets/haider.jpg"
    },
    {
      name: "Martin Polanco Barrero",
      role: "Product Owner",
      imagePath: "src/assets/martin.jpg"
    },
    {
      name: "Cesar Fabian Rincon",
      role: "Team Member",
      imagePath: ""
    }]
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <Typography variant="h4" className="font-bold mb-6 text-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Acerca de Nosotros
        </Typography>
        
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestra Misión
          </Typography>
          <p className="text-gray-700">
            Simon centraliza y simplifica la gestión de reservas y pedidos en restaurantes, reduciendo errores operativos, tiempos de espera y frustraciones para los clientes, mediante un enfoque accesible, eficiente y de calidad.
          </p>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestra Visión
          </Typography>
          <p className="text-gray-700">
            Para el 2028, Simon será reconocido como el aliado esencial para restaurantes y sus clientes en Colombia, destacándose por ofrecer soluciones innovadoras y eficientes que transforman la experiencia de reservas y pedidos.
          </p>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestro Equipo
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow">
                <img
                  src={member.imagePath}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Contáctanos
          </Typography>
          <p className="text-gray-700">
            ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos a través de nuestro correo electrónico: contact@example.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;