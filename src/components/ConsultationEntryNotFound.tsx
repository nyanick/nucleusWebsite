import React from "react";
import {BiNotepad} from "react-icons/bi";
import {PencilAltIcon} from "@heroicons/react/outline";

interface Props {
    message: string
    callback?: (param: boolean) => void
}

const ConsultationEntryNotFound: React.FC<Props> = ({message, callback}) => {
    return (
        <div
            className='flex flex-col space-y-8 items-center mt-24 border bg-gray-50 rounded-lg py-8 my-8 drop-shadow-sm'>
            <div className='flex flex-col items-center'>
                <BiNotepad className='h-24 w-24 text-gray-500'/>
                <p className='font-medium text-gray-600 text-center'>{message}</p>
            </div>
            {callback && (
                <button
                    onClick={() => callback(true)}
                    className='flex justify-center items-center bg-white px-6 py-1.5 border-2 border-gray-400 rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                    <PencilAltIcon className='h-5 w-5 mr-3'/>
                    Ajouter
                </button>
            )}
        </div>
    )
}

export default ConsultationEntryNotFound