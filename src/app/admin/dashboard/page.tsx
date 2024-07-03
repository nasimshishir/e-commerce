"use client"
import ProductRow from "@/components/admin-panel/ProductRow"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Product } from "@/lib/types/types"
import { setLoading } from "@/redux/features/loadingSlice"
import { useAppDispatch } from "@/redux/hooks"
import axios from "axios"
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [updateTable, setUpdateTable] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        axios
            .get("/api/get_products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
            .finally(() => dispatch(setLoading(false)))

    }, [updateTable])
    return (
        <div className="">
            <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">


            </div>

        </div >
    )
}

export default Dashboard