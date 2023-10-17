import { SignIn } from "../views/auth/SignIn";
import { Routes_Interface } from "./routesInterface";
import { PostAuthentication } from "../views/auth/PostAuthentication";

export const authRoutes: Array<Routes_Interface> = [
    { path: "/auth/sign-in", element: <SignIn />, caseSensitive: true, name: 'AUTH_SIGN_IN' },
]

export const postAuthRoutes: Array<Routes_Interface> = [
    { path: "/auth/account/check", element: <PostAuthentication />, activeMenu: 'N', caseSensitive: true, name: 'ACC_CHECK_' },
]