"use client"
import AddForm from "@/components/admin-panel/AddForm"
import EditPopup from "@/components/admin-panel/EditForm"
import ProductRow from "@/components/admin-panel/ProductRow"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Product } from "@/lib/types/types"
import { setLoading } from "@/redux/features/loadingSlice"
import { showPopup } from "@/redux/features/popupSlice"
import { useAppDispatch } from "@/redux/hooks"
import axios from "axios"
import React, { useEffect, useState } from 'react'
const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [updateTable, setUpdateTable] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        axios
            .get("/api/get_products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err))
            .finally(() => {
                setTimeout(() => { }, 5000)
                dispatch(setLoading(false))
            })

    }, [updateTable])

    const addProductForm = () => {
        dispatch(showPopup({ content: <AddForm setUpdateTable={setUpdateTable} /> }))
    }

    return (
        <div className="">
            <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl">All Products</h2>
                    <Button onClick={() => addProductForm()}>Add New Product</Button>
                </div>
                <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
                    <Table >
                        <TableHeader>
                            <TableRow>
                                <TableHead>SR No.</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {products.map((product: Product, idx) => (
                                <ProductRow
                                    key={product._id}
                                    srNo={idx + 1}
                                    setUpdateTable={setUpdateTable}
                                    product={product}
                                />
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Products