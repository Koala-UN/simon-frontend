import logoBuscar from '../assets/buscarlogo.png';
import logoBuscar1 from '../assets/buscarlogo1.png';
import logoBuscar2 from '../assets/buscarlogo2.png';

const ReservaPasos = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '40px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Reservar y pedir al mismo tiempo nunca fue tan fácil
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {/* Paso 1 */}
        <div style={{ width: '250px', textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar}
              alt="Buscar"
              style={{ width: '6rem', height: 'auto', marginBottom: '15px' }}
            />
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#007BFF',
              marginBottom: '10px',
            }}
          >
            01
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            Busca restaurantes de acuerdo a tu ubicación o preferencias. Encuentra los mejores
            lugares cerca de ti.
          </p>
        </div>
        {/* Paso 2 */}
        <div style={{ width: '250px', textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar1}
              alt="Seleccionar"
              style={{ width: '6rem', height: 'auto', marginBottom: '15px' }}
            />
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#007BFF',
              marginBottom: '10px',
            }}
          >
            02
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            Selecciona el restaurante que quieras y explora su menú, ubicación, y más detalles para
            tomar la mejor decisión.
          </p>
        </div>
        {/* Paso 3 */}
        <div style={{ width: '250px', textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar2}
              alt="Confirmar"
              style={{ width: '6rem', height: 'auto', marginBottom: '15px' }}
            />
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#007BFF',
              marginBottom: '10px',
            }}
          >
            03
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            Guarda tu pedido favorito del menú y confirma tu reserva de manera rápida, fácil y sin
            complicaciones.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservaPasos;
