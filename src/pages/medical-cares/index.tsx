import {NextPage} from "next";
import React from "react";
import {SearchIcon} from "@heroicons/react/solid";
import {useDisclosure} from "@chakra-ui/react";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindMedicalCares} from "../../hooks/api/medical-care";
import MedicalCare from "../../components/MedicalCare";
import CreateMedicalCareDialog from "../../components/CreateMedicalCareDialog";
import {useFindNurseByUserId} from "../../hooks/api/nurse";

const MedicalCares: NextPage = ({}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [{authUser}] = useStateValue();
    const {data: nurse} = useFindNurseByUserId(authUser?.userId)
    const {data: medicalCares} = useFindMedicalCares(nurse?.hospitalId, null, null)

    return (
        <>
            {isOpen && <CreateMedicalCareDialog
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}/>}
            <main className='my-4 py-8 max-w-screen-sm mx-auto space-y-4'>
                <section>
                    <div
                        onClick={onOpen}
                        className='w-full bg-white rounded-lg border drop-shadow-sm px-4 py-2 flex items-center space-x-3'>
                        <div className='w-10 h-10 p-1 bg-gray-100 rounded-full flex justify-center items-center'>
                            <img
                                className='w-6 h-6 object-contain'
                                src='/assets/icons/diagnosis.png'
                                alt='Avatar'/>
                        </div>
                        <div
                            className='flex-1 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-full py-2 px-4'>
                            <p className='text-gray-400'>Nouvelle prise en charge accueil</p>
                        </div>
                    </div>
                </section>
                <section className='w-full bg-white rounded-lg border drop-shadow-sm px-4 py-2'>
                    <div className='flex justify-end pb-2 border-b'>
                        <div className='relative flex-1 max-w-xs'>
                            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                <SearchIcon className='h-5 w-5 text-gray-500'/>
                            </div>
                            <input
                                className='transition-all bg-gray-100 block hover:ring-2 hover:ring-gray-500 py-[0.4rem] w-full pl-10 border-none sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                                type="text" placeholder='Rechercher une prise en charge accueil...'/>
                        </div>
                    </div>
                    <div className='mt-8'>
                        {medicalCares?.medicalCares.map((medicalCare, i) => (
                            <>
                                <MedicalCare
                                    key={medicalCare.medicalCareId}
                                    medicalCare={medicalCare}/>
                                {(i !== medicalCares.medicalCares.length - 1) && <hr className='mx-4'/>}
                            </>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default MedicalCares;