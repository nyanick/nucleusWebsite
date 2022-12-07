import axios from "./axios";
import {apiRoutes} from "../constants";
import {IConsultation, IConsultationCreate} from "../types/consultation";

export const findPatientConsultations = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultation[]>(
        `${apiRoutes.CONSULTATIONS}/patient/${queryKey[1]}`,
        {params}
    );
    return {
        consultations: data,
        itemsCount: headers['x-total-count']
    };
}

export const findDoctorConsultations = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultation[]>(
        `${apiRoutes.CONSULTATIONS}/doctor/${queryKey[1]}`,
        {params}
    );
    return {
        consultations: data,
        itemsCount: headers['x-total-count']
    };
}

export const findConsultation = async ({queryKey}) => {
    const {data} = await axios.get<IConsultation>(`${apiRoutes.CONSULTATIONS}/${queryKey[1]}`);
    return data;
}

export const createConsultation = async (consultation: IConsultationCreate) => {
    const {data} = await axios.post<IConsultation>(apiRoutes.CONSULTATIONS, consultation);
    return data;
}

export const updateConsultation = async (consultation: IConsultation) => {
    const {data} = await axios.put<IConsultation>(apiRoutes.CONSULTATIONS, consultation);
    return data;
}

export const closeConsultation = async (consultationId) => {
    const {data} = await axios.put<void>(`${apiRoutes.CONSULTATIONS}/${consultationId}/close`);
    return data;
}
