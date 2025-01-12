import logoSimon from '../assets/logosimon.png'; // Asegúrate de tener el logo en esta ruta

const PresentacionSimon = () =>     {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <div style={{ flex: '1' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Presentamos Simon</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Un sistema de reservas y pedidos para restaurantes, donde nos enfocamos en la sencillez
            para el cliente y la organización para el restaurante.
          </p>
        </div>
        <div>
          <img
            src={logoSimon}
            alt="Logo Simon"
            style={{ width: '120px', height: 'auto' }}
          />
        </div>
      </div>
      <h3 style={{ fontSize: '1.5rem', color: '#007BFF' }}>Simon</h3>
      <p style={{ fontSize: '1.1rem' }}>Reservamos tu tiempo</p>
    </div>
  );
};

export default PresentacionSimon;
