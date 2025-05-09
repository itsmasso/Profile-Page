import axios from "axios";

export const checkAuth = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/users/user-profile", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error("Not authenticated");
  }
};