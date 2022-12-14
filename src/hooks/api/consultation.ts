import {useMutation, useQuery} from "react-query";
import {IConsultation, IConsultationCreate} from "../../types/consultation";
import {
    closeConsultation,
    createConsultation,
    findConsultation,
    findDoctorConsultations,
    findPatientConsultations,
    updateConsultation
} from "../../api/consultation";

export const useFindPatientConsultations = (patientUserId, size?, page?) => {
    return useQuery(["consultations", patientUserId, {size, page}], findPatientConsultations, {
        enabled: !!patientUserId
    })
}

export const useFindDoctorConsultations = (doctorUserId, size, page) => {
    return useQuery(["consultations", doctorUserId, {size, page}], findDoctorConsultations, {
        enabled: !!doctorUserId
    })
}

export const useFindConsultation = (id: string) => {
    return useQuery(["consultations", id], findConsultation, {
        enabled: !!id
    })
}

export const useCreateConsultation = () => {
    return useMutation((consultation: IConsultationCreate) => createConsultation(consultation))
}

export const useUpdateConsultation = () => {
    return useMutation((consultation: IConsultation) => updateConsultation(consultation))
}

export const useCloseConsultation = () => {
    return useMutation((consultationId: string) => closeConsultation(consultationId))
}
