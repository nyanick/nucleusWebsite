import {NextPage} from "next";
import {useRouter} from "next/router";
import {SearchIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {useFindPatientMedicalCares} from "../../../hooks/api/medical-care";
import {useFindUsersByIds} from "../../../hooks/api/user";
import {useFindHospitalsByIds} from "../../../hooks/api/hospital";
import InfirmaryReport from "../../../components/InfirmaryReport";

const InfirmaryReports: NextPage = () => {
    const router = useRouter()
    const [nurseUserIds, setNurseUserIds] = useState(null)
    const [hospitalIds, setHospitalIds] = useState(null)
    const {data: medicalCares} = useFindPatientMedicalCares(router.query.id)
    const {data: nurseUsers} = useFindUsersByIds(nurseUserIds)
    const {data: hospitals} = useFindHospitalsByIds(hospitalIds)

    useEffect(() => {
        if (medicalCares) {
            const nurseUserIds = []
            const hospitalIds = []
            medicalCares.medicalCares.forEach(care => {
                nurseUserIds.push(care.nurseUserId)
                hospitalIds.push(care.hospitalId)
            })
            setNurseUserIds(nurseUserIds.join(","))
            setHospitalIds(hospitalIds.join(","))
        }
    }, [medicalCares])

    return (
        <section className='bg-white rounded-lg border drop-shadow-sm my-8'>
            <div className='flex justify-between py-3 px-4 '>
                <h1 className='text-2xl font-medium'>Prises en charge accueil</h1>
                <div className='relative flex-1 max-w-xs'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500'/>
                    </div>
                    <input
                        className='transition-all bg-gray-100 block hover:ring-2 hover:ring-gray-500 py-[0.4rem] w-full pl-10 border-none sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                        type="text" placeholder='Rechercher une prise en charge accueil...'/>
                </div>
            </div>
            {nurseUsers && hospitals && (
                <div className='p-4 border-t space-y-3'>
                    {medicalCares.medicalCares.map(medicalCare => (
                        <InfirmaryReport
                            nurseUser={nurseUsers.find(user => medicalCare.nurseUserId === user.userId)}
                            hospital={hospitals.find(hospital => medicalCare.hospitalId === hospital.hospitalId)}
                            medicalCare={medicalCare}
                            key={medicalCare.medicalCareId}/>
                    ))}
                </div>
            )}
        </section>
    )
}

export default InfirmaryReports