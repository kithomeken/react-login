import { useDispatch } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

import Auth from "./Auth"
import { useAppSelector } from "../../store/hooks"

export default function StandardRoutesController () {
    const dispatch = useDispatch()
    const location = useLocation()
    const currentLocation = location.pathname

    const authenticationState = useAppSelector(state => state.auth)
    const sessionState = Auth.checkAuthentication(authenticationState)

    const state = {
        from: currentLocation
    }

    if (!sessionState.isAuthenticated) {
        return <Navigate to="/auth/sign-in" replace state={state} />
    } else {
        
    }

    const marginTop = {marginTop: '64px'}

    return (
        <div>
            <div className="flex h-screen">
                
                {/* <TopNavigation /> */}

                <div className="flex flex-col w-full mb-5">
                    <div className="w-full overflow-y-auto">
                        <div className="kiOAkj" style={marginTop}>

                            <Outlet />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}