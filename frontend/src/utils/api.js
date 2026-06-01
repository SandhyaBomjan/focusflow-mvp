const API_URL = "http://127.0.0.1:8000";

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();
  return data.tasks;
};

export const createTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return await response.json();
};

export const completeTask = async (id) => {
  const response = await fetch(
    `${API_URL}/tasks/${id}/complete`,
    {
      method: "PUT",
    }
  );

  return await response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(
    `${API_URL}/tasks/${id}`,
    {
      method: "DELETE",
    }
  );

  return await response.json();
};