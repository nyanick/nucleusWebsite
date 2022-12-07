import React from "react";
import moment from "moment";
import Link from "next/link";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IMedicalCare} from "../types/medical-care";
import {IHospital} from "../types/hospital";
import {IUser} from "../types/user";
import {useFindMedicalCareParameters} from "../hooks/api/parameter";
import {useFindMedicalCareObservations} from "../hooks/api/medicalcare-observation";
import {useFindMedicalCareCares} from "../hooks/api/care";

interface Props {
    medicalCare: IMedicalCare
    hospital: IHospital
    nurseUser: IUser
}

const ConsultationDiagnosis: React.FC<Props> = ({medicalCare, hospital, nurseUser}) => {
    const {data: parameters} = useFindMedicalCareParameters(medicalCare.medicalCareId)
    const {data: observations} = useFindMedicalCareObservations(medicalCare.medicalCareId)
    const {data: cares} = useFindMedicalCareCares(medicalCare.medicalCareId)

    return (
        <Accordion allowMultiple={true}>
            <AccordionItem className='border rounded-lg'>
                {({isExpanded}) => (
                    <>
                        <h2>
                            <AccordionButton
                                className={`space-x-4 flex items-center rounded-lg ${isExpanded && 'border-b'}`}>
                                <div className='px-2 py-2 rounded-t-lg flex-1 flex justify-between items-center font-medium'>
                                    <div>
                                        <h3 className='flex items-center space-x-1 font-medium'>
                                            <span>Prise en charge accueil du&nbsp;</span>
                                            <span>{moment(medicalCare.createdAt).format('DD-MM-YYYY H:mm')}</span>
                                        </h3>
                                        <h5 className='font-medium space-x-1 flex items-center text-sm font-medium text-gray-600'>
                                            <span>Par:</span>
                                            <span>{`${nurseUser.firstName} ${nurseUser.lastName}`} </span>
                                        </h5>
                                        <h5 className='font-medium space-x-1 flex items-center text-sm font-medium text-gray-600'>
                                            <span>Lieu:</span>
                                            <span>{hospital.name} </span>
                                        </h5>
                                    </div>
                                    <Link href={`/medical-cares/${medicalCare.medicalCareId}`}>
                                        <a className='text-xs py-0.5 bg-gray-200 text-gray-700 rounded-md px-2 w-32 line-clamp-1'>#{medicalCare.medicalCareId}</a>
                                    </Link>
                                </div>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                            <div className="space-y-4 p-2">
                                {parameters && parameters.length > 0 && (
                                    <div className='p-2 border rounded-lg'>
                                        <h2 className='pl-2 font-medium'>Paramètres</h2>
                                        {parameters && (
                                            <div className="divide-y divide-slate-200">
                                                {parameters.map(parameter => (
                                                    <div
                                                        key={parameter.parameterId}
                                                        className='group-hover:bg-gray-50 bg-white p-2 space-y-1.5'>
                                                        <div className="flex items-center space-x-2">
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Température ºC</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.temperature}</span>
                                                            </div>
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600  flex-1'>Poids (Kg)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.weight}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Taille (Cm)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.height}</span>
                                                            </div>
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Pression Artérielle (MmHg)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.pressure}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Systolique (MmHg)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.systolicPressure}</span>
                                                            </div>
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Diastolique (MmHg)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.diastolicPressure}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.fastingBloodGlucose}</span>
                                                            </div>
                                                            <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                                                <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                                                                <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.bloodGlucose}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {observations && observations.length > 0 && (
                                    <div className='p-2 border rounded-lg'>
                                        <h2 className='pl-2 font-medium'>Observations</h2>
                                        <div className="p-2 divide-y divide-slate-200">
                                            {observations.map(observation => (
                                                <p key={observation.observationId} className='px-2 py-1.5 line-clamp-2'>{observation.description}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {cares && cares.length > 0 && (
                                    <div className='p-2 border rounded-lg'>
                                        <h2 className='pl-2 font-medium'>Soins</h2>
                                        <div className="p-2 divide-y divide-slate-200">
                                            {cares.map(care => (
                                                <p key={care.careId} className='px-2 py-1.5 line-clamp-2'>{care.description}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    )
}

export default ConsultationDiagnosis
