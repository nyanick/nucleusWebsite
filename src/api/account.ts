import axios from "./axios";
import {apiRoutes} from "../constants";
import {IUser} from "../types/user";
import {ILogin, ILoginResponse} from "../types/account";

export const getCurrentUser = async () => {
    const {data} = await axios.get<IUser>(`${apiRoutes.USERS}/account`);
    return data;
}

export const login = async (login: ILogin) => {
    const {data} = await axios.post<ILoginResponse>(`${apiRoutes.USERS}/login`, login);
    return data;
}
