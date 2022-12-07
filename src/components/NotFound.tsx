import React from "react";
import Image from "next/image";
import Link from 'next/link'

interface Props {
    fallBackUrl: string
}

const NotFound: React.FC<Props> = ({fallBackUrl}) => {
    return (
        <div className='absolute inset-0 bg-gray-100 flex flex-col items-center gap-2 justify-center'>
            <div className='h-44 w-44 relative -mt-48'>
                <Image
                    layout='fill'
                    objectFit='contain'
                    src='/assets/images/broken_link.svg'/>
            </div>
            <div className='max-w-sm'>
                <h1 className='font-bold text-lg text-center'>Cette page n&apos;est pas disponible</h1>
                <p className='text-center text-sm'>Il se pourrait que le lien ait changé, ou alors que la page ait été supprimé. Vérifiez que le lien est correct.</p>
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