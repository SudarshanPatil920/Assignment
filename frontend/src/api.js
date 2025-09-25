const BASE_URL = import.meta.env.VITE_API_URL;

// Register a user
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send cookie
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Login a user
export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send cookie
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Logout
export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};

// Get tasks
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    credentials: "include",
  });
  return res.json();
};

// Create task
export const createTask = async (taskData) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return res.json();
};

// Update task
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(taskData),
  });
  return res.json();
};

// Delete task
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
};

export const getAdminTasks = async () => {
  const response = await fetch(`${BASE_URL}/admin/tasks`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error('Failed to fetch admin tasks');
  return response.json();
};

export const getAdminStats = async () => {
  const response = await fetch(`${BASE_URL}/admin/stats`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error('Failed to fetch admin stats');
  return response.json();
};

export const deleteAdminTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}/admin/tasks/${taskId}`, {
    method: 'DELETE',
    credentials: "include",
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
};
