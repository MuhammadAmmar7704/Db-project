import axios from "axios";
import React, { useContext, useState } from "react";

const AddEntityForm = ({ entityType, fields, onSubmit }) => {
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [imageFile, setImageFile] = useState(null); // State to store selected file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
        
      try {
        const img = new FormData(); // FormData is still needed
        img.append("file", imageFile); // Attach the selected file

        const response = await axios.post("/image/upload", img, {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          });


          setFormData({...formData, image_url: response.data.url });

      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload the image. Please try again.");
        return;
      }
    }

    onSubmit(formData); // Pass the final data to the parent
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Add {entityType}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) =>
          field.name === "image" ? ( // Check if the field is for image upload
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="text-gray-600 font-semibold mb-2"
              >
                {field.label || "Upload Image"}
              </label>
              <input
                id={field.name}
                name={field.name}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded-md"
                required={field.required}
              />
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEntityForm;
