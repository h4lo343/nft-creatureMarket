import { ReactNode, FC } from 'react'
import {Navbar} from "../index";

<Navbar/>

interface PropsType {
    children: ReactNode
}

const BaseLayout : FC<PropsType> = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div className="py-16 bg-gray-50 overflow-hidden min-h-screen">
                <div className="max-w-7wl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BaseLayout
