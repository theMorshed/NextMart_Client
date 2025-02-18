import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService"

const authRoutes = ['/login', '/register'];

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`, request.url))
        }
    }
}

export const config = {
    matcher: [
        '/login',
        '/create-shop'
    ]
}