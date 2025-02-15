import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'  // Import NextRequest
import prisma from '../../../../prisma'


export const POST = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);

        // Protect the route by checking if the user is signed in
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json(); // Get data from request body

        // Validate required fields
        if (!body.roomId || !body.title || !body.startTime || !body.endTime) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const startTime = new Date(body.startTime);
        const endTime = new Date(body.endTime);

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

        // Create new booking if no conflicts exist
        const newBooking = await prisma.booking.create({
            data: {
                roomId: body.roomId,
                userId: userId,
                title: body.title,
                description: body.description || "",
                startTime: startTime,
                endTime: endTime,
            },
        });

        return NextResponse.json(
            { message: "Booking Created", booking: newBooking },
            { status: 201 }
        );
    } catch (err: any) {
        return NextResponse.json(
            { message: "Error creating booking", error: err.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
};



// Need to work Later for [*admin authentication*]................................
export const GET = async (req: Request) => {
    try {
        // Fetch booking rooms from the database
        const bookingRoom = await prisma.booking.findMany()
        return NextResponse.json({ message: "Success", bookingRoom }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Database Error", error: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}


