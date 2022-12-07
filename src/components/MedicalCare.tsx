import React from "react";
import {apiRoutes} from "../constants";
import 'moment/locale/fr';
import moment from "moment";
import Link from "next/link";
import {RiHospitalLine} from "react-icons/ri";
import {Avatar} from "@chakra-ui/react";
import {useGetHospital} from "../hooks/api/hospital";
import {IMedicalCare} from "../types/medical-care";
import {useFindUser} from "../hooks/api/user";
import {useFindPatientByUserId} from "../hooks/api/patient";

moment.locale('fr')

interface Props {
    medicalCare: IMedicalCare,
    fromPatient?: boolean
}

const MedicalCare: React.FC<Props> = ({medicalCare, fromPatient}) => {
    const {data: hospital} = useGetHospital(medicalCare.hospitalId)
    const {data: user} = useFindUser(fromPatient ? medicalCare.nurseUserId : medicalCare.patientUserId)
    const {data: patient} = useFindPatientByUserId(fromPatient ? medicalCare.nurseUserId : medicalCare.patientUserId)

    return (
        user ? (
            <Link href={`/medical-cares/${medicalCare.medicalCareId}`}>
                <a className='group transition-all'>
                    <div
                        className='flex items-start space-x-4 p-2 w-full group-hover:bg-gray-50 rounded-md'>
                        <Avatar
                            _hover={{cursor: 'pointer'}}
                            color='white'
                            size='md'
                            bgColor='#0070F3'
                            name={`${user.firstName.split(" ")[0]} ${user.lastName.split(" ")[0]}`}
                            src={`${user.avatarId ? apiRoutes.GET_USER_AVATAR(user.avatarId) : ''}`}/>
                        <div className='flex-1'>
                            <div className='flex items-center'>
                                <p className='font-medium flex-1'>{`${user.firstName} ${user.lastName}`}</p>
                            </div>
                            <div className='flex items-center'>
                                <span className='text-xs'>{moment().diff(moment(user.bornOn), 'years')}</span>
                                <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mx-2'/>
                                <span className='text-xs'>{patient?.bloodGroup}{patient?.rhesusFactor}</span>
                                <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mx-2'/>
                                <span className='text-xs'>{patient?.gender}</span>
                            </div>
                            <div className='flex space-x-2 mt-1 items-center text-sm'>
                                <RiHospitalLine/>
                                <span>{hospital?.name}</span>
                            </div>
                            <div className='flex justify-between items-center mt-2'>
                                <p className='flex items-center justify-end text-sm text-gray-600'>
                                    Dernièrement modifiée le
                                </p>
                                <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-purple-50 border px-2 py-0.5'>
                                    <span className='mx-1'>{moment(medicalCare.updatedAt).format('H:mm')}</span>
                                    <span className='w-1.5 h-1.5 mx-1 bg-gray-400 rounded-full group-hover:bg-green-600'/>
                                    <span className='ml-1'>{moment(medicalCare.updatedAt).format('DD-MM-YYYY')}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        ) : null
    )
}

export default MedicalCare