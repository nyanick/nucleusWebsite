import {Button, Divider, Flex, Heading, VStack} from "@chakra-ui/react"
import {Form, Formik} from "formik"
import React from "react"
import {InputField} from ".";
import {UseMutateFunction} from "react-query";
import {ILogin, ILoginResponse} from "../types/account";

interface Props {
    isLoading: boolean
    login: UseMutateFunction<ILoginResponse, unknown, ILogin>
}

const LoginForm: React.FC<Props> = ({isLoading, login}) => {

    return (
        <Flex
            width='100%'
            flex={1}
            maxW={['60%', '50%', '40%', '35%']}
            mx='auto'
            px='8'
            alignItems='center'
            justifyContent='center'>
            <VStack
                spacing={12}
                className='w-full py-6 px-4 border border-grey-400 rounded-lg hover:border-gray-400 transition-colors'>
                <Heading>Connectez-Vous</Heading>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => login(values)}>
                    {() => (
                        <Form
                            autoComplete='off'
                            className='w-full'>
                            <InputField
                                className='py-4'
                                name='email'
                                placeholder="Identifiant"/>
                            <InputField
                                className='!mt-4'
                                name='password'
                                placeholder='Mot de Passe'
                                type='password'/>
                            <Button
                                type='submit'
                                w='100%'
                                bgColor='#0070F3'
                                isLoading={isLoading}
                                textColor='white'
                                _active={{backgroundColor: 'white'}}
                                _hover={{backgroundColor: 'white', textColor: '#0070F3'}}
                                className='mt-8 font-medium py-2 rounded-md transition-colors hover:border-[#0070F3] border'>
                                Se Connecter
                            </Button>
                            <Divider mx='auto' maxW='80%' className='my-5'/>
                            <div className='flex w-full'>
                                <a href='/forgot-password'
                                   className='text-center font-medium py-2 rounded-md w-full bg-white border border-[#eaeaea] text-[#666] transition-colors hover:border-black hover:text-black'>
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        </Form>
                    )}
                </Formik>
            </VStack>
        </Flex>
    )
}
export default LoginForm