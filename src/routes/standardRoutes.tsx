import { Home } from "../views/home/Home";
import { Routes_Interface } from "./routesInterface";
import { IndexToHome } from "../views/home/IndexToHome";

export const standardRoutes: Array<Routes_Interface> = [
    { path: "/home", element: <Home />, activeMenu: 'Y', caseSensitive: true, name: 'HOME_' },
    { path: "/", element: <IndexToHome />, activeMenu: 'N', caseSensitive: true, name: 'INDEX_' },
]
