import React, {useEffect} from "react";
import {Wrapper} from "."
import {NavBar} from ".";
import {useGetCurrentUser} from "../hooks/api/account";
import {useStateValue} from "../contexts/AuthProvider";
import {StorePayload} from "../contexts/auth-reducer";
import {useToast} from "@chakra-ui/react";
import {useFindAdminHospital} from "../hooks/api/hospital";

interface Props {}

const Layout: React.FC<Props> = ({children}) => {
    const toast = useToast()
    const {data} = useGetCurrentUser()
    const [{currentHospital, hospitalSetup, authUser, adminHospital}, dispatch] = useStateValue();
    const roles = authUser?.authorities || []
    const isDoctor = roles[0] === "ROLE_DOCTOR" || false
    let {data: AdminHospital} =  useFindAdminHospital(authUser?.userId)

    const isHospitalAdmin = roles[0] === "ROLE_ADMIN_HOSPITAL" || false

    useEffect(() => {
        if (isHospitalAdmin && AdminHospital && AdminHospital.hospitalId != "undefined" ) {
            dispatch({
                storeAction: 'ADMIN_HOSPITAL',
                adminHospital: AdminHospital.hospitalId
            } as StorePayload)
        }
    }, [AdminHospital, adminHospital])

    useEffect(() => {
        if (data) {
            dispatch({
                storeAction: 'AUTH_USER',
                storeUser: data
            } as StorePayload)
        }
    }, [data])

    useEffect(() => {
        if(currentHospital && !hospitalSetup && currentHospital != "undefined") {
            toast({
                title: "Hôpital en cours d'exercice",
                position: 'top-right',
                description: `L'hôpital actif d'exercice est ${JSON.parse(currentHospital).name}`,
                status: "success",
                duration: 10000,
                isClosable: true
            })
            dispatch({
                storeAction: 'SETUP_HOSPITAL',
                hospitalSetup: true
            } as StorePayload)
        }
    }, [currentHospital, hospitalSetup])

    return (
        <>
            <NavBar/>
            <Wrapper>
                {children}
            </Wrapper>
        </>
    )
}

export default Layout