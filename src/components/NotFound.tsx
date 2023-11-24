import React from "react";
import Image from "next/image";
import Link from 'next/link'

interface Props {
    fallBackUrl: string
}

const NotFound: React.FC<Props> = ({fallBackUrl}) => {
    return (
        <div className='absolute inset-0 bg-gray-100 flex flex-col items-center gap-2 justify-center overflow-hidden'>
            <div className='h-72 w-72 relative -mt-48 overflow-hidden'>
                <Image
                    layout='fill'
                    objectFit='contain'
                    src='/assets/images/healthcare-error.png'/>
            </div>
            <div className='max-w-sm'>
                <h1 className='font-bold text-lg text-center'>Cette page n&apos;est pas disponible</h1>
                <p className='text-center text-sm'> C&apos;est possible que le lien ait pu changer ou que la page soit encore en cours de développement.</p>
            </div>
            <div className='mt-2'>
                <Link href={fallBackUrl}>
                    <a className='select-none border transition-all !border-2 hover:!bg-primary/10 !border-primary rounded-full !text-primary px-3 py-1.5'>Retourner à l&apos;Accueil</a>
                </Link>
            </div>
        </div>
    )
}

export default NotFound