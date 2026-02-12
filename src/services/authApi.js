import axios from "axios";

export const loginUser = (data) =>
  axios.post("http://localhost:5001/api/auth/login", data);

// export const loginAdmin = (data) =>
//   axios.post("http://localhost:5001/api/auth/admin/login", data);

export const registerUser = (data) =>
  axios.post("http://localhost:5001/api/auth/register", data);
