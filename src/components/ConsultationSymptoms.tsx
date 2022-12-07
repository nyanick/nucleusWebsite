import React from "react";
import moment from "moment";
import Link from "next/link";
import {IConsultationSymptoms} from "../types/symptom";
import {RiStethoscopeLine} from "react-icons/ri";
import {useFindUser} from "../hooks/api/user";
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";

interface Props {
    consultationSymptoms: IConsultationSymptoms
}

const ConsultationSymptoms: React.FC<Props> = ({consultationSymptoms: {consultationId, createdAt, closedAt, symptoms, doctorUserId}}) => {
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
                            <div className='py-2 px-3 flex flex-wrap'>
                                {symptoms.map((symptom, i) => (
                                    <div className='flex items-center justify-center m-1 px-4 py-1 rounded-full bg-purple-100 text-purple-700' key={i}>
                                        {symptom}
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

export default ConsultationSymptoms
