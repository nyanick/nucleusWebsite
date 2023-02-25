import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useFindDoctorsByHospitalId} from "../../hooks/api/doctor";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../contexts/AuthProvider";
import {useFindUser} from "../../hooks/api/user";


import {apiRoutes} from "../../constants";
import axios from "../../api/axios";
import {IUser} from "../../types/user";
import { IDoctor } from "../../types/doctor";

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
    name: 'Title',
    selector: row => row.title,
    sortable: true,
  },
];

const Doctors: NextPage = ({}) => {
  let [{authUser}] = useStateValue();
  const [{adminHospital}] = useStateValue();
  const[doctorList, setDoctorList] = useState([]);
  const[doctorNumber,setDoctorNumber]=useState(0);
  
  useEffect(() => {

    async function fetchData() {

      const findDoctorsByHospitalId = async (adminHospital) =>{
        //if adminHost
        if(!adminHospital){
          return {data:[]};
        }
        return await axios.get<IDoctor[]>(`${apiRoutes.DOCTORS}/doctorsByhospitalId`,{
          params: {hospitalId: adminHospital}
          });
      }
      const getUserById = async (userId) => {
       return await axios.get < IUser > (`${apiRoutes.USERS}/${userId}`);
      }
      //perform object decoupling
      const {data: doctors} = await findDoctorsByHospitalId(adminHospital);
      let cslt = [];
      if(doctors && doctors.length >0){
          for(let i =0; doctors && i < doctors.length ; i++){
              let doc = doctors[i];
              const uid = doc.userId;
              const repo = await getUserById(uid);
              const jointObjects = {...doc,...repo.data};
              cslt.push(jointObjects)
          };
      }
      console.log('cslt',cslt)
      if(cslt.length > 0){
          setDoctorList(cslt);
      }
      
    }
    fetchData();
  },[adminHospital]);
  
  console.log('yanick')
  return (
      <section className='p-8'>
        <div className='space-y-8'>
          <div className='w-full border-x border-t rounded-lg'>
            <DataTable
                title={doctorList.length + " Médecin(s)"}
                columns={columns}
                data={doctorList}
                pagination
                highlightOnHover
            />
          </div>
        </div>
      </section>
  )
};

export default Doctors;