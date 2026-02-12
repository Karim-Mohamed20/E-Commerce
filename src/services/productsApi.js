import { api } from "./api";

export const fetchProducts = async ({ queryKey }) => {
  const [_key, { page, limit }] = queryKey;
  const skip = (page - 1) * limit;

  const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const searchProducts = async (query) => {
  const res = await api.get(`/products/search?q=${query}`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await api.get("/products/categories");
  return res.data;
};
