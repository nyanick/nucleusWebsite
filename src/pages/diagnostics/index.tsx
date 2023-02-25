import {NextPage} from "next";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import {useFindDiagnosisByHospitalId} from "../../hooks/api/diagnosis";
import axios from "../../api/axios";
import moment from "moment";
import { apiRoutes } from "../../constants";
import { IConsultation } from "../../types/consultation";
import { IDiagnosis } from "../../types/diagnosis";
import {FiSettings, FiUsers,FiEye} from "react-icons/fi";
import Link from "next/link";
import {useRouter} from "next/router";


const DiagnosticsList: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const [{adminHospital}] = useStateValue();
    const [diagnosis, setDiagnosis] = useState([]);

    const router = useRouter()


    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        description: ""
    });

    // useEffect(async ()=> {
    //     let start_date = null;
    //     let end_date = null;
    //     let description = null;

    //     let diagnosis = await findDiagnostics(start_date, end_date, adminHospital, description);
    //     setDiagnosis(diagnosis);

    // },[ adminHospital, setDiagnosis]);


    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
        }));
    }

    const searchDiagnostic = async (event) => {
        event.preventDefault()

        const formURL = event.target.action
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

        let start_date = moment(formData.start_date, "yyyy-MM-ddTHH:mm").toISOString();
        let end_date =  moment(formData.end_date, "yyyy-MM-ddTHH:mm").toISOString();
        let description = formData.description;

        let diagnosis = await findDiagnostics(start_date, end_date, adminHospital, description);
        setDiagnosis(diagnosis);

    };

    const columns = [
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Date de dernière mise à jour',
            selector: row => moment(row.updatedAt).toDate().toLocaleString(),
            sortable: true,
        },
        {
            name: "Consultations",
            button: true,
            cell: (row) => (
                <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.consultationId)}
                >
                    <FiEye/>
                </button>
            ),
        },
    ];

    const handleButtonClick = (e, id) => {
        e.preventDefault();
        router.push(`/consultations/${id}`)
    };

    return (
        <>
            <div>
                <div>
                    <form onSubmit={searchDiagnostic}>
                        <div className="flex items-center justify-center space-x-4 mt-2 ">

                            <div className="md:flex md:items-center ">
                                <div className="">
                                <label className="block text-gray-700 text-sm font-bold ">Description:</label>

                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div className="">
                                    <input  className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  type="text" id="start_date" name="description" onChange={handleInput} value={formData.description}  />

                                </div>
                            </div>

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
            </div>

            <section className='p-8'>
                <div className='space-y-8'>
                    <div className='w-full border-x border-t rounded-lg'>
                        <DataTable
                            title={diagnosis.length + " Diagnostic"}
                            columns={columns}
                            data={diagnosis}
                            pagination
                            responsive={true}
                            highlightOnHover
                        />
                    </div>
                </div>
            </section>
        </>
        
    )
};

const findDiagnostics = async (start_date, end_date,adminHospital, description) =>{
    if(!start_date || !end_date || !adminHospital){
        return [];
    }
    let diagnosis =  await axios.get<IDiagnosis[]>(`${apiRoutes.CONSULTATIONS}/diagnosis/hospital/${adminHospital}`,{
        params: {start_date: start_date, end_date: end_date,description:description }
    });
    if(diagnosis && diagnosis.data){
        return diagnosis.data;
    }
    return [];
}

export default DiagnosticsList;
