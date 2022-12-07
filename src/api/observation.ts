import axios from "./axios";
import {apiRoutes} from "../constants";
import {IConsultationObservations, IObservation, IObservationCreate} from "../types/observation";

export const getObservations = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IObservation[]>(
        `${apiRoutes.OBSERVATIONS}/consultation/${queryKey[1]}`,
        {params}
    );
    return {
        observations: data,
        itemsCount: headers['x-total-count']
    };
}

export const getObservationsByPatientUserId = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultationObservations[]>(
        `${apiRoutes.OBSERVATIONS}/patient/${queryKey[1]}`,
        {params}
    );
    return {
        observations: data,
        itemsCount: headers['x-total-count']
    };
}

export const findObservation = async ({queryKey}) => {
    const {data} = await axios.get<IObservation>(`${apiRoutes.OBSERVATIONS}/${queryKey[1]}`);
    return data;
}

export const createObservation = async (observation: IObservationCreate) => {
    const {data} = await axios.post<IObservation>(apiRoutes.OBSERVATIONS, observation);
    return data;
}

export const updateObservation = async (observation: IObservation) => {
    const {data} = await axios.put<IObservation>(apiRoutes.OBSERVATIONS, observation);
    return data;
}
