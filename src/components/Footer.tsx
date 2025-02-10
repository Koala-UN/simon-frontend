import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from"../assets/logosimonW.png";

export const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gray-900 py-8 text-white mt-auto" 
      style={{ backgroundColor: "rgb(51, 51, 51)" }}
    >
      <div className="container mx-auto min-h-[35vh] flex-grow grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo Simon" className="w-28 mb-4" />
          <p className="text-sm">
            En Simon queremos facilitarle a las personas un tiempo y un lugar
            para compartir
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:underline">
              Quiénes somos
            </a>
            <a href="#" className="hover:underline">
              Términos y condiciones
            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:underline">
              Tratamiento de datos
            </a>
            <a href="#" className="hover:underline">
              Contáctanos
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="#" className="opacity-60 hover:opacity-100">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
