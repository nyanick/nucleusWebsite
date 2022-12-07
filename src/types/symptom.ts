export type ISymptom = {
    symptomId: string
    name: string
}

export type ICustomSymptom = ISymptom & {
    checked: boolean
}

export type IConsultationSymptoms = {
    createdAt: string
    closedAt?: string
    consultationId: string
    doctorUserId: string
    patientUserId: string
    symptoms: string[]
}
