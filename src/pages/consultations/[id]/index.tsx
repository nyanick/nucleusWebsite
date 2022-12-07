import React, {useEffect, useState} from 'react';
import type {NextPage} from "next";
import {
    ExamsPanelOverview,
    DiagnosticPanelOverview,
    ObservationsPanelOverview,
    PrescriptionsPanelOverview,
    SymptomsPanelOverview,
    ConsultationInfoSkeleton, ConsultationDoctorInfoSkeleton
} from "../../../components";
import {DiagnosticService} from "../../../services/DiagnosticService";
import {ConsultationService} from "../../../services/ConsultationService";
import {IDiagnosis} from "../../../types/diagnosis";
import {IDoctorWithDetails} from "../../../types/doctor";
import {useStateValue} from "../../../contexts/AuthProvider";
import {useRouter} from "next/router";
import {IExam} from "../../../types/exam";
import {IObservation} from "../../../types/observation";
import {IPrescription} from "../../../types/prescription";
import {ISymptom} from "../../../types/symptom";
import {IConsultation} from "../../../types/consultation";
import {ObservationService} from "../../../services/ObservationService";
import {PrescriptionService} from "../../../services/PrescriptionService";
import {Accordion, Avatar} from '@chakra-ui/react';
import {apiRoutes} from "../../../constants";
import { useGetHospital } from '../../../hooks/api/hospital';
import 'moment/locale/fr';
import moment from "moment";
import {useFindDoctorByUserId} from "../../../hooks/api/doctor";
import {useFindUser} from "../../../hooks/api/user";
import {useFindPatientByUserId} from "../../../hooks/api/patient";
moment.locale('fr')

const Overview: NextPage = ({}) => {

    const [{authToken, authUser}] = useStateValue();
    const router = useRouter()

    const [diagnostics, setDiagnostics] = useState<IDiagnosis[]>([])
    const [exams, setExams] = useState<IExam[]>([])
    const [observations, setObservations] = useState<IObservation[]>([])
    const [prescriptions, setPrescriptions] = useState<IPrescription[]>([])
    const [symptoms, setSymptoms] = useState<ISymptom[]>([])
    const [loadingDiagnostics, setLoadingDiagnostics] = useState(false)
    const [consultation, setConsultation] = useState<IConsultation>(null)
    const [loadingExams, setLoadingExams] = useState(false)
    const [loadingObservations, setLoadingObservations] = useState(false)
    const [loadingUser, setLoadingUser] = useState(false)
    const [loadingDoctor, setLoadingDoctor] = useState(false)
    const [loadingError, setLoadingError] = useState(null)
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false)
    const [loadingSymptoms, setLoadingSymptoms] = useState(false)
    const [loadingConsultation, setLoadingConsultation] = useState(false)
    const [consultationId, setConsultationId] = useState(null)
    const [diagnosticsLoadingError, setDiagnosticsLoadingError] = useState(null)
    const [loadingConsultationError, setLoadingConsultationError] = useState(null)
    const [loadingObservationsError, setLoadingObservationsError] = useState(null)
    const [loadingPrescriptionsError, setLoadingPrescriptionsError] = useState(null)
    const [consultationCloseError, setConsultationCloseError] = useState(null)
    const [consultationCloseSuccess, setConsultationCloseSuccess] = useState(false)
    const [closingConsultation, setClosingConsultation] = useState(false)
    const [diagnosisCount, setDiagnosisCount] = useState(-1)
    const [doctorDetails, setDoctorDetails] = useState<IDoctorWithDetails>(null)

    const {data: hospital} = useGetHospital(consultation?.hospitalId)
    const {data: doctor} = useFindDoctorByUserId(consultation?.doctorUserId)
    const {data: doctorUser} = useFindUser(consultation?.doctorUserId)
    const {data: patientUser} = useFindUser(consultation?.patientUserId)
    const {data: patient} = useFindPatientByUserId(consultation?.patientUserId)

    useEffect(() => {
        if(doctor && doctorUser) {
            setDoctorDetails({...doctor, ...doctorUser})
        }
    }, [doctor, doctorUser])

    const diagnosticService = new DiagnosticService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingDiagnostics,
        setLoadingError: setDiagnosticsLoadingError,
        setDiagnostics: setDiagnostics,
        setItemsCount: setDiagnosisCount
    })

    const observationService = new ObservationService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingObservations,
        setLoadingError: setLoadingObservationsError,
        setObservations: setObservations
    })

    const prescriptionService = new PrescriptionService({
        authToken: authToken,
        consultationId: consultationId,
        setLoading: setLoadingPrescriptions,
        setLoadingError: setLoadingPrescriptionsError,
        setItemsCount: setDiagnosisCount,
        setPrescriptions: setPrescriptions
    })

    const consultationService = new ConsultationService({
        authToken: authToken,
        consultationId: consultationId,
        setLoadingConsultation: setLoadingConsultation,
        setLoadingConsultationError: setLoadingConsultationError,
        setConsultation: setConsultation,
        setSymptoms: setSymptoms,
        setExams: setExams,
        setLoadingExams: setLoadingExams,
        setLoadingSymptoms: setLoadingSymptoms,
        setConsultationCloseSuccess: setConsultationCloseSuccess,
        setConsultationCloseError: setConsultationCloseError,
        setClosingConsultation: setClosingConsultation
    })

    useEffect(() => {
        setConsultationId(router.query.id)
    }, [router])

    useEffect(() => {
        if (consultationId) {
            diagnosticService.getAll()
            observationService.getAll()
            prescriptionService.getAll()
            consultationService.get(consultationId)
        }
    }, [consultationId])

    useEffect(() => {
        if (consultation) {
            if (consultation.examIds.length !== 0) {
                consultationService.findExamsByIds(consultation.examIds)
            }
            if (consultation.symptomIds.length !== 0) {
                consultationService.findSymptomsByIds(consultation.symptomIds)
            }
        }
    }, [consultation])

    useEffect(() => {
        if (consultationCloseSuccess) consultationService.get(consultationId)
    }, [consultationCloseSuccess])

    const closeConsultation = () => consultationService.closeConsultation(consultationId)

    return (
        <main className='grid grid-cols-9 py-8 gap-x-4'>
            <section className='col-span-6'>
                <div className='border p-4 rounded-lg bg-white drop-shadow-sm'>
                    <h1 className='mb-12 text-center text-2xl text-gray-700 font-medium'>Rapport de
                        Consultation</h1>
                    <div className='bg-white mb-16 p-2 rounded-lg border'>
                        <h1 className='mb-1 text-center text-xl text-gray-700 font-medium'>Centre Hospitalier</h1>
                        <p className='text-gray-600 text-center text-lg font-medium'>{hospital?.name}</p>
                    </div>
                    <Accordion allowMultiple={true}>
                        <DiagnosticPanelOverview
                            loading={loadingDiagnostics}
                            diagnostics={diagnostics}/>
                        <ExamsPanelOverview
                            loading={loadingExams}
                            exams={exams}/>
                        <ObservationsPanelOverview
                            loading={loadingObservations}
                            observations={observations}/>
                        <PrescriptionsPanelOverview
                            loading={loadingPrescriptions}
                            prescriptions={prescriptions}/>
                        <SymptomsPanelOverview
                            loading={loadingSymptoms}
                            symptoms={symptoms}/>
                    </Accordion>
                </div>
            </section>
            <section className='col-span-3'>
                <div className='sticky top-[9.6rem] space-y-4'>
                    {loadingConsultation ? <ConsultationInfoSkeleton/> : consultation && (
                        <div className='border py-2 px-4 rounded-xl w-full bg-white'>
                            {consultation.closedAt && (
                                <div className='bg-red-200 rounded-lg border-2 border-gray-700 p-2 my-2'>
                                    <p className='text-center'>Consultation clôturée</p>
                                </div>
                            )}
                            <div className="flex font-medium justify-between text-sm p-2">
                                <span className='text-sm'>Date création</span>
                                <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                                    <span className='mx-1'>{moment(consultation.createdAt).format('DD-MM-YYYY')}</span>
                                    <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                                    <span className='mx-1'>{moment(consultation.createdAt).format('H:mm')}</span>
                                </p>
                            </div>
                            {consultation.closedAt ? (
                                <div className="flex font-medium justify-between text-sm p-2">
                                    <span className='text-sm'>Date clôture</span>
                                    <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                                        <span className='mx-1'>{moment(consultation.closedAt).format('DD-MM-YYYY')}</span>
                                        <span className='w-1.5 h-1.5 bg-gray-400 rounded-full'/>
                                        <span className='mx-1'>{moment(consultation.closedAt).format('H:mm')}</span>
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex font-medium justify-between text-sm p-2">
                                        <span className='text-sm'>Statut</span>
                                        <p className='flex items-center justify-end text-xs font-medium text-gray-600 rounded-full bg-accent border px-2 py-0.5'>
                                            En cours
                                        </p>
                                    </div>
                                    {authUser?.userId === consultation.doctorUserId && (
                                        <div className='px-2 py-2 text-center'>
                                            <button
                                                onClick={closeConsultation}
                                                className='px-4 py-1.5 border-2 rounded-full text-gray-600 font-medium hover:text-gray-700 hover:border-2 transition-all hover:border-gray-600 hover:text-gray-700'>Clôturer
                                                la consultation
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {loadingDoctor ? <ConsultationDoctorInfoSkeleton/> : doctorDetails && (
                        <div className='space-y-4 border pt-2 pb-4 rounded-lg w-full bg-white'>
                            <div className='mb-4 pb-1 px-2 border-b'>
                                <h3 className='font-medium text-lg'>A propos du médecin</h3>
                            </div>
                            <div className='flex space-x-2 px-4 items-center mb-2'>
                                <Avatar
                                    size='sm'
                                    src={apiRoutes.GET_USER_AVATAR(doctorDetails.avatarId)}
                                    rounded='full'
                                    color='white'
                                    bgColor='purple.500'
                                    name={`${doctorDetails.firstName} ${doctorDetails.lastName}`}/>
                                <div>
                                    <a href=''
                                       className='hover:underline hover:text-blue-800 font-medium text-gray-600 line-clamp-2'>
                                        {`${doctorDetails.firstName} ${doctorDetails.lastName}`}
                                    </a>
                                    <p className='text-xs text-gray-600'>{doctorDetails.title}</p>
                                </div>
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
};

export default Overview;
