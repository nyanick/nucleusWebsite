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
    useCreateParameter,
    useFindParameter,
    useUpdateParameter
} from "../hooks/api/parameter";
import {IParameter} from "../types/parameter";

interface Props {
    setOpen: (open: boolean) => void
    setNewParameter: (parameter: IParameter) => void
    parameterId?: string
}

const ParameterModal: React.FC<Props> = ({setOpen, parameterId, setNewParameter}) => {
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()
    const createParameterMutation = useCreateParameter()
    const updateParameterMutation = useUpdateParameter()
    const {data: parameter} = useFindParameter(parameterId)

    useEffect(() => {
        onOpen()
    }, [])

    useEffect(() => {
        if (updateParameterMutation.data) {
            setNewParameter(updateParameterMutation.data)
            setOpen(false)
        }
    }, [updateParameterMutation.data])

    useEffect(() => {
        if (createParameterMutation.data) {
            setNewParameter(createParameterMutation.data)
            setOpen(false)
        }
    }, [createParameterMutation.data])

    useEffect(() => {
        if (updateParameterMutation.error)
            toast({
                position: 'bottom',
                title: "Echec de mise à jour",
                description: "Echec de mise à jour du paramètre",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [updateParameterMutation.error])

    useEffect(() => {
        if (createParameterMutation.error)
            toast({
                position: 'bottom',
                title: "Echec d'ajout",
                description: "Echec d'ajout du paramètre",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [createParameterMutation.error])

    return (
        <Modal
            size='2xl'
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={() => {
                setOpen(false)
                onClose()
            }}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{parameterId ? 'Modifier le paramètre' : 'Nouveau paramètre'}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {console.log(parameter)}
                    <Formik
                        enableReinitialize
                        initialValues={{
                            temperature: parameter &&  parameter.temperature !== -99 ?parameter.temperature : '',
                            weight: parameter &&  parameter.weight !== -99 ?parameter.weight : '',
                            height: parameter &&  parameter.height !== -99 ?parameter.height : '',
                            pressure: parameter &&  parameter.pressure  !== -99 ?parameter.pressure : '',
                            diastolicPressure: parameter &&  parameter.diastolicPressure  !== -99 ?parameter.diastolicPressure : '',
                            systolicPressure: parameter &&  parameter.systolicPressure  !== -99 ?parameter.systolicPressure : '',
                            bloodGlucose: parameter &&  parameter.bloodGlucose  !== -99 ?parameter.bloodGlucose : '',
                            fastingBloodGlucose: parameter &&  parameter.fastingBloodGlucose  !== -99 ?parameter.fastingBloodGlucose : '',
                        }}
                        onSubmit={async (values) => {
                            if (parameterId) {
                                updateParameterMutation.mutate({
                                    temperature: parseFloat((values.temperature || values.temperature === 0 ? values.temperature : -99 ) as string),
                                    weight: parseFloat((values.weight || values.weight === 0 ? values.weight : -99) as string),
                                    height: parseFloat((values.height || values.height === 0 ? values.height : -99) as string),
                                    pressure: parseFloat((values.pressure || values.pressure === 0 ? values.pressure : -99) as string),
                                    diastolicPressure: parseFloat((values.diastolicPressure || values.diastolicPressure === 0 ? values.diastolicPressure : -99) as string),
                                    systolicPressure: parseFloat((values.systolicPressure || values.systolicPressure === 0 ? values.systolicPressure : -99) as string),
                                    bloodGlucose: parseFloat((values.bloodGlucose || values.bloodGlucose === 0 ? values.bloodGlucose : -99) as string),
                                    fastingBloodGlucose: parseFloat((values.fastingBloodGlucose || values.fastingBloodGlucose === 0 ? values.fastingBloodGlucose : -99)as string),
                                    medicalCareId: router.query.id as string,
                                    parameterId: parameterId
                                } as IParameter)
                            } else {
                                createParameterMutation.mutate({
                                    temperature: parseFloat((values.temperature || values.temperature === 0 ? values.temperature : -99 ) as string),
                                    weight: parseFloat((values.weight || values.weight === 0 ? values.weight : -99) as string),
                                    height: parseFloat((values.height || values.height === 0 ? values.height : -99) as string),
                                    pressure: parseFloat((values.pressure || values.pressure === 0 ? values.pressure : -99) as string),
                                    diastolicPressure: parseFloat((values.diastolicPressure || values.diastolicPressure === 0 ? values.diastolicPressure : -99) as string),
                                    systolicPressure: parseFloat((values.systolicPressure || values.systolicPressure === 0 ? values.systolicPressure : -99) as string),
                                    bloodGlucose: parseFloat((values.bloodGlucose || values.bloodGlucose === 0 ? values.bloodGlucose : -99) as string),
                                    fastingBloodGlucose: parseFloat((values.fastingBloodGlucose || values.fastingBloodGlucose === 0 ? values.fastingBloodGlucose : -99)as string),
                                    medicalCareId: router.query.id as string,
                                } as IParameter)
                            }
                        }}>
                        {({isSubmitting}) => (
                            <Form
                                autoComplete='off'>
                                <div className="flex space-x-4">
                                    <div className="space-y-2 flex-1">
                                        <InputField
                                            
                                            label='Température (ºC)'
                                            type='number'
                                            className='py-4'
                                            name='temperature'/>
                                        <InputField
                                            
                                            label='Poids (Kg)'
                                            type='number'
                                            className='py-4'
                                            name='weight'/>
                                        <InputField
                                            
                                            label='Taille (Cm)'
                                            type='number'
                                            className='py-4'
                                            name='height'/>
                                        <InputField
                                            
                                            label='Pression artérielle (mmHg)'
                                            type='number'
                                            className='py-4'
                                            name='pressure'/>
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <InputField
                                            
                                            label='Pression artérielle systolique (mmHg)'
                                            type='number'
                                            className='py-4'
                                            name='systolicPressure'/>
                                        <InputField
                                            
                                            label='Pression artérielle diastolique  (mmHg)'
                                            type='number'
                                            className='py-4'
                                            name='diastolicPressure'/>
                                        <InputField
                                            
                                            label='Glycémie à Jeûn (g/l)'
                                            type='number'
                                            className='py-4'
                                            name='fastingBloodGlucose'/>
                                        <InputField
                                            
                                            label='Glycémie'
                                            type='number'
                                            className='py-4'
                                            name='bloodGlucose'
                                            placeholder="Glycémie (g/l)"/>
                                    </div>
                                </div>
                                <ModalFooter px={0}>
                                    <Button
                                        mr={4}
                                        isLoading={isSubmitting}
                                        type='submit'
                                        colorScheme="messenger"
                                        size='sm'>
                                        {parameterId ? 'Modifier' : 'Sauvegarder'}
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

export default ParameterModal