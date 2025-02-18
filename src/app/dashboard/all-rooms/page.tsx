"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
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

export default function AllRooms() {

  const router = useRouter();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();


  // Fetch meeting rooms
  const { data: rooms = [], isLoading, error } = useQuery<MeetingRoom[]>({
    queryKey: ["meetingRooms"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/meeting-rooms");
      return response.data.meetingRoom;
    },
  });

  // Mutation for deleting a booking
  const deleteMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await axios.delete(`http://localhost:3000/api/meeting-rooms/${bookingId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingRooms"] }); // Refresh data
      setSelectedRoomId(null); // Close modal
    },
    onError: () => {
      setErrorMessage("Failed to delete booking.");
    },
  });

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedRoomId) {
      deleteMutation.mutate(selectedRoomId);
    }
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading data</div>;

  return (
    <>
      <h2 className="text-2xl px-4 font-bold uppercase mb-4">All Rooms</h2>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {rooms.map((room) => (
          <div key={room.id} className="bg-white flex flex-col rounded-xl shadow-lg overflow-hidden">
            <img src={room.image} alt={room.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p className="text-gray-500">Capacity: {room.capacity}</p>
              <ul className="mt-2 text-sm text-gray-600">
                {room.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 flex gap-2">
              <button
                onClick={() => router.push(`/dashboard/all-rooms/edit/${room.id}`)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 py-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedRoomId(room.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {/* Confirmation Modal */}
        {selectedRoomId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Are you sure?</h2>
              <p>Do you really want to delete this booking? This action cannot be undone.</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedRoomId(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
