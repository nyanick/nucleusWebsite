import {NextPage} from "next";
import React from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import {useFindMedicalCares} from "../../hooks/api/medical-care";

const MedicalCaresList: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const {data: medicalCares} = useFindMedicalCares(user?.hospitalId, null, null)
    let medicalCareNumber = 0;
    let medicals = [];
    if (medicalCares) {
        medicalCareNumber = medicalCares.itemsCount
        medicals = medicalCares.medicalCares
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'DOB',
            selector: row => row.dob,
            sortable: false,
        }
    ];

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={medicalCareNumber + " Prises en Charge"}
                        columns={columns}
                        data={medicals}
                        pagination
                        responsive={true}
                        highlightOnHover
                    />
                </div>
            </div>
        </section>
    )
};

export default MedicalCaresList;
