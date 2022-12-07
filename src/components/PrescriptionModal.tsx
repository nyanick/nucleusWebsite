import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Button, useDisclosure, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputField} from ".";
import {useStateValue} from "../contexts/AuthProvider";
import {PrescriptionService} from "../services/PrescriptionService";
import {IPrescription} from "../types/prescription";
import {useRouter} from "next/router";

interface PrescriptionModalProps {
    setOpen: (open: boolean) => void
    setNewPrescription: (prescription: IPrescription) => void
    prescriptionId?: string
    editable: boolean
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({editable, setOpen, prescriptionId, setNewPrescription}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [prescription, setPrescription] = useState<IPrescription>(null)
    const [updatedPrescription, setUpdatedPrescription] = useState<IPrescription>(null)
    const [createdPrescription, setCreatedPrescription] = useState<IPrescription>(null)
    const [updating, setUpdating] = useState(false)
    const [creating, setCreating] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [loadingPrescription, setLoadingPrescription] = useState(false)
    const [prescriptionLoadingError, setPrescriptionLoadingError] = useState(null)
    const [updatePrescriptionError, setUpdatePrescriptionError] = useState(null)
    const [createPrescriptionError, setCreatePrescriptionError] = useState(null)
    const [{authToken}] = useStateValue()
    const router = useRouter()
    const toast = useToast()
    const prescriptionService = new PrescriptionService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingPrescription,
        setLoadingError: setPrescriptionLoadingError,
        setUpdatePrescriptionError: setUpdatePrescriptionError,
        setCreatePrescriptionError: setCreatePrescriptionError,
        setPrescription: setPrescription,
        setUpdatedPrescription: setUpdatedPrescription,
        setCreatedPrescription: setCreatedPrescription,
        setUpdatePrescription: setUpdating,
        setCreatePrescription: setCreating
    })

    useEffect(() => {
        if (prescriptionId) {
            prescriptionService.get(prescriptionId)
        }
        onOpen()
    }, [])

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (updatedPrescription) {
            setNewPrescription(updatedPrescription)
            setOpen(false)
        }
    }, [updatedPrescription])

    useEffect(() => {
        if (createdPrescription) {
            setNewPrescription(createdPrescription)
            setOpen(false)
        }
    }, [createdPrescription])

    useEffect(() => {
        if (updatePrescriptionError)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: JSON.stringify(updatePrescriptionError),
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updatePrescriptionError])

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            size='lg'
            onClose={() => {
                setOpen(false)
                onClose()
            }}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{prescriptionId ? (editable ? 'Modifier la prescription' : 'Détails de la prescription') : 'Nouvelle prescription'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            drug: prescription?.drug || '',
                            dosage: prescription?.dosage || '',
                            duration: prescription?.duration
                        }}
                        onSubmit={async (values) => {
                            if (prescriptionId)
                                prescriptionService.update({
                                    ...values,
                                    prescriptionId: prescriptionId,
                                    consultationId
                                })
                            else prescriptionService.create({...values, consultationId})
                        }}>
                        {({isSubmitting}) => (
                            <Form
                                autoComplete='off'
                                className='w-full'>
                                <InputField
                                    label='Médicament'
                                    required
                                    className='py-4 mb-4'
                                    name='drug'
                                    placeholder="Médicament"/>
                                <InputField
                                    label='Spécifiez le dosage'
                                    textarea
                                    required
                                    className='py-4 mb-4'
                                    name='dosage'
                                    placeholder="Spécifiez le dosage"/>
                                <InputField
                                    label='Durée (jours)'
                                    required
                                    name='duration'
                                    type='number'
                                    placeholder="Durée"/>
                                {editable && (
                                    <ModalFooter px={0}>
                                        <Button
                                            size='sm'
                                            mr={4}
                                            isLoading={isSubmitting}
                                            type='submit'
                                            colorScheme="messenger">
                                            {prescriptionId ? 'Modifier' : 'Sauvegarder'}
                                        </Button>
                                        <Button
                                            size='sm'
                                            onClick={() => {
                                                setOpen(false)
                                                onClose()
                                            }}>Annuler</Button>
                                    </ModalFooter>
                                )}
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default PrescriptionModal
