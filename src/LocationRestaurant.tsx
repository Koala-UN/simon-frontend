import { CheckboxDefault } from './Checkbox.tsx';

function Location() {
  const departments = [
    "Antioquia",
    "Bogotá",
    "Cundinamarca",
    "Valle del Cauca",
    "Santander",
    "Atlántico",
  ];

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-bold mb-4">Ubicación</h2>
      <ul className="space-y-2">
        {departments.map((department, index) => (
          <li key={index}>
            <CheckboxDefault label={department} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
