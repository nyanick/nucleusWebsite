import {NextPage} from "next";
import React from "react";
import {useFindDoctorsByHospitalId} from "../../hooks/api/doctor";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";

const Doctors: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const {data: doctors} = useFindDoctorsByHospitalId(user?.hospitalId)

    let doctorNumber = 0;
    if (doctors) {
        doctorNumber = doctors.length
    }

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
            name: 'Phone',
            selector: row => row.phoneNumber,
            sortable: true,
        },
        {
            name: 'Spécialité',
            selector: row => row.specialtyId,
            sortable: true,
        },
    ];

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={doctorNumber + " Médecins"}
                        columns={columns}
                        data={doctors}
                        pagination
                        responsive={true}
                        highlightOnHover
                    />
                </div>
            </div>
        </section>
    )
};

export default Doctors;
