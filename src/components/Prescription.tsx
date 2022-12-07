import React, {useState} from "react";
import PrescriptionModal from "./PrescriptionModal";
import {IPrescription} from "../types/prescription";
import 'moment/locale/fr';
import moment from "moment";

moment.locale('fr')

interface PrescriptionProps {
    editable: boolean
    prescription: IPrescription
    setNewPrescription: (prescription: IPrescription) => void
}

const Prescription: React.FC<PrescriptionProps> = ({prescription, setNewPrescription, editable}) => {
    const [open, setOpen] = useState(false)

    return (
        <div
            onClick={() => setOpen(true)}
            className='group hover:cursor-pointer transition-all'>
            {open ? <PrescriptionModal
                editable={editable}
                setNewPrescription={setNewPrescription}
                prescriptionId={prescription.prescriptionId}
                setOpen={setOpen}/> : null}
            <div className='space-y-1 py-2 w-full group-hover:bg-gray-50 rounded-md'>
                <div
                    className='group-hover:bg-gray-50 space-y-1 py-1.5 flex flex-1 flex-col justify-between bg-white px-3'>
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
                <div className='group-hover:bg-gray-50 flex justify-between items-center px-3 group'>
                    <p className='flex items-center justify-end text-sm text-gray-600'>
                        Dernièrement modifié le
                    </p>
                    <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                        <span className='mx-1'>{moment(prescription.updatedAt).format('DD-MM-YYYY')}</span>
                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                        <span className='mx-1'>{moment(prescription.updatedAt).format('H:mm')}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Prescription