import React from "react";
import {Skeleton, SkeletonCircle} from "@chakra-ui/react";

interface Props { }

const ConsultationInfoSkeleton: React.FC<Props> = ({ }) => {
    return (
        <div className='border py-2 mb-8 rounded-lg w-full bg-white'>
            {[...Array(3)].map((_, i) => (
                <div key={i} className='p-3 bg-white flex items-center space-x-4'>
                    <Skeleton isLoaded={false} rounded='md' height='25px' className='flex-1' />
                </div>
            ))}
        </div>
    )
}

export default ConsultationInfoSkeleton