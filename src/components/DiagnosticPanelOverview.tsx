import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IDiagnosis} from "../types/diagnosis";

interface Props {
    loading: boolean,
    diagnostics: IDiagnosis[]
}

const DiagnosticPanelOverview: React.FC<Props> = ({loading, diagnostics}) => {
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
                                    src='/assets/icons/diagnosis.png'
                                    alt='Avatar'/>
                            </div>
                            <div className='flex-1 text-left'>
                                <p className='font-medium'>Diagnostics</p>
                                <p className='text-xs font-medium text-gray-500'>{diagnostics.length} Diagnostics</p>
                            </div>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {diagnostics.map((diagnostic, i) => (
                            <>
                                <p
                                    key={diagnostic.diagnosisId}
                                    className='py-1.5 mb-1 rounded-md transition-all duration-150 ease-linear px-3 text-gray-600'>
                                    {diagnostic.description}
                                </p>
                                {(i !== diagnostics.length - 1) && <hr className='ml-2 mx-4'/>}
                            </>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}

export default DiagnosticPanelOverview
