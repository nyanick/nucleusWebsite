import React from "react";

interface Props {
}

const Wrapper: React.FC<Props> = ({children}) => {
    return (
        <div
            className='main w-screen min-h-screen xl:max-w-screen-lg 2xl:max-w-screen-xl mx-auto bg-accent'>
            {children}
        </div>
    )
}

export default Wrapper
