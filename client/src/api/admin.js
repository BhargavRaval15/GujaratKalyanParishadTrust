import axios from "./axios";

export const loginAdmin = async (credentials) => {
  const res = await axios.post("/api/admin/login", credentials);
  return res.data;
};
export const registerAdmin = async (data) => {
  const res = await axios.post("/api/admin/register", data);
  return res.data;
};

export const addEvent = async (data, token) => {
  const res = await axios.post("/api/admin/add-event", data, {
    headers: { Authorization: token },
  });
  return res.data;
};
