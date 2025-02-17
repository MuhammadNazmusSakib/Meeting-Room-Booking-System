import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";


export const GET = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
  try {
    const { roomId } = params;

    if (!roomId) {
      return NextResponse.json({ message: "Room ID is required" }, { status: 400 });
    }

    // Fetch all bookings for the given room
    const bookings = await prisma.booking.findMany({
      where: { roomId: roomId },
      select: {
        id: true,
        startTime: true,
        endTime: true,
      },
    });

    return NextResponse.json({ message: "Success", bookings }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json(
      { message: "Error fetching availability", error: err.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
