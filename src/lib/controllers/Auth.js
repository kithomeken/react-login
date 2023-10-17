import Crypto from '../../security/Crypto'
import StorageServices from '../../services/StorageServices'
import { SANCTUM_COOKIE_NAME, KEY_ACCOUNT_INFO } from "../../global/ConstantsRegistry"

class Auth {
    checkAuthentication(authenticationState, _accountState) {
        let sessionState

        if (!authenticationState.isAuthenticated) {
            // Redux shows session is not authenticated
            sessionState = {
                'isAuthenticated': false,
                'suspendedAccount': false,
                'accountInfoExists': false,
                'resetAccountSession': false,
                'accountAccessExpired': false,
            }
        } else {
            /* 
              * Redux session state is authenticated 
              * Counter-check with available session cookies
            */
            const sanctumCookie = this.isCookieSet(SANCTUM_COOKIE_NAME)
            const encryptedAccountInfo = StorageServices.getLocalStorage(KEY_ACCOUNT_INFO)

            if (sanctumCookie === null) {
                // Not authenticated. Reset account session
                sessionState = {
                    'isAuthenticated': false,
                    'suspendedAccount': false,
                    'accountInfoExists': false,
                    'resetAccountSession': true,
                    'accountAccessExpired': false,
                }
            } else {
                // Authenticated
                if (encryptedAccountInfo === null) {
                    console.log('No account info...');
                    // Pull account information using PostAuthentication
                    sessionState = {
                        'isAuthenticated': true,
                        'suspendedAccount': false,
                        'accountInfoExists': false,
                        'resetAccountSession': false,
                        'accountAccessExpired': false,
                    }
                } else {
                    console.log('Account info found');
                    // Compare account information from redux and cookie
                    const decryptedAccountInfo = Crypto.decryptDataUsingAES256(encryptedAccountInfo)
                    const jsonAccountInfo = JSON.parse(decryptedAccountInfo)

                    if (jsonAccountInfo.email === authenticationState.identifier) {
                        sessionState = {
                            'isAuthenticated': true,
                            'suspendedAccount': false,
                            'accountInfoExists': true,
                            'resetAccountSession': false,
                            'accountAccessExpired': false,
                        }

                        const dateToday = new Date();
                        const accountExpiry = jsonAccountInfo.expires_at
                        const dateOfAccountExpiry = new Date(accountExpiry);

                        if (dateToday > dateOfAccountExpiry) {
                            // Check account access expiry
                            sessionState = {
                                'isAuthenticated': true,
                                'suspendedAccount': false,
                                'accountInfoExists': false,
                                'resetAccountSession': false,
                                'accountAccessExpired': true,
                            }
                        }

                        if (jsonAccountInfo.active !== 'Y') {
                            // Suspended user account
                            sessionState = {
                                'isAuthenticated': true,
                                'suspendedAccount': true,
                                'accountInfoExists': false,
                                'resetAccountSession': false,
                                'accountAccessExpired': false,
                            }
                        }
                    } else {
                        // Account info do not match. Redirect to PostAuth
                        sessionState = {
                            'isAuthenticated': true,
                            'suspendedAccount': false,
                            'accountInfoExists': false,
                            'resetAccountSession': false,
                            'accountAccessExpired': false,
                        }
                    }
                }
            }
        }

        return sessionState
    }

    isCookieSet(cookieName) {
        const cookieArr = document.cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            if (cookieName === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }

        return null;
    }
}

export default new Auth()