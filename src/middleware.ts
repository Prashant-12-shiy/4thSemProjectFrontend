import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "./config/routes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();
  const userRole = req.cookies.get("role")?.value;

  // Redirect to login if token is missing and trying to access /admin routes
  if (
    (!token && url.pathname.startsWith(routes.superAdmin))  ||
    (!token && url.pathname.startsWith(routes.teacher)) ||
    (!token && url.pathname.startsWith(routes.student))
  ) {
    url.pathname = routes.home;
    return NextResponse.redirect(url);
  }

  if (userRole === "Teacher" && (url.pathname.startsWith(routes.superAdmin) || url.pathname.startsWith(routes.student))) {
    url.pathname = routes.teacher;
    return NextResponse.redirect(url);
  }
  
  if (userRole === "Student" && (url.pathname.startsWith(routes.superAdmin) || url.pathname.startsWith(routes.teacher))) {
    url.pathname = routes.student;
    return NextResponse.redirect(url);
  }
  

    // If trying to access login / signin or home while authenticated, redirect to /admin
  if(token && (url.pathname === "/")
  ) {
    if(userRole === "SuperAdmin") {
      url.pathname = routes.superAdmin
      return NextResponse.redirect(url);
    } else if (userRole === "Teacher") {
      url.pathname = routes.teacher
      return NextResponse.redirect(url)
    }
  }


  if (
    userRole === "SuperAdmin" &&
    url.pathname.startsWith(routes.teacher) &&
    url.pathname !== routes.superAdmin
  ) {
    url.pathname = routes.superAdmin;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Protect all paths that start with '/admin'
export const config = {
    matcher: [
        "/superadmin/:path*",
        "/teachers/:path*",
        "/students/:path*",
        "/",
        "/auth/login",
        "/auth/signin",
        "/auth/verify",
        "/auth/otp"
    ],
};
//   if (userRole === "employee" && url.pathname.startsWith(routes.adminDash)) {
//     url.pathname = routes.employeeDash.dashboard;
//     return NextResponse.redirect(url);
//   }

  // If trying to access login / signin or home while authenticated, redirect to /admin
//   if (
//     token &&
//     (url.pathname === "/"
//         //  ||
//     //   url.pathname === routes.login ||
//     //   url.pathname === routes.signin ||
//     //   url.pathname === routes.forgotPassword ||
//     //   url.pathname === routes.otp
//     )
//   ) {
//     if (userRole === "admin") {
//       url.pathname = routes.adminDash;
//     } else if (userRole === "employee") {
//       url.pathname = routes.employeeDash.dashboard;
//     }

//     return NextResponse.redirect(url);
//   }

  // Continue to the requested page