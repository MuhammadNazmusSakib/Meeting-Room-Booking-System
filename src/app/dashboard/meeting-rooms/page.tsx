"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; 
import axios from "axios";

type MeetingRoom = {
  id: string;
  name: string;
  capacity: number;
  amenities: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
};

export default function MeetingRooms() {
  
  const router = useRouter(); 

  // Fetch meeting rooms
  const { data: rooms = [], isLoading, error } = useQuery<MeetingRoom[]>({
    queryKey: ["meetingRooms"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/meeting-rooms");
      return response.data.meetingRoom;
    },
  });

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading data</div>;

  return (
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
          <div className="p-4 flex justify-end">
            <button
              onClick={() => router.push(`/dashboard/meeting-rooms/${room.id}`)} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
            >
              Book Room
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
