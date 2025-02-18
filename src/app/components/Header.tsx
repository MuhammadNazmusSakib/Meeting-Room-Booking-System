import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'


const Header = async () => {

  const { userId } = await auth()


  return (
    <nav className="bg-blue-600 p-4 sticky top-0 w-full z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link href="/">
          <span className="text-white text-xl font-bold uppercase cursor-pointer">Room Booking</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          {
            !userId && (
              <>
                <Link href="/sign-in">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition">
                    Sign In
                  </button>
                </Link>
              </>
            )
          }

          {/* <SignInButton fallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/onboarding">
            Sign In
          </SignInButton> */}

          <UserButton/>

        </div>
      </div>
    </nav>
  )
}

export default Header