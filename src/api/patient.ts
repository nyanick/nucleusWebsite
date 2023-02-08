import axios from "./axios";
import {apiRoutes} from "../constants";
import {IPatient} from "../types/patient";
import {IDoctor} from "../types/doctor";

export const findPatientByUserId = async ({queryKey}) => {
    const {data} = await axios.get<IPatient>(`${apiRoutes.PATIENTS}/user/${queryKey[1]}`);
    return data;
}

export const findPatientByPatientId = async ({queryKey}) => {
    const {data} = await axios.get<IPatient>(`${apiRoutes.PATIENTS}/${queryKey[1]}`);
    return data;
}

export const findPatientsByHospitalId = async ({queryKey}) => {
    const {data} = await axios.get<IPatient[]>(`${apiRoutes.PATIENTS}/hospitals/${queryKey[1]}`);
    return data;
}
