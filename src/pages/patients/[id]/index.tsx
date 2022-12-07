import {NextPage} from "next";
import {Link} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useFindUser} from "../../../hooks/api/user";
import {useFindPatientByUserId} from "../../../hooks/api/patient";
import moment from "moment";
import {FaUser} from "react-icons/fa";

const MedicalFolder: NextPage = () => {
    const router = useRouter()
    const {data: user} = useFindUser(router.query.id as string)
    const {data: patient} = useFindPatientByUserId(router.query.id as string)
    console.log(patient);
    const menus = [
        {name: "Consultations", url: "/consultations"},
        {name: "Symptômes", url: "/symptoms"},
        {name: "Allergies", url: "/allergies"},
        {name: "Demandes d'examens", url: "/exams"},
        {name: "Observations", url: "/observations"},
        {name: "Rapports d'infirmerie", url: "/infirmary-reports"},
        {name: "Diagnostics", url: "/diagnosis"},
        {name: "Pharmacogénomique", url: "/pharmacogenomics"},
        {name: "Rendez-vous", url: "/appointments"},
        {name: "Paramètres", url: "/parametersStats"},
        {name: "Rapports de consultation", url: "/consultation-reports"},
        {name: "Prescriptions", url: "/prescriptions"},
    ]

    return (
        <>
            {user && (
                <section className='py-8'>
                    <div className='space-y-6'>
                        <h2 className='text-3xl text-center'>
                            Dossier Médical de {`${user.firstName} ${user.lastName}`}
                            <span className='text-lg'> ({patient?.gender}, {moment().diff(moment(user.bornOn), 'years')} years, {patient?.bloodGroup}{patient?.rhesusFactor})</span>
                        </h2>
                        <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                            {
                                menus.map((menu, key) => (
                                    <Link
                                        key={key}
                                        _hover={{textDecoration: 'none'}}
                                        href={`/patients/${router.query.id}${menu.url}`}
                                        className='text-white w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg'>
                                        <div
                                            className="w-full flex py-6 md:flex-col bg-gradient-to-br from-purple-500 to-indigo-500">
                                            <div
                                                className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex items-center flex-col items-start relative z-10 p-6 xl:p-8">
                                                <FaUser className='text-white h-32 w-32'/>
                                            </div>
                                            <div className="flex justify-center">
                                                <p className='text-white text-2xl'>{menu.name}</p>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-12 hidden sm:block"
                                             style={{background: 'linear-gradient(to top, rgb(135, 94, 245), rgba(135, 94, 245, 0))'}}>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default MedicalFolder