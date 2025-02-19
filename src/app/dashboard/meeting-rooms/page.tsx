"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const PAGE_SIZE = 6;

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
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: rooms = [], error } = useQuery<MeetingRoom[]>({
    queryKey: ["meetingRooms"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/meeting-rooms");
      return response.data.meetingRoom;
    },
  });

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesCapacity = capacityFilter ? room.capacity >= capacityFilter : true;
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((a) => room.amenities.includes(a));
    return matchesCapacity && matchesAmenities;
  });

  const totalPages = Math.ceil(filteredRooms.length / PAGE_SIZE);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  //if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error loading data</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold uppercase mb-4">Meeting Rooms</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <select
          className="p-2 border rounded-md w-full md:w-1/3"
          onChange={(e) => setCapacityFilter(Number(e.target.value) || null)}
        >
          <option value="">All Capacities</option>
          <option value="5">5+ People</option>
          <option value="10">10+ People</option>
          <option value="20">20+ People</option>
        </select>

        <div className="flex flex-wrap gap-2">
          {["Wi-Fi", "Projector", "Whiteboard", "Air Conditioning", "Video Conference"].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRooms.length > 0 ? (
          paginatedRooms.map((room) => (
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
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No rooms match the selected filters.</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
