import {useMutation, useQuery} from "react-query";
import {IDiagnosis, IDiagnosisCreate} from "../../types/diagnosis";
import {
    createDiagnosis,
    findDiagnosis,
    findDiagnosisByHospitalId,
    getDiagnosis,
    getDiagnosisByPatientId,
    updateDiagnosis
} from "../../api/diagnosis";

export const useGetDiagnosis = (consultationId, size, page) => {
    return useQuery(["diagnosis", consultationId, {size, page}], getDiagnosis)
}

export const useFindDiagnosis = (id: string) => {
    return useQuery(["diagnosis", id], findDiagnosis, {
        enabled: !!id
    })
}

export const useFindPatientDiagnosis = (patientUserId, size?, page?) => {
    return useQuery(["diagnosis", patientUserId, {size, page}], getDiagnosisByPatientId, {
        enabled: !!patientUserId
    })
}

export const useCreateDiagnosis = () => {
    return useMutation((diagnosis: IDiagnosisCreate) => createDiagnosis(diagnosis))
}

export const useUpdateDiagnosis = () => {
    return useMutation((diagnosis: IDiagnosis) => updateDiagnosis(diagnosis))
}

export const useFindDiagnosisByHospitalId = (hospitalId: string) => {
    return useQuery(["diagnosis", hospitalId], findDiagnosisByHospitalId, {
        enabled: !!hospitalId
    })
}