import Crypto from "../../security/Crypto"
import CookieServices from "../../services/CookieServices"
import StorageServices from "../../services/StorageServices"
import { UAID_COOKIE_NAME, KEY_ACCOUNT_INFO, SANCTUM_COOKIE_NAME } from "../../global/ConstantsRegistry"

const initialState = {
    type: null,
    email: null,
    first_name: null,
    last_name: null,
    avatarUrl: null,
    status: null,
}

export const postAuthReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case 'ACC_CHECKING_':
            return {
                ...initialState,
                checked: false,
            }

        case 'ACC_CHECKED_':
            const jsonAccountDetails = action.response.account
            const strAccountDetails = JSON.stringify(jsonAccountDetails)

            const enAccountDetails = Crypto.encryptDataUsingAES256(strAccountDetails)
            StorageServices.setLocalStorage(KEY_ACCOUNT_INFO, enAccountDetails)

            const dateToday = new Date();
            const expiryDate = jsonAccountDetails.expires_at
            const dateOfAccountExpiry = new Date(expiryDate);

            let accountStatus = 'ACTIVE'

            if (jsonAccountDetails.active !== 'Y') {
                accountStatus = 'SUSPENDED'
            } else if (dateToday > dateOfAccountExpiry) {
                accountStatus = 'EXPIRED'
            } 

            return {
                ...initialState,
                checked: true,
                first_name: jsonAccountDetails.first_name,
                last_name: jsonAccountDetails.last_name,
                email: jsonAccountDetails.email,
                type: jsonAccountDetails.account_type,
                status: accountStatus,
            }

        case 'ACC_CHECKING_ERR_':
        case 'CHECKING_EXCEPTION_':
            CookieServices.remove(UAID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                checked: true,
                error: true,
            }

        default:
            return state;
    }
}