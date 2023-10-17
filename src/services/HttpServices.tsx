import axios from "axios"

import Crypto from "../security/Crypto"
import CookieServices from "./CookieServices"
import { API_DOMAIN, FULLY_QUALIFIED_DOMAIN_NAME } from "../api/API_Controller"
import { SANCTUM_COOKIE_NAME } from "../global/ConstantsRegistry"
import { CSRF_COOKIE_ROUTE } from "../api/API_Registry"

const xsrfToken = CookieServices.get("XSRF-TOKEN")

class HttpServices {
    protected decryptSanctumTokenCookie() {
        const cipherText = CookieServices.get(SANCTUM_COOKIE_NAME)

        return (cipherText != null) 
            ? Crypto.decryptDataUsingAES256(cipherText) 
            : null
    }

    async httpGet(url: string) {
        try {
            const GET_API_URL = API_DOMAIN + url
            return await axios.get(GET_API_URL, this.axiosInstanceHeaders())
        } catch (error) {
            console.log("Could not fetch data", error)
            return error
        }
    }

    async httpPost(url:string, data: any, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const POST_API_URL = API_DOMAIN + url
            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    async httpPostWithoutData(url:string, data: any = null, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const POST_API_URL = API_DOMAIN + url
            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            console.error("Could not post data", error);
            return (error.response !== undefined) ? error.response : error;
        }
    }

    axiosInstanceHeaders() {
        return {
            headers: {
                Authorization: "Bearer " + this.decryptSanctumTokenCookie(),
                "X-XSRF-TOKEN": xsrfToken,
            }
        }
    }

    async httpGetCSRFCookie() {
        try {
            const csrfCookieRoute = FULLY_QUALIFIED_DOMAIN_NAME + CSRF_COOKIE_ROUTE
            const headers = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            return await axios.get(csrfCookieRoute, headers)
        } catch (error) {
            console.log("Could not fetch cookie data", error)
            return error
        }
    }
}

export default new HttpServices()