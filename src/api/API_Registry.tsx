/*
* Authentication API Routes
*/
export const AUTH_SIGN_IN = '/v1/account/auth/sign-in'
export const AUTH_SIGN_OUT = '/v1/account/auth/invalidate-token'
export const AUTH_FORGOT_PASSWORD = ''
export const CSRF_COOKIE_ROUTE = '/sanctum/csrf-cookie'

/*
 * Account Profile API Routes
*/
export const ACCOUNT_EMAIL_HISTORY = '/v1/account/auth/email/history'
export const ACCOUNT_DETAILS = '/v1/account/auth/profile'
export const ACCOUNT_EMAIL_CHANGE = '/v1/account/auth/email/change'
export const ACCOUNT_EMAIL_UNDO_CHANGE = '/v1/account/auth/email/change'
export const ACCOUNT_EMAIL_VERIFICATION = '/v1/account/auth/email/resend-verification'
export const ACCOUNT_PASSWORD_CHANGE = '/v1/account/auth/password/change'
export const ACCOUNT_PREFERENCES = '/v1/account/auth/preferences'
export const ACCOUNT_SET_TIMEZONE = '/v1/account/auth/preferences/timezone/set'
export const ACCOUNT_TEAM_RIGHTS = '/v1/account/auth/team/rights'