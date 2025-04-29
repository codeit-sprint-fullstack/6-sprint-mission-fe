// lib/imageService.js
import { formDataPandaFetch } from "@/lib/fetchClient";

export const imagePandaService = {
  uploadImage: (formData) =>
    formDataPandaFetch("/images/upload", {
      method: "POST",
      body: formData,
    }),
};
