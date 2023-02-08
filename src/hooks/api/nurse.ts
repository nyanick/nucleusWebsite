import {useQuery} from "react-query";
import {findNurseByNurseId, findNurseByUserId, findNursesByHospitalId} from "../../api/nurse";

export const useFindNurseByUserId = (nurseUserId: string) => {
    return useQuery(["nurses", nurseUserId], findNurseByUserId, {
        enabled: !!nurseUserId
    })
}

export const useFindNurseByNurseId = (nurseId: string) => {
    return useQuery(["nurses", nurseId], findNurseByNurseId, {
        enabled: !!nurseId
    })
}

export const  useFindNursesByHospitalId = (hospitalId: string) => {
    return useQuery(["nurses", hospitalId], findNursesByHospitalId, {
        enabled: !!hospitalId
    })
}
