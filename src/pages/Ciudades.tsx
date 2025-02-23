import { useNavigate } from "react-router-dom";
import bogotaImage from"../assets/bog.png";
import cucutaImage from"../assets/cuc.png";
import ibagueImage from"../assets/iba.png";

const Ciudades = () => {
  const navigate = useNavigate(); // React Router navigation function

  const cities = [
    {
      id: 1,
      name: "Bogotá DC",
      imgSrc: bogotaImage,
      alt: "Vista nocturna de Bogotá",
    },
    {
      id: 2,
      name: "Cúcuta",
      imgSrc: cucutaImage,
      alt: "Vista de Cúcuta con la Torre del Reloj",
    },
    {
      id: 3,
      name: "Ibagué",
      imgSrc: ibagueImage,
      alt: "Vista de Ibagué con árboles en flor",
    },
  ];

  // Function to navigate with the city ID
  const handleNavigate = (cityId: number) => {
    console.log(`Navigating to /restaurantes/${cityId}`);
    navigate(`/restaurantes/${cityId}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2
        style={{
          fontSize: "2rem",
          margin: "20px 0",
          lineHeight: "1.4",
        }}
      >
        Encuentra nuestros restaurantes en las principales ciudades del país.
      </h2>
      <p style={{ fontSize: "1.2rem", margin: "10px 0 30px 0" }}>
        Selecciona tu ubicación para descubrir la disponibilidad de mesas y
        disfrutar de nuestros deliciosos platillos.
      </p>
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 0))",
          justifyContent: "center",
        }}
      >
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => handleNavigate(city.id)} // Navigate on click
            className="border border-gray-300 rounded-lg overflow-hidden w-full max-w-xs mx-auto cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={city.imgSrc}
              alt={city.alt}
              className="w-full h-auto object-cover transition-transform duration-300"
            />
            <div className="bg-black p-2 text-center">
              <button
                className="bg-black text-white border-none py-2 px-4 rounded cursor-pointer w-full"
              >
                Buscar en {city.name} 🔍
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ciudades;
