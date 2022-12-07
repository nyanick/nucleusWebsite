import React from 'react';
import type {NextPage} from "next";
import {useRouter} from "next/router";
import {useFindPatientPrescriptions} from "../../../hooks/api/prescription";
import {SearchIcon} from "@heroicons/react/solid";
import ConsultationPrescriptions from "../../../components/ConsultationPrescriptions";

const Prescriptions: NextPage = ({}) => {
    const router = useRouter()
    const {data} = useFindPatientPrescriptions(router.query.id)

    return (
        <section className='bg-white rounded-lg border drop-shadow-sm my-8'>
            <div className='flex justify-between py-3 px-4 '>
                <h1 className='text-2xl font-medium'>Prescriptions</h1>
                <div className='relative flex-1 max-w-xs'>
                    <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon className='h-5 w-5 text-gray-500'/>
                    </div>
                    <input
                        className='transition-all bg-gray-100 block hover:ring-2 hover:ring-gray-500 py-[0.4rem] w-full pl-10 border-none sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                        type="text" placeholder='Rechercher une prescription...'/>
                </div>
            </div>
            {data?.prescriptions && (
                <div className='p-4 border-t space-y-3'>
                    {data.prescriptions.map((prescription) => (
                        <ConsultationPrescriptions
                            consultationPrescriptions={prescription}
                            key={prescription.consultationId}/>
                    ))}
                </div>
            )}
        </section>
    )
};

export default Prescriptions;