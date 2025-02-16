import { NextResponse } from "next/server"
import prisma from "../../../../prisma"

export const GET = async (req: Request) => {
    try {
        // Fetch rooms from the database
        const meetingRoom = await prisma.room.findMany()
        return NextResponse.json({ message: "Success", meetingRoom }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Database Error", error: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json(); // Get data from request body

        // Validate required fields
        if (!body.name || !body.capacity || !Array.isArray(body.amenities) || !body.image) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create new room
        const newRoom = await prisma.room.create({
            data: {
                name: body.name,
                image: body.image,  
                capacity: body.capacity,
                amenities: body.amenities,
                createdAt: new Date(), // Prisma will handle this automatically
                updatedAt: new Date(), // Same as above
            },
        });

        return NextResponse.json({ message: "Success", room: newRoom }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error creating room", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
};