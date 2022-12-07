import {useMutation, useQuery} from "react-query";
import {createParameter, findMedicalCareParameters, findParameter, updateParameter} from "../../api/parameter";
import {IParameter, IParameterCreate} from "../../types/parameter";

export const useFindMedicalCareParameters = (medicalCareId: string) => {
    return useQuery(["parameters", medicalCareId], findMedicalCareParameters, {
        enabled: !!medicalCareId
    })
}

export const useFindParameter = (id: string) => {
    return useQuery(["parameters", id], findParameter, {
        enabled: !!id
    })
}

export const useCreateParameter = () => {
    return useMutation((parameter: IParameterCreate) => createParameter(parameter))
}

export const useUpdateParameter = () => {
    return useMutation((parameter: IParameter) => updateParameter(parameter))
}
