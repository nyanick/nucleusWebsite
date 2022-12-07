import React from "react";
import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay
} from "@chakra-ui/react";
import {ModalHeader} from "@chakra-ui/modal";
import {CakeIcon, LocationMarkerIcon, MailIcon, PhoneIcon} from "@heroicons/react/outline";
import {IUser} from "../types/user";
import {apiRoutes} from "../constants";

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    user: IUser
}

const UserProfilePreviewModal: React.FC<Props> = ({isOpen, onOpen, onClose, user}) => {
    return (
        <Modal motionPreset="slideInBottom" onClose={onClose} size='lg' isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader py={2} className='border-b !font-semibold'>Profil du patient</ModalHeader>
                <ModalCloseButton rounded='full'/>
                <ModalBody>
                    <div>
                        <div className='flex flex-col items-center space-y-2 mb-6'>
                            {user.avatarId ? <img
                                    className='w-16 h-16 rounded-lg p-[1.5px] border-2 border-red-500 object-contain cursor-pointer'
                                    src={apiRoutes.GET_USER_AVATAR(user.avatarId)}
                                    alt=''/> :
                                <Avatar
                                    size='lg'
                                    rounded='lg'
                                    name={`${user.firstName} ${user.lastName}`}/>
                            }
                            <h2 className='font-medium text-lg text-center'>{`${user.firstName} ${user.lastName}`}</h2>
                        </div>
                        <div>
                            <div className='flex space-x-3 mb-3'>
                                <PhoneIcon className='w-6 h-6 text-gray-600'/>
                                <div className='text-left flex-1'>
                                    <p className='font-semibold'>Téléhone</p>
                                    <p className='font-medium text-sm text-gray-700'>{user.phoneNumber}</p>
                                </div>
                            </div>
                            <div className='flex space-x-3 mb-3'>
                                <LocationMarkerIcon className='w-6 h-6 text-gray-600'/>
                                <div className='text-left flex-1'>
                                    <p className='font-semibold'>Adresse</p>
                                    <p className='font-medium text-sm text-gray-700'>{user.city}, {user.country}, {user.address}</p>
                                </div>
                            </div>
                            <div className='flex space-x-3 mb-3'>
                                <MailIcon className='w-6 h-6 text-gray-600'/>
                                <div className='text-left flex-1'>
                                    <p className='font-semibold'>Adresse email</p>
                                    <a href={`mailto:${user.email}`} className='underline font-medium text-sm text-blue-800'>{user.email}</a>
                                </div>
                            </div>
                            <div className='flex space-x-3'>
                                <CakeIcon className='w-6 h-6 text-gray-600'/>
                                <div className='text-left flex-1'>
                                    <p className='font-semibold'>Date de naissance</p>
                                    <p className='font-medium text-sm text-gray-700'>{user.bornOn}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Fermer</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserProfilePreviewModal
