import { useNavigate } from 'react-router-dom';
import bogotaImage from './assets/bog.png';
import cucutaImage from './assets/cuc.png';
import ibagueImage from './assets/iba.png';

const Ciudades = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const cities = [
    {
      name: 'Bogotá DC',
      imgSrc: bogotaImage,
      alt: 'Vista nocturna de Bogotá',
    },
    {
      name: 'Cúcuta',
      imgSrc: cucutaImage,
      alt: 'Vista de Cúcuta con la Torre del Reloj',
    },
    {
      name: 'Ibagué',
      imgSrc: ibagueImage,
      alt: 'Vista de Ibagué con árboles en flor',
    },
  ];

  // Function to handle navigation
  const handleNavigate = () => {
    navigate(`/restaurantes`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', margin: '20px 0' }}>
        Encuentra nuestros restaurantes en las principales ciudades del país.
      </h2>
      <p style={{ fontSize: '1.2rem', margin: '10px 0 30px 0' }}>
        Selecciona tu ubicación para descubrir la disponibilidad de mesas y
        disfrutar de nuestros deliciosos platillos.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {cities.map((city) => (
          <div
            key={city.name}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              overflow: 'hidden',
              width: '300px',
            }}
          >
            <img
              src={city.imgSrc}
              alt={city.alt}
              style={{ width: '100%', height: 'auto' }}
            />
            <div
              style={{
                backgroundColor: 'black',
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <button
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  width: '100%',
                }}
                onClick={() => handleNavigate()} // Navigate on click
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
