// Función para validar el correo electrónico
function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Función para validar que un número sea positivo
function validatePositiveNumber(number: string): boolean {
    let Nnumber = null;
    if (typeof number === 'string') {
        try {
            Nnumber = convertToNumber(number);
        } catch {
            return false;
        }
    }
    if (Nnumber === null || isNaN(Nnumber)) {
        return false;
    }
    return Nnumber > 0;
}

// Función para validar que la capacidad sea un número positivo
function validatePositiveCapacity(capacity: string): boolean {
    if (typeof capacity === 'string') {
        try {
            const Ncapacity = convertToNumber(capacity);
            return validatePositiveNumber(Ncapacity.toString());
        } catch {
            return false;
        }
    }
    return false;
}
function convertToNumber(value: string): number {
    const result = parseInt(value);
    if (isNaN(result)) {
        throw new Error('Invalid number');
    }
    return result;
}

// Exportar las funciones para su uso en otros archivos
export {
    validateEmail,
    validatePositiveNumber,
    validatePositiveCapacity
};
