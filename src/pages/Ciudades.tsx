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
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              width: "100%",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            <img
              src={city.imgSrc}
              alt={city.alt}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                backgroundColor: "black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => handleNavigate(city.id)} // Navigate on click
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
