import axios from "axios";

export const checkAuth = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/user-profile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error("Not authenticated");
  }
};