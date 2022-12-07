export type IPatient = {
    userId: string
    patientId: string
    hospitalId: string
    gender: string
    bloodGroup: string
    rhesusFactor: string
}

export type IPatientWithDetails = IPatient & {
    firstName: string
    lastName: string
    phoneNumber: string
    avatarId?: string
    email: string
    city: string
    country: string
}
