import React, {useEffect, useState} from "react";
import {LoginForm, Footer, Header} from "../components";
import {NextPage} from "next";
import {useSignIn} from "../hooks/api/account";
import {AUTH_TOKEN_KEY} from "../contexts/auth-reducer";
import Cookies from 'js-cookie'
import {useRouter} from "next/router";
import {useToast} from "@chakra-ui/react";

const Login: NextPage = ({}) => {
    const {mutate: login, data, error, isLoading} = useSignIn()
    const router = useRouter()
    const toast = useToast()

    useEffect(() => {
        if (data) {
            Cookies.set(AUTH_TOKEN_KEY, data.authToken)
            const next = router.query.next
            if (typeof next === 'string') {
                router.push(next).then()
            } else {
                router.push('/').then()
            }
        }
    }, [data])

    useEffect(() => {
        if (error) {
            toast({
                position: 'bottom',
                title: "Echec d'authentification",
                description: "Nom d'utilisateur ou mot de passe incorrect",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [error])

    return (
        <>
            <main className='bg-white flex flex-col h-screen w-full'>
                <Header/>
                <LoginForm isLoading={isLoading} login={login}/>
            </main>
            <Footer/>
        </>
    )
}

export default Login
