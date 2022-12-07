import {ComponentWithAs, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import React, {InputHTMLAttributes} from "react";
import {useField} from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label?: string,
    textarea?: boolean
}

const InputField: React.FC<InputFieldProps> = ({label, textarea, size, ...props}) => {

    let InputOrTextarea: ComponentWithAs<'input'> = Input
    if (textarea) {
        InputOrTextarea = Textarea
    }

    const [field, {error}] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
            {label ? <FormLabel className='text-gray-600 !font-normal text-sm' htmlFor={field.name}>{label}</FormLabel> : null}
            <InputOrTextarea {...field} {...props} id={field.name}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export default InputField