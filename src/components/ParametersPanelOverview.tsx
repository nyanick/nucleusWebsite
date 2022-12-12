import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IParameter} from "../types/parameter";

interface Props {
    loading: boolean,
    parameters: IParameter[]
}

const ParametersPanelOverview: React.FC<Props> = ({loading, parameters}) => {
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
                                    src='/assets/icons/diagnosis.png'/>
                            </div>
                            <div className='flex-1 text-left'>
                                <p className='font-medium'>Paramètres</p>
                                <p className='text-xs font-medium text-gray-500'>{parameters.length} Paramètres(s)</p>
                            </div>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                        {parameters.map((parameter, i) => (
                            <div key={parameter.parameterId}>
                                <div
                                    className='p-2 space-y-1'>
                                    <div className="flex items-center space-x-1">
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Température ºC</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.temperature !== -99 ?parameter.temperature : 'N/A'}</span>
                                        </div>
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600  flex-1'>Poids (Kg)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.weight !== -99 ?parameter.weight : 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Taille (Cm)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.height !== -99 ?parameter.height : 'N/A'}</span>
                                        </div>
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle (MmHg)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.pressure  !== -99 ?parameter.pressure : 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Systolique (MmHg)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.diastolicPressure  !== -99 ?parameter.diastolicPressure : 'N/A'}</span>
                                        </div>
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Diastolique (MmHg)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.systolicPressure  !== -99 ?parameter.systolicPressure : 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.bloodGlucose  !== -99 ?parameter.bloodGlucose : 'N/A'}</span>
                                        </div>
                                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                                            <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter &&  parameter.fastingBloodGlucose  !== -99 ?parameter.fastingBloodGlucose : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                                {(i !== parameters.length - 1) && <hr className='mx-4'/>}
                            </div>
                        ))}
                    </AccordionPanel>
                </>
            )}
        </AccordionItem>
    )
}
export default ParametersPanelOverview