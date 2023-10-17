import axios from "axios";

import { API_DOMAIN } from "../../api/API_Controller";
import { CSRF_COOKIE_ROUTE } from "../../api/API_Registry";
import { Outlet } from "react-router-dom";

export async function SanctumCookie() {
    try {
        const csrfCookieRoute = API_DOMAIN + CSRF_COOKIE_ROUTE
        await axios.get(csrfCookieRoute, this.axiosInstanceHeaders())
    } catch (error) {
        console.log("Could not fetch CSRF cookie", error)
    }

    return (
        
        <Outlet />

    )
}