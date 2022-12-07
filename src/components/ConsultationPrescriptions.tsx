import React from "react";
import {IConsultationPrescriptions} from "../types/prescription";
import moment from "moment";
import Link from "next/link";
import {RiStethoscopeLine} from "react-icons/ri";
import {useFindUser} from "../hooks/api/user";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";

interface Props {
    consultationPrescriptions: IConsultationPrescriptions
}

const ConsultationPrescriptions: React.FC<Props> = ({consultationPrescriptions: {createdAt, closedAt, consultationId, prescriptions, doctorUserId}}) => {
    const {data: doctorUser} = useFindUser(doctorUserId)

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
                                        <h3 className='flex items-center space-x-1 font-medium text-sm'>
                                            <span>Consultation du</span>
                                            <span>{moment(createdAt).format('DD-MM-YYYY H:mm')}</span>
                                            {closedAt ? (
                                                <>
                                                    <span>au</span>
                                                    <span>{moment(closedAt).format('DD-MM-YYYY H:mm')}</span>
                                                </>
                                            ) : (
                                                <span className='bg-green-500 py-0.5 px-3 rounded-full text-white text-xs'>En cours</span>
                                            )}
                                        </h3>
                                        {doctorUser && (
                                            <h5 className='font-medium flex items-center text-xs font-medium text-gray-600'>
                                                <RiStethoscopeLine className='w-4 h-4 mr-1'/>
                                                Dr {`${doctorUser.firstName} ${doctorUser.lastName}`}
                                            </h5>
                                        )}
                                    </div>
                                    <Link href={`/consultations/${consultationId}`}>
                                        <a className='text-xs py-0.5 bg-gray-200 text-gray-700 rounded-md px-2 w-32 line-clamp-1'>#{consultationId}</a>
                                    </Link>
                                </div>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                            <div className='divide-y divide-slate-200'>
                                {prescriptions.map((prescription, i) => (
                                    <div key={prescription.prescriptionId}
                                        className='space-y-1 py-1.5 flex flex-1 flex-col justify-between bg-white px-3'>
                                        <p className='text-gray-600 font-medium line-clamp-1'>{prescription.drug}</p>
                                        <div className='flex items-center space-x-2'>
                                            <span className='text-center text-xs w-16 text-white rounded-full bg-green-500'>Dosage</span>
                                            <p className='text-gray-700 text-sm'>{prescription.dosage}</p>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <span className='text-center text-xs w-16 text-white rounded-full bg-green-500'>Durée</span>
                                            <p className='text-gray-700 text-sm'>{prescription.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    )
}

export default ConsultationPrescriptions
