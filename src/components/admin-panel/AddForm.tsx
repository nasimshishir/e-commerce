"use client"
import { Product } from "@/lib/types/types"
import { setLoading } from "@/redux/features/loadingSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from "@/components/ui/use-toast"
import { closePopup } from "@/redux/features/popupSlice"
import Image from "next/image"
import { UploadButton } from "@/utils/uploadthing"
interface EditPopupProps {
    setUpdateTable: Dispatch<SetStateAction<boolean>>

}

const AddForm = ({ setUpdateTable }: EditPopupProps) => {
    const [img, setImg] = useState<string | null>(null)
    const { toast } = useToast()

    const { _id, category, fileKey, imgSrc, name, price }: Product = useAppSelector((state) => state.productReducer)
    const dispatch = useAppDispatch()

    const formSchema = z.object({
        name: z.string(),
        category: z.string(),
        price: z.string(),
        imgSrc: z.string().nullable(),
        fileKey: z.string().nullable()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            category: "",
            price: "",
            imgSrc: "",
            fileKey: ""
        }
    })

    const submit = (data: z.infer<typeof formSchema>) => {
        console.log(data);

        dispatch(setLoading(true))
        axios
            .post(`/api/add_product`, data)
            .then((res) => {
                setImg(null)
                toast({
                    description: "Product Added successfully"
                }),
                    setUpdateTable((prv) => !prv)
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoading(false))
                dispatch(closePopup())
            })
    }

    return (
        <Form {...form}>

            <form className='flex flex-col gap-6 p-10' onSubmit={form.handleSubmit(submit)}>
                <h3 className='text-4xl text-center'>Add Product</h3>
                <p className='text-white/60 text-center'>Get in Touch to Start Your Next Project.</p>

                <Image
                    className="max-h-[300px] w-auto object-contain rounded-md"
                    src={img ? img : "/placeholder.webp"}
                    alt="uploaded_image"
                    width={800}
                    height={500}
                />
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setImg(res[0]?.url)
                        form.setValue("imgSrc", res[0]?.url)
                        form.setValue("fileKey", res[0].key)
                    }}
                    onUploadError={(err: Error) => {
                        console.log(err);
                    }}
                />


                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='name' type="text" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='category' type="text" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.category?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder='price' type="text" />
                            </FormControl>
                            <FormMessage>{form.formState.errors.price?.message}</FormMessage>
                        </FormItem>
                    )}
                />


                <Button size="lg" className='w-full' type='submit'>Save</Button>
            </form>
        </Form>
    )
}

export default AddForm;