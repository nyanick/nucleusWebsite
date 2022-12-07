import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {SymptomChip} from "../../../components";
import {ICustomSymptom, ISymptom} from "../../../types/symptom";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {CheckIcon, SearchIcon} from "@heroicons/react/solid";
import {ConsultationService} from "../../../services/ConsultationService";
import {IConsultation} from "../../../types/consultation";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";

const Symptoms: NextPage = ({}) => {

    const [symptoms, setSymptoms] = useState<ISymptom[]>([])
    const [customSymptoms, setCustomSymptoms] = useState<ICustomSymptom[]>([])
    const [consultation, setConsultation] = useState<IConsultation>(null)
    const [loadingConsultationError, setLoadingConsultationError] = useState(null)
    const [{authToken, authUser}] = useStateValue();
    const [isOwner, setIsOwner] = useState(false)
    const [loadingSymptoms, setLoadingSymptoms] = useState(false)
    const [loadingConsultation, setLoadingConsultation] = useState(false)
    const [updatingConsultation, setUpdatingConsultation] = useState(false)
    const [symptomsLoadingError, setSymptomsLoadingError] = useState(null)
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
    const [consultationId, setConsultationId] = useState(null)
    const [query, setQuery] = useState('')
    const [filteredSymptoms, setFilteredSymptoms] = useState<ICustomSymptom[]>([])
    const toast = useToast()
    const router = useRouter()

    const consultationService = new ConsultationService({
        authToken: authToken,
        setLoadingConsultation: setLoadingConsultation,
        setLoadingSymptoms: setLoadingSymptoms,
        setLoadingSymptomsError: setSymptomsLoadingError,
        setUpdatingConsultation: setUpdatingConsultation,
        setLoadingConsultationError: setLoadingConsultationError,
        setSymptoms: setSymptoms,
        setConsultation: setConsultation
    })

    const toSorted = (entries: ICustomSymptom[]) => {
        return entries.sort((s1, s2) => {
            if (s1.name < s2.name) {
                return -1;
            }
            if (s1 > s2) {
                return 1;
            }
            return 0;
        })
    }

    useEffect(() => {
        if (router.query.id) {
            setConsultationId(router.query.id)
        }
    }, [router])

    useEffect(() => {
        if (consultationId) {
            consultationService.get(consultationId)
        }
    }, [consultationId])

    useEffect(() => {
        if (symptoms.length !== 0) {
            const defaults = [...consultation.symptomIds]
            let allSymptoms = [...symptoms].map(s => ({...s, checked: false} as ICustomSymptom))
            if (defaults.length !== 0) {
                allSymptoms.filter(s => defaults.includes(s.symptomId)).map(item => item.checked = true)
            }
            setCustomSymptoms(allSymptoms)
        }
    }, [symptoms])

    useEffect(() => {
        if (consultation && selectedSymptoms === null)
            toast({
                position: 'bottom',
                title: "Confirmation de sauvegarde",
                description: "Vos sélections ont été enregistrées avec succès",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
    }, [consultation])

    useEffect(() => {
        const selected = customSymptoms.filter(symptom => symptom.checked === true).map(symptom => symptom.symptomId)
        setSelectedSymptoms(selected)
    }, [customSymptoms])

    useEffect(() => {
        if (symptomsLoadingError)
            toast({
                position: 'bottom',
                title: "Echec de chargement de symptômes",
                description: "Une erreur est survenue lors du chargement de symptômes",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [symptomsLoadingError])

    useEffect(() => {
        if (authUser && consultation) {
            setIsOwner(authUser.userId === consultation.doctorUserId)
        }
    }, [authUser, consultation])

    useEffect(() => {
        if (consultation) {
            consultationService.getSymptoms()
        }
    }, [consultation])

    useEffect(() => {
        if (query) {
            const s = customSymptoms.filter(symptom => symptom.name.toLowerCase().includes(query.toLowerCase()))
            setFilteredSymptoms(toSorted(s))
        }
    }, [query, customSymptoms])

    const saveEnabled = () => {
        if (consultation) {
            let checker = (arr, target) => target.every(v => arr.includes(v))
            if (consultation.symptomIds.length === selectedSymptoms?.length) {
                if (checker(consultation.symptomIds, selectedSymptoms) && checker(selectedSymptoms, consultation.symptomIds)) {
                    return false
                }
            }
        }
        return true
    }

    const updateConsultation = () => {
        const symptomIds = [...selectedSymptoms]
        setSelectedSymptoms(null)
        consultationService.update({...consultation, symptomIds: symptomIds})
    }

    return (
        <main className='grid grid-cols-6 w-full'>
            <section className='col-span-1'>
            </section>
            <section
                className='col-span-4'>
                {(customSymptoms.length === 0 && !loadingSymptoms) && (
                    <ConsultationEntryNotFound
                        callback={null}
                        message='Aucun symptôme disponible'/>
                )}
                {customSymptoms.length > 0 &&
                    <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                        <div className='relative w-full mb-2'>
                            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                <SearchIcon className='h-5 w-5 text-gray-500'/>
                            </div>
                            <input
                                onChange={event => setQuery(event.target.value)}
                                className='transition-all bg-gray-100 block hover:ring-2 hover:ring-gray-500 py-2 w-full pl-10 border-none sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                                type="text" placeholder='Rechercher un symptôme...'/>
                        </div>
                        <div
                            className='p-4'>
                            <div className='flex flex-wrap'>
                                {(query ? filteredSymptoms : customSymptoms).map((symptom) => (
                                    <SymptomChip
                                        key={symptom.symptomId}
                                        selectable={isOwner}
                                        symptoms={customSymptoms}
                                        setSymptoms={setCustomSymptoms}
                                        symptom={symptom}/>
                                ))}
                            </div>
                        </div>
                    </div>}
            </section>
            <section className='col-span-1'>
                {isOwner && customSymptoms.length > 0 && (
                    <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                        <button
                            disabled={!saveEnabled()}
                            onClick={() => updateConsultation()}
                            className='disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100 hover:disabled:border hover:disabled:border-gray-200 cursor-pointer flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                            <CheckIcon className='h-5 w-5 mr-3'/>
                            Appliquer
                        </button>
                    </div>)}
            </section>
        </main>
    );
};

export default Symptoms;