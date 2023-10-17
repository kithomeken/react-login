import { SuspendedAccount } from "../views/errors/SuspendedAccount";
import { Routes_Interface } from "./routesInterface";

export const standardErrorRoutes: Array<Routes_Interface> = [
    { path: "/u/account/suspended", element: <SuspendedAccount />, caseSensitive: true, name: 'SSPND_ACC' },
]