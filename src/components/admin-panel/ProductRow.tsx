"use client"
import { Product } from "@/lib/types/types";
import React, { Dispatch, SetStateAction } from 'react'
import { TableCell, TableRow } from "../ui/table";
import { useAppDispatch } from "@/redux/hooks";
import { setProduct } from "@/redux/features/productSlice";
import Image from "next/image";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { showPopup } from "@/redux/features/popupSlice";
import EditForm from "./EditPopup";

interface ProductRowProps {
    srNo: Number;
    setUpdateTable: Dispatch<SetStateAction<boolean>>
    product: Product
}

const ProductRow = ({ product, setUpdateTable, srNo }: ProductRowProps) => {

    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setProduct(product))
        dispatch(showPopup({ content: <EditForm setUpdateTable={setUpdateTable} /> }))
    }

    const onDelete = () => { }


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
                    <MdDeleteForever className="cursor-pointer hover:text-red-600" />
                </div>
            </TableCell>
        </TableRow>
    )
}

export default ProductRow;