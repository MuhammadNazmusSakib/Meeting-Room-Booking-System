import { getAuth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'  // Import NextRequest
import prisma from '../../../../prisma'


export const POST = async (req: NextRequest) => {  // NextRequest to get userId
  try {
    
    const { userId } = getAuth(req)

    // Protect the route by checking if the user is signed in
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json(); // Get data from request body

    // Validate required fields
    if (!body.roomId || !body.title || !body.startTime || !body.endTime) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Create new booking
    const newBooking = await prisma.booking.create({
      data: {
        roomId: body.roomId,
        userId: userId, 
        title: body.title,
        description: body.description || "", 
        startTime: new Date(body.startTime), 
        endTime: new Date(body.endTime),     
      },
    })

    return NextResponse.json({ message: "Booking Created", booking: newBooking }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: "Error creating booking", error: err.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

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