import React from "react";

const CatalogoRestaurantes = () => {
  const images = [
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px",
        backgroundColor: "#fff",
      }}
    >
      {/* Sección de texto */}
      <div style={{ flex: "1", maxWidth: "50%", paddingRight: "20px" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Ofrecemos un catálogo extenso de restaurantes para que puedas elegir
        </h2>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#666" }}>
          Para diferentes ciudades y diferentes gustos del país.
        </p>
      </div>

      {/* Galería de imágenes con tamaños definidos */}
      <div
        style={{
          display: "grid",
          gap: "15px",
          maxWidth: "40%",
          gridTemplateAreas: `
            "img1 img2"
            "img3 img2"
            "img4 img5"
          `,
        }}
      >
        {/* Imagen 1 */}
        <div
          style={{
            gridArea: "img1",
            width: "150px",
            height: "150px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={images[0]}
            alt="Restaurante 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Imagen 2 */}
        <div
          style={{
            gridArea: "img2",
            width: "300px",
            height: "300px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={images[1]}
            alt="Restaurante 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Imagen 3 */}
        <div
          style={{
            gridArea: "img3",
            width: "300px",
            height: "150px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={images[2]}
            alt="Restaurante 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Imagen 4 */}
        <div
          style={{
            gridArea: "img4",
            width: "150px",
            height: "300px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={images[3]}
            alt="Restaurante 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Imagen 5 */}
        <div
          style={{
            gridArea: "img5",
            width: "150px",
            height: "150px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={images[4]}
            alt="Restaurante 5"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogoRestaurantes;
