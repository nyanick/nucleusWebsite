import {NextPage} from "next";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import {useFindDiagnosisByHospitalId} from "../../hooks/api/diagnosis";
import axios from "axios";
import moment from "moment";
import { apiRoutes } from "../../constants";
import { IConsultation } from "../../types/consultation";
import { IDiagnosis } from "../../types/diagnosis";
import {FiSettings, FiUsers, FiEye} from "react-icons/fi";
import Link from "next/link";

const DiagnosticsList: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const [{adminHospital}] = useStateValue();


    const [formData, setFormData] = useState({
        description: ""
    });


    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
        }));
    }

    const addAnnoucement = async (event) => {
        event.preventDefault()

        const formURL = event.target.action
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

    };

    const columns = [
        {
            name: 'Noms',
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Téléphone',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Consultation',
            selector: row => row.specialtyId,
            sortable: true,
        },
    ];

    return (
        <>
            

            <section className='p-8'>
                <div className='space-y-8'>

                    <div>
                        <div>
                            <form onSubmit={addAnnoucement}>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="mt-0">
                                    <label className="block text-gray-700 text-sm font-bold ">Annonce(s) </label>
                                        <textarea id="about" name="about" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" ></textarea>
                                    </div>

                                    <div className="md:flex md:items-center ">
                                        <div >
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline"  type="submit">Ajouter</button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='w-full border-x border-t rounded-lg'>
                        <DataTable
                            title={[].length + " Annonce"}
                            columns={columns}
                            data={[]}
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



export default DiagnosticsList;
