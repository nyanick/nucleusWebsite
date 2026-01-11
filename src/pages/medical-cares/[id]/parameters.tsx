import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {IParameter} from "../../../types/parameter";
import {useFindMedicalCareParameters} from "../../../hooks/api/parameter";
import {useToast} from "@chakra-ui/react";
import ParameterModal from "../../../components/ParameterModal";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import Parameter from "../../../components/Parameter";
import {PencilAltIcon,PresentationChartLineIcon} from "@heroicons/react/outline";

const Parameters: NextPage = ({}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [parameters, setParameters] = useState<IParameter[]>([])
    const [selectedParameter, setSelectedParameter] = useState<IParameter>(null)
    const {error: parametersLoadingError, data, isLoading: loadingParameters} = useFindMedicalCareParameters(router.query.id as string)
    const toast = useToast()

    useEffect(() => {
        if (data) setParameters(data)
    }, [data])

    useEffect(() => {
        if (parametersLoadingError)
            toast({
                position: 'bottom',
                title: "Échec du chargement des paramètres",
                description: "Une erreur est survenue lors du chargement des paramètres",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [parametersLoadingError])

    const refreshParameters = () => {
        const index = parameters.findIndex((obj) => obj.parameterId === selectedParameter.parameterId)
        let newArr = []
        if (index !== -1) {
            newArr = [...parameters]
            newArr[index] = selectedParameter
            setParameters(newArr)
        } else {
            setParameters(oldArr => [selectedParameter, ...oldArr])
        }
    }

    useEffect(() => {
        if (selectedParameter) refreshParameters()
    }, [selectedParameter])


    

    return (
        <>
            {open ? <ParameterModal setNewParameter={setSelectedParameter} setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(parameters.length === 0 && !loadingParameters) && (
                        <ConsultationEntryNotFound
                            callback={setOpen}
                            message='Aucun paramètre trouvé'/>
                    )}
                    {parameters.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {parameters.map((parameter, i) => (
                                <div key={parameter.parameterId}>
                                    <Parameter
                                        setNewParameter={setSelectedParameter}
                                        parameter={parameter}/>
                                    {(i !== parameters.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {parameters.length > 0 && (
                        <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                            <button
                                onClick={() => setOpen(true)}
                                className='flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                                <PencilAltIcon className='h-5 w-5 mr-3'/>
                                Ajouter
                            </button>
                        </div>
                    )}
                    {parameters.length > 1 && (
                        <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                            <button
                                onClick={() => router.push(`/medical-cares/${router.query.id}/parametersStats`)}
                                className='flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                                <PresentationChartLineIcon className='h-5 w-5 mr-3'/>
                                Afficher les paramètres
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Parameters;