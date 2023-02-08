import {useQuery} from "react-query";
import {findDoctorByDoctorId, findDoctorByUserId, findDoctorsByHospitalId} from "../../api/doctor";
import {findUser} from "../../api/user";
import {IDoctor, IDoctorWithDetails} from "../../types/doctor";
import axios from "../../api/axios";
import {apiRoutes} from "../../constants";

export const useFindDoctorByUserId = (doctorUserId: string) => {
    return useQuery(["doctors", doctorUserId], findDoctorByUserId, {
        enabled: !!doctorUserId
    })
}

export const useFindDoctorByDoctorId = (doctorId: string) => {
    return useQuery(["doctors", doctorId], findDoctorByDoctorId, {
        enabled: !!doctorId
    })
}

export const useFindDoctorWithDetails = (doctor: IDoctor) => {
    return useQuery(["doctors", doctor?.userId], findUser, {
        enabled: !!doctor,
        select: (user) => {
            return {
                ...doctor,
                ...user
            } as IDoctorWithDetails
        }
    })
}

export const  useFindDoctorsByHospitalId = (hospitalId: string) => {
    return useQuery(["hospitals", hospitalId], findDoctorsByHospitalId, {
        enabled: !!hospitalId
    })
}
