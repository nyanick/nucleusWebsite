export type IPrescriptionCreate = {
    drug: string
    dosage: string
    duration: number
    consultationId: string
}

export type IPrescription = IPrescriptionCreate & {
    updatedAt?: string
    prescriptionId: string
}

export type IConsultationPrescriptions = {
    createdAt: string
    closedAt?: string
    consultationId: string
    doctorUserId: string
    prescriptions: IPrescription[]
}