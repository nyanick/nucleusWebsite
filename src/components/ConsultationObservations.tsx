import React from "react";
import {IConsultationObservations} from "../types/observation";
import moment from "moment";
import Link from "next/link";
import {RiStethoscopeLine} from "react-icons/ri";
import {useFindUser} from "../hooks/api/user";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";

interface Props {
    consultationObservations: IConsultationObservations
}

const ConsultationObservations: React.FC<Props> = ({consultationObservations: {createdAt, closedAt, consultationId, observations, doctorUserId}}) => {
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
                                {observations.map((observation, i) => (
                                    <div key={i}>
                                        <p className='px-2 py-1.5 line-clamp-2'>{observation}</p>
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

export default ConsultationObservations
