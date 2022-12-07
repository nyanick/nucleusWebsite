import {useMutation, useQuery} from "react-query";
import {createCare, findCare, findMedicalCareCares, updateCare} from "../../api/care";
import {ICare, ICareCreate} from "../../types/care";

export const useFindMedicalCareCares = (medicalCareId: string) => {
    return useQuery(["cares", medicalCareId], findMedicalCareCares, {
        enabled: !!medicalCareId
    })
}

export const useFindCare = (id: string) => {
    return useQuery(["cares", id], findCare, {
        enabled: !!id
    })
}

export const useCreateCare = () => {
    return useMutation((care: ICareCreate) => createCare(care))
}

export const useUpdateCare = () => {
    return useMutation((care: ICare) => updateCare(care))
}
