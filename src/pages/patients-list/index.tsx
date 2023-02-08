import {NextPage} from "next";
import React from "react";
import DataTable from "react-data-table-component";
import {useFindPatientByHospitalId} from "../../hooks/api/patient";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";

const PatientsList: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const {data: patients} = useFindPatientByHospitalId(user?.hospitalId)

    let patientNumber = 0;
    if (patients) {
        patientNumber = patients.length
    }

    const columns = [
        {
            name: 'Noms',
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Sexe',
            selector: row => row.gender,
            sortable: false,
        },
        {
            name: 'Groupe Sanguin',
            selector: row => row.bloodGroup,
            sortable: false,
        },
        {
            name: 'Rhesus',
            selector: row => row.rhesusFactor,
            sortable: false,
        }
    ];

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={patientNumber + " Patients"}
                        columns={columns}
                        data={patients}
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