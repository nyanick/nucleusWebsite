import {useMutation, useQuery} from "react-query";
import {IObservation, IObservationCreate} from "../../types/observation";
import {createObservation, findObservation, getObservations, getObservationsByPatientUserId, updateObservation} from "../../api/observation";

export const useGetObservations = (consultationId, size, page) => {
    return useQuery(["observations", consultationId, {size, page}], getObservations)
}

export const useFindPatientObservations = (patientUserId, size?, page?) => {
    return useQuery(["observations", patientUserId, {size, page}], getObservationsByPatientUserId, {
        enabled: !!patientUserId
    })
}

export const useFindObservation = (id: string) => {
    return useQuery(["observations", id], findObservation, {
        enabled: !!id
    })
}

export const useCreateObservation = () => {
    return useMutation((observation: IObservationCreate) => createObservation(observation))
}

export const useUpdateObservation = () => {
    return useMutation((observation: IObservation) => updateObservation(observation))
}
