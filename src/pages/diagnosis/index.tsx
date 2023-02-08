import {NextPage} from "next";
import React from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import {useFindDiagnosisByHospitalId} from "../../hooks/api/diagnosis";

const Doctors: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const {data: diagnosis} = useFindDiagnosisByHospitalId(user?.hospitalId)

    let diagnosisNumber = 0;
    if (diagnosis) {
        diagnosisNumber = diagnosis.length
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
                        title={diagnosisNumber + " Diagnosis"}
                        columns={columns}
                        data={diagnosis}
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
