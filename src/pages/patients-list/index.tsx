import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {useFindPatientByHospitalId} from "../../hooks/api/patient";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUsersByIds} from "../../hooks/api/user";
import {FiSettings, FiEye} from "react-icons/fi";
import {useRouter} from "next/router";


const PatientsList: NextPage = ({}) => {
    const router = useRouter()
    const [{authUser}] = useStateValue();
    const [{adminHospital}] = useStateValue();

    const {data: patients} = useFindPatientByHospitalId(adminHospital)
    
    const user =  useFindUsersByIds(patients?.toString())

    let patientNumber = 0;
    if (user && user.data) {
        patientNumber = user.data.length
    }

    const columns = [
        {
            name: 'Noms',
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'Téléphone',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Date of Birth',
            selector: row => row.bornOn,
            sortable: false,
        },
        {
            name: 'Place Of Birth',
            selector: row => row.placeOfBirth,
            sortable: false,
        },
        {
            name: "Consultations",
            button: true,
            cell: (row) => (
                <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.userId)}
                >
                    <FiEye/>
                </button>
            ),
        }
    ];

    const handleButtonClick = (e, id) => {
        e.preventDefault();
        router.push(`/patients-list/${id}`)
    };

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={(user && user.data ? user.data.length : 0) + " Patient(s)"}
                        columns={columns}
                        data={user && user.data ? user.data : []}
                        pagination
                        responsive={true}
                        highlightOnHover
                    />
                </div>
            </div>
        </section>
    )
};

export default PatientsList;