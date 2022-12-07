import {NextPage} from "next";
import {Avatar, Flex, HStack, Input, Link, Spinner, Text, VStack} from "@chakra-ui/react";
import {BsBoxArrowInUpRight} from 'react-icons/bs';
import React, {useState} from "react";
import axios from "../api/axios";
import {useStateValue} from "../contexts/AuthProvider";
import {FiArrowRight} from "react-icons/fi";
import {apiRoutes} from "../constants";

const FindPatient: NextPage = () => {

    const [{authToken}] = useStateValue()
    const [loading, setLoading] = useState(false)
    const [patient, setPatient] = useState(null)
    const [patientUser, setPatientUser] = useState(null)
    const [query, setQuery] = useState(null)

    const searchPatient = () => {
        setLoading(true)
        axios.get(apiRoutes.GET_PATIENT(query), {
            headers: {'Authorization': `Bearer ${authToken}`}
        }).then((res) => {
            setPatient(res.data)
            axios.get(apiRoutes.GET_USER(res.data.userId), {
                headers: {'Authorization': `Bearer ${authToken}`}
            }).then((res) => {
                setLoading(false)
                setPatientUser(res.data)
                console.log(res.data)
            }).catch((err) => {
                setPatientUser(null)
                setLoading(false)
                console.log(err)
            })
        }).catch((err) => {
            setPatient(null)
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <VStack alignItems='center' className='max-w-4xl py-8 px-2 mx-auto'>
            <Flex w='100%' mb={16} alignItems='center' className='relative' maxW={['xs', 'sm', 'md', 'md']}>
                <Input
                    flex={1}
                    w='100%'
                    className='p-5'
                    variant="filled"
                    rounded={'full'}
                    onChange={(event => setQuery(event.target.value))}
                    textAlign='center'
                    placeholder="Rechercher un patient..."/>
                <div
                    onClick={searchPatient}
                    className='absolute cursor-pointer flex items-center justify-center rounded-full bg-[#0070F3] text-white h-8 w-8 right-2'>
                    <FiArrowRight/>
                </div>
            </Flex>
            {loading ? <Spinner size='lg' color="red.500"/> : null}
            {patientUser ?
                <HStack
                    maxW={['sm', 'sm', 'md', 'lg']}
                    className='border rounded-lg border-gray-300'
                    mb={4}
                    px={6}
                    py={4}
                    alignItems='center'
                    spacing={8}
                    w='100%'>
                    <Avatar
                        _hover={{cursor: 'pointer'}}
                        color='white'
                        size='md'
                        bgColor='#0070F3'
                        name={`${patientUser.firstName.substr(" ")[0]} ${patientUser.lastName.substr(" ")[0]}`}
                        src={`${patientUser.avatarId ? apiRoutes.GET_USER_AVATAR(patientUser.avatarId) : ''}`}/>
                    <VStack flex={1} spacing={0} alignItems='start' justifyContent='center'>
                        <Text className='font-medium p-0'>{`${patientUser.firstName} ${patientUser.lastName}`}</Text>
                        <Text className='text-gray-600 text-sm'>{patientUser.city}, {patientUser.country}</Text>
                    </VStack>
                    <Link href={`/patients/${patient?.userId}`}>
                        <BsBoxArrowInUpRight
                            className='text-gray-500 cursor-pointer transition-colors hover:text-[#0070F3] h-6 w-6'/>
                    </Link>
                </HStack> : null}
        </VStack>
    )
}

export default FindPatient;