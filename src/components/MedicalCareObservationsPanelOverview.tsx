import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Spinner} from "@chakra-ui/react";
import {IObservation} from "../types/observation";
import {ICareObservation} from "../types/medicalcare-observation";

interface Props {
    loading: boolean,
    observations: ICareObservation[]
}

const MedicalCareObservationsPanelOverview: React.FC<Props> = ({loading, observations}) => {
    return (
        <AccordionItem className='border rounded-lg mb-6'>
            {({isExpanded}) => (
                <>
                    <h2>
                        <AccordionButton
                            className={`space-x-4 rounded-lg ${isExpanded && 'border-b'}`}>
                            <div className='border-2 p-1 bg-gray-50 rounded-lg'>
                                <img
                                    className='w-6 h-6 object-contain'
                                    src='/assets/icons/observation.png'
                                    alt='Avatar'/>
                            </div>
                            <div className='flex-1 text-left'>
                                <p className='font-medium'>Observation</p>
                                <p className='text-xs font-medium text-gray-500'>{observations.length} Observation(s)</p>
                            </div>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {observations.map((observation, i) => (
                            <>
                                <p
                                    key={observation.observationId}
                                    className='py-1.5 mb-1 rounded-md transition-all duration-150 ease-linear px-3 text-gray-600'>
                                    {observation.description}
                                </p>
                                {(i !== observations.length - 1) && <hr className='ml-2 mx-4'/>}
                            </>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}
export default MedicalCareObservationsPanelOverview