
interface ModalProps {
  title: string;
  description: string;
  onAcept: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const GenericModal: React.FC<ModalProps> = ({ title, description, onAcept, onCancel, onClose }) => {

  const handleAcept = () => {
    onAcept();
    onClose();
  };
  const handleCancel = () => {
    onCancel();
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md text-center w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="mb-4">{description}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAcept}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Aceptar
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;