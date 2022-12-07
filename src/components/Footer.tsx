import { Box, VStack } from "@chakra-ui/react"
import React from "react";

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <Box boxShadow='inset 0 1px 0 0 rgba(0,0,0,0.1)' width='100%' py='32' bgColor='#fafafa'>
            <VStack maxW={['95%', '90%', '85%', '75%']} mx='auto'>
            </VStack>
        </Box>
    )
}
export default Footer