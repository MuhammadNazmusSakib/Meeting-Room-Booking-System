import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export const DELETE = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop()

        // Validate if id is present
        if (!id) {
            return NextResponse.json({ message: "Booking ID is required" }, { status: 400 });
        }

        // Delete the booking in the database
        const deletedBooking = await prisma.booking.delete({
            where: { id: id }, // Find the booking by ID
        });

        return NextResponse.json({ message: "Booking Deleted", booking: deletedBooking }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error deleting Booking", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};

// Edit Booking 

export const PUT = async (req: Request) => {
    try {
        // Extract the Booking ID from the URL params
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // Get the last part of the URL path

        // Validate if id is present
        if (!id) {
            return NextResponse.json({ message: "Booking ID is required" }, { status: 400 });
        }

        // Get the data from the request body (the new Booking details)
        const body = await req.json();

        
        const startTime = new Date(body.startTime);
        const endTime = new Date(body.endTime);


        // Check if startTime is after endTime
        if (startTime >= endTime) {
            return NextResponse.json({ message: "Start time must be before end time." }, { status: 400 });
        }

        // Check if the duration between start and end times is less than 30 minutes
        const diffInMs = endTime.getTime() - startTime.getTime();
        const diffInMinutes = diffInMs / (1000 * 60);

        if (diffInMinutes < 30) {
            return NextResponse.json({ message: "Booking duration should be at least 30 minutes." }, { status: 400 });
        }

        // Check if the room is already booked within the requested time range
        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId: body.roomId,
                OR: [
                    {
                        AND: [
                            { startTime: { lte: endTime } },
                            { endTime: { gte: startTime } },
                        ],
                    },
                ],
            },
        });

        if (existingBooking) {
            return NextResponse.json(
                { message: "Room is already booked for the selected time" },
                { status: 409 } // Conflict status code
            );
        }

        

        // Update the Booking in the database
        const updatedBooking = await prisma.booking.update({
            where: { id: id },
            data: {
                startTime: body.startTime,
                endTime: body.endTime,
            },
        });

        return NextResponse.json({ message: "Booking Updated", booking: updatedBooking }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error updating booking", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};