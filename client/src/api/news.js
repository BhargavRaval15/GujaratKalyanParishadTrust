import axios from "./axios";

export const getNews = async () => {
  const res = await axios.get("/api/news");
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await axios.get(`/api/news/${id}`);
  return res.data;
};

export const postNews = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/api/admin/add-news", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateNews = async (id, formData) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`/api/admin/news/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNews = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`/api/admin/news/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAdminNews = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/admin/news", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};