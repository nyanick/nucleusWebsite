export const toErrorMap = (errors: any) => {
    const errorMap: Record<string, string> = {}
    for (const field in errors) {
        if (field !== 'status_code' && errors.hasOwnProperty(field)) {
            errorMap[field] = errors[field][0]
        }
    }
    return errorMap
}