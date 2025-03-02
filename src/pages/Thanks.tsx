
const Tanks  = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Cuenta Eliminada</h1>
                <p className="text-gray-600 mb-6">
                    Tu cuenta ha sido eliminada exitosamente. Gracias por haber sido parte de nuestra comunidad.
                </p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => window.location.href = '/'}
                >
                    Volver a la página principal
                </button>
            </div>
        </div>
    );
};

export default Tanks;