export type IExam = {
    examId: string
    categoryId: string
    name: string
}

export type ICustomExam = IExam & {
    checked: boolean
}
