import {extendTheme, ThemeConfig} from "@chakra-ui/react"

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    styles: {
        global: {
            "*:focus": {
                boxShadow: 'none!important'
            }
        },
    },
    colors: {
        white: '#f3f2ef'
    }
})

export default theme