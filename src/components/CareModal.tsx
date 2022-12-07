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
    useCreateCare,
    useFindCare,
    useUpdateCare
} from "../hooks/api/care";
import {ICare} from "../types/care";

interface Props {
    setOpen: (open: boolean) => void
    setNewCare: (care: ICare) => void
    careId?: string
}

const CareModal: React.FC<Props> = ({setOpen, careId, setNewCare}) => {
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const createCareMutation = useCreateCare()
    const updateCareMutation = useUpdateCare()
    const {data: care} = useFindCare(careId)

    useEffect(() => {
        onOpen()
    }, [])

    useEffect(() => {
        if (updateCareMutation.data) {
            setNewCare(updateCareMutation.data)
            setOpen(false)
        }
    }, [updateCareMutation.data])

    useEffect(() => {
        if (createCareMutation.data) {
            setNewCare(createCareMutation.data)
            setOpen(false)
        }
    }, [createCareMutation.data])

    useEffect(() => {
        if (updateCareMutation.error)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: "Echec de mise à jour du soin",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updateCareMutation.error])

    useEffect(() => {
        if (createCareMutation.error)
            toast({
                position: 'bottom',
                title: "Echec d'ajout",
                description: "Echec d'ajout du soin",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [createCareMutation.error])

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
                <ModalHeader>{careId ? 'Modifier le soin' : 'Ajouter un soin'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Formik
                        enableReinitialize
                        initialValues={{description: care?.description || ''}}
                        onSubmit={async (values, {setErrors}) => {
                            if (careId) {
                                updateCareMutation.mutate({
                                    medicalCareId: router.query.id as string,
                                    careId: careId,
                                    ...values
                                })
                            } else {
                                createCareMutation.mutate({...values, medicalCareId: router.query.id as string})
                            }
                        }}>
                        {({isSubmitting}) => (
                            <Form
                                autoComplete='off'
                                className='w-full'>
                                <InputField
                                    required
                                    label='Soin'
                                    textarea
                                    className='py-4'
                                    name='description'
                                    placeholder="Entrez un soin"
                                />
                                <ModalFooter px={0}>
                                    <Button
                                        mr={4}
                                        isLoading={isSubmitting}
                                        type='submit'
                                        colorScheme="messenger"
                                        size='sm'>
                                        {careId ? 'Modifier' : 'Sauvegarder'}
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

export default CareModal