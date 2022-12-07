import { useColorMode } from "@chakra-ui/react"
import { useEffect } from "react"

const useLightTheme = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    useEffect(() => {
        if (colorMode === 'dark')
            toggleColorMode()
    }, [colorMode, toggleColorMode])
}
export default useLightTheme