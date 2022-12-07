import React from "react";
import {AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import {IExam} from "../types/exam";

interface Props {
    loading: boolean,
    exams: IExam[]
}

const ExamsPanelOverview: React.FC<Props> = ({loading, exams}) => {
    return (
        <>
            <AccordionItem className='border rounded-lg mb-6'>
                {({isExpanded}) => (
                    <>
                        <h2>
                            <AccordionButton
                                className={`space-x-4 rounded-lg ${isExpanded && 'border-b'}`}>
                                <div className='border-2 p-1 bg-gray-50 rounded-lg'>
                                    <img
                                        className='w-6 h-6 object-contain'
                                        src='/assets/icons/exam.png'
                                        alt='Avatar'/>
                                </div>
                                <div className='flex-1 text-left'>
                                    <p className='font-medium'>Examens</p>
                                    <p className='text-xs font-medium text-gray-500'>{exams.length} Examen(s)</p>
                                </div>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel p={0}>
                            {exams.map((exam, i) => (
                                <>
                                    <p
                                        key={exam.examId}
                                        className='py-1.5 mb-1 rounded-md transition-all duration-150 ease-linear px-3 text-gray-600'>
                                        {exam.name}
                                    </p>
                                    {(i !== exams.length - 1) && <hr className='ml-2 mx-4'/>}
                                </>
                            ))}
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </>
    )
}
export default ExamsPanelOverview