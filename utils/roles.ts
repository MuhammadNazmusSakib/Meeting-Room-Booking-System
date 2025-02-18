// import { Roles } from '../types/globals'
// import { auth } from '@clerk/nextjs/server'

// export const checkRole = async (role: Roles) => {
//     const { sessionClaims } = await auth()
//     return sessionClaims?.metadata.role === role
// }


'use client'

import { Roles } from "../types/globals"
import { useUser } from "@clerk/nextjs"


export const useCheckRole = (role: Roles) => {
    const {user} = useUser()

    return user?.publicMetadata?.role === role
}