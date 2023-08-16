import Crypto from "../../security/Crypto";
import Auth from "../../lib/router/AuthChecker";
import CookieServices from "../../services/CookieServices";
import StorageServices from "../../services/StorageServices";
import {COOKIE_OPTIONS, KEY_ACCOUNT_INFO} from "../../global/ConstantsRegistry";
import { ACCOUNT_INFO_COOKIE, SANCTUM_COOKIE_NAME, ACID_COOKIE_NAME } from "../../global/ConstantsRegistry";

const initialState = {
    acid: null,
    error: null,
    email: null,
    accountName: null,
    processing: false,
    isAuthenticated: false,
}

export const authenticationReducer = (state = initialState, action: any) => {
    const acidString = CookieServices.get(ACID_COOKIE_NAME)

    switch (action.type) {
        case 'INTEGRITY_COMPROMISED_':
            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: 'Auto-sign in failed',
            }
    
        case 'AUTHENTICATION_PENDING_':
            return {
                ...initialState,
                processing: true,
                isAuthenticated: false,
            }
    
        case 'AUTHENTICATION_COMPLETED_':
            /* Create cookie sessions for account */
            const enSanctumToken = Crypto.encryptDataUsingAES256(action.response.token)
            CookieServices.set(SANCTUM_COOKIE_NAME, enSanctumToken, COOKIE_OPTIONS)

            const enAcidToken = Crypto.encryptDataUsingAES256(action.response.uuid)
            CookieServices.set(ACID_COOKIE_NAME, enAcidToken, COOKIE_OPTIONS)

            return {
                ...initialState,
                acid: enAcidToken,
                processing: false,
                isAuthenticated: true,
            }

        case 'AUTHENTICATION_FAILED_':
        case 'RUNTIME_EXCEPTION_':
            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "Credentials provided did not match our records",
            }

        case 'ACCOUNT_LOADING_':
            return {
                ...initialState,
                acid: acidString,
                processing: false,
                isAuthenticated: true
            }

        case 'ACCOUNT_LOADED_':
            const jsonAccountACCOUNT = action.response.account
            const stringAccountACCOUNT = JSON.stringify(jsonAccountACCOUNT)

            const enAccountACCOUNT = Crypto.encryptDataUsingAES256(stringAccountACCOUNT)
            StorageServices.setLocalStorage(KEY_ACCOUNT_INFO, enAccountACCOUNT)

            return {
                ...initialState,
                acid: acidString,
                processing: false,
                isAuthenticated: true,
                email: jsonAccountACCOUNT.email,
                accountName: jsonAccountACCOUNT.name,
            }

        case 'ACCOUNT_ERROR_':
        case 'ACCOUNT_EXCEPTION_':
            CookieServices.remove(ACID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "User account is not signed in"
            }

        case 'SIGN_OUT_PROCESSING_':
            const encryptedAccountACCOUNT = Auth.isCookieSet(ACCOUNT_INFO_COOKIE)
            let reduxState: any = null

            if (encryptedAccountACCOUNT !== null) {
                const decryptedAccountACCOUNT = Crypto.decryptDataUsingAES256(encryptedAccountACCOUNT)
                const accountACCOUNT = JSON.parse(decryptedAccountACCOUNT)  

                reduxState = {
                    ...initialState,
                    processing: true,
                    acid: acidString,
                    isAuthenticated: true,
                    email: accountACCOUNT.email,
                    accountName: accountACCOUNT.name,
                }  
            } else {
                reduxState = {
                    ...initialState,
                    processing: true,
                    acid: acidString,
                    isAuthenticated: true,
                    email: null,
                    accountName: null,
                }  
            }

            return reduxState

        case 'SIGNED_OUT_':
            // Revoke authentication access
            // Remove token cookie only
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
            }

        case 'SPECIAL_SIGNED_OUT_':
        case 'SIGN_OUT_EXCEPTION_':
            /* 
             * Special account sign out
             * for suspended account and 
             * expired accounts.
             * 
             * This is to facilitate fetching 
             * of the updated account ACCOUNTrmation
             * once user logs in once again.
            */
            CookieServices.remove(ACID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)
            CookieServices.remove(ACCOUNT_INFO_COOKIE)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
            }

        default:
            return state;
    }
}