import axios from "./axios";
import {apiRoutes} from "../constants";
import {IHospital} from "../types/hospital";
import {IUser} from "../types/user";

export const getHospitalsByDoctorUserId = async ({queryKey}) => {
    const {data} = await axios.get<IHospital[]>(`${apiRoutes.DOCTORS}/user/${queryKey[1]}/hospitals`);
    return data;
}

export const getHospital = async ({queryKey}) => {
    const {data} = await axios.get<IHospital>(`${apiRoutes.HOSPITALS}/${queryKey[1]}`);
    return data;
}

export const getAdminHospitalByUserID = async ({queryKey}) => {
    const {data} = await axios.get<IHospital>(`${apiRoutes.HOSPITALS}/getHospitalByManagedId/${queryKey[1]}`);
    return data;
}

export const findHospitalsByIds = async ({queryKey}) => {
    const {data} = await axios.get<IHospital[]>(`${apiRoutes.HOSPITALS}/byHospitalIds`, {
        params: {hospitalIds: queryKey[1]}
    });
    return data;
}
