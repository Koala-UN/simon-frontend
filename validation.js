// Función para validar el correo electrónico
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Función para validar que un número sea positivo
function validatePositiveNumber(number) {
    return !isNaN(number) && number > 0;
}

// Función para validar que la capacidad sea un número positivo
function validatePositiveCapacity(capacity) {
    return validatePositiveNumber(capacity);
}

// Exportar las funciones para su uso en otros archivos
module.exports = {
    validateEmail,
    validatePositiveNumber,
    validatePositiveCapacity
};
