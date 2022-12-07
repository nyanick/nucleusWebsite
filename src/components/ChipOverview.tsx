import React from "react";
import {CheckIcon} from "@heroicons/react/outline";

interface Props {
    name: string
}

const ChipOverview: React.FC<Props> = ({name}) => {
    return (
        <div
            className='flex items-center justify-center m-1 px-4 py-1 rounded-full bg-purple-600 text-white'>
            {name}
            <div
                className='ml-4 w-5 h-5 text-white'>
                <CheckIcon className='w-5 h-5'/>
            </div>
        </div>
    )
}
export default ChipOverview