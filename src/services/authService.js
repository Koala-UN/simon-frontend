export const login = async (correo, contrasena) => {
  const response = await fetch('http://localhost:5000/api/restaurant/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo, contrasena }),
    credentials: 'include', // Incluye cookies en la solicitud
  });

  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }

  const data = await response.json();
  return data;
};

export const logout = async () => {
  const response = await fetch('http://localhost:5000/api/restaurant/logout', {
    method: 'POST',
    credentials: 'include', // Incluye cookies en la solicitud
  });

  if (!response.ok) {
    throw new Error('Error en el cierre de sesión');
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/restaurant/auth-status', {
      method: 'GET',
      credentials: 'include', // Incluye cookies en la solicitud
    });
    const data = await response.json();
    return data.authenticated;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};