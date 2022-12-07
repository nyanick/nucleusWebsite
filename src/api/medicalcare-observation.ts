import axios from "./axios";
import {apiRoutes} from "../constants";
import {ICareObservation, ICareObservationCreate} from "../types/medicalcare-observation";

export const findMedicalCareObservations = async ({queryKey}) => {
    const {data} = await axios.get<ICareObservation[]>(`${apiRoutes.NURSES}/observations/medical-cares/${queryKey[1]}`);
    return data;
}

export const findCareObservation = async ({queryKey}) => {
    const {data} = await axios.get<ICareObservation>(`${apiRoutes.NURSES}/observations/${queryKey[1]}`);
    return data;
}

export const createCareObservation = async (observation: ICareObservationCreate) => {
    const {data} = await axios.post<ICareObservation>(`${apiRoutes.NURSES}/observations`, observation);
    return data;
}

export const updateCareObservation = async (observation: ICareObservation) => {
    const {data} = await axios.put<ICareObservation>(`${apiRoutes.NURSES}/observations`, observation);
    return data;
}
