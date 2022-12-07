import React, {useState} from "react";
import ParameterModal from "./ParameterModal";
import {IParameter} from "../types/parameter";
import Moment from "react-moment";
import 'moment/locale/fr';
import moment from "moment";

interface Props {
    parameter: IParameter
    setNewParameter: (parameter: IParameter) => void
}

const Parameter: React.FC<Props> = ({parameter, setNewParameter}) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            onClick={() => setOpen(true)}
            className='group hover:cursor-pointer transition-all'>
            {open ? <ParameterModal
                setNewParameter={setNewParameter}
                parameterId={parameter.parameterId}
                setOpen={setOpen}/> : null}
            <div className='py-2 w-full group-hover:bg-gray-50 rounded-md'>
                <div
                    className='p-2 space-y-1'>
                    <div className="flex items-center space-x-1">
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Température ºC</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{ parameter.temperature !== -99 ? parameter.temperature : 'N/A'}</span>
                        </div>
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600  flex-1'>Poids (Kg)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{ parameter.weight !== -99 ? parameter.weight : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Taille (Cm)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.height !== -99 ? parameter.height : 'N/A'}</span>
                        </div>
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle (MmHg)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.pressure !== -99 ? parameter.pressure : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Systolique (MmHg)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.systolicPressure !== -99 ? parameter.systolicPressure : 'N/A'}</span>
                        </div>
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Pression Artérielle Diastolique (MmHg)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.diastolicPressure !== -99 ? parameter.diastolicPressure : 'N/A'}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{parameter.fastingBloodGlucose !== -99 ? parameter.fastingBloodGlucose : 'N/A'}</span>
                        </div>
                        <div className='flex-1 flex items-center space-x-2 border rounded-md p-2 py-1'>
                            <span className='text-sm text-gray-600 flex-1'>Glycémie à Jeûn (g/l)</span>
                            <span className='text-gray-100 text-sm rounded-md bg-green-500 flex items-center justify-center px-1'>{ parameter.bloodGlucose !== -99 ? parameter.bloodGlucose : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className='group-hover:bg-gray-50 flex justify-between items-center px-3 group'>
                    <p className='flex items-center justify-end text-sm text-gray-600'>
                        Dernièrement modifié le
                    </p>
                    <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                        <span className='mx-1'>{moment(parameter.updatedAt).format('DD-MM-YYYY')}</span>
                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                        <span className='mx-1'>{moment(parameter.updatedAt).format('H:mm')}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Parameter