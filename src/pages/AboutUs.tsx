import { Typography } from "@material-tailwind/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles/animations.css";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Luis Alfonso Pedraos Suarez",
      role: "Backend Developer",
      // We'll use a placeholder until you can provide local images
      imagePath: "src/assets/luis.jpg",
      github: "https://github.com/brosgor",
      linkedin: "https://www.linkedin.com/in/alfonso-dev/"
    },
    {
      name: "Haider Mayorga Vela",
      role: "Front dev",
      imagePath: "src/assets/haider.jpg",
      github: "https://github.com/hmayorgav",
      linkedin: "https://www.linkedin.com/in/haider-andres-mayorga-vela-205241241/"
    },
    {
      name: "Martin Polanco Barrero",
      role: "Product Owner",
      imagePath: "src/assets/martin.jpg",
      github: "https://github.com/mpolancob",
      linkedin: "https://www.linkedin.com/in/martin-polanco-14aa91140/"
    },
    {
      name: "Cesar Fabian Rincon",
      role: "Back dev",
      imagePath:  "src/assets/fabian.jpg",
      github: "https://github.com/CesarFRR",
      linkedin: "https://www.linkedin.com/in/c%C3%A9sar-fabi%C3%A1n-r-4b4731139/"
    }]

  return (
    <div className="p-6 bg-gray-100 min-h-screen fade-in">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 slide-in">
        <Typography variant="h4" className="font-bold mb-6 text-center" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
          Acerca de Nosotros
        </Typography>
        
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Nuestra Misión
          </Typography>
          <p className="text-gray-700">
            Simon centraliza y simplifica la gestión de reservas y pedidos en restaurantes, reduciendo errores operativos, tiempos de espera y frustraciones para los clientes, mediante un enfoque accesible, eficiente y de calidad.
          </p>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Nuestra Visión
          </Typography>
          <p className="text-gray-700">
            Para el 2028, Simon será reconocido como el aliado esencial para restaurantes y sus clientes en Colombia, destacándose por ofrecer soluciones innovadoras y eficientes que transforman la experiencia de reservas y pedidos.
          </p>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Nuestro Equipo
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow fade-in">
                <img
                  src={member.imagePath}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg text-center">{member.name}</h3>
                <p className="text-gray-600 text-center">{member.role}</p>
                <div className="flex space-x-4 mt-2">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-gray-600 hover:text-gray-800" size={24} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-gray-600 hover:text-gray-800" size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined}  onPointerLeaveCapture= {()=> {}}>
            Contáctanos
          </Typography>
          <p className="text-gray-700">
            ¿Tienes alguna pregunta o sugerencia? No dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:koalasimonapp@gmail.com" className="text-blue-500">koalasimonapp@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;