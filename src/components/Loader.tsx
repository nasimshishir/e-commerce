"use client"
import React from 'react'

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-10 w-10">
            <div className="animate-spin rounded-full h-6 w-6 bg-gray-200 border border-gray-400"></div>
        </div>
    )
}

export default Loader