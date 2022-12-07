import {NextPage} from "next";
import {Consultation} from "../../../components";
import {SearchIcon} from "@heroicons/react/solid";
import React, {useState,useEffect} from "react";
import {useFindPatientConsultations} from "../../../hooks/api/consultation";

import {useGetHospital} from "../../../hooks/api/hospital";
import {useRouter} from "next/router";

const Consultations: NextPage = () => {
    const router = useRouter()
    let {data} = useFindPatientConsultations(router.query.id)

    // const [data, setData] = useState([null])

    // // let hospitals = []
    // // {data.consultations.map((consultation, i) => (
    // //     hospitals.push(useGetHospital(consultation.hospitalId))
    // // ))}

    // // const search = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // //     const value = event.target.value;
    // //     const foundItems = PRODUCTS.filter((item) =>
    // //       item.name.toLowerCase().includes(query.toLowerCase())
    // //     );
    // //     setResult(foundItems);
    // // };
    // const search = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = event.target.value;
    //     console.log(value);
    //     let {data} = useFindPatientConsultations(router.query.id)
    //     const searchResult = data?data:[].filter((item) =>
    //     item.name.toLowerCase().includes(value.toLowerCase()))
    //     setData(searchResult)
    // };

    // useEffect(()=>{
    // if (!data) {
    //     let {data} = useFindPatientConsultations(router.query.id)
    //     setData(data)
    // }
    // }, [])
    

    return (
        <section className='bg-white rounded-lg border drop-shadow-sm my-8'>
            <div className='flex justify-between py-3 px-4 '>
                <h1 className='text-2xl font-medium'>Consultations</h1>
                {/* <div className='relative flex-1 max-w-xs'>
        
                    <select onChange={ search} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option>Select Hospital</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                  
                </div> */}
                <input className='transition-all bg-gray-100 block hover:ring-2 hover:ring-gray-500 py-[0.4rem] w-full pl-10 border-none sm:text-sm rounded-md focus:ring-2 focus:ring-red-500'
                        type="text" placeholder='Rechercher une consultation...'/>
                <button type="button"className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    filter
                </button>
                </div>
            {data?.consultations && (
                <div className='py-2 border-t px-4 divide-y divide-slate-200'>
                    {data.consultations.map((consultation, i) => (
                        <div key={i}>
                            <Consultation
                                fromPatient
                                key={consultation.consultationId}
                                consultation={consultation}/>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default Consultations;
