# Booking Meet Room Project

**Admin Email:** admin@gmail.com
**Password:** q1w1e1r1t1y1u1i1o1p$#@

## Live Link: [Live Link]()

## Description

The Booking Meet Room project allows users to schedule and manage meeting rooms for virtual meetings. This web application enables users to book available rooms, view schedules, and manage their bookings with ease. The project integrates Clerk for authentication, Prisma for database management, and MongoDB as the backend database.

## Setup Instructions

To get started with the project, follow these setup instructions:

### Prerequisites

1. Node.js installed on your system (version 18 or later).
2. MongoDB Atlas account and a database for your application.
3. Clerk account for authentication setup.

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   npm install

2. **.env.local file**

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cXVpZXQtbHlueC0zMS5jbGVyay5hY2NvdW50cy5kZXYk
    CLERK_SECRET_KEY=sk_test_1dgXpZ0lW4aFQiWFv6TMCUZ6UWS2dSxr4hTZzAOEm8
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard/meeting-rooms
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard/meeting-rooms

    NEXT_PUBLIC_IMGBB_API_KEY=e3566fd23cf80c6dfdf0c94b45ef9d0c

    DATABASE_URL=mongodb+srv://sakib21feb:GGpye9Q6RVeihluH@cluster0.eqdse.mongodb.net/MeetingRoomBookingSystem?retryWrites=true&w=majority&appName=Cluster0


3. **Run the application:**

    npm run dev

4. **Dependencies**

"dependencies": {
    "@clerk/nextjs": "^6.11.3",
    "@prisma/client": "^6.3.1",
    "@tanstack/react-query": "^5.66.3",
    "axios": "^1.7.9",
    "mongodb": "^6.13.0",
    "next": "14.2.24",
    "react": "^18",
    "react-calendar": "^5.1.0",
    "react-dom": "^18",
    "react-icons": "^5.4.0"
  },
"devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.24",
    "postcss": "^8",
    "prisma": "^6.3.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }

5. ## Technologies Used

- **Next.js**: Framework for React, providing server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **Clerk**: User authentication and authorization service.
- **Prisma**: ORM for database interactions.
- **MongoDB**: NoSQL database for storing meeting room booking data.
- **Axios**: HTTP client for making requests to external APIs.
- **React Calendar**: A calendar component for booking functionality.
- **Tailwind CSS**: Utility-first CSS framework for styling.
