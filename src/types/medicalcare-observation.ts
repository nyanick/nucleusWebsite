export type ICareObservationCreate = {
    description: string
    medicalCareId: string
}

export type ICareObservation = ICareObservationCreate & {
    updatedAt?: string
    observationId: string
}

export type IMedicalCareObservations = {
    createdAt: string
    medicalCareId: string
    nurseUserId: string
    patientUserId: string
    observations: ICareObservation[]
}
