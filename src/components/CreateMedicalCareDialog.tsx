import React, {useEffect, useState} from "react";
import {
    useToast,
    useDisclosure,
    Avatar,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay
} from "@chakra-ui/react";
import {ModalHeader} from "@chakra-ui/modal";
import {apiRoutes} from "../constants";
import {useStateValue} from "../contexts/AuthProvider";
import {PencilAltIcon} from "@heroicons/react/outline";
import {PencilIcon, UserAddIcon} from "@heroicons/react/solid";
import PickPatientDialog from "./PickPatientDialog";
import {useRouter} from "next/router";
import {IUser} from "../types/user";
import {computeAge} from "../utils/Utils";
import {useCreateMedicalCare} from "../hooks/api/medical-care";
import {useFindNurseByUserId} from "../hooks/api/nurse";

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const CreateMedicalCareDialog: React.FC<Props> = ({isOpen, onOpen, onClose}) => {
    const router = useRouter()
    const toast = useToast()
    const [{authUser}] = useStateValue();
    const [selectedPatientUser, setSelectedPatientUser] = useState<IUser>(null)
    const createMedicalCareMutation = useCreateMedicalCare()
    const {data: nurse} = useFindNurseByUserId(authUser.userId)

    const {
        isOpen: isPatientPickModalOpen,
        onOpen: onOpenPatientPickModal,
        onClose: onClosePatientPickModal
    } = useDisclosure()

    useEffect(() => {
        if (createMedicalCareMutation.data) {
            onClose()
            router.push(`/medical-cares/${createMedicalCareMutation.data.medicalCareId}`).then()
        }
    }, [createMedicalCareMutation.data])

    useEffect(() => {
        if (createMedicalCareMutation.error) {
            toast({
                position: 'bottom',
                title: "Echec de création de la prise en charge accueil",
                description: "Une erreur est survenue lors de la création d'une nouvelle prise en charge accueil",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }, [createMedicalCareMutation.error])

    const createMedicalCare = () => {
        if (selectedPatientUser) {
            createMedicalCareMutation.mutate({
                patientUserId: selectedPatientUser.userId,
                nurseUserId: nurse.userId,
                hospitalId: nurse.hospitalId
            })
        }
    }

    return (
        <>
            {isPatientPickModalOpen &&
                <PickPatientDialog
                    setSelectedPatientUser={setSelectedPatientUser}
                    isOpen={isPatientPickModalOpen}
                    onOpen={onOpenPatientPickModal}
                    onClose={onClosePatientPickModal}/>}
            {!isPatientPickModalOpen &&
                <Modal motionPreset="slideInBottom" onClose={onClose} size='lg' isOpen={isOpen}>
                    <ModalOverlay/>
                    <ModalContent className='!bg-white'>
                        <ModalHeader py={2} className='border-b !font-semibold text-lg'>Créer une prise en charge</ModalHeader>
                        <ModalCloseButton rounded='full'/>
                        <ModalBody>
                            <div className='flex items-center space-x-3 mt-2 mb-8'>
                                {authUser && (
                                    <>
                                        <Avatar
                                            size='md'
                                            rounded='full'
                                            src={authUser.avatarId && apiRoutes.GET_USER_AVATAR(authUser.avatarId)}
                                            name={`${authUser.firstName} ${authUser.lastName}`}/>
                                        <h2 className='font-medium'>{`${authUser.firstName} ${authUser.lastName}`}</h2>
                                    </>
                                )}
                            </div>
                            {selectedPatientUser ? (
                                <div
                                    className='relative mb-4 cursor-pointer rounded-lg py-4 flex flex-col space-y-1 items-center border hover:border-gray-700 hover:bg-gray-50 group transition-all'>
                                    <Avatar
                                        size='lg'
                                        rounded='full'
                                        src={selectedPatientUser.avatarId && apiRoutes.GET_USER_AVATAR(selectedPatientUser.avatarId)}
                                        name={`${selectedPatientUser.firstName} ${selectedPatientUser.lastName}`}/>
                                    <div>
                                        <h2 className='font-medium text-center'>{`${selectedPatientUser.firstName} ${selectedPatientUser.lastName}`}</h2>
                                        <p className='text-gray-600 text-xs rounded-full px-2 py-0.5 border-2 border-gray-500 cursor-pointer text-center'>
                                            {computeAge(selectedPatientUser.bornOn)} ans, {selectedPatientUser.city}, {selectedPatientUser.country}
                                        </p>
                                    </div>
                                    <div
                                        onClick={onOpenPatientPickModal}
                                        className='w-9 h-9 flex justify-center items-center bg-blue-100 hover:bg-blue-200 cursor-pointer absolute top-1 right-1 rounded-full'>
                                        <PencilIcon className='w-5 h-5 text-gray-600'/>
                                    </div>
                                </div>
                            ) : (
                                <div className='space-y-2 mb-4'>
                                    <div
                                        onClick={onOpenPatientPickModal}
                                        className='cursor-pointer rounded-lg py-4 flex flex-col space-y-1 items-center border hover:border-gray-700 hover:bg-gray-50 group transition-all'>
                                        <div
                                            className='bg-gray-200 hover:bg-gray-300 rounded-full p-3 transition-all cursor-pointer'>
                                            <UserAddIcon className='w-5 h-5'/>
                                        </div>
                                        <p className='text-center text-gray-500 my-2 group-hover:text-gray-700'>Ajouter un patient</p>
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter py={2} className='border-t'>
                            <button
                                onClick={createMedicalCare}
                                className={`${selectedPatientUser ? 'bg-white border-2 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-500 hover:text-gray-700 text-gray-600' : 'bg-gray-300 border-none text-gray-400 hover:cursor-not-allowed'} flex justify-center items-center px-4 py-1 rounded-full text-gray-600 font-medium`}>
                                <PencilAltIcon className='h-5 w-5 mr-1'/>
                                Créer
                            </button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
        </>
    )
}

export default CreateMedicalCareDialog
