import { useDispatch } from "react-redux"
import { useLocation, Navigate, Outlet } from "react-router"

import Auth from "./Auth"
import { useAppSelector } from "../../store/hooks"
import { standardErrorRoutes } from "../../routes/errorRoutes"
import { revokeAuthenticationAction } from "../../store/auth/revokeAuthentication"

export default function PostAuthRouteController() {
    const dispatch: any = useDispatch()
    const location = useLocation()

    const authenticationState = useAppSelector(state => state.auth)
    const accountState = useAppSelector(state => state.account)
    const sessionState = Auth.checkAuthentication(authenticationState, accountState)
    
    if (sessionState.isAuthenticated) {
        if (sessionState.suspendedAccount) {
            // For suspended accounts
            const suspendedAccountRoute: any = (standardErrorRoutes.find((routeName) => routeName.name === 'SSPND_ACC'))?.path
            return <Navigate to={suspendedAccountRoute} replace />;
        }
        
        if (sessionState.accountAccessExpired) {
            // Account access right has expired
            const accountAccessExpired: any = (standardErrorRoutes.find((routeName) => routeName.name === 'EXPRD_ACC_'))?.path
            return <Navigate to={accountAccessExpired} replace />;
        }

        if (sessionState.accountInfoExists) {
            // Redirect to home or the previous location
            const locationState: any = location.state

            if (locationState.from === null || locationState.from === undefined) {
                return <Navigate to="/home" replace />;
            } else {
                return <Navigate to={locationState.from} replace />;
            }
        }
    } else {
        if (sessionState.resetAccountSession) {
            /* 
             * Redux session state is authenticated
             * but cookies are not set.
             * 
             * Reset session and start all-over again
            */

            dispatch(revokeAuthenticationAction())
        } else {
            // Redirect to sign-in
            return <Navigate to="/auth/sign-in" replace />;
        }
    }
    
    return (
        
        <Outlet />

    )
}