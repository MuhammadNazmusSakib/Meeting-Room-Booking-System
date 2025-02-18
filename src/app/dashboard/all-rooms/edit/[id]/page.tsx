
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

type MeetingRoom = {
    id: string;
    name: string;
    capacity: number;
    amenities: string[];
    image: string;
    createdAt: string;
    updatedAt: string;
};

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function RoomDetails() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [amenities, setAmenities] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    // Fetch room details
    const { data: room, isLoading: roomLoading, error: roomError } = useQuery<MeetingRoom>({
        queryKey: ["meetingRoom", id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/api/meeting-rooms/${id}`);
            return response.data.room;
        },
    });

    // Mutation to handle the API request
    const mutation = useMutation({
        mutationFn: async (formData: any) => {
            const response = await axios.put(`http://localhost:3000/api/meeting-rooms/${id}`, formData);
            return response.data;
        },
        onSuccess: () => {
            setSuccessMessage("Meeting room information edited successfully!");
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
        } catch (error) {
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


    if (roomLoading) return <div className="text-center text-xl">Loading...</div>;
    if (roomError) return <div className="text-center text-red-500">Error loading data</div>;


    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <img src={room?.image} alt={room?.name} className="w-full h-64 object-cover rounded-lg" />
            <h1 className="text-2xl font-bold mt-4">{room?.name}</h1>
            <p className="text-gray-500">Capacity: {room?.capacity}</p>
            <ul className="mt-2 text-sm text-gray-600">
                {room?.amenities.map((amenity) => (
                    <li key={amenity}> {amenity}</li>
                ))}
            </ul>

            {/* Edit Room Information Form */}
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg mt-10">
                <h2 className="text-2xl font-bold text-center mb-4">Edit Meeting Room Information</h2>

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
                {errorMessage && <p className="text-red-500 py-2 font-bold text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 py-2 font-bold text-center">{successMessage}</p>}
            </div>
        </div>
    );
}

