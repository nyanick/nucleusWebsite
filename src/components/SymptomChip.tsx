import React from "react";
import {CheckIcon} from "@heroicons/react/outline";
import {ICustomSymptom} from "../types/symptom";

interface Props {
    symptom: ICustomSymptom,
    symptoms: ICustomSymptom[],
    selectable: boolean
    setSymptoms: (symptoms: ICustomSymptom[]) => void
}

const SymptomChip: React.FC<Props> = ({selectable, symptom, symptoms, setSymptoms}) => {
    const onSymptomToggle = (key: string) => {
        const s = [...symptoms]
        const item = s.find((ss) => ss.name === key)
        item.checked = !item.checked
        setSymptoms(s)
    }

    return (
        <div
            onClick={() => {
                if (selectable) onSymptomToggle(symptom.name)
            }}
            className={`flex items-center justify-center m-1 px-4 py-1 rounded-full transition-all ease-in-out duration-150 ${symptom.checked ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 hover:text-purple-700 bg-purple-50 text-purple-500'}`}>
            {symptom.name}
            {symptom.checked && (
                <div
                    className='ml-4 w-5 h-5 text-white'>
                    <CheckIcon className='w-5 h-5'/>
                </div>
            )}
        </div>
    )
}
export default SymptomChip