import axios from "./axios";
import {apiRoutes} from "../constants";
import {ICare, ICareCreate} from "../types/care";

export const findMedicalCareCares = async ({queryKey}) => {
    const {data} = await axios.get<ICare[]>(`${apiRoutes.NURSES}/cares/medical-cares/${queryKey[1]}`);
    return data;
}

export const findCare = async ({queryKey}) => {
    const {data} = await axios.get<ICare>(`${apiRoutes.NURSES}/cares/${queryKey[1]}`);
    return data;
}

export const createCare = async (care: ICareCreate) => {
    const {data} = await axios.post<ICare>(`${apiRoutes.NURSES}/cares`, care);
    return data;
}

export const updateCare = async (care: ICare) => {
    const {data} = await axios.put<ICare>(`${apiRoutes.NURSES}/cares`, care);
    return data;
}
