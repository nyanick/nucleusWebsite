import React from 'react';
import {Heading, Link} from "@chakra-ui/react";
import type {NextPage} from "next";
import {FiUsers} from "react-icons/fi";
import {useRouter} from "next/router";

const Exams: NextPage = ({}) => {
    const router = useRouter()

    const exams = [
        {name: "Bio-chimie clinique", url: "/clinical-biochemistry"},
        {name: "Sérologie", url: "/serology"},
        {name: "TDM", url: "/tdm"},
        {name: "Observations", url: "/observations"},
        {name: "Hormonologie", url: "/hormonology"},
        {name: "Échographies", url: "/echographics"},
        {name: "Immuno-Hématologie", url: "/immuno-hematology"},
        {name: "Radiographies", url: "/radiographies"},
        {name: "Biologie Moléculaire", url: "/molecular-biology"},
    ]

    return (
        <>
            <Heading mb={8} textAlign='center'>Demandes d&apos;examens</Heading>
            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                {
                    exams.map((exam, key) => (
                        <Link
                            key={key}
                            _hover={{textDecoration: 'none'}}
                            href={`/patients/${router.query.id}${exam.url}`}
                            className='text-white w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg'>
                            <div
                                className="w-full flex py-6 md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500">
                                <div
                                    className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex items-center flex-col items-start relative z-10 p-6 xl:p-8">
                                    <FiUsers className='text-white h-32 w-32'/>
                                </div>
                                <div className="flex justify-center">
                                    <p className='text-white text-2xl'>{exam.name}</p>
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-12 hidden sm:block"
                                 style={{background: 'linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))'}}>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    );
};

export default Exams;