import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Consultation} from "../../components";
import {SearchIcon} from "@heroicons/react/solid";
import {useDisclosure, useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";
import {UserService} from "../../services/UserService";
import {useStateValue} from "../../contexts/AuthProvider";
import {PatientService} from "../../services/PatientService";
import {IPatient} from "../../types/patient";
import {ConsultationService} from "../../services/ConsultationService";
import {IConsultation} from "../../types/consultation";
import CreateConsultationDialog from "../../components/CreateConsultationDialog";

const Consultations: NextPage = ({}) => {
    const [consultations, setConsultations] = useState<IConsultation[]>([])
    const [consultation, setConsultation] = useState<IConsultation>(null)
    const [patient, setPatient] = useState<IPatient>(null)
    const [user, setUser] = useState<IUser>(null)
    const [userLoading, setUserLoading] = useState(false)
    const [userLoadingError, setUserLoadingError] = useState(null)
    const [loadingConsultations, setLoadingConsultations] = useState(false)
    const [creatingConsultationError, setCreatingConsultationError] = useState(null)
    const [patientLoadingError, setPatientLoadingError] = useState(null)
    const [loadingConsultationsError, setLoadingConsultationsError] = useState(null)
    const [createConsultation, setCreateConsultation] = useState(false)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const router = useRouter()
    const toast = useToast()
    const [{authToken, authUser,currentHospital}] = useStateValue();

    const userService = new UserService({
        authToken: authToken,
        setUser: setUser,
        setLoading: setUserLoading,
        setLoadingError: setUserLoadingError
    })
    const patientService = new PatientService({
        authToken: authToken,
        setPatient: setPatient,
        setLoadingError: setPatientLoadingError
    })

    const consultationService = new ConsultationService({
        authToken: authToken,
        setLoadingConsultations: setLoadingConsultations,
        setLoadingConsultationsError: setLoadingConsultationsError,
        setConsultation: setConsultation,
        setConsultations: setConsultations,
        setCreatingConsultation: setCreateConsultation,
        setCreatingConsultationError: setCreatingConsultationError
    })

    useEffect(() => {
        if(authUser?.userId) {
            consultationService.getAll(authUser.userId)
        }
    }, [authUser])

    useEffect(() => {
        if (patient) userService.get(patient.userId)
    }, [patient])

    useEffect(() => {
        if (consultation) router.push(`/consultations/${consultation.consultationId}`)
    }, [consultation])

    useEffect(() => {
        if (patientLoadingError) setUserLoadingError(patientLoadingError)
    }, [patientLoadingError, userLoadingError])

    useEffect(() => {
        if (creatingConsultationError) {
            toast({
                position: 'bottom',
                title: "Echec de création de consultation",
                description: "Une erreur est survenue lors de la création d'une nouvelle consultation",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }, [creatingConsultationError])

    useEffect(() => {
        setUserLoading(false)
    }, [patientLoadingError])

    console.log(currentHospital);

    return (
        <>
            {isOpen && <CreateConsultationDialog
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
                            <p className='text-gray-400'>Démarrer une nouvelle consultation</p>
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
                                type="text" placeholder='Rechercher une consultation...'/>
                        </div>
                    </div>
                    <div className='mt-8'>
                    {console.log('Hello yanick')}
                    {console.log(JSON.parse(currentHospital)?.hospitalId)}
                    {consultations.filter(e=> e.hospitalId == JSON.parse(currentHospital)?.hospitalId ).map((consultation, i) => (
                            <>
                                <Consultation
                                    key={consultation.consultationId}
                                    consultation={consultation}/>
                                {(i !== consultations.length - 1) && <hr className='mx-4'/>}
                            </>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Consultations;