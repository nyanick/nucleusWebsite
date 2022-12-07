import React from "react";
import Link from "next/link";
import {FiUsers, FiHome} from "react-icons/fi";
import {FaHospital} from "react-icons/fa";

interface Props {
}

const NurseHome: React.FC<Props> = ({}) => {
    const groups = [
        {title: 'Prises en charge', url: '/medical-cares', Icon: FiHome},
        {title: 'Hospitalisation', url: '/hospitalization', Icon: FaHospital},
        {title: 'Dossier médical', url: '/find-patient', Icon: FiUsers}
    ]

    return (
        <>
            {groups.map(({title, url, Icon}, index) => (
                <Link key={index} href={url}>
                    <a className='text-white w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg'>
                        <div
                            className="w-full flex py-6 md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500">
                            <div
                                className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex items-center flex-col items-start relative z-10 p-6 xl:p-8">
                                <Icon className='text-white h-32 w-32'/>
                            </div>
                            <div className="flex justify-center">
                                <p className='text-white text-2xl'>{title}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 hidden sm:block"
                             style={{background: 'linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))'}}>
                        </div>
                    </a>
                </Link>
            ))}
        </>
    )
}

export default NurseHome