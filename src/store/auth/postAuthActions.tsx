import axios from "axios";

import Crypto from "../../security/Crypto";
import { API_DOMAIN } from "../../api/API_Controller";
import { ACCOUNT_DETAILS } from "../../api/API_Registry";
import CookieServices from "../../services/CookieServices";
import { SANCTUM_COOKIE_NAME } from "../../global/ConstantsRegistry";

export const postAuthActions = () => {
    return (dispatch: (argo: {type: string, response: any}) => void) => {
        dispatch({
            type: "ACC_CHECKING_",
            response: null,
        });

        const accountInfoUrl = API_DOMAIN + ACCOUNT_DETAILS
        const encryptedToken = CookieServices.get(SANCTUM_COOKIE_NAME)
        const decryptedToken = Crypto.decryptDataUsingAES256(encryptedToken)

        console.log(decryptedToken);
        
        const headers = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + decryptedToken,
                'X-XSRF-TOKEN': ''
            }
        }

        axios
        .get(accountInfoUrl, headers)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "ACC_CHECKED_",
                    // type: "ACCOUNT_INFO_LOADED_",
                    response: response.data.payload,
                });
            } else {
                dispatch({
                    type: "ACC_CHECKING_ERR_",
                    response: null,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            
            dispatch({
                type: "CHECKING_EXCEPTION_",
                response: "User account is not authenticated",
            });
        })
    }
}