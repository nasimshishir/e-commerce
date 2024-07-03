"use client"
import Image from "next/image"
import React from 'react'
import { menu } from "../../../data"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className="bg-white w-[300px] p-4 shrink-0">
            <div className="flex items-center gap-4">
                <Image src={"/ecom.svg"} alt={"Brand_logo"} width={52} height={52} />
                <h2 className="text-[20px] font-bold">Coders Express</h2>
            </div>

            <ul className="space-y-4 mt-6">
                {menu.map((item, idx) => {
                    return (
                        <Link key={idx} href={item.href} className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-accent hover:text-white ${pathname === item.href ? "bg-accent text-white" : "bg-gray-200"}`}>
                            <div className="text-xl">
                                <item.icon />
                            </div>
                            <p>{item.title}</p>
                        </Link>
                    )
                })}

            </ul>

        </div>
    )
}

export default Sidebar