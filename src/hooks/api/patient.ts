import {useQuery} from "react-query";
import {findPatientByPatientId, findPatientByUserId, findPatientsByHospitalId} from "../../api/patient";
import {IPatient, IPatientWithDetails} from "../../types/patient";
import {findUser} from "../../api/user";
import {findDoctorsByHospitalId} from "../../api/doctor";

export const useFindPatientByUserId = (patientUserId: string) => {
    return useQuery(["patients", patientUserId], findPatientByUserId, {
        enabled: !!patientUserId
    })
}

export const useFindPatientByPatientId = (patientId: string) => {
    return useQuery(["patients", patientId], findPatientByPatientId, {
        enabled: !!patientId
    })
}

export const useFindPatientWithDetails = (patient: IPatient) => {
    return useQuery(["patients", patient.userId], findUser, {
        enabled: !!patient,
        select: (user) => {
            return {
                ...patient,
                ...user
            } as IPatientWithDetails
        }
    })
}

export const  useFindPatientByHospitalId = (hospitalId: string) => {
    return useQuery(["hospitals", hospitalId], findPatientsByHospitalId, {
        enabled: !!hospitalId
    })
}
