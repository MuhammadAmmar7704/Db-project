import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateEntityForm = ({ entityType, fields, onSubmit }) => {
  
  useEffect(()=>{
    console.log('here')
  }, [])
  const location = useLocation();
  const initialValues = location.state || {}; 
    
  const [formData, setFormData] = useState(initialValues);
  const [imageFile, setImageFile] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = formData.image_url; // Keep existing image URL unless a new file is uploaded

    if (imageFile) {
      try {
        const img = new FormData();
        img.append("file", imageFile); // Attach the selected file

        const response = await axios.post("/image/upload", img, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrl = response.data.url; // Update image URL with new uploaded image
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload the image. Please try again.");
        return;
      }
    }

    // Include the updated image URL in form data
    const finalFormData = { ...formData, image_url: imageUrl };
    onSubmit(finalFormData); // Pass the updated data to the parent
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Update {entityType}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) =>
          field.name === "image" ? ( // Check if the field is for image upload
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="text-gray-600 font-semibold mb-2"
              >
                {field.label || "Upload New Image"}
              </label>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md"
              />
              {formData.image_url && (
                <p className="text-sm text-gray-500 mt-1">
                  Current Image: <a href={formData.image_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{formData.image_url}</a>
                </p>
              )}
            </div>
          ) : (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="text-gray-600 font-semibold mb-2"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEntityForm;
