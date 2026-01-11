import { Box, Flex, Text } from "@chakra-ui/react";
import Image from 'next/image';
import React from "react";

interface HeaderProps { }

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <Box
            as='header'
            bgColor='hsla(0,0%,100%,0.8)'
            position='sticky'
            top={0}
            w='100%'
            py='3'
            zIndex={101}
            boxShadow='inset 0 -1px 0 0 rgba(0,0,0,0.1)'
            backdropFilter='saturate(180%) blur(5px)'>
            <Flex
                w='100%'
                h='100%'
                minH='100%'
                maxW={['90%', '85%', '80%', '75%']}
                mx='auto'
                justifyContent='space-between'
                alignItems='center'>
                <Image 
                    width={124} 
                    height={42} 
                    alt='Logo' 
                    src='/images/logo.png'
                    unoptimized 
                />
                <a className='transition-colors bg-[#0070F3] px-3 py-2 rounded-md hover:border hover:border-[#0070F3] hover:bg-white text-white text-sm font-normal hover:text-[#0070F3]' href="/contact">Support Client</a>
            </Flex>
        </Box>
    )
}
export default Header