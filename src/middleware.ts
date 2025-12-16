import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export const { auth } = NextAuth(authConfig)
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl
    const role = req.auth?.user?.role

    // 1. Redirect to Dashboard if logged in and trying to access generic home or login
    if (isLoggedIn && (pathname === "/" || pathname === "/login")) {
        if (role === 'student') return NextResponse.redirect(new URL('/student', req.nextUrl))
        if (role === 'faculty') return NextResponse.redirect(new URL('/faculty', req.nextUrl))
    }

    // 2. Protect Student Routes
    if (pathname.startsWith('/student')) {
        if (!isLoggedIn) return NextResponse.redirect(new URL('/login', req.nextUrl))
        if (role !== 'student') return NextResponse.redirect(new URL('/faculty', req.nextUrl)) // or generic error
    }

    // 3. Protect Faculty Routes
    if (pathname.startsWith('/faculty')) {
        if (!isLoggedIn) return NextResponse.redirect(new URL('/login', req.nextUrl))
        if (role !== 'faculty') return NextResponse.redirect(new URL('/student', req.nextUrl)) // or generic error
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
