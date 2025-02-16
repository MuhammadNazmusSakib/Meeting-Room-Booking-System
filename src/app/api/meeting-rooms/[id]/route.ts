import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export const GET = async (req: Request) => {
    try {
        // Extract the room ID from the URL params 
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // Get the last part of the URL path

        if (!id) {
            return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
        }

        // Fetch room details by ID from the database
        const room = await prisma.room.findUnique({
            where: {
                id: id,
            },
        });

        if (!room) {
            return NextResponse.json({ message: "Room not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Success", room }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error fetching room", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect()
    }
}


export const PUT = async (req: Request) => {
    try {
        // Extract the room ID from the URL params
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop(); // Get the last part of the URL path

        // Validate if id is present
        if (!id) {
            return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
        }

        // Get the data from the request body (the new room details)
        const body = await req.json();
        

        // Update the room in the database
        const updatedRoom = await prisma.room.update({
            where: { id: id }, 
            data: {
                name: body.name,
                capacity: body.capacity,
                amenities: body.amenities,
                image: body.image, // Need to work Later............
            },
        });

        return NextResponse.json({ message: "Room Updated", room: updatedRoom }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error updating room", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};


export const DELETE = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop()

        // Validate if id is present
        if (!id) {
            return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
        }

        // Delete the room in the database
        const deletedRoom = await prisma.room.delete({
            where: { id: id }, // Find the room by ID
        });

        return NextResponse.json({ message: "Room Deleted", room: deletedRoom }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error deleting room", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};