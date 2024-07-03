"use client"
import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen z-50 fixed top-0 left-0">
            <span className="loader"></span>
        </div>
    )
}

export default Loader