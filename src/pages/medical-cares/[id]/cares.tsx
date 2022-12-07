import {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";
import CareModal from "../../../components/CareModal";
import ConsultationEntryNotFound from "../../../components/ConsultationEntryNotFound";
import Care from "../../../components/Care";
import {PencilAltIcon} from "@heroicons/react/outline";
import {ICare} from "../../../types/care";
import {useFindMedicalCareCares} from "../../../hooks/api/care";

const Cares: NextPage = ({}) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [cares, setCares] = useState<ICare[]>([])
    const [selectedCare, setSelectedCare] = useState<ICare>(null)
    const {error: caresLoadingError, data, isLoading: loadingCares} = useFindMedicalCareCares(router.query.id as string)
    const toast = useToast()

    useEffect(() => {
        if (data) setCares(data)
    }, [data])

    useEffect(() => {
        if (caresLoadingError)
            toast({
                position: 'bottom',
                title: "Echec du chargement des soins",
                description: "Une erreur est survenue lors du chargement des soins",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
    }, [caresLoadingError])

    const refreshCares = () => {
        const index = cares.findIndex((obj) => obj.careId === selectedCare.careId)
        let newArr = []
        if (index !== -1) {
            newArr = [...cares]
            newArr[index] = selectedCare
            setCares(newArr)
        } else {
            setCares(oldArr => [selectedCare, ...oldArr])
        }
    }

    useEffect(() => {
        if (selectedCare) refreshCares()
    }, [selectedCare])

    return (
        <>
            {open ? <CareModal setNewCare={setSelectedCare} setOpen={setOpen}/> : null}
            <main className='grid grid-cols-6'>
                <section className='col-span-1'>
                </section>
                <section className='col-span-4'>
                    {(cares.length === 0 && !loadingCares) && (
                        <ConsultationEntryNotFound
                            callback={setOpen}
                            message='Aucun soin trouvé'/>
                    )}
                    {cares.length > 0 && (
                        <div className='border rounded-lg p-2 my-8 bg-white drop-shadow-sm'>
                            {cares.map((care, i) => (
                                <div key={care.careId}>
                                    <Care
                                        setNewCare={setSelectedCare}
                                        care={care}/>
                                    {(i !== cares.length - 1) && <hr className='mx-4'/>}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <section className='col-span-1'>
                    {cares.length > 0 && (
                        <div className='sticky top-[9.6rem] mt-[4rem] flex justify-center'>
                            <button
                                onClick={() => setOpen(true)}
                                className='flex justify-center items-center bg-white px-6 py-1.5 border rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-500 hover:text-gray-700'>
                                <PencilAltIcon className='h-5 w-5 mr-3'/>
                                Ajouter
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Cares;