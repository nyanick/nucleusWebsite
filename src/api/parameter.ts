import axios from "./axios";
import {apiRoutes} from "../constants";
import {IParameter, IParameterCreate} from "../types/parameter";

export const findMedicalCareParameters = async ({queryKey}) => {
    const {data} = await axios.get<IParameter[]>(`${apiRoutes.NURSES}/parameters/medical-cares/${queryKey[1]}`);
    return data;
}

export const findParameter = async ({queryKey}) => {
    const {data} = await axios.get<IParameter>(`${apiRoutes.NURSES}/parameters/${queryKey[1]}`);
    return data;
}

export const createParameter = async (parameter: IParameterCreate) => {
    const {data} = await axios.post<IParameter>(`${apiRoutes.NURSES}/parameters`, parameter);
    return data;
}

export const updateParameter = async (parameter: IParameter) => {
    const {data} = await axios.put<IParameter>(`${apiRoutes.NURSES}/parameters`, parameter);
    return data;
}
