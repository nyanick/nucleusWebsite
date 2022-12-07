import React from "react";
import {Skeleton, SkeletonCircle} from "@chakra-ui/react";

interface Props {
}

const ConsultationDoctorInfoSkeleton: React.FC<Props> = ({}) => {
    return (
        <div className='space-y-4 border py-2 rounded-lg w-full bg-white'>
            <div className='mb-4 pb-1 px-2 border-b'>
                <Skeleton isLoaded={false} rounded='md' height='25px' className='flex-1' />
            </div>
            <div className='flex px-2 flex-col items-center inset-0'>
                <SkeletonCircle isLoaded={false} size='20'/>
            </div>
            <div className='px-4 space-y-4'>
                <Skeleton isLoaded={false} rounded='md' height='25px' className='flex-1' />
                <Skeleton isLoaded={false} rounded='md' height='25px' className='flex-1' />
            </div>
        </div>
    )
}

export default ConsultationDoctorInfoSkeleton