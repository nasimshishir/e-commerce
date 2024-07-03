"use client"
import { Product } from "@/lib/types/types";
import React, { Dispatch, SetStateAction } from 'react'
import { TableCell, TableRow } from "../ui/table";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/features/productSlice";
import Image from "next/image";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { closePopup, showPopup } from "@/redux/features/popupSlice";
import EditForm from "./EditForm";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { ToastAction, ToastClose } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

interface ProductRowProps {
    srNo: Number;
    setUpdateTable: Dispatch<SetStateAction<boolean>>
    product: Product
}

const ProductRow = ({ product, setUpdateTable, srNo }: ProductRowProps) => {
    const { toast } = useToast()
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setProduct(product))
        dispatch(showPopup({ content: <EditForm setUpdateTable={setUpdateTable} /> }))
    }

    const onDelete = () => {
        dispatch(closePopup())
        dispatch(setLoading(true))
        axios
            .delete("/api/uploadthing", { data: { fileKey: product.fileKey } })
            .then(res => {
                console.log(res.data);

                axios
                    .delete(`/api/delete_product/${product._id}`)
                    .then(res => {
                        setUpdateTable((prv) => !prv)
                        toast({
                            description: "Product deleted successfully"
                        })
                    })
                    .catch(err => console.log(err))
                    .finally(() => dispatch(setLoading(false)))
            })
            .catch(err => console.log(err))

    }

    const confirmDelete = () => {
        dispatch(showPopup({
            content: (
                <div className="flex flex-col gap-4 p-4">
                    <h2 className="text-2xl font-bold">Delete Product</h2>
                    <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                    <div className="flex justify-end items-center gap-2">
                        <Button onClick={() => dispatch(closePopup())}>Cancel</Button>
                        <Button className="bg-red-600" onClick={onDelete}>Delete</Button>
                    </div>
                </div>
            )
        }))
    }



    return (
        <TableRow >
            <TableCell width={100}>{srNo.toString()}</TableCell>
            <TableCell width={600}>{product.name}</TableCell>
            <TableCell >{product.category}</TableCell>
            <TableCell>$ {product.price}</TableCell>
            <TableCell>
                <Image alt={product.name} src={product.imgSrc ? product.imgSrc : "/placeholder.webp"} width={40} height={40} />
            </TableCell>
            <TableCell >
                <div className="flex items-center gap-2 text-3xl text-gray-600">
                    <RiEdit2Line className="cursor-pointer hover:text-black" onClick={onEdit} />
                    <MdDeleteForever className="cursor-pointer hover:text-red-600" onClick={confirmDelete} />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ProductRow;