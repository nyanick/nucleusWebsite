export type IObservationCreate = {
    description: string
    consultationId: string
}

export type IObservation = IObservationCreate & {
    updatedAt?: string
    observationId: string
}

export type IConsultationObservations = {
    createdAt: string
    closedAt?: string
    consultationId: string
    doctorUserId: string
    patientUserId: string
    observations: string[]
}
