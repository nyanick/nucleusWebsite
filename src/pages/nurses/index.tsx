import {NextPage} from "next";
import {useFindNursesByHospitalId} from "../../hooks/api/nurse";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";
import React, {useEffect, useState} from "react";

import {apiRoutes} from "../../constants";
import axios from "../../api/axios";
import {IUser} from "../../types/user";
import { INurse } from "../../types/nurse";

const Nurses: NextPage = () => {
    const [{authUser}] = useStateValue();
    const [{adminHospital}] = useStateValue();
    const[nurseList, setNurseList] = useState([]);
    const[nurseNumber,setNurseNumber]=useState(0);

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

    useEffect(() => {

        async function fetchData() {
            
            const findNursesByHospitalId = async (adminHospital) =>{
                //if adminHost
                if(!adminHospital){
                  return {data:[]};
                }
                return await axios.get<INurse[]>(`${apiRoutes.NURSES}/nursesByhospitalId`,{
                  params: {hospitalId: adminHospital}
                  });
            }
            const getUserById = async (userId) => {
            return await axios.get < IUser > (`${apiRoutes.USERS}/${userId}`);
            }
            //perform object decoupling
            const {data: nurses} = await findNursesByHospitalId(adminHospital);
            //visit each item in the array
    
            let cslt = [];
            if(nurses && nurses.length >0){
                for(let i =0; nurses && i < nurses.length ; i++){
                    let doc = nurses[i];
                    const uid = doc.userId;
                    const repo = await getUserById(uid);
                    const jointObjects = {...doc,...repo.data};
                    cslt.push(jointObjects)
                };
            }
            console.log('cslt',cslt)
            if(cslt.length > 0){
                console.log('inside here')
                setNurseList(cslt);
            }
        }
        fetchData();
    
      },[adminHospital]);

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={nurseList.length + " Infirmier(e)s"}
                        columns={columns}
                        data={nurseList}
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
