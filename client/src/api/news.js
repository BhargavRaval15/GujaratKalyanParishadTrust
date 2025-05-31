import axios from "./axios";

export const getNews = async () => {
  const res = await axios.get("/api/news");
  return res.data;
};

export const postNews = async (data) => {
  const res = await axios.post("/api/news", data);
  return res.data;
};
