import React, {useEffect, useState} from "react";
import {
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
import {SearchIcon} from "@heroicons/react/solid";
import {PatientService} from "../services/PatientService";
import {IPatient, IPatientWithDetails} from "../types/patient";
import {VscSearchStop} from "react-icons/vsc";
import {UserService} from "../services/UserService";
import {IUser} from "../types/user";
import { computeAge } from "../utils/Utils";

interface Props {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    setSelectedPatientUser: (user: IUser) => void
}

const PickPatientDialog: React.FC<Props> = ({isOpen, onOpen, onClose, setSelectedPatientUser}) => {
    const [{authToken}] = useStateValue();
    const [patient, setPatient] = useState<IPatient>(null)
    const [patientUser, setPatientUser] = useState<IUser>(null)
    const [patientLoadingError, setPatientLoadingError] = useState(false)
    const [userLoadingError, setUserLoadingError] = useState(null)
    const [userLoading, setUserLoading] = useState(false)
    const [patientLoading, setPatientLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [query, setQuery] = useState('')

    const patientService = new PatientService({
        authToken: authToken,
        setPatient: setPatient,
        setLoading: setPatientLoading,
        setLoadingError: setPatientLoadingError
    })

    const userService = new UserService({
        authToken: authToken,
        setUser: setPatientUser,
        setLoading: setUserLoading,
        setLoadingError: setUserLoadingError
    })

    useEffect(() => {
        if (patient) {
            userService.get(patient.userId)
        }
    }, [patient])

    return (
        <Modal motionPreset="slideInRight" onClose={onClose} size='lg' isOpen={isOpen}>
            <ModalOverlay/>
            <ModalContent className='!bg-white'>
                <ModalHeader py={2} className='border-b !font-semibold text-lg'>Ajouter un patient</ModalHeader>
                <ModalCloseButton rounded='full'/>
                <ModalBody>
                    <div className='mx-4 py-4'>
                        <div className='relative mb-8'>
                            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
                                <SearchIcon className='h-5 w-5 text-gray-500'/>
                            </div>
                            <input
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(event => {
                                    if (event.key === 'Enter') {
                                        if (query.trim().length > 0) {
                                            patientService.findByPatientId(query)
                                        }
                                    }
                                })}
                                className='transition-all bg-gray-100 block hover:ring-1 hover:ring-gray-500 py-[0.4rem] w-full pl-10 border sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                                type="text" placeholder="Saisir l'identifiant du patient..."/>
                        </div>
                        {patientUser ? (
                            <div
                                onClick={() => setSelected((prev) => !prev)}
                                className={`space-x-2 flex items-center px-4 py-2 rounded-lg bg-gray-100 cursor-pointer border ${selected ? 'border-blue-600' : 'border-transparent'}`}>
                                <Avatar
                                    size='md'
                                    rounded='full'
                                    src={patientUser.avatarId && apiRoutes.GET_USER_AVATAR(patientUser.avatarId)}
                                    name={`${patientUser.firstName} ${patientUser.lastName}`}/>
                                <div>
                                    <h2 className='font-medium'>{`${patientUser.firstName} ${patientUser.lastName}`}</h2>
                                    <h2 className='text-sm'>{computeAge(patientUser.bornOn)} ans, {patientUser.city}, {patientUser.country}</h2>
                                </div>
                            </div>
                        ) : patientLoadingError && (
                            <div className='flex items-center space-x-2 mt-4 justify-center'>
                                <VscSearchStop className='h-5 w-5 text-gray-600'/>
                                <p className='text-sm text-gray-600'>Aucun résultat trouvé.</p>
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter py={2} className='border-t'>
                    <button
                        onClick={onClose}
                        className='mr-3 flex justify-center items-center bg-white px-4 py-1 border-2 rounded-full text-gray-600 font-medium hover:text-gray-700 hover:bg-gray-50 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                        Retour
                    </button>
                    <button
                        onClick={() => {
                            if (selected) {
                                onClose()
                                setSelectedPatientUser(patientUser)
                            }
                        }}
                        className={`${selected ? 'bg-white border-2 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-500 hover:text-gray-700 text-gray-600' : 'bg-gray-300 border-none text-gray-400 hover:cursor-not-allowed'} flex justify-center items-center px-4 py-1 rounded-full font-medium transition-all`}>
                        Suivant
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PickPatientDialog
