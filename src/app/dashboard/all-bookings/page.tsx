
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const PAGE_SIZE = 5;


type BookingRoom = {
  id: string;
  roomId: string;
  userId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

const AllBookingList = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);


  // Fetch meeting rooms
  const { data: bookings = [], isLoading, error } = useQuery<BookingRoom[]>({
    queryKey: ["bookingRooms"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/booking");
      return response.data.bookingRoom ?? [];
    },
  });

  // Mutation for deleting a booking
  const deleteMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await axios.delete(`http://localhost:3000/api/booking/user/${bookingId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRooms"] }); // Refresh data
      setSelectedBookingId(null); // Close modal
    },
    onError: () => {
      setErrorMessage("Failed to delete booking.");
    },
  });

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (selectedBookingId) {
      deleteMutation.mutate(selectedBookingId);
    }
  };

  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const paginatedRooms = bookings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold uppercase mb-4">All Bookings</h2>
      {bookings?.length === 0 && <p>No bookings available.</p>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      {/* List Format */}
      <div className="space-y-4">
        {paginatedRooms.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row place-content-between gap-2"
          >
            <div className="">
              <h3 className="text-xl font-semibold">{booking.title}</h3>
              <p className="text-gray-600">{booking.description || "No description"}</p>
              <p className="text-gray-500">
                <span className="font-medium">Start:</span> {new Date(booking.startTime).toLocaleString()}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">End:</span> {new Date(booking.endTime).toLocaleString()}
              </p>
            </div>

            <div className="mt-3 flex flex-row md:flex-col gap-4">
              <button
                onClick={() => router.push(`/dashboard/my-bookings/edit/${booking.id}?bookId=${booking.roomId}`)}
                className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => setSelectedBookingId(booking.id)}
                className="bg-red-500 w-full text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedBookingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p>Do you really want to delete this booking? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedBookingId(null)}
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
};

export default AllBookingList;
