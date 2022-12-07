import React, {useEffect} from "react";
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
import {useRouter} from "next/router";
import {
    useCreateCareObservation,
    useFindCareObservation,
    useUpdateCareObservation
} from "../hooks/api/medicalcare-observation";
import {ICareObservation} from "../types/medicalcare-observation";

interface ObservationModalProps {
    setOpen: (open: boolean) => void
    setNewObservation: (observation: ICareObservation) => void
    observationId?: string
}

const CareObservationModal: React.FC<ObservationModalProps> = ({setOpen, observationId, setNewObservation}) => {
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const createObservationMutation = useCreateCareObservation()
    const updateObservationMutation = useUpdateCareObservation()
    const {data: observation} = useFindCareObservation(observationId)

    useEffect(() => {
        onOpen()
    }, [])

    useEffect(() => {
        if (updateObservationMutation.data) {
            setNewObservation(updateObservationMutation.data)
            setOpen(false)
        }
    }, [updateObservationMutation.data])

    useEffect(() => {
        if (createObservationMutation.data) {
            setNewObservation(createObservationMutation.data)
            setOpen(false)
        }
    }, [createObservationMutation.data])

    useEffect(() => {
        if (updateObservationMutation.error)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: "Echec de mise à jour de l'observation",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updateObservationMutation.error])

    useEffect(() => {
        if (createObservationMutation.error)
            toast({
                position: 'bottom',
                title: "Echec d'ajout",
                description: "Echec d'ajout de l'observation",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [createObservationMutation.error])

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
                <ModalHeader>{observationId ? 'Modifier l\'observation' : 'Nouvelle observation'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={{description: observation?.description || ''}}
                        onSubmit={async (values, {setErrors}) => {
                            if (observationId) {
                                updateObservationMutation.mutate({
                                    medicalCareId: router.query.id as string,
                                    observationId: observationId,
                                    ...values
                                })
                            } else {
                                createObservationMutation.mutate({...values, medicalCareId: router.query.id as string})
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
                            </Form>
                        )}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CareObservationModal