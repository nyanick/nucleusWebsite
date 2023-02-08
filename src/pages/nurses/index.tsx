import {NextPage} from "next";
import React from "react";
import {useFindNursesByHospitalId} from "../../hooks/api/nurse";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";

const Nurses: NextPage = () => {
    const [{authUser}] = useStateValue();
    const {data: user} = useFindUser(authUser?.userId)
    const {data: nurses} = useFindNursesByHospitalId(user?.hospitalId)
    let nurseNumber = 0;
    if (nurses) {
        nurseNumber = nurses.length
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
        }
    ];

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={nurseNumber + " Infirmier(e)s"}
                        columns={columns}
                        data={nurses}
                        pagination
                        responsive={true}
                        highlightOnHover
                    />
                </div>
            </div>
        </section>
    )
};

export default Nurses;
