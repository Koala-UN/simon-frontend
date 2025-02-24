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
          <h2 className="lg:text-5xl md:text-4xl sm:text-2xl text-xl font-bold text-white font-mono pl-6  drop-shadow-2xl">
            ¡Reserva tu lugar!
          Explora nuestro menú, reserva tu lugar y vive una experiencia
          inolvidable.
          </h2>
        </div>
      </div>
    </section>
  );
};
