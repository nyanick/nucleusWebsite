import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import {useFindMedicalCares} from "../../hooks/api/medical-care";
import moment from "moment";
import { IMedicalCare } from "../../types/medical-care";
import axios from "../../api/axios";
import {apiRoutes} from "../../constants";
import {FiSettings, FiUsers} from "react-icons/fi";
import Link from "next/link";

const MedicalCaresList: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const [{adminHospital}] = useStateValue();
    const [medicalCare, setMedicalCare] = useState(0);

    const [formData, setFormData] = useState({
        start_date: "",
        end_date: ""
    });

    // useEffect(async ()=> {
    //     let start_date = null;
    //     let end_date = null;

    //     let medicalcares = await findMedicalCares(start_date, end_date, adminHospital);
    //     setMedicalCare (medicalcares);
    // },[]);


    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
        }));
    }

    const searchMedicalCares = async (event) => {
        event.preventDefault()

        const formURL = event.target.action
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })
        console.log('formData',formData)
        let start_date = moment(formData.start_date, "yyyy-MM-ddTHH:mm").toISOString();
        let end_date =  moment(formData.end_date, "yyyy-MM-ddTHH:mm").toISOString();

        let medicalcares = await findMedicalCares(start_date, end_date, adminHospital);
        setMedicalCare (medicalcares);

    };

    return (
        <>
            <div>
                <div>
                    <form onSubmit={searchMedicalCares}>
                        <div className="flex items-center justify-center space-x-4 mt-2 ">

                            <div className="md:flex md:items-center ">
                                <div className="">
                                <label className="block text-gray-700 text-sm font-bold ">Date de début:</label>

                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div className="">
                                    <input  className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  type="datetime-local" id="start_date" name="start_date" onChange={handleInput} value={formData.start_date} required />

                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div >
                                    <label className="block text-gray-700 text-sm font-bold " >Date de fin:</label>
                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div >
                                    <input  className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="datetime-local" id="end_date" name="end_date" onChange={handleInput} value={formData.end_date} required />
                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div >
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"  type="submit">Recherche</button>
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>

                <div>
                <section className='grid gap-6 py-8 lg:grid-cols-2 xl:grid-cols-3'>
                        <Link key="1" href="/">
                            <a className='text-white w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg'>
                                <div
                                    className="w-full flex py-6 md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500">
                                    <div
                                        className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex items-center flex-col items-start relative z-10 p-4 xl:p-6">
                                        <FiUsers className='text-white h-16 w-16'/>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className='text-white text-2xl'>{medicalCare}</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <p className='text-white text-2xl'> Nombre de soins médicaux </p>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-12 hidden sm:block"
                                    style={{background: 'linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))'}}>
                                </div>
                            </a>
                        </Link>
                 </section>
                
                </div>
            </div>
        </>
    
    );
};

const findMedicalCares = async (start_date, end_date,adminHospital) =>{
    if(!start_date || !end_date || !adminHospital){
        return 0;
    }
    let medicalcares=  await axios.get<IMedicalCare[]>(`${apiRoutes.NURSES}/medical-cares/hospitalInPeriod/${adminHospital}`,{
        params: {start_date: start_date, end_date: end_date}
    });
    if(medicalcares && medicalcares.data){
        return medicalcares.data.length;
    }
    return 0;
}

export default MedicalCaresList;
