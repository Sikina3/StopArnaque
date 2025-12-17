import axios from "axios";

const CLOUD_NAME = "difabt2om";
const UPLOAD_PRESET = "Signaleo"; // Assurez-vous d'avoir créé ce preset en mode "Unsigned" sur Cloudinary

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Erreur upload Cloudinary:", error);
    throw error;
  }
};
