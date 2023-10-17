import Crypto from "../../security/Crypto";
import CookieServices from "../../services/CookieServices";
import {COOKIE_OPTIONS} from "../../global/ConstantsRegistry";
import { SANCTUM_COOKIE_NAME, UAID_COOKIE_NAME } from "../../global/ConstantsRegistry";

const initialState = {
    uaid: null,
    identifier: null,
    isAuthenticated: false,
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'AUTHENTICATING_':
            return {
                ...initialState,
                processing: true,
                isAuthenticated: false,
            }

        case 'AUTHENTICATED_':
            /* Create cookie sessions for account */
            const payload = action.response.payload
            const authIdentifier = action.response.email

            const encryptedToken = Crypto.encryptDataUsingAES256(payload.token)
            CookieServices.set(SANCTUM_COOKIE_NAME, encryptedToken, COOKIE_OPTIONS)

            const encryptedAccId = Crypto.encryptDataUsingAES256(payload.uuid)
            CookieServices.set(UAID_COOKIE_NAME, encryptedAccId, COOKIE_OPTIONS)

            return {
                ...initialState,
                uaid: encryptedAccId,
                isAuthenticated: true,
                identifier: authIdentifier,
            }

        case 'AUTH_FAILURE_':
        case 'AUTH_EXCEPTION_':
            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "Wrong email/password provided",
            }

        default:
            return state;
    }
}