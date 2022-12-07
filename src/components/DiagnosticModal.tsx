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
import {DiagnosticService} from "../services/DiagnosticService";
import {IDiagnosis} from "../types/diagnosis";
import {useRouter} from "next/router";

interface DiagnosticModalProps {
    setOpen: (open: boolean) => void
    setNewDiagnostic: (diagnostic: IDiagnosis) => void
    diagnosticId?: string
    editable: boolean
}

const DiagnosticModal: React.FC<DiagnosticModalProps> = ({setOpen, diagnosticId, setNewDiagnostic, editable}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [diagnostic, setDiagnostic] = useState<IDiagnosis>(null)
    const [updatedDiagnostic, setUpdatedDiagnostic] = useState<IDiagnosis>(null)
    const [createdDiagnostic, setCreatedDiagnostic] = useState<IDiagnosis>(null)
    const [updating, setUpdating] = useState(false)
    const [creating, setCreating] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [loadingDiagnostic, setLoadingDiagnostic] = useState(false)
    const [diagnosticLoadingError, setDiagnosticLoadingError] = useState(null)
    const [updateDiagnosticError, setUpdateDiagnosticError] = useState(null)
    const [createDiagnosticError, setCreateDiagnosticError] = useState(null)
    const [{authToken}] = useStateValue()
    const router = useRouter()
    const toast = useToast()
    const diagnosticService = new DiagnosticService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingDiagnostic,
        setLoadingError: setDiagnosticLoadingError,
        setUpdateDiagnosticError: setUpdateDiagnosticError,
        setCreateDiagnosticError: setCreateDiagnosticError,
        setDiagnostic: setDiagnostic,
        setUpdatedDiagnostic: setUpdatedDiagnostic,
        setCreatedDiagnostic: setCreatedDiagnostic,
        setUpdateDiagnostic: setUpdating,
        setCreateDiagnostic: setCreating
    })

    useEffect(() => {
        if (diagnosticId) {
            diagnosticService.get(diagnosticId)
        }
        onOpen()
    }, [])

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (updatedDiagnostic) {
            setNewDiagnostic(updatedDiagnostic)
            setOpen(false)
        }
    }, [updatedDiagnostic])

    useEffect(() => {
        if (createdDiagnostic) {
            setNewDiagnostic(createdDiagnostic)
            setOpen(false)
        }
    }, [createdDiagnostic])

    useEffect(() => {
        if (updateDiagnosticError)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: JSON.stringify(updateDiagnosticError),
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updateDiagnosticError])

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
                <ModalHeader>{diagnosticId ? (editable ? 'Modifier le diagnostic' : 'Détails du diagnostic') : 'Nouveau diagnostic'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={{description: diagnostic?.description || ''}}
                        onSubmit={async (values) => {
                            if (diagnosticId) {
                                diagnosticService.update({
                                    ...values,
                                    diagnosisId: diagnosticId,
                                    consultationId
                                })
                            } else {
                                diagnosticService.create({...values, consultationId})
                            }
                        }}>
                        {({isSubmitting}) => (
                            <Form
                                autoComplete='off'
                                className='w-full'>
                                <InputField
                                    label='Diagnostic'
                                    textarea
                                    className='py-4'
                                    name='description'
                                    placeholder="Entrez un diagnostic"/>
                                <ModalFooter px={0}>
                                    <Button
                                        mr={4}
                                        isLoading={isSubmitting}
                                        type='submit'
                                        colorScheme="messenger"
                                        size='sm'>
                                        {diagnosticId ? 'Modifier' : 'Sauvegarder'}
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

export default DiagnosticModal