import React, {useEffect, useState} from "react";
import {
    Avatar, Menu, MenuButton, MenuDivider,
    MenuItem, MenuItemOption, MenuList,
    MenuOptionGroup
} from "@chakra-ui/react";
import Image from "next/image";
import {apiRoutes, appRoutes} from "../constants";
import {StorePayload} from "../contexts/auth-reducer";
import {useStateValue} from "../contexts/AuthProvider";
import {useRouter} from "next/router";
import Link from 'next/link'
import {useFindDoctorHospitals, useFindAdminHospital} from "../hooks/api/hospital";

interface Props {

}

const NavBar: React.FC<Props> = ({}) => {
    const router = useRouter()
    const [activeHospital, setActiveHospital] = useState(null)
    const [{authUser, currentHospital, adminHospital}, dispatch] = useStateValue();
    const roles = authUser?.authorities || []
    const isDoctor = roles[0] === "ROLE_DOCTOR" || false
    const nested = router.asPath.includes("/consultations") || router.asPath.includes("/medical-cares")
    const {data: doctorHospitals} = useFindDoctorHospitals(isDoctor, authUser?.userId)
    let {data: AdminHospital} =  useFindAdminHospital(authUser?.userId)

    const isHospitalAdmin = roles[0] === "ROLE_ADMIN_HOSPITAL" || false
    useEffect(() => {
        if(currentHospital && currentHospital != "undefined") {
            setActiveHospital(JSON.parse(currentHospital))
        }
    }, [currentHospital])


    useEffect(() => {
        if(isHospitalAdmin && AdminHospital ) {
            dispatch({
                storeAction: 'ADMIN_HOSPITAL',
                adminHospital: AdminHospital.hospitalId
            } as StorePayload)
        }
    }, [AdminHospital, adminHospital,isHospitalAdmin])

    useEffect(() => {
        if(authUser && doctorHospitals && ( !currentHospital || currentHospital == "undefined")) {
            dispatch({
                storeAction: 'CURRENT_HOSPITAL',
                currentHospital: JSON.stringify(doctorHospitals[0])
            } as StorePayload)
            setActiveHospital(doctorHospitals[0])
        }
    }, [authUser, currentHospital, doctorHospitals])


    const logout = async () => {
        dispatch({
            storeAction: 'LOGOUT'
        } as StorePayload)
        await router.replace(appRoutes.ROUTE_LOGIN)
    }

    const isConsultationLinkActive = (path: string) => {
        return router.asPath === `/consultations/${router.query.id}${path}`
    }

    const isMedicalCareLinkActive = (path: string) => {
        return router.asPath === `/medical-cares/${router.query.id}${path}`
    }

    return (
        <header className='bg-white flex flex-col sticky top-0 w-screen z-50 shadow-nav backdrop-filter backdrop-blur'>
            <div
                className={`flex w-full h-full my-3 bg-white min-h-full justify-between items-center ${nested ? 'max-w-5xl mx-auto' : 'px-16'}`}>
                <Link href='/'>
                    <a>
                        <Image className='cursor-pointer' width={124} height={42} alt='Logo' src='/images/logo.png'/>
                    </a>
                </Link>
                {authUser && <div className='flex items-center'>
                    <Menu placement={'top-end'} offset={[0, 8]}>
                        <MenuButton>
                            <Avatar
                                color='white'
                                size='sm'
                                bgColor='#0070F3'
                                name={`${authUser.firstName.substr(0, 1)}${authUser.lastName.substr(0, 1)}`}
                                src={`${authUser.avatarId ? apiRoutes.GET_USER_AVATAR(authUser.avatarId) : ''}`}/>
                        </MenuButton>
                        <MenuList width='340px'>
                            <MenuItem>
                                <div className='flex items-center space-x-3'>
                                    <Avatar
                                        color='white'
                                        bgColor='#0070F3'
                                        name={`${authUser.firstName.substr(0, 1)}${authUser.lastName.substr(0, 1)}`}
                                        src={`${authUser.avatarId ? apiRoutes.GET_USER_AVATAR(authUser.avatarId) : ''}`}/>
                                    <div>
                                        <p className='font-medium text-gray-700'>{`${authUser.firstName} ${authUser.lastName}`}</p>
                                        <p className='text-sm'>{authUser.email}</p>
                                        { isHospitalAdmin && AdminHospital && (
                                            <>
                                                <p className='font-medium text-gray-700'> { `Hôpital : ${AdminHospital.name}`}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </MenuItem>
                            {doctorHospitals && doctorHospitals.length > 0 && activeHospital && (
                                <>
                                    <MenuDivider/>
                                    <MenuOptionGroup defaultValue={activeHospital.hospitalId} type='radio' onChange={(hospitalId) => {
                                        const current = doctorHospitals.filter(h => h.hospitalId === hospitalId)[0]
                                        dispatch({
                                            storeAction: 'CURRENT_HOSPITAL',
                                            currentHospital: JSON.stringify(current)
                                        } as StorePayload)
                                        dispatch({
                                            storeAction: 'SETUP_HOSPITAL',
                                            hospitalSetup: false
                                        } as StorePayload)
                                    }}>
                                        {doctorHospitals.map(hospital => (
                                            <MenuItemOption key={hospital.hospitalId} value={hospital.hospitalId}>{hospital.name}</MenuItemOption>
                                        ))}
                                    </MenuOptionGroup>
                                </>
                            )}
                            <MenuDivider/>
                            <MenuItem onClick={logout}>Déconnexion</MenuItem>
                        </MenuList>
                    </Menu>
                </div>}
            </div>
            {nested && <div className='flex w-full mb-[1px] py-2 max-w-5xl mx-auto items-end'>
                {router.asPath.includes("/consultations/") && (
                    <>
                        <Link
                            href={`/consultations/${router.query.id}/observations`}>
                            <a className={`navLink ${isConsultationLinkActive('/observations') && 'active'}`}>Observations</a>
                        </Link>
                        <Link
                            href={`/consultations/${router.query.id}/symptoms`}>
                            <a className={`navLink ${isConsultationLinkActive('/symptoms') && 'active'}`}>Symptômes</a>
                        </Link>
                        <Link
                            href={`/consultations/${router.query.id}/exams`}>
                            <a className={`navLink ${isConsultationLinkActive('/exams') && 'active'}`}>Examens</a>
                        </Link>
                        <Link
                            href={`/consultations/${router.query.id}/diagnosis`}>
                            <a className={`navLink ${isConsultationLinkActive('/diagnosis') && 'active'}`}>Diagnostics</a>
                        </Link>
                        <Link
                            href={`/consultations/${router.query.id}/prescriptions`}>
                            <a className={`navLink ${isConsultationLinkActive('/prescriptions') && 'active'}`}>Prescriptions</a>
                        </Link>
                        <Link
                            href={`/consultations/${router.query.id}`}>
                            <a className={`navLink ${isConsultationLinkActive('') && 'active'}`}>Synthèse</a>
                        </Link>
                    </>
                )}
                {router.asPath.includes("/medical-cares/") && (
                    <>
                        <Link
                            href={`/medical-cares/${router.query.id}/parameters`}>
                            <a className={`navLink ${isMedicalCareLinkActive('/parameters') && 'active'}`}>Paramètres</a>
                        </Link>
                        <Link
                            href={`/medical-cares/${router.query.id}/observations`}>
                            <a className={`navLink ${isMedicalCareLinkActive('/observations') && 'active'}`}>Observations</a>
                        </Link>
                        <Link
                            href={`/medical-cares/${router.query.id}/cares`}>
                            <a className={`navLink ${isMedicalCareLinkActive('/cares') && 'active'}`}>Soins</a>
                        </Link>
                        <Link
                            href={`/medical-cares/${router.query.id}`}>
                            <a className={`navLink ${isMedicalCareLinkActive('') && 'active'}`}>Synthèse</a>
                        </Link>
                    </>
                )}
            </div>}
        </header>
    )
}

export default NavBar