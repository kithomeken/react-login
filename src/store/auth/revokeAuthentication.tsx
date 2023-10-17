import axios from "axios";

import { API_DOMAIN } from "../../api/API_Controller";
import { AUTH_SIGN_OUT } from "../../api/API_Registry";

export const revokeAuthenticationAction = () => {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {
        dispatch({
            type: "ACCOUNT_SIGN_OUT_PROCESSING_",
            response: null,
        });

        dispatch({
            type: "ACCOUNT_SIGNED_OUT_",
            response: null,
        });

        invalidateSanctumToken(dispatch)
    }
}

export const specialAccountSignOutAction = () => {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {
        dispatch({
            type: "ACCOUNT_SIGN_OUT_PROCESSING_",
            response: null,
        });

        dispatch({
            type: "SPECIAL_ACCOUNT_SIGNED_OUT_",
            response: null,
        });
        
        invalidateSanctumToken(dispatch)
    }
}

function invalidateSanctumToken(dispatch: any) {
    let revokeAPI = API_DOMAIN + AUTH_SIGN_OUT

    axios
        .post(revokeAPI, null)
        .then((response) => {
            dispatch({
                type: "ACCOUNT_SIGNED_OUT_",
                response: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type: "ACCOUNT_SIGN_OUT_EXCEPTION_",
                response: "Error occured when signing out",
            });
        });
}