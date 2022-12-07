import {useMutation, useQuery} from "react-query";
import {getCurrentUser, login} from "../../api/account";
import {ILogin} from "../../types/account";

export const useSignIn = () => {
    return useMutation((credentials: ILogin) => login(credentials))
}

export const useGetCurrentUser = () => {
    return useQuery("account", getCurrentUser)
}
