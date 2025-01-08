// useImgurUpload.js
import { useState } from "react";
import axiosClient from "../api/axiosClient";

const IMGUR_UPLOAD_URL = "https://api.imgur.com/3/upload";
//  response = requests.post(
//    "https://api.imgur.com/3/upload",
//    (headers = headers),
//    (files = files)
//  );

export const useImgurUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Uploads a single image to Imgur
   * @param {File} file - The image file to upload
   * @param {Function} onProgress - Callback function to track upload progress (0-100)
   * @returns {Promise<string>} - Resolves with the Imgur link of the uploaded image
   */
  const uploadImage = async (file, onProgress) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosClient.post(IMGUR_UPLOAD_URL, formData, {
        headers: {
          Authorization: `b7f4379b3b3ead0`, // Replace with your actual Client ID
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) {
            onProgress(percentCompleted);
          }
        },
      });

      setIsUploading(false);
      return response.data.data.link; // Return the Imgur URL of the uploaded image
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      setIsUploading(false);
      throw new Error(err);
    }
  };

  return { uploadImage, isUploading, error };
};
