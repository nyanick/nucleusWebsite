import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Observation, ObservationModal} from "../../../components";
import {PencilAltIcon} from "@heroicons/react/outline";
import {IObservation} from "../../../types/observation";
import {ObservationService} from "../../../services/ObservationService";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import {useFindConsultation} from "../../../hooks/api/consultation";

const Observations: NextPage = ({}) => {
    const [isOwner, setIsOwner] = useState(false)
    const [observations, setObservations] = useState<IObservation[]>([])
    const [observation, setObservation] = useState<IObservation>(null)
    const [{authToken, authUser}] = useStateValue();
    const [loadingObservations, setLoadingObservations] = useState(false)
    const [observationsLoadingError, setObservationsLoadingError] = useState(null)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [consultationId, setConsultationId] = useState(null)
    const toast = useToast()
    const {data: consultation} = useFindConsultation(consultationId)

    const observationService = new ObservationService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingObservations,
        setLoadingError: setObservationsLoadingError,
        setObservations: setObservations
    })

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (consultationId)
            observationService.getAll()
    }, [consultationId])

    useEffect(() => {
        if (observationsLoadingError)
            toast({
                position: 'bottom',
                title: "Echec de chargement d'observations",
                description: "Une erreur est survenue lors du chargement d'observations",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [observationsLoadingError])

    const refreshObservations = () => {
        const index = observations.findIndex((obj) => obj.observationId === observation.observationId)
        let newArr = []
        if (index !== -1) {
            newArr = [...observations]
            newArr[index] = observation
            setObservations(newArr)
        } else {
            setObservations(oldArr => [observation, ...oldArr])
        }
    }

    useEffect(() => {
        if (authUser && consultation) {
            setIsOwner(authUser.userId === consultation.doctorUserId)
        }
    }, [authUser, consultation])

    useEffect(() => {
        if (observation)
            refreshObservations()
    }, [observation])

    return (
        <>
            {open ? <ObservationModal editable={isOwner} setNewObservation={setObservation} setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(observations.length === 0 && !loadingObservations) && (
                        <ConsultationEntryNotFound
                            callback={isOwner && setOpen}
                            message='Aucune observation trouvée'/>
                    )}
                    {observations.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {observations.map((observation, i) => (
                                <div key={observation.observationId}>
                                    <Observation
                                        editable={isOwner}
                                        setNewObservation={setObservation}
                                        observation={observation}/>
                                    {(i !== observations.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {observations.length > 0 && (
                        <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                            <button
                                onClick={() => setOpen(true)}
                                className='flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                                <PencilAltIcon className='h-5 w-5 mr-3'/>
                                Ajouter
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Observations;