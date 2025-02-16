import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma";

// Get individual user's bookings

export const GET = async (req: NextRequest) => {
    try {
        // Get the authenticated user
        const { userId } = getAuth(req);
        
        // Check if the user is authenticated
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized: User not signed in" }, { status: 401 });
        }

        // Fetch bookings for the authenticated user
        const bookings = await prisma.booking.findMany({
            where: {
                userId: userId,  // Ensure only the logged-in user's bookings are retrieved
            },
        });

        return NextResponse.json({ message: "Success", bookings }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error fetching bookings", error: err }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};