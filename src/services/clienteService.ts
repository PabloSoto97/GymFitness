const API_URL = `${import.meta.env.VITE_API_URL}/api/clientes`;

export const getClientes = async (token: string) => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
};

export const crearCliente = async (data: any, token: string) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear cliente");
  return res.json();
};

export const eliminarCliente = async (id: number, token: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar cliente");
  return res.json();
};

export const actualizarCliente = async (
  id: number,
  data: any,
  token: string
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar cliente");
  return res.json();
};
