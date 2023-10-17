import { Helmet } from "react-helmet";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { APP_NAME } from "../../global/ConstantsRegistry";
import { postAuthRoutes } from "../../routes/authRoutes";
import { authActions } from "../../store/auth/authActions";

export const SignIn = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const location = useLocation()
    const dispatch: any = useDispatch();
    const locationState: any = location.state
    const authenticationState: any = useAppSelector(state => state.auth);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const props = {
            auto: false,
            credentials: credentials,
        }

        dispatch(authActions(props))
    };

    if (authenticationState.isAuthenticated) {
        const state = {
            from: locationState?.from,
            postAuth: true
        }
        
        const ACC_CHECK_RT: any = (postAuthRoutes.find((routeName) => routeName.name === 'ACC_CHECK_'))?.path
        const redirectRoute = ACC_CHECK_RT

        return <Navigate state={state} replace to={redirectRoute} />;
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Sign In</title>
            </Helmet>

            <div className="wrapper">
                <section className="gx-container">
                    <div className="px-10">
                        <header className="landing-header">
                            <div className="landing pl-3 mb-0 text-left">
                                <h2 className="odyssey text-left text-green-500 nunito">{APP_NAME}</h2>
                                <span className="text-sm text-left mt-0 mb-3">Account Sign In</span>
                            </div>
                        </header>

                        <form className="space-y-3 shadow-none px-2 mb-3" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-none space-y-px">
                                <div className="form-group">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="off" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="myemail@domain.com"
                                        value={credentials.email}
                                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    />
                                </div>

                                <div className="w-full pb-5">
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                        placeholder="********"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                                </div>

                                {
                                    authenticationState.error &&
                                    <span className='invalid-feedback text-center block font-small text-red-600'>
                                        {authenticationState.error}
                                    </span>
                                }

                                <div className="mb-3 pt-3 px-12">
                                    <button className="bg-green-500 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:bg-green-600" type="submit">
                                        <span>
                                            {
                                                authenticationState.processing ? (
                                                    <>
                                                        <span className="left-0 inset-y-0 flex items-center">
                                                            <span className="pr-2">
                                                                {/* Signing In */}
                                                            </span>

                                                            <span className="w-5 h-5">
                                                                <i className="fad fa-spinner-third fa-lg fa-spin"></i>
                                                            </span>
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                            <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>

                                                        Sign In
                                                    </>
                                                )
                                            }
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className="space-y-3 pt-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="/auth/forgot-password" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                        <span className="font-small">
                                            Forgot password?
                                        </span>
                                    </a>
                                </div>

                                <div className="text-sm">
                                    <a href="/" className="font-medium text-center text-gray-500 hover:text-gray-900">
                                        <span className="font-small">
                                            About
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}