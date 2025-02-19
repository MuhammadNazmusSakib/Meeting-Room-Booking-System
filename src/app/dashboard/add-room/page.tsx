"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const AddMeetingRoom = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mutation to handle the API request
  const mutation = useMutation({
    mutationFn: async (formData: { name: string; capacity: number; amenities: string[]; image: string }) => {
      const response = await axios.post("http://localhost:3000/api/meeting-rooms", formData);
      return response.data;
    },
    onSuccess: () => {
      setSuccessMessage("Meeting room added successfully!");
      setName("");
      setCapacity("");
      setAmenities("");
      setImage(null);
      setPreview(null);
    },
    onError: () => {
      setErrorMessage("Failed to add meeting room.");
    },
  });

  // Handle Image Upload to ImgBB
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.url; // Return image URL
    } catch {
      setErrorMessage("Failed to upload image.");
      return null;
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !capacity || !amenities || !image) {
      setErrorMessage("All fields are required.");
      return;
    }
    setErrorMessage(null);

    // Upload Image First
    const imageUrl = await uploadImage(image);
    if (!imageUrl) return;

    // Prepare the Data
    const roomData = {
      name,
      capacity: Number(capacity),
      amenities: amenities.split(",").map((item) => item.trim()), // Convert to array
      image: imageUrl,
    };

    // Submit the form
    mutation.mutate(roomData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add Meeting Room</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Room Name */}
        <div>
          <label className="block font-medium">Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block font-medium">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block font-medium">Amenities (comma-separated)</label>
          <input
            type="text"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 rounded-lg w-full h-40 object-cover" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
      {errorMessage && <p className="text-red-500 font-bold text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 font-bold text-center">{successMessage}</p>}
    </div>
  );
};

export default AddMeetingRoom;
