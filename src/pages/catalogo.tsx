const CatalogoRestaurantes = () => {
  const images = [
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-2.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-3.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-1.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-4.jpg",
    "http://res.cloudinary.com/dnljvvheg/image/upload/v1740232194/landing-page-plate-5.jpg",
  ];

  return (
    <div className="flex flex-col items-center justify-between px-6 py-10 md:px-20 bg-white">
      {/* 📌 Sección de Texto */}
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Explora un catálogo extenso de restaurantes
        </h2>
        <p className="text-lg text-gray-600">
          Descubre restaurantes en diferentes ciudades y para todos los gustos.
        </p>
      </div>

      {/* 📌 Galería de Imágenes */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* 📌 Imagen 1 */}
        <div className="w-full h-36 md:h-56 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <img src={images[0]} alt="Restaurante 1" className="w-full h-full object-cover" />
        </div>
        {/* 📌 Imagen 2 */}
        <div className="w-full h-36 md:h-56 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <img src={images[1]} alt="Restaurante 2" className="w-full h-full object-cover" />
        </div>
        {/* 📌 Imagen 3 */}
        <div className="hidden md:block w-full h-36 md:h-56 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
          <img src={images[2]} alt="Restaurante 3" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CatalogoRestaurantes;
