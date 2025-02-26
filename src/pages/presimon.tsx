import logoSimon from '../assets/logosimon.png'; // Asegúrate de tener el logo en esta ruta

const PresentacionSimon = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        padding: '20px',
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          maxWidth: '800px',
          width: '100%',
          alignItems: 'center',
          gap: '20px',
          
        }}
      >
        {/* Text Section */}
        <div style={{ flex: '1', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#000' }}>
            Presentamos Simon
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#333' }}>
            Un sistema de reservas y pedidos para restaurantes, donde nos enfocamos en la sencillez
            para el cliente y la organización para el restaurante.
          </p>
        </div>

        {/* Logo Section */}
        <div>
          <img
            src={logoSimon}
            alt="Logo Simon"
            style={{ width: '300px', height: 'auto' }}
          />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          div > div {
            flex-direction: column;
            text-align: center;
          }
          div > div > div {
            margin-bottom: 20px;
          }
          img {
            width: 200px;
            order: 2;
          }
        }
      `}</style>
    </div>
  );
};

export default PresentacionSimon;
