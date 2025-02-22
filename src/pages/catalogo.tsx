const CatalogoRestaurantes = () => {
  const images = [
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-2.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-3.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-1.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-4.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-5.jpg",
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-10 md:px-20 bg-white">
      {/* 📌 Sección de Texto */}
      <div className="w-full md:w-1/2 md:pr-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Explora un catálogo extenso de restaurantes
        </h2>
        <p className="text-lg text-gray-600">
          Descubre restaurantes en diferentes ciudades y para todos los gustos.
        </p>
      </div>

      {/* 📌 Galería de Imágenes */}
      <div className="items-start w-full md:w-1/2 mt-6 md:mt-0 flex flex-wrap justify-center gap-3 ">
        {/* 📌 Imagen 4 (Vertical) */}
        <div className="w-24 h-36 md:w-36 md:h-56 rounded-lg overflow-hidden shadow-lg">
          <img src={images[3]} alt="Restaurante 4" className="w-full h-full object-cover" />
        </div>
        {/* 📌 Imagen 2 (Grande) */}
        <div className="w-36 h-36 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-lg">
          <img src={images[1]} alt="Restaurante 2" className="w-full h-full object-cover" />
        </div>
        {/* 📌 Imagen 1 */}
        <div className="w-32 h-32 md:w-48 md:h-38 rounded-lg overflow-hidden shadow-lg">
          <img src={images[0]} alt="Restaurante 1" className="w-full h-full object-cover" />
        </div>


        {/* 📌 Imagen 3 */}
        <div className="w-36 h-24 md:w-56 md:h-36 rounded-lg overflow-hidden shadow-lg">
          <img src={images[2]} alt="Restaurante 3" className="w-full h-full object-cover" />
        </div>


        {/* 📌 Imagen 5 */}
        <div className="w-24 h-24 md:w-52 md:h-32 rounded-lg overflow-hidden shadow-lg">
          <img src={images[4]} alt="Restaurante 5" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CatalogoRestaurantes;
