import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useToast} from "@chakra-ui/react";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import {PencilAltIcon} from "@heroicons/react/outline";
import {useFindMedicalCareObservations} from "../../../hooks/api/medicalcare-observation";
import {ICareObservation} from "../../../types/medicalcare-observation";
import CareObservation from "../../../components/CareObservation";
import CareObservationModal from "../../../components/CareObservationModal";

const Observations: NextPage = ({}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [careObservations, setCareObservations] = useState<ICareObservation[]>([])
    const [selectedObservation, setSelectedObservation] = useState<ICareObservation>(null)
    const {error: observationsLoadingError, data: observations, isLoading: loadingObservations} = useFindMedicalCareObservations(router.query.id as string)
    const toast = useToast()

    useEffect(() => {
        if(observations) {
            setCareObservations(observations)
        }
    }, [observations])

    useEffect(() => {
        if (observationsLoadingError)
            toast({
                position: 'bottom',
                title: "Echec du chargement d'observations",
                description: "Une erreur est survenue lors du chargement d'observations",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [observationsLoadingError])

    const refreshObservations = () => {
        const index = careObservations.findIndex((obj) => obj.observationId === selectedObservation.observationId)
        let newArr = []
        if (index !== -1) {
            newArr = [...careObservations]
            newArr[index] = selectedObservation
            setCareObservations(newArr)
        } else {
            setCareObservations(oldArr => [selectedObservation, ...oldArr])
        }
    }

    useEffect(() => {
        if (selectedObservation)
            refreshObservations()
    }, [selectedObservation])

    return (
        <>
            {open ? <CareObservationModal setNewObservation={setSelectedObservation} setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(careObservations.length === 0 && !loadingObservations) && (
                        <ConsultationEntryNotFound
                            callback={setOpen}
                            message='Aucune observation trouvée'/>
                    )}
                    {careObservations.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {careObservations.map((observation, i) => (
                                <div key={observation.observationId}>
                                    <CareObservation
                                        setNewObservation={setSelectedObservation}
                                        observation={observation}/>
                                    {(i !== careObservations.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {careObservations.length > 0 && (
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