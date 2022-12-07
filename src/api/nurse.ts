import axios from "./axios";
import {apiRoutes} from "../constants";
import {INurse} from "../types/nurse";

export const findNurseByUserId = async ({queryKey}) => {
    const {data} = await axios.get<INurse>(`${apiRoutes.NURSES}/user/${queryKey[1]}`);
    return data;
}

export const findNurseByNurseId = async ({queryKey}) => {
    const {data} = await axios.get<INurse>(`${apiRoutes.NURSES}/${queryKey[1]}`);
    return data;
}
