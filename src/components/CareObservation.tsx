import React, {useState} from "react";
import {ICareObservation} from "../types/medicalcare-observation";
import CareObservationModal from "./CareObservationModal";
import moment from "moment";
import 'moment/locale/fr';

moment.locale('fr')

interface ObservationProps {
    observation: ICareObservation
    setNewObservation: (observation: ICareObservation) => void
}

const CareObservation: React.FC<ObservationProps> = ({observation, setNewObservation}) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            onClick={() => setOpen(true)}
            className='group hover:cursor-pointer transition-all'>
            {open ? <CareObservationModal
                setNewObservation={setNewObservation}
                observationId={observation.observationId}
                setOpen={setOpen}/> : null}
            <div className='space-y-2 py-2 w-full group-hover:bg-gray-50 rounded-md'>
                <div
                    className='group-hover:bg-gray-50 space-y-1 py-1.5 flex flex-1 flex-col justify-between bg-white px-3'>
                    <p className='text-gray-600 line-clamp-2'>{observation.description}</p>
                </div>
                <div className='group-hover:bg-gray-50 flex justify-between items-center px-3 group'>
                    <p className='flex items-center justify-end text-sm text-gray-600'>
                        Dernièrement modifié le
                    </p>
                    <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                        <span className='mx-1'>{moment(observation.updatedAt).format('DD-MM-YYYY')}</span>
                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                        <span className='mx-1'>{moment(observation.updatedAt).format('H:mm')}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CareObservation