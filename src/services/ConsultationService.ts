import axios from "../api/axios";
import {IConsultation, IConsultationCreate} from "../types/consultation";
import {ISymptom} from "../types/symptom";
import {IGroup} from "../types/group";
import {IExam} from "../types/exam";
import {ICategory} from "../types/category";
import { apiRoutes } from "../constants";

interface Props {
    authToken: string
    consultationId?: string
    setLoadingConsultation?: (state: boolean) => void
    setLoadingConsultationError?: (error: any) => void
    setLoadingConsultations?: (state: boolean) => void
    setLoadingConsultationsError?: (error: any) => void
    setLoadingSymptoms?: (state: boolean) => void
    setLoadingSymptomsError?: (error: any) => void
    setLoadingExamGroups?: (state: boolean) => void
    setLoadingExamGroupsError?: (error: any) => void
    setLoadingExamCategories?: (state: boolean) => void
    setLoadingExamCategoriesError?: (error: any) => void
    setLoadingExams?: (state: boolean) => void
    setLoadingExamsError?: (error: any) => void
    setExams?: (exams: IExam[]) => void
    setExamCategories?: (examCategories: ICategory[]) => void
    setExamGroups?: (examGroups: IGroup[]) => void
    setCreatingConsultation?: (state: boolean) => void
    setCreatingConsultationError?: (error: any) => void
    setUpdatingConsultation?: (updating: boolean) => void
    setClosingConsultation?: (closing: boolean) => void
    setUpdatingConsultationError?: (error: any) => void
    setConsultationCloseError?: (error: any) => void
    setConsultationCloseSuccess?: (success: boolean) => void
    setConsultation?: (consultation: IConsultation) => void
    setConsultations?: (consultations: IConsultation[]) => void
    setCreatedConsultation?: (consultation: IConsultation) => void
    setUpdatedConsultation?: (consultation: IConsultation) => void
    setSymptoms?: (symptoms: ISymptom[]) => void
}

export class ConsultationService {

    private readonly authToken: string
    private readonly consultationId?: string
    private readonly setLoadingConsultation?: (state: boolean) => void
    private readonly setLoadingConsultationError?: (error: any) => void
    private readonly setLoadingConsultations?: (state: boolean) => void
    private readonly setLoadingConsultationsError?: (error: any) => void
    private readonly setLoadingSymptoms?: (state: boolean) => void
    private readonly setLoadingSymptomsError?: (error: any) => void
    private readonly setCreatingConsultation?: (state: boolean) => void
    private readonly setCreatingConsultationError?: (error: any) => void
    private readonly setUpdatingConsultation?: (updating: boolean) => void
    private readonly setClosingConsultation?: (closing: boolean) => void
    private readonly setUpdatingConsultationError?: (error: any) => void
    private readonly setConsultationCloseError?: (error: any) => void
    private readonly setConsultationCloseSuccess?: (success: boolean) => void
    private readonly setLoadingExamGroups?: (state: boolean) => void
    private readonly setLoadingExamGroupsError?: (error: any) => void
    private readonly setLoadingExamCategories?: (state: boolean) => void
    private readonly setLoadingExamCategoriesError?: (error: any) => void
    private readonly setLoadingExams?: (state: boolean) => void
    private readonly setLoadingExamsError?: (error: any) => void
    private readonly setExams?: (exams: IExam[]) => void
    private readonly setExamCategories?: (examCategories: ICategory[]) => void
    private readonly setExamGroups?: (examGroups: IGroup[]) => void
    private readonly setConsultation?: (consultation: IConsultation) => void
    private readonly setConsultations?: (consultations: IConsultation[]) => void
    private readonly setCreatedConsultation?: (consultation: IConsultation) => void
    private readonly setUpdatedConsultation?: (consultation: IConsultation) => void
    private readonly setSymptoms?: (symptoms: ISymptom[]) => void

    constructor({
                    authToken,
                    consultationId,
                    setLoadingConsultation,
                    setLoadingConsultationError,
                    setLoadingConsultations,
                    setLoadingConsultationsError,
                    setLoadingSymptoms,
                    setLoadingSymptomsError,
                    setCreatingConsultation,
                    setCreatingConsultationError,
                    setUpdatingConsultation,
                    setClosingConsultation,
                    setUpdatingConsultationError,
                    setConsultationCloseError,
                    setConsultationCloseSuccess,
                    setLoadingExamGroups,
                    setLoadingExamGroupsError,
                    setLoadingExamCategories,
                    setLoadingExamCategoriesError,
                    setLoadingExams,
                    setLoadingExamsError,
                    setExams,
                    setExamCategories,
                    setExamGroups,
                    setConsultation,
                    setConsultations,
                    setCreatedConsultation,
                    setUpdatedConsultation,
                    setSymptoms
                }: Props) {
        this.authToken = authToken
        this.consultationId = consultationId
        this.setLoadingConsultation = setLoadingConsultation
        this.setLoadingConsultationError = setLoadingConsultationError
        this.setLoadingConsultations = setLoadingConsultations
        this.setLoadingConsultationsError = setLoadingConsultationsError
        this.setLoadingSymptoms = setLoadingSymptoms
        this.setLoadingSymptomsError = setLoadingSymptomsError
        this.setCreatingConsultation = setCreatingConsultation
        this.setCreatingConsultationError = setCreatingConsultationError
        this.setUpdatingConsultation = setUpdatingConsultation
        this.setClosingConsultation = setClosingConsultation
        this.setUpdatingConsultationError = setUpdatingConsultationError
        this.setConsultationCloseError = setConsultationCloseError
        this.setConsultationCloseSuccess = setConsultationCloseSuccess
        this.setLoadingExamGroups = setLoadingExamGroups
        this.setLoadingExamGroupsError = setLoadingExamGroupsError
        this.setLoadingExamCategories = setLoadingExamCategories
        this.setLoadingExamCategoriesError = setLoadingExamCategoriesError
        this.setLoadingExams = setLoadingExams
        this.setLoadingExamsError = setLoadingExamsError
        this.setExams = setExams
        this.setExamCategories = setExamCategories
        this.setExamGroups = setExamGroups
        this.setConsultation = setConsultation
        this.setConsultations = setConsultations
        this.setCreatedConsultation = setCreatedConsultation
        this.setUpdatedConsultation = setUpdatedConsultation
        this.setSymptoms = setSymptoms
    }

    getAll(doctorUserId: string) {
        this.setLoadingConsultations(true)
        axios.get<IConsultation[]>(
            `${apiRoutes.CONSULTATIONS}/doctor/${doctorUserId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setConsultations(res.data);
            this.setLoadingConsultations(false);
        }).catch((err) => {
            this.setLoadingConsultations(false);
            this.setLoadingConsultationsError(err.response)
        });
    }

    getExams() {
        this.setLoadingExams(true)
        const params = {
            size: 1000,
            Authorization: `Bearer ${this.authToken}`
        };
        axios.get<IExam[]>(
            `${apiRoutes.CONSULTATIONS}/exams`,
            {params: params}
        ).then((res) => {
            this.setExams(res.data);
            this.setLoadingExams(false);
        }).catch((err) => {
            this.setLoadingExams(false);
            this.setLoadingExamsError(err.response)
        });
    }

    findExamsByIds(examIds: string[]) {
        this.setLoadingExams(true)
        axios.get<IExam[]>(
            `${apiRoutes.CONSULTATIONS}/exams/${examIds}/details`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setExams(res.data);
            this.setLoadingExams(false);
        }).catch((err) => {
            this.setLoadingExams(false);
            this.setLoadingExamsError(err.response)
        });
    }

    findSymptomsByIds(symptomIds: string[]) {
        this.setLoadingSymptoms(true)
        axios.get<ISymptom[]>(
            `${apiRoutes.CONSULTATIONS}/symptoms/${symptomIds}/details`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setSymptoms(res.data);
            this.setLoadingSymptoms(false);
        }).catch((err) => {
            this.setLoadingSymptoms(false);
            this.setLoadingSymptomsError(err.response)
        });
    }

    getSymptoms() {
        this.setLoadingSymptoms(true)
        const params = {
            size: 1000,
            Authorization: `Bearer ${this.authToken}`
        };
        axios.get<ISymptom[]>(
            `${apiRoutes.CONSULTATIONS}/symptoms`,
            {params: params}
        ).then((res) => {
            this.setSymptoms(res.data);
            this.setLoadingSymptoms(false);
        }).catch((err) => {
            this.setLoadingSymptoms(false);
            this.setLoadingSymptomsError(err.response)
        });
    }

    getExamGroups() {
        this.setLoadingExamGroups(true)
        axios.get<IGroup[]>(
            `${apiRoutes.CONSULTATIONS}/groups`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setExamGroups(res.data);
            this.setLoadingExamGroups(false);
        }).catch((err) => {
            this.setLoadingExamGroups(false);
            this.setLoadingExamGroupsError(err.response)
        });
    }

    getExamCategories() {
        this.setLoadingExamCategories(true)
        axios.get<ICategory[]>(
            `${apiRoutes.CONSULTATIONS}/categories`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setExamCategories(res.data);
            this.setLoadingExamCategories(false);
        }).catch((err) => {
            this.setLoadingExamCategories(false);
            this.setLoadingExamCategoriesError(err.response)
        });
    }

    get(consultationId: string) {
        this.setLoadingConsultation(true)
        axios.get<IConsultation>(
            `${apiRoutes.CONSULTATIONS}/${consultationId}`,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setConsultation(res.data);
            this.setLoadingConsultation(false);
        }).catch((err) => {
            // alert(JSON.stringify(err.response))
            this.setLoadingConsultation(false)
            this.setLoadingConsultationError(err.response)
        });
    }

    update(consultation: IConsultation) {
        this.setUpdatingConsultation(true)
        axios.put<IConsultation>(
            apiRoutes.CONSULTATIONS,
            consultation,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setConsultation(res.data);
            this.setUpdatingConsultation(false);
        }).catch((err) => {
            this.setUpdatingConsultation(false)
            this.setUpdatingConsultationError(err.response)
        });
    }

    closeConsultation(consultationId: string) {
        this.setClosingConsultation(true)
        this.setConsultationCloseError(null)
        this.setConsultationCloseSuccess(false)
        axios.put(
            `${apiRoutes.CONSULTATIONS}/${consultationId}/close`,
            null,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setConsultationCloseSuccess(true)
            this.setClosingConsultation(false);
        }).catch((err) => {
            this.setClosingConsultation(false)
            this.setConsultationCloseSuccess(false)
            this.setConsultationCloseError(err.response)
        });
    }

    createConsultation(consultationCreate: IConsultationCreate) {
        this.setCreatingConsultation(true)
        axios.post<IConsultation>(
            `${apiRoutes.CONSULTATIONS}`,
            consultationCreate,
            {headers: {'Authorization': `Bearer ${this.authToken}`}}
        ).then((res) => {
            this.setConsultation(res.data);
            this.setCreatingConsultation(false);
        }).catch((err) => {
            this.setCreatingConsultation(false)
            this.setCreatingConsultationError(err.response)
        });
    }
}