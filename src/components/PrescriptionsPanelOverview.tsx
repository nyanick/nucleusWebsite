import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IPrescription} from "../types/prescription";

interface Props {
    loading: boolean,
    prescriptions: IPrescription[]
}

const PrescriptionsPanelOverview: React.FC<Props> = ({loading, prescriptions}) => {
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
                                    src='/assets/icons/prescription.png'
                                    alt='Avatar'/>
                            </div>
                            <div className='flex-1 text-left'>
                                <p className='font-medium'>Prescriptions</p>
                                <p className='text-xs font-medium text-gray-500'>{prescriptions.length} Prescription(s)</p>
                            </div>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {prescriptions.map((prescription, i) => (
                            <div key={prescription.prescriptionId}>
                                <div
                                    className='group space-y-1 py-1.5 flex flex-1 flex-col justify-between bg-white px-3 rounded-md group transition-all duration-150 ease-linear'>
                                    <p className='text-gray-600 font-medium'>{prescription.drug}</p>
                                    <div className='flex items-center space-x-2'>
                                    <span
                                        className='text-center text-xs w-16 text-white rounded-full bg-green-500'>Dosage</span>
                                        <p className='text-gray-700 text-sm'>{prescription.dosage}</p>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                    <span
                                        className='text-center text-xs w-16 text-white rounded-full bg-green-500'>Durée</span>
                                        <p className='text-gray-700 text-sm'>{`${prescription.duration} Jour${prescription.duration > 1 ? 's' : ''}`}</p>
                                    </div>
                                </div>
                                {(i !== prescriptions.length - 1) && <hr className='mx-4'/>}
                            </div>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}
export default PrescriptionsPanelOverview