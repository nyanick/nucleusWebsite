import React, {useEffect, useState} from 'react';
import type {NextPage} from "next";
import {useRouter} from "next/router";
import {ExamChip} from '../../../components';
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, useToast} from "@chakra-ui/react";
import {CheckIcon} from "@heroicons/react/solid";
import {ConsultationService} from "../../../services/ConsultationService";
import {useStateValue} from "../../../contexts/AuthProvider";
import {ICustomExam, IExam} from "../../../types/exam";
import {ICategory} from "../../../types/category";
import {IGroup} from "../../../types/group";
import {IConsultation} from "../../../types/consultation";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";

const Exams: NextPage = ({}) => {
    const [{authToken, authUser}] = useStateValue();
    const router = useRouter()
    const [isOwner, setIsOwner] = useState(false)
    const [loadingConsultation, setLoadingConsultation] = useState(false)
    const [loadingExamCategories, setLoadingExamCategories] = useState(false)
    const [loadingExamGroups, setLoadingExamGroups] = useState(false)
    const [loadingExams, setLoadingExams] = useState(false)
    const [loadingExamsError, setLoadingExamsError] = useState(null)
    const [loadingConsultationError, setLoadingConsultationError] = useState(null)
    const [updatingConsultationError, setUpdatingConsultationError] = useState(null)
    const [loadingExamCategoriesError, setLoadingExamCategoriesError] = useState(null)
    const [loadingExamGroupsError, setLoadingExamGroupsError] = useState(null)
    const [updatingConsultation, setUpdatingConsultation] = useState(false)
    const [consultation, setConsultation] = useState<IConsultation>(null)
    const [exams, setExams] = useState<IExam[]>([])
    const [examGroups, setExamGroups] = useState<IGroup[]>([])
    const [examCategories, setExamCategories] = useState<ICategory[]>([])
    const [sortedCategories, setSortedCategories] = useState<ICategory[]>([])
    const [sortedGroups, setSortedGroups] = useState<IGroup[]>([])
    const [consultationId, setConsultationId] = useState(null)
    const [customExams, setCustomExams] = useState<ICustomExam[]>([])
    const [selectedExams, setSelectedExams] = useState<string[]>([])
    const toast = useToast()

    const consultationService = new ConsultationService({
        authToken: authToken,
        setLoadingConsultation: setLoadingConsultation,
        setUpdatingConsultation: setUpdatingConsultation,
        setLoadingExams: setLoadingExams,
        setLoadingExamCategories: setLoadingExamCategories,
        setLoadingExamGroups: setLoadingExamGroups,
        setLoadingExamsError: setLoadingExamsError,
        setLoadingExamCategoriesError: setLoadingExamCategoriesError,
        setLoadingExamGroupsError: setLoadingExamGroupsError,
        setLoadingConsultationError: setLoadingConsultationError,
        setUpdatingConsultationError: setUpdatingConsultationError,
        setExams: setExams,
        setExamGroups: setExamGroups,
        setExamCategories: setExamCategories,
        setConsultation: setConsultation
    })

    useEffect(() => {
        if (authUser && consultation) {
            setIsOwner(authUser.userId === consultation.doctorUserId)
        }
    }, [authUser, consultation])

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
        if (consultation && selectedExams === null)
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
        if (loadingExamsError)
            toast({
                position: 'bottom',
                title: "Echec de chargement d'examens",
                description: "Une erreur est survenue lors du chargement d'examens",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [loadingExamsError])

    useEffect(() => {
        if (loadingExamGroupsError)
            toast({
                position: 'bottom',
                title: "Echec de chargement de groupes d'examens",
                description: "Une erreur est survenue lors du chargement de groupes d'examens",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [loadingExamGroupsError])

    useEffect(() => {
        if (loadingExamCategoriesError)
            toast({
                position: 'bottom',
                title: "Echec de chargement de catégories d'examens",
                description: "Une erreur est survenue lors du chargement de catégories d'examens",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [loadingExamCategoriesError])

    useEffect(() => {
        if (consultation) {
            consultationService.getExams()
            consultationService.getExamCategories()
            consultationService.getExamGroups()
        }
    }, [consultation])

    useEffect(() => {
        const selected = customExams.filter(exam => exam.checked === true).map(exam => exam.examId)
        setSelectedExams(selected)
    }, [customExams])

    useEffect(() => {
        if (exams.length !== 0 && examCategories.length !== 0 && examGroups.length !== 0) {
            const categoryKeys = exams.map(e => e.categoryId)
            const categories = examCategories.filter(c => categoryKeys.includes(c.categoryId))
            const groupKeys = categories.map(c => c.groupId)
            const groups = examGroups.filter(g => groupKeys.includes(g.groupId))

            const defaults = [...consultation.examIds]
            let allExams = [...exams].map(s => ({...s, checked: false} as ICustomExam))
            if (defaults.length !== 0) {
                allExams.filter(s => defaults.includes(s.examId)).map(item => item.checked = true)
            }

            setCustomExams(allExams)
            setSortedCategories(categories)
            setSortedGroups(groups)
        }
    }, [exams, examCategories, examGroups])

    const saveEnabled = () => {
        if (consultation) {
            let checker = (arr, target) => target.every(v => arr.includes(v))
            if (consultation.examIds.length === selectedExams?.length) {
                if (checker(consultation.examIds, selectedExams) && checker(selectedExams, consultation.examIds)) {
                    return false
                }
            }
        }
        return true
    }

    const updateConsultation = () => {
        const examIds = [...selectedExams]
        setSelectedExams(null)
        consultationService.update({...consultation, examIds: examIds})
    }

    return (
        <main className='grid grid-cols-6'>
            <section className='col-span-1'>
            </section>
            <section className='col-span-4'>
                {(customExams.length === 0 && !loadingExams) && (
                    <ConsultationEntryNotFound
                        callback={null}
                        message='Aucun examen disponible'/>
                )}
                {customExams.length > 0 && (
                    <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                        <Accordion allowMultiple>
                            {sortedGroups.map((group) => (
                                <AccordionItem key={group.groupId} className='mb-8 border-none'>
                                    {({isExpanded}) => (
                                        <>
                                            <h2>
                                                <AccordionButton
                                                    className={`border-t border-b border-l border-r rounded-t-md ${!isExpanded && 'rounded-b-md'}`}>
                                                    <h2 className='text-lg font-medium flex-1 text-left'>
                                                        {group.name}
                                                    </h2>
                                                    <AccordionIcon/>
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel p={0}>
                                                {sortedCategories.filter((c) => c.groupId === group.groupId).map((category) => (
                                                    <AccordionItem key={category.categoryId}
                                                                   className='border-none'>
                                                        {({isExpanded}) => (
                                                            <>
                                                                <h2>
                                                                    <AccordionButton
                                                                        className={`!py-1 border-b border-l border-r ${!isExpanded && ''}`}>
                                                                        <h2 className='text-md text-gray-600 font-medium flex-1 text-left'>
                                                                            {category.name}
                                                                        </h2>
                                                                        <AccordionIcon/>
                                                                    </AccordionButton>
                                                                </h2>
                                                                <AccordionPanel
                                                                    className='border-b border-l border-r'
                                                                    p={0}>
                                                                    <div className='flex p-4 flex-wrap'>
                                                                        {customExams.filter((e) => e.categoryId === category.categoryId).map((exam) => (
                                                                            <ExamChip
                                                                                key={exam.examId}
                                                                                selectable={isOwner}
                                                                                exams={customExams}
                                                                                setExams={setCustomExams}
                                                                                exam={exam}/>
                                                                        ))}
                                                                    </div>
                                                                </AccordionPanel>
                                                            </>
                                                        )}
                                                    </AccordionItem>
                                                ))}
                                            </AccordionPanel>
                                        </>
                                    )}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}
            </section>
            <section className='col-span-1'>
                {isOwner && customExams.length > 0 && (
                    <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                        <button
                            disabled={!saveEnabled()}
                            onClick={() => updateConsultation()}
                            className='disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-100 hover:disabled:border hover:disabled:border-gray-200 cursor-pointer flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                            <CheckIcon className='h-5 w-5 mr-3'/>
                            Appliquer
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Exams;