Spinner
import { Spinner } from '@nextui-org/react'
import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black  bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
                <Spinner size="lg" />
                <p className="mt-4 text-white">Downloading...</p>
            </div>
        </div>
    )
}

export default Loader