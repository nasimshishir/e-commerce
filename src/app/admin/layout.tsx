"use client";
import Login from "@/components/admin-panel/Login";
import { useAppSelector } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import React from 'react'
import Sidebar from "@/components/admin-panel/Sidebar";
import Loader from "@/components/Loader";
import Popup from "@/components/Popup";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    const isLoading = useAppSelector(store => store.loadingReducer)
    const popup = useAppSelector(store => store.popupReducer)
    // const { data: session } = useSession()

    // if (!session?.user) {
    //     return (
    //         <Login />
    //     )
    // }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-full">
                {/* <Navbar/> */}
                <div className="bg-gray-200 p-4 h-[calc(100vh-64px)]">
                    {children}
                </div>
            </div>
            {isLoading && <Loader />}
            {popup.isVisible && <Popup />}
        </div>
    )
}

export default AdminLayout;