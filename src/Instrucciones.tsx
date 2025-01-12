import logoBuscar from '../assets/buscarlogo.png';
import logoBuscar1 from '../assets/buscarlogo1.png';
import logoBuscar2 from '../assets/buscarlogo2.png';

const ReservaPasos = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
        Reservar y pedir al mismo tiempo nunca fue tan fácil
      </h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '30px' }}>
        {/* Paso 1 */}
        <div style={{ width: '250px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar}
              alt="Buscar"
              style={{ width: '6rem', height: 'auto', marginBottom: '10px' }}
            />
          </div>
          <h3>01</h3>
          <p>Busca por restaurantes de acuerdo a tu ubicación o preferencias</p>
        </div>
        {/* Paso 2 */}
        <div style={{ width: '250px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar1}
              alt="Seleccionar"
              style={{ width: '6rem', height: 'auto', marginBottom: '10px' }}
            />
          </div>
          <h3>02</h3>
          <p>
            Selecciona el restaurante que quieras, puedes ver detalles del
            menú y su ubicación
          </p>
        </div>
        {/* Paso 3 */}
        <div style={{ width: '250px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={logoBuscar2}
              alt="Confirmar"
              style={{ width: '6rem', height: 'auto', marginBottom: '10px' }}
            />
          </div>
          <h3>03</h3>
          <p>
            Guarda lo que quieres del menú y haz tu reserva de manera rápida y
            sencilla
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservaPasos;
