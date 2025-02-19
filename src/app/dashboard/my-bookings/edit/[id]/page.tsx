
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
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

type Booking = {
  id: string;
  startTime: string;
  endTime: string;
};

export default function RoomDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Fetch room details
  const { data: room, isLoading: roomLoading, error: roomError } = useQuery<MeetingRoom>({
    queryKey: ["meetingRoom", bookId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/meeting-rooms/${bookId}`);
      return response.data.room;
    },
  });

  // Fetch room availability
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useQuery<Booking[]>({
    queryKey: ["roomAvailability", bookId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/booking/availablity/${bookId}`);
      return response.data.bookings;
    },
  });

  // Handle booking mutation
  const bookingMutation = useMutation({
    mutationFn: async () => {
      if (!startDate || !startTime || !endDate || !endTime) {
        setMessage("Please select all fields.");
        return;
      }

      const formattedStartTime = new Date(`${startDate}T${startTime}:00`)
      const formattedEndTime = new Date(`${endDate}T${endTime}:00`)


      // Check if startTime is after endTime
      if (formattedStartTime >= formattedEndTime) {
        setErrorMessage("Start time must be before end time.");
        return;
      }

      // Check if the duration is at least 30 minutes
      const diffInMs = formattedEndTime.getTime() - formattedStartTime.getTime();
      const diffInMinutes = diffInMs / (1000 * 60);

      if (diffInMinutes < 30) {
        setErrorMessage("Booking duration should be at least 30 minutes.");
        return;
      }

      const response = await axios.put(`http://localhost:3000/api/booking/user/${id}`, {
        // roomId: id,
        // title: room?.name || "Meeting Room",
        startTime: formattedStartTime.toISOString(),
        endTime: formattedEndTime.toISOString(),
      });

      return response.data;
    },
    onSuccess: (succcess: any) => {
      // setMessage("Booking Successful!");
      if (succcess.response) {
        setMessage(succcess.response.data.message || "Edit Successful!...");
      } else {
        setMessage("Edit Successful!..");
      }
    },
    onError: (error: any) => {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Edit Failed. Please try again.");
      } else {
        setErrorMessage("Edit Failed. Something Went Wrong!");
      }
    },
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  if (roomLoading || bookingsLoading) return <div className="text-center text-xl">Loading...</div>;
  if (roomError || bookingsError) return <div className="text-center text-red-500">Error loading data</div>;

  // Convert bookings to disabled dates
  const bookedDates = bookings?.map((booking) => new Date(booking.startTime));

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

      {/* Calendar View for Availability */}
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mt-6">
        <h2 className="text-xl font-semibold mb-2">Room Availability</h2>
        <Calendar
          tileDisabled={({ date }) =>
            (bookedDates ?? []).some((bookedDate) => bookedDate.toDateString() === date.toDateString())
          }
        />
      </div>

      {/* Booking Form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Book this Room</h2>

        <label className="block text-gray-600">Start Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mt-1"
          value={startDate}
          min={today} // Allows today or future dates
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="block text-gray-600">End Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mt-1"
          value={endDate}
          min={startDate || today} // Ensures end date is not before start date
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label className="block text-gray-600">Start Time:</label>
        <input
          type="time"
          className="w-full p-2 border rounded mt-1"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className="block text-gray-600 mt-3">End Time:</label>
        <input
          type="time"
          className="w-full p-2 border rounded mt-1"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          onClick={() => bookingMutation.mutate()}
        >
          Confirm Booking
        </button>

        {message && <p className="mt-2 font-bold text-center text-green-600">{message}</p>}
        {errorMessage && <p className="mt-2 font-bold text-center text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}




