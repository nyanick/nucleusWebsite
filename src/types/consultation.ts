export type IConsultationCreate = {
    doctorUserId: string
    patientUserId: string
    hospitalId: string
}

export type IConsultation = IConsultationCreate & {
    consultationId: string
    symptomIds?: string[]
    examIds?: string[]
    status: number
    createdAt: string
    updatedAt: string
    closedAt?: string
}
