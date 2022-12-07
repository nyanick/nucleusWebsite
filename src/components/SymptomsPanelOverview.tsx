import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {ISymptom} from "../types/symptom";

interface Props {
    loading: boolean,
    symptoms: ISymptom[]
}

const SymptomsPanelOverview: React.FC<Props> = ({loading, symptoms}) => {
    return (
        <AccordionItem className='border rounded-lg'>
            {({isExpanded}) => (
                <>
                    <h2>
                        <AccordionButton
                            className={`space-x-4 rounded-lg ${isExpanded && 'border-b'}`}>
                            <div className='border-2 p-1 bg-gray-50 rounded-lg'>
                                <img
                                    className='w-6 h-6 object-contain'
                                    src='/assets/icons/symptom.png'
                                    alt='Avatar'/>
                            </div>
                            <div className='flex-1 text-left'>
                                <p className='font-medium'>Symptoms</p>
                                <p className='text-xs font-medium text-gray-500'>{symptoms.length} Symptom(s)</p>
                            </div>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {symptoms.map((symptom, i) => (
                            <>
                                <p
                                    key={symptom.symptomId}
                                    className='py-1.5 mb-1 rounded-md transition-all duration-150 ease-linear px-3 text-gray-600'>
                                    {symptom.name}
                                </p>
                                {(i !== symptoms.length - 1) && <hr className='ml-2 mx-4'/>}
                            </>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}
export default SymptomsPanelOverview