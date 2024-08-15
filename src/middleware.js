import { NextResponse } from 'next/server'
import { getSession } from "@/actions/auth";

// 1. Specify protected and public routes
const protectedRoutes = ['/secret']
const publicRoutes = ['/about']
 
export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    
    const session = await getSession();
    const isAuthenticated = session?.authenticated;
        
    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    
    if (
        isPublicRoute &&
        isAuthenticated &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    
    return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}