export type IMedicalCareCreate = {
    nurseUserId: string
    patientUserId: string
    hospitalId: string
}

export type IMedicalCare = IMedicalCareCreate & {
    medicalCareId: string
    createdAt: string
    updatedAt: string
}
