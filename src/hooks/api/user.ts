import {useQuery} from "react-query";
import {findUser, findUsersByIds} from "../../api/user";

export const useFindUser = (id: string) => {
    return useQuery(["users", id], findUser, {
        enabled: !!id
    })
}

export const useFindUsersByIds = (ids: string) => {
    return useQuery(["users", ids], findUsersByIds, {
        enabled: !!ids
    })
}
