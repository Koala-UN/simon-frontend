const CatalogoRestaurantes = () => {
  const images = [
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
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
      <div className="w-full md:w-1/2 mt-6 md:mt-0 grid grid-cols-2 grid-rows-3 gap-4">
        {/* 📌 Imagen 1 */}
        <div className="row-span-1 col-span-1 w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-lg">
          <img src={images[0]} alt="Restaurante 1" className="w-full h-full object-cover" />
        </div>

        {/* 📌 Imagen 2 (Grande) */}
        <div className="row-span-2 col-span-1 w-36 h-36 md:w-56 md:h-56 rounded-lg overflow-hidden shadow-lg">
          <img src={images[1]} alt="Restaurante 2" className="w-full h-full object-cover" />
        </div>

        {/* 📌 Imagen 3 */}
        <div className="row-span-1 col-span-1 w-36 h-24 md:w-56 md:h-28 rounded-lg overflow-hidden shadow-lg">
          <img src={images[2]} alt="Restaurante 3" className="w-full h-full object-cover" />
        </div>

        {/* 📌 Imagen 4 (Vertical) */}
        <div className="row-span-2 col-span-1 w-24 h-36 md:w-36 md:h-56 rounded-lg overflow-hidden shadow-lg">
          <img src={images[3]} alt="Restaurante 4" className="w-full h-full object-cover" />
        </div>

        {/* 📌 Imagen 5 */}
        <div className="row-span-1 col-span-1 w-24 h-24 md:w-36 md:h-36 rounded-lg overflow-hidden shadow-lg">
          <img src={images[4]} alt="Restaurante 5" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CatalogoRestaurantes;
