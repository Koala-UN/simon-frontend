import { Typography } from "@material-tailwind/react";

const AboutUs = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <Typography variant="h4" className="font-bold mb-6 text-center"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Acerca de Nosotros
        </Typography>
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestra Misión
          </Typography>
          <p className="text-gray-700">
            Simon centraliza y simplifica la gestión de reservas y pedidos en restaurantes, reduciendo errores operativos, tiempos de espera y frustraciones para los clientes, mediante un enfoque accesible, eficiente y de calidad.
          </p>
        </section>
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4"    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestra Visión
          </Typography>
          <p className="text-gray-700">
            Para el 2028, Simon será reconocido como el aliado esencial para restaurantes y sus clientes en Colombia, destacándose por ofrecer soluciones innovadoras y eficientes que transforman la experiencia de reservas y pedidos.
          </p>
        </section>
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Nuestro Equipo
          </Typography>
          <p className="text-gray-700">
            Contamos con un equipo diverso y talentoso...
          </p>
        </section>
        <section className="mb-8">
          <Typography variant="h5" className="font-semibold mb-4"   placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Contáctanos
          </Typography>
          <p className="text-gray-700">
            Puedes contactarnos en contact@example.com...
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;