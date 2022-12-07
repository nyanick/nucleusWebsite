import {useMutation, useQuery} from "react-query";
import {IPrescription, IPrescriptionCreate} from "../../types/prescription";
import {createPrescription, getPrescriptionsByPatientId, getPrescriptions, updatePrescription} from "../../api/prescription";

export const useGetPrescriptions = (consultationId, size, page) => {
    return useQuery(["prescriptions", consultationId, {size, page}], getPrescriptions)
}

export const useFindPatientPrescriptions = (patientUserId, size?, page?) => {
    return useQuery(["prescriptions", patientUserId, {size, page}], getPrescriptionsByPatientId, {
        enabled: !!patientUserId
    })
}
export const useCreatePrescription = () => {
    return useMutation((prescription: IPrescriptionCreate) => createPrescription(prescription))
}

export const useUpdatePrescription = () => {
    return useMutation((prescription: IPrescription) => updatePrescription(prescription))
}
