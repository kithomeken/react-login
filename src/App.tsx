import { Sanctum } from "react-sanctum";
import { ToastContainer } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import './assets/css/tailwind.css'
import './assets/css/beska.css'
import './assets/icons/fontawesome_pro/css/all.css'

import { ERR_404 } from './views/errors/ERR_404';
import { standardRoutes } from './routes/standardRoutes';
import { authRoutes, postAuthRoutes } from './routes/authRoutes';
import AuthRoutesController from './lib/controllers/AuthRoutesController';
import StandardRoutesController from './lib/controllers/StandardRoutesController';
import PostAuthRouteController from './lib/controllers/PostAuthRoutesController';
import { SanctumCookie } from "./lib/others/SanctumCookie";
import HttpServices from "./services/HttpServices";
import { FULLY_QUALIFIED_DOMAIN_NAME } from "./api/API_Controller";
import { ACCOUNT_DETAILS, AUTH_SIGN_IN, AUTH_SIGN_OUT, CSRF_COOKIE_ROUTE } from "./api/API_Registry";

interface RouteContextType {
    currentpage: string,
    from: string
}

const RoutingContext = React.createContext<RouteContextType>(null!)
const sanctumConfig = {
    apiUrl: FULLY_QUALIFIED_DOMAIN_NAME,
    csrfCookieRoute: CSRF_COOKIE_ROUTE,
    signInRoute: '/api' + AUTH_SIGN_IN,
    signOutRoute: '/api' + AUTH_SIGN_OUT,
    userObjectRoute: 'api/user',
};

// HttpServices.httpGetCSRFCookie()

function App() {
    const RouterProvider = ({ children }: { children: React.ReactNode }) => {
        const currentLocation = useLocation()
        const [route, setRoute] = useState({
            currentpage: currentLocation.pathname,
            from: ''
        });

        useEffect(() => {
            setRoute((prev) => ({ currentpage: currentLocation.pathname, from: prev.currentpage }))
        }, [currentLocation]);

        return <RoutingContext.Provider value={route}>
            {children}
        </RoutingContext.Provider>
    }

    return (
        <Router>
            <Sanctum config={sanctumConfig}>
                <RouterProvider>
                    <ToastContainer />

                    <Routes>
                        <Route element={<AuthRoutesController />}>
                            {authRoutes.map((route, index) => {
                                return (
                                    <Route
                                        path={route.path}
                                        element={route.element}
                                        key={index}
                                    />
                                )
                            })
                            }
                        </Route>

                        <Route element={<PostAuthRouteController />} >
                            {
                                postAuthRoutes.map((route, index) => {
                                    return (
                                        <Route
                                            path={route.path}
                                            element={route.element}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </Route>

                        <Route element={<StandardRoutesController />} >
                            {
                                standardRoutes.map((route, index) => {
                                    return (
                                        <Route
                                            path={route.path}
                                            element={route.element}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </Route>

                        <Route path="*" element={<ERR_404 />} />

                    </Routes>
                </RouterProvider>
            </Sanctum>
        </Router>
    )
}

export default App