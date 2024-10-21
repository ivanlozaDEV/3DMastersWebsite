const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL); // Verifica que esto no sea undefined

export const getItems = async () => {
  try {
    const response = await fetch(`${API_URL}/items`, { // Elimina el segundo '/api'
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener los ítems');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Agregar un nuevo ítem
export const addItem = async (item) => {
  try {
    const response = await fetch(`${API_URL}/items`, { // Elimina el segundo '/api'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Error al agregar el ítem');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
