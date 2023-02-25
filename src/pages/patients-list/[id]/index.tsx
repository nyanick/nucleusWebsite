import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useFindUsersByIds} from "../../../hooks/api/user";
import {FiSettings, FiEye} from "react-icons/fi";
import {useRouter} from "next/router";
import {apiRoutes} from "../../../constants";
import axios from "../../../api/axios";
import { IUser } from "../../../types/user";
import { IConsultation } from "../../../types/consultation";
import moment from "moment";


const PatientsConsulationList: NextPage = ({}) => {
    const router = useRouter()

    const [{authUser}] = useStateValue();
    const [{adminHospital}] = useStateValue();
    const [patientUserId, setpatientUserId] = useState(null)
    const [consultation, setConsultations] = useState(null)
    const[consultList, setConsultList] = useState([]);
    
    useEffect( () => {
        async function fetchData() {
            setpatientUserId(router.query.id)
            if(adminHospital && patientUserId && consultList.length == 0){
                let {data : consult} = await FindConsultationsByHospitalAndPatientUserID(adminHospital, patientUserId) 
                let cslt = [];
                if(consult && consult.length >0){
                    for(let i =0; consult && i < consult.length ; i++){
                        let doc = consult[i];
                        const uid = doc.doctorUserId;
                        const repo = await getUserById(uid);
                        let user = {
                            firstName : repo.data.firstName, 
                            lastName : repo.data.lastName, 
                        
                        };

                        const jointObjects = {...doc,...user};
                        cslt.push(jointObjects)
                    };
                }
                if(cslt.length > 0){
                    setConsultList(cslt);
                }
            }
        }
        fetchData();
        
      },[router, adminHospital, patientUserId, consultList, setConsultList]);


    

    const columns = [
        {
            name: 'Nom du médecin',
            cell: row => row.firstName + ' ' + row.lastName,
            sortable: true,
        },
        {
            name: 'Date de création',
            cell: row => moment(row.createdAt).toDate().toLocaleString() ,
            sortable: true,
        },
        {
            name: 'Date de dernière mise à jour',
            cell: row => moment(row.updatedAt).toDate().toLocaleString(),
            sortable: true,
        },
        {
            name: 'Statut',
            cell: row => row.status == 1 ? 
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"> Ouvert</button>
             : 
             <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"> Fermé</button>
             ,
            sortable: false,
        },
        {
            name: 'Date de clôture',
            cell: row => row.closedAt ? moment(row.closedAt).toDate().toLocaleString() : '',
            sortable: false,
        },
        {
            name: "Consultations",
            cell: (row) => (
                <button
                    className="btn btn-outline btn-xs"
                    onClick={(e) => handleButtonClick(e, row.consultationId)}
                >
                    <FiEye/>
                </button>
            ),
            sortable: false,
        }
    ];

    const handleButtonClick = (e, id) => {
        e.preventDefault();
        router.push(`/consultations/${id}`)
    };

    return (
        <section className='p-8'>
            <div className='space-y-8'>
                <div className='w-full border-x border-t rounded-lg'>
                    <DataTable
                        title={(consultList ? consultList.length : 0) + " Consultation(s)"}
                        columns={columns}
                        data={consultList}
                        pagination
                        responsive={true}
                        highlightOnHover
                    />
                </div>
            </div>
        </section>
    )
};


const FindConsultationsByHospitalAndPatientUserID = async (adminHospital, patientUserId) =>{
    //if adminHost
    if(!adminHospital || !patientUserId){
      return {data:[]};
    }
    return await axios.get<IConsultation[]>(`${apiRoutes.CONSULTATIONS}/patient/${adminHospital}/${patientUserId}`);
}

const getUserById = async (userId) => {
    return await axios.get < IUser > (`${apiRoutes.USERS}/${userId}`);
}

export default PatientsConsulationList;