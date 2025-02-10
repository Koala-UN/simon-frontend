export const InfoCard = () => {
    return (
      <div className="bg-gray-100 p-8 rounded-lg shadow-xl max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-800">
          Descubre todo lo que nuestra página tiene para ofrecerte. Diseñada pensando en tu comodidad y rapidez, aquí encontrarás:
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-lg sm:text-xl text-gray-700">
          <li>Un menú completo con nuestros platillos más deliciosos, perfectamente descritos para que elijas tu favorito.</li>
          <li>La posibilidad de reservar tu mesa en tiempo real, de manera fácil y rápida, asegurando tu lugar para una experiencia inolvidable.</li>
          <li>Una forma de agilizar tu experiencia en el restaurante, permitiéndote explorar el menú y realizar tu pedido directamente desde nuestra plataforma al llegar al lugar.</li>
        </ul>
        <p className="mt-6 text-lg sm:text-xl text-gray-700">
          Todo esto está pensado para brindarte una experiencia excepcional, ya sea que prefieras disfrutar de un momento especial en nuestros restaurantes o en la comodidad de tu hogar. ¡Conéctate con nosotros y vive una experiencia gastronómica como ninguna otra!
        </p>
      </div>
    );
  };
  