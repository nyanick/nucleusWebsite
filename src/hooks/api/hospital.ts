import {useQuery} from "react-query";
import {findHospitalsByIds, getHospital, getHospitalsByDoctorUserId} from "../../api/hospital";

export const useFindDoctorHospitals = (isDoctor, userId) => {
    return useQuery(["hospitals", userId], getHospitalsByDoctorUserId, {
        enabled: isDoctor && !!userId
    })
}

export const useGetHospital = (hospitalId: string) => {
    return useQuery(["hospitals", hospitalId], getHospital, {
        enabled: !!hospitalId
    })
}

export const useFindHospitalsByIds = (ids: string) => {
    return useQuery(["hospitals", ids], findHospitalsByIds, {
        enabled: !!ids
    })
}
