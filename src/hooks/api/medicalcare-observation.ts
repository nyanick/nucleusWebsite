import {useMutation, useQuery} from "react-query";
import {createCareObservation, findCareObservation, findMedicalCareObservations, updateCareObservation} from "../../api/medicalcare-observation";
import {ICareObservation, ICareObservationCreate} from "../../types/medicalcare-observation";

export const useFindMedicalCareObservations = (medicalCareId: string) => {
    return useQuery(["medicalcare-observations", medicalCareId], findMedicalCareObservations, {
        enabled: !!medicalCareId
    })
}

export const useFindCareObservation = (id: string) => {
    return useQuery(["medicalcare-observations", id], findCareObservation, {
        enabled: !!id
    })
}

export const useCreateCareObservation = () => {
    return useMutation((observation: ICareObservationCreate) => createCareObservation(observation))
}

export const useUpdateCareObservation = () => {
    return useMutation((observation: ICareObservation) => updateCareObservation(observation))
}
