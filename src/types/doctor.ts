import {IUser} from "./user";

export type IDoctor = {
    userId: string
    doctorId: string
    nationalOrderId: string
    specialtyId: string
    biography: string
    title: string
}

export type IDoctorWithDetails = IDoctor & IUser
