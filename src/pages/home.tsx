import {NextPage} from "next";
import {FiSettings, FiUsers} from "react-icons/fi";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
    const groups = [
        {title: 'Observations', url: '/home/observations', Icon: FiUsers},
        {title: 'Paramètres', url: '/home/parameters', Icon: FiSettings},
        {title: 'Soins', url: '/home/care', Icon: FiUsers},
    ]

    return (
        <section className='grid gap-6 py-8 lg:grid-cols-2 xl:grid-cols-3'>
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
        </section>
    )
}

export default Home;