import React from "react";
import { SignIn } from "../../views/auth/SignIn";

interface GuestRouteInterface {
    name: string,
    path: string;
    element: any;
    caseSensitive?: boolean;
}

export const authRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", element: <SignIn />, caseSensitive: true, name: 'AUTH_SIGN_IN' },
]
