import axios from "axios";

export const showImage = async (blobUrl, fileName) => {
  try {
    let response = await axios.get(blobUrl, { responseType: "blob" });
    return await new File([response.data], fileName);
  } catch (error) {
    return await error.message;
  }
};
