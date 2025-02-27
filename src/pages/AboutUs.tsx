import { Typography } from "@material-tailwind/react";
import { FaGithub, FaLinkedin, FaPalette } from "react-icons/fa";
import { FaLightbulb, FaRocket, FaMobile, FaUserCheck } from "react-icons/fa";
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import "../styles/animations.css";
import luisImg from "../assets/luis.jpg";
import haiderImg from "../assets/haider.jpg";
import martinImg from "../assets/martin.jpg";
import fabianImg from "../assets/fabian.jpg";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Luis Alfonso Pedraos Suarez",
      role: "Backend Developer",
      // We'll use a placeholder until you can provide local images
      imagePath: luisImg,
      github: "https://github.com/brosgor",
      linkedin: "https://www.linkedin.com/in/alfonso-dev/"
    },
    {
      name: "Haider Mayorga Vela",
      role: "Front dev",
      imagePath: haiderImg,
      github: "https://github.com/hmayorgav",
      linkedin: "https://www.linkedin.com/in/haider-andres-mayorga-vela-205241241/"
    },
    {
      name: "Martin Polanco Barrero",
      role: "Product Owner",
      imagePath: martinImg,
      github: "https://github.com/mpolancob",
      linkedin: "https://www.linkedin.com/in/martin-polanco-14aa91140/"
    },
    {
      name: "Cesar Fabian Rincon",
      role: "Back dev",
      imagePath:  fabianImg,
      github: "https://github.com/CesarFRR",
      linkedin: "https://www.linkedin.com/in/c%C3%A9sar-fabi%C3%A1n-r-4b4731139/"
    }]

  const values = [
    {
      title: "Innovación",
      description: "Simon ofrece una plataforma tecnológica que centraliza y mejora la gestión de reservas y pedidos en restaurantes.",
      icon: <FaLightbulb className="text-3xl text-yellow-500 mb-3" />
    },
    {
      title: "Eficiencia",
      description: "Simon busca optimizar la operación diaria de los restaurantes, reduciendo tiempos de espera y simplificando procesos para los administradores y clientes.",
      icon: <FaRocket className="text-3xl text-blue-500 mb-3" />
    },
    {
      title: "Accesibilidad",
      description: "Simon se caracteriza por ser de fácil uso y desde cualquier dispositivo.",
      icon: <FaMobile className="text-3xl text-green-500 mb-3" />
    },
    {
      title: "Calidad en la Experiencia del Cliente",
      description: "Simon prioriza una experiencia intuitiva y satisfactoria tanto para los restaurantes como para los comensales. Esto incluye un diseño atractivo y funcionalidades que mejoran la interacción entre el restaurante y sus clientes.",
      icon: <FaUserCheck className="text-3xl text-purple-500 mb-3" />
    }
  ];

  const brandColors = [
    {
      name: "Naranja Claro",
      hex: "#FF3B30",
      description: "Color principal que representa la marca, transmitiendo energía, entusiasmo y apetito."
    },
    {
      name: "Amarillo Oscuro",
      hex: "#FFA50F",
      description: "Color secundario que complementa al naranja, aportando sofisticación y equilibrio a la paleta."
    },
    {
      name: "Negro Grisáceo",
      hex: "#333333",
      description: "Color utilizado para el texto y elementos de interfaz, proporcionando contraste y legibilidad."
    }
  ];

  const socialMedia = [
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/koalasimonapp",
      name: "Instagram",
      username: "@koalasimonapp"
    },
    {
      icon: FaTiktok,
      link: "https://www.tiktok.com/@koalasimonapp",
      name: "TikTok",
      username: "@koalasimonapp"
    }
  ];

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
          <Typography variant="h5" className="font-semibold mb-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestros Valores
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm fade-in">
                <div className="flex flex-col items-center text-center">
                  {value.icon}
                  <h3 className="text-lg font-semibold text-black-600 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-700">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  variant="h5" className="font-semibold mb-4">
            Nuestra Identidad Visual
          </Typography>
          <div className="bg-simon-bg-warm p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <FaPalette className="text-3xl text-simon-primary mr-3" />
              <p className="text-gray-700">
                Nuestra paleta de colores ha sido cuidadosamente seleccionada para transmitir la calidez y energía de la experiencia gastronómica.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {brandColors.map((color, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div 
                    className="w-full h-20 rounded-lg mb-3" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="font-semibold text-lg mb-2">{color.name}</h4>
                  <p className="text-sm text-gray-600">{color.description}</p>
                  <p className="text-sm font-mono mt-2 text-gray-500">{color.hex}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-700">
              Los tres colores pertenecen a la misma familia cromática (cálidos), creando una sensación de armonía y cohesión visual que se relaciona con el contexto de restaurantes, reservas, pedidos y la calidez de compartir en una mesa.
            </p>
          </div>
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
          <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}  variant="h5" className="font-semibold mb-4" >
            Síguenos en Redes Sociales
          </Typography>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <social.icon className="h-8 w-8 text-simon-primary" />
                <div>
                  <h4 className="font-semibold">{social.name}</h4>
                  <p className="text-gray-600">{social.username}</p>
                </div>
              </a>
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