import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
export const getApi = async (path) => {

  try {
    // Ensure no leading slash in the path
    const apiUrl = baseURL + (path.startsWith('/') ? path.slice(1) : path);
    const result = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
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
    const result = await axios.post(baseURL + path, body);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
