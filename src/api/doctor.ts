import axios from "./axios";
import {apiRoutes} from "../constants";
import {IDoctor} from "../types/doctor";

export const findDoctorByUserId = async ({queryKey}) => {
    const {data} = await axios.get<IDoctor>(`${apiRoutes.DOCTORS}/user/${queryKey[1]}`);
    return data;
}

export const findDoctorByDoctorId = async ({queryKey}) => {
    const {data} = await axios.get<IDoctor>(`${apiRoutes.DOCTORS}/${queryKey[1]}`);
    return data;
}
