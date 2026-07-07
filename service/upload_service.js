import API from "@/lib/api";

export const uploadFile = async (uploaded_data) => {
  const formData = new FormData();

  formData.append("file", uploaded_data);

  const response = await API.post("/upload_file", formData);

  return response.data;
};