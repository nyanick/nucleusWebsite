import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Diagnostic, DiagnosticModal} from "../../../components";
import {PencilAltIcon} from "@heroicons/react/outline";
import {IDiagnosis} from "../../../types/diagnosis";
import {DiagnosticService} from "../../../services/DiagnosticService";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import {useFindConsultation} from "../../../hooks/api/consultation";

const Diagnostics: NextPage = ({}) => {
    const [diagnostics, setDiagnostics] = useState<IDiagnosis[]>([])
    const [diagnostic, setDiagnostic] = useState<IDiagnosis>(null)
    const [diagnosisCount, setDiagnosisCount] = useState(-1)
    const [isOwner, setIsOwner] = useState(false)
    const [{authToken, authUser}] = useStateValue();
    const [loadingDiagnostics, setLoadingDiagnostics] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [diagnosticsLoadingError, setDiagnosticsLoadingError] = useState(null)
    const [open, setOpen] = useState(false)
    const toast = useToast()
    const router = useRouter()

    const diagnosticService = new DiagnosticService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingDiagnostics,
        setItemsCount: setDiagnosisCount,
        setLoadingError: setDiagnosticsLoadingError,
        setDiagnostics: setDiagnostics
    })

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (consultationId)
            diagnosticService.getAll()
    }, [consultationId])

    useEffect(() => {
        if (diagnosticsLoadingError)
            toast({
                position: 'bottom',
                title: "Echec de chargement de diagnostics",
                description: "Une erreur est survenue lors du chargement de diagnostics",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [diagnosticsLoadingError])

    const refreshDiagnostics = () => {
        const index = diagnostics.findIndex((obj) => obj.diagnosisId === diagnostic.diagnosisId)
        let newArr = []
        if (index !== -1) {
            newArr = [...diagnostics]
            newArr[index] = diagnostic
            setDiagnostics(newArr)
        } else {
            setDiagnostics(oldArr => [diagnostic, ...oldArr])
        }
    }

    const {data: consultation} = useFindConsultation(consultationId)

    useEffect(() => {
        if (diagnostic)
            refreshDiagnostics()
    }, [diagnostic])

    useEffect(() => {
        if (authUser && consultation) {
            setIsOwner(authUser.userId === consultation.doctorUserId)
        }
    }, [authUser, consultation])

    return (
        <>
            {open ? <DiagnosticModal
                editable={isOwner}
                setNewDiagnostic={setDiagnostic}
                setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(diagnostics.length === 0 && !loadingDiagnostics) && (
                        <ConsultationEntryNotFound
                            callback={isOwner && setOpen}
                            message='Aucun diagnostic trouvé'/>
                    )}
                    {diagnostics.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {diagnostics.map((diagnostic, i) => (
                                <div key={diagnostic.diagnosisId}>
                                    <Diagnostic
                                        editable={isOwner}
                                        setNewDiagnostic={setDiagnostic}
                                        diagnostic={diagnostic}/>
                                    {(i !== diagnostics.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {diagnostics.length > 0 && (
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

export default Diagnostics;