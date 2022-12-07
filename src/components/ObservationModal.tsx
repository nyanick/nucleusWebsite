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
import {ObservationService} from "../services/ObservationService";
import {IObservation} from "../types/observation";
import {useRouter} from "next/router";

interface ObservationModalProps {
    setOpen: (open: boolean) => void
    editable: boolean
    setNewObservation: (observation: IObservation) => void
    observationId?: string
}

const ObservationModal: React.FC<ObservationModalProps> = ({setOpen, observationId, setNewObservation, editable}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [observation, setObservation] = useState<IObservation>(null)
    const [updatedObservation, setUpdatedObservation] = useState<IObservation>(null)
    const [createdObservation, setCreatedObservation] = useState<IObservation>(null)
    const [updating, setUpdating] = useState(false)
    const [creating, setCreating] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [loadingObservation, setLoadingObservation] = useState(false)
    const [observationLoadingError, setObservationLoadingError] = useState(null)
    const [updateObservationError, setUpdateObservationError] = useState(null)
    const [createObservationError, setCreateObservationError] = useState(null)
    const [{authToken}] = useStateValue()
    const router = useRouter()
    const toast = useToast()
    const observationService = new ObservationService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingObservation,
        setLoadingError: setObservationLoadingError,
        setUpdateObservationError: setUpdateObservationError,
        setCreateObservationError: setCreateObservationError,
        setObservation: setObservation,
        setUpdatedObservation: setUpdatedObservation,
        setCreatedObservation: setCreatedObservation,
        setUpdateObservation: setUpdating,
        setCreateObservation: setCreating
    })

    useEffect(() => {
        if (observationId) {
            observationService.get(observationId)
        }
        onOpen()
    }, [])

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (updatedObservation) {
            setNewObservation(updatedObservation)
            setOpen(false)
        }
    }, [updatedObservation])

    useEffect(() => {
        if (createdObservation) {
            setNewObservation(createdObservation)
            setOpen(false)
        }
    }, [createdObservation])

    useEffect(() => {
        if (updateObservationError)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: JSON.stringify(updateObservationError),
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updateObservationError])

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={() => {
                setOpen(false)
                onClose()
            }}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{observationId ? (editable ? 'Modifier l\'observation' : 'Détails de l\'observation') : 'Nouvelle observation'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={{description: observation?.description || ''}}
                        onSubmit={async (values, {setErrors}) => {
                            if (observationId) {
                                observationService.update({
                                    ...values,
                                    observationId: observationId,
                                    consultationId
                                })
                            } else {
                                observationService.create({...values, consultationId})
                            }
                        }}>
                        {({isSubmitting}) => (
                            <Form
                                autoComplete='off'
                                className='w-full'>
                                <InputField
                                    required
                                    label='Observation'
                                    textarea
                                    className='py-4'
                                    name='description'
                                    placeholder="Entrez une observation"
                                />
                                {editable && (
                                    <ModalFooter px={0}>
                                        <Button
                                            mr={4}
                                            isLoading={isSubmitting}
                                            type='submit'
                                            colorScheme="messenger"
                                            size='sm'>
                                            {observationId ? 'Modifier' : 'Sauvegarder'}
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

export default ObservationModal