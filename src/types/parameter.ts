export type IParameterCreate = {
    temperature: number
    weight: number
    height: number
    pressure: number
    diastolicPressure: number
    systolicPressure: number
    bloodGlucose: number
    fastingBloodGlucose: number
    medicalCareId: string
}

export type IParameter = IParameterCreate & {
    updatedAt?: string
    parameterId: string
}

export type IMedicalCareParameters = {
    createdAt: string
    medicalCareId: string
    nurseUserId: string
    patientUserId: string
    parameters: IParameter[]
}