import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Prescription, PrescriptionModal} from "../../../components";
import {PencilAltIcon} from "@heroicons/react/outline";
import {IPrescription} from "../../../types/prescription";
import {PrescriptionService} from "../../../services/PrescriptionService";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import {useFindConsultation} from "../../../hooks/api/consultation";

const Prescriptions: NextPage = ({}) => {
    const [prescriptions, setPrescriptions] = useState<IPrescription[]>([])
    const [prescription, setPrescription] = useState<IPrescription>(null)
    const [isOwner, setIsOwner] = useState(false)
    const [prescriptionCount, setPrescriptionCount] = useState(-1)
    const [{authToken, authUser}] = useStateValue();
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [prescriptionsLoadingError, setPrescriptionsLoadingError] = useState(null)
    const [open, setOpen] = useState(false)
    const toast = useToast()
    const router = useRouter()
    const {data: consultation} = useFindConsultation(consultationId)

    const prescriptionService = new PrescriptionService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingPrescriptions,
        setItemsCount: setPrescriptionCount,
        setLoadingError: setPrescriptionsLoadingError,
        setPrescriptions: setPrescriptions
    })

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (consultationId)
            prescriptionService.getAll()
    }, [consultationId])

    useEffect(() => {
        if (prescriptionsLoadingError)
            toast({
                position: 'bottom',
                title: "Echec de chargement de prescriptions",
                description: "Une erreur est survenue lors du chargement de prescriptions",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [prescriptionsLoadingError])

    const refreshPrescriptions = () => {
        const index = prescriptions.findIndex((obj) => obj.prescriptionId === prescription.prescriptionId)
        let newArr = []
        if (index !== -1) {
            newArr = [...prescriptions]
            newArr[index] = prescription
            setPrescriptions(newArr)
        } else {
            setPrescriptions(oldArr => [prescription, ...oldArr])
        }
    }

    useEffect(() => {
        if (prescription)
            refreshPrescriptions()
    }, [prescription])

    useEffect(() => {
        if (authUser && consultation) {
            setIsOwner(authUser.userId === consultation.doctorUserId)
        }
    }, [authUser, consultation])

    return (
        <>
            {open ? <PrescriptionModal
                editable={isOwner}
                setNewPrescription={setPrescription}
                setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(prescriptions.length === 0 && !loadingPrescriptions) && (
                        <ConsultationEntryNotFound
                            callback={isOwner && setOpen}
                            message='Aucune prescription trouvée'/>
                    )}
                    {prescriptions.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {prescriptions.map((prescription, i) => (
                                <div key={prescription.prescriptionId}>
                                    <Prescription
                                        editable={isOwner}
                                        setNewPrescription={setPrescription}
                                        prescription={prescription}/>
                                    {(i !== prescriptions.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {isOwner && prescriptions.length > 0 && (
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

export default Prescriptions;