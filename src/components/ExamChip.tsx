import React from "react";
import {CheckIcon} from "@heroicons/react/outline";
import {ICustomExam} from "../types/exam";

interface Props {
    exam: ICustomExam,
    selectable: boolean
    exams: ICustomExam[],
    setExams: (symptoms: ICustomExam[]) => void
}

const ExamChip: React.FC<Props> = ({exam, selectable, exams, setExams}) => {
    const onExamToggle = (key: string) => {
        const s = [...exams]
        const item = s.find((ss) => ss.name === key)
        item.checked = !item.checked
        setExams(s)
    }

    return (
        <div
            onClick={() => {
                if(selectable) onExamToggle(exam.name)
            }}
            className={`flex cursor-pointer items-center justify-center m-1 px-4 py-1 rounded-full transition-all ease-in-out duration-150 ${exam.checked ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 hover:text-purple-700 bg-purple-50 text-purple-500'}`}>
            {exam.name}
            {exam.checked && (
                <div
                    className='ml-4 w-5 h-5 text-white'>
                    <CheckIcon className='w-5 h-5'/>
                </div>
            )}
        </div>
    )
}
export default ExamChip