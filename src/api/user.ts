import {apiRoutes} from "../constants";
import axios from "./axios";
import {IUser} from "../types/user";
import React, {useEffect, useState} from "react";


export const findUser = async ({queryKey}) => {
    const {data} = await axios.get<IUser>(`${apiRoutes.USERS}/${queryKey[1]}`);
    return data;
}

export const findUsersByIds = async ({queryKey}) => {
    const {data} = await axios.get<IUser[]>(`${apiRoutes.USERS}/byUserIds`, {
        params: {userIds: queryKey[1]}
    });
    return data;
}
