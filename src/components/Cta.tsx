import foodImage from '../assets/food.png';
export const Cta = () => {
  return (
    <section 
    style={{
      backgroundImage: `url(${foodImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
      id="cta"
      className="bg-muted/50 py-64  ">
      <div  className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-5xl md:text-4xl font-bold text-white font-mono">
          Explora nuestro menú, reserva tu lugar y vive una experiencia
          inolvidable.
          </h2>
        </div>
      </div>
    </section>
  );
};
