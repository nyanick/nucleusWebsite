import {NextPage} from "next";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useRouter} from "next/router";
import {
    Layout,
    MedicalCareCaresPanelOverview,
    MedicalCareInfoSkeleton,
    MedicalCareObservationsPanelOverview,
    ParametersPanelOverview
} from "../../../components";
import {Accordion, Avatar} from "@chakra-ui/react";
import {apiRoutes} from "../../../constants";
import React from "react";
import {useGetHospital} from "../../../hooks/api/hospital";
import {useFindNurseByUserId} from "../../../hooks/api/nurse";
import {useFindMedicalCare} from "../../../hooks/api/medical-care";
import {useFindMedicalCareObservations} from "../../../hooks/api/medicalcare-observation";
import {useFindMedicalCareParameters} from "../../../hooks/api/parameter";
import {useFindMedicalCareCares} from "../../../hooks/api/care";
import {useFindUser} from "../../../hooks/api/user";
import {useFindPatientByUserId} from "../../../hooks/api/patient";
import moment from "moment";
import 'moment/locale/fr';
moment.locale('fr')

const Overview: NextPage = ({}) => {
    const [{authUser}] = useStateValue();
    const router = useRouter()
    const {data: nurse} = useFindNurseByUserId(authUser?.userId)
    const {data: hospital} = useGetHospital(nurse?.hospitalId)
    const {data: observations, isLoading: loadingObservations} = useFindMedicalCareObservations(router.query.id as string)
    const {data: parameters, isLoading: loadingParameters} = useFindMedicalCareParameters(router.query.id as string)
    const {data: cares, isLoading: loadingCares} = useFindMedicalCareCares(router.query.id as string)
    const {data: medicalCare, isLoading: loadingMedicalCare} = useFindMedicalCare(router.query.id as string)
    const {data: patientUser} = useFindUser(medicalCare?.patientUserId)
    const {data: patient} = useFindPatientByUserId(medicalCare?.patientUserId)

    return (
        <main className='grid grid-cols-9 py-8 gap-x-4'>
            <section className='col-span-6'>
                <div className='border p-4 rounded-lg bg-white drop-shadow-sm'>
                    <h1 className='mb-12 text-center text-2xl text-gray-700 font-medium'>Rapport de prise en charge accueil</h1>
                    <div className='bg-white mb-16 p-2 rounded-lg border'>
                        <h1 className='mb-1 text-center text-xl text-gray-700 font-medium'>Centre Hospitalier</h1>
                        <p className='text-gray-600 text-center text-lg font-medium'>{hospital?.name}</p>
                    </div>
                    <Accordion allowMultiple={true}>
                        {parameters && (
                            <ParametersPanelOverview
                                loading={loadingParameters}
                                parameters={parameters}/>
                        )}
                        {observations && (
                            <MedicalCareObservationsPanelOverview
                                loading={loadingObservations}
                                observations={observations}/>
                        )}
                        {cares && (
                            <MedicalCareCaresPanelOverview
                                loading={loadingCares}
                                cares={cares}/>
                        )}
                    </Accordion>
                </div>
            </section>
            <section className='col-span-3'>
                <div className='sticky top-[9.6rem] space-y-4'>
                    {loadingMedicalCare ? <MedicalCareInfoSkeleton/> : medicalCare && (
                        <div className='border py-2 px-4 rounded-xl w-full bg-white'>
                            <div className="flex font-medium justify-between text-sm p-2">
                                <span className='text-sm'>Date création</span>
                                <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                                    <span className='mx-1'>{moment(medicalCare.createdAt).format('DD-MM-YYYY')}</span>
                                    <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                                    <span className='mx-1'>{moment(medicalCare.createdAt).format('H:mm')}</span>
                                </p>
                            </div>
                        </div>
                    )}
                    {authUser && (
                        <div className='space-y-4 border pt-2 pb-4 rounded-lg w-full bg-white'>
                            <div className='mb-4 pb-1 px-2 border-b'>
                                <h3 className='font-medium text-lg'>A propos de l&apos;aide soignant(e)</h3>
                            </div>
                            <div className='flex space-x-2 px-4 items-center mb-2'>
                                <Avatar
                                    size='sm'
                                    src={apiRoutes.GET_USER_AVATAR(authUser.avatarId)}
                                    rounded='full'
                                    color='white'
                                    bgColor='purple.500'
                                    name={`${authUser.firstName} ${authUser.lastName}`}/>
                                <a href=''
                                   className='hover:underline hover:text-blue-800 font-medium text-gray-600 line-clamp-2'>
                                    {`${authUser.firstName} ${authUser.lastName}`}
                                </a>
                            </div>
                        </div>
                    )}
                    {patientUser && (
                        <div className='space-y-4 border pt-2 pb-4 rounded-lg w-full bg-white'>
                            <div className='mb-4 pb-1 px-2 border-b'>
                                <h3 className='font-medium text-lg'>A propos du patient</h3>
                            </div>
                            <div className='flex space-x-2 px-4 items-center mb-2'>
                                <Avatar
                                    size='sm'
                                    src={apiRoutes.GET_USER_AVATAR(patientUser.avatarId)}
                                    rounded='full'
                                    color='white'
                                    bgColor='purple.500'
                                    name={`${patientUser.firstName} ${patientUser.lastName}`}/>
                                <div>
                                    <a href={`/patients/${patientUser.userId}`}
                                       className='hover:underline hover:text-blue-800 font-medium text-gray-600 line-clamp-2'>
                                        {`${patientUser.firstName} ${patientUser.lastName}`}
                                    </a>
                                    <div className='flex items-center'>
                                        <span className='text-xs'>{moment().diff(moment(patientUser.bornOn), 'years')} ans</span>
                                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mx-2'/>
                                        <span className='text-xs'>{patient?.bloodGroup} {patient?.rhesusFactor}</span>
                                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full mx-2'/>
                                        <span className='text-xs'>{patient?.gender}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );

}

export default Overview;