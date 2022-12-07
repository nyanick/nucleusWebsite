import axios from "./axios";
import {apiRoutes} from "../constants";
import {IConsultationPrescriptions, IPrescription, IPrescriptionCreate} from "../types/prescription";
import {IConsultationObservations} from "../types/observation";

export const getPrescriptions = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IPrescription[]>(
        `${apiRoutes.PRESCRIPTIONS}/consultation/${queryKey[1]}`,
        {params}
    );
    return {
        prescriptions: data,
        itemsCount: headers['x-total-count']
    };
}

export const getPrescriptionsByPatientId = async ({queryKey}) => {
    const params = {
        page: queryKey[2].page,
        size: queryKey[2].size
    }
    const {data, headers} = await axios.get<IConsultationPrescriptions[]>(
        `${apiRoutes.PRESCRIPTIONS}/patient/${queryKey[1]}`,
        {params}
    );
    return {
        prescriptions: data,
        itemsCount: headers['x-total-count']
    };
}


export const createPrescription = async (prescription: IPrescriptionCreate) => {
    const {data} = await axios.post<IPrescription>(apiRoutes.PRESCRIPTIONS, prescription);
    return data;
}

export const updatePrescription = async (prescription: IPrescription) => {
    const {data} = await axios.put<IPrescription>(apiRoutes.PRESCRIPTIONS, prescription);
    return data;
}
