import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
export const getApi = async (path) => {
  try {
    const apiUrl = baseURL + (path.startsWith("/") ? path.slice(1) : path);
    const result = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("buildbazm_token"),
      },
    });
    return result;
  } catch (error) {
    console.error("Error in getApi:", error);
    return error;
  }
};

export const postApi = async (path, body) => {
  try {
    const result = await axios.post(baseURL + path, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("buildbazm_token"),
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
