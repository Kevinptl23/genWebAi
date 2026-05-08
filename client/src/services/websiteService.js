import axios from "axios";

export const getUserWebsites = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/website/user",
    { withCredentials: true }
  );

  return res.data.websites;
};