import '../styles/globals.css';
import type {AppProps} from 'next/app'
import React from 'react'
import reducer, {initialState} from "../contexts/auth-reducer";
import {AuthProvider} from '../contexts/AuthProvider'
import {QueryClient, QueryClientProvider} from "react-query";
import {ChakraProvider} from "@chakra-ui/react"
import theme from "../theme";
import useLightTheme from "../hooks/useLightTheme";
import {useRouter} from "next/router";
import {appRoutes} from "../constants";
import {Layout, NotFound} from "../components";

function NBLApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    useLightTheme()
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false
            }
        }
    })

    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider initialState={initialState} reducer={reducer}>
                    {router.pathname === appRoutes.ROUTE_NOT_FOUND ? (
                        <div className='w-screen h-screen flex justify-center items-center'>
                            <NotFound fallBackUrl={'/'}/>
                        </div>
                    ) : ((router.pathname === appRoutes.ROUTE_LOGIN) ?
                        <Component {...pageProps} /> :
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>)
                    }
                </AuthProvider>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default NBLApp
