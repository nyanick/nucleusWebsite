export type IDiagnosisCreate = {
    description: string
    consultationId: string
}

export type IDiagnosis = IDiagnosisCreate & {
    updatedAt?: string
    diagnosisId: string
}

export type IConsultationDiagnosis = {
    createdAt: string
    closedAt?: string
    consultationId: string
    doctorUserId: string
    patientUserId: string
    diagnosis: string[]
}
