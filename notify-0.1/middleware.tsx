import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token');

    const protectedPaths = [
        /^\/pages\/user(?:\/.*)?$/,
        /^\/pages\/profile(?:\/.*)?$/,
        /^\/pages\/leave(?:\/.*)?$/,
        /^\/pages\/help(?:\/.*)?$/,
        /^\/pages\/feedback(?:\/.*)?$/,
        /^\/pages\/department(?:\/.*)?$/,
        /^\/pages\/dashboard(?:\/.*)?$/,
        /^\/pages\/contact(?:\/.*)?$/,
        /^\/pages\/chart(?:\/.*)?$/,
        /^\/pages\/category(?:\/.*)?$/,
        /^\/pages\/bookmark(?:\/.*)?$/,
    ];

    if (pathname === '/') {
        if (token) {
            return NextResponse.redirect(new URL('/pages/dashboard', req.url));
        }
    } else if (protectedPaths.some((path) => path.test(pathname))) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } else {
        return NextResponse.next();
    }
}
