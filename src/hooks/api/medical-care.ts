import {useMutation, useQuery} from "react-query";
import {IMedicalCareCreate} from "../../types/medical-care";
import {
    createMedicalCare,
    findMedicalCare, findMedicalCares,
    findNurseMedicalCares,
    findPatientMedicalCares,
} from "../../api/medical-care";

export const useFindPatientMedicalCares = (patientUserId, size?, page?) => {
    return useQuery(["medical-cares", patientUserId, {size, page}], findPatientMedicalCares, {
        enabled: !!patientUserId
    })
}

export const useFindNurseMedicalCares = (nurseUserId, size, page) => {
    return useQuery(["medical-cares", nurseUserId, {size, page}], findNurseMedicalCares, {
        enabled: !!nurseUserId
    })
}

export const useFindMedicalCares = (hospitalId, size, page) => {
    return useQuery(["medical-cares", hospitalId, {size, page}], findMedicalCares, {
        enabled: !!hospitalId
    })
}

export const useFindMedicalCare = (id: string) => {
    return useQuery(["medical-cares", id], findMedicalCare, {
        enabled: !!id
    })
}

export const useCreateMedicalCare = () => {
    return useMutation((medicalCare: IMedicalCareCreate) => createMedicalCare(medicalCare))
}