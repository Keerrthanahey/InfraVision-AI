import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const hasOAuth =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "your_google_client_id";

export default hasOAuth
  ? withAuth({
      pages: { signIn: "/login" },
    })
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
