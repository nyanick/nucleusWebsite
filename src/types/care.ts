export type ICareCreate = {
    description: string
    medicalCareId: string
}

export type ICare = ICareCreate & {
    updatedAt?: string
    careId: string
}

export type IMedicalCareCares = {
    createdAt: string
    medicalCareId: string
    nurseUserId: string
    patientUserId: string
    cares: ICare[]
}
