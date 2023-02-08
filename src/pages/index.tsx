import type {NextPage} from 'next'
import {useStateValue} from "../contexts/AuthProvider";
import {userRoles} from "../constants";
import DoctorHome from "../components/DoctorHome";
import NurseHome from "../components/NurseHome";
import AdminHome from "../components/AdminHome";


const Index: NextPage = () => {
    const [{authUser}] = useStateValue();

    return (
        <section className='grid gap-6 py-8 lg:grid-cols-2 xl:grid-cols-3'>
            {/*{authUser?.authorities.includes(userRoles.ROLE_DOCTOR) && <DoctorHome/>}*/}
            {/*{authUser?.authorities.includes(userRoles.ROLE_NURSE) && <NurseHome/>}*/}
            {/*{authUser?.authorities.includes(userRoles.ROLE_ADMIN_HOPSITAL) && <AdminHome/>}*/}
            <AdminHome/>
        </section>
    )
}

export default Index
