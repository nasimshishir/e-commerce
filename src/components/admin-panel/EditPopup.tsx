import { Product } from "@/lib/types/types"
import { setLoading } from "@/redux/features/loadingSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import React, { Dispatch, SetStateAction } from 'react'
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
import { IoIosCloseCircleOutline } from "react-icons/io"
import { closePopup } from "@/redux/features/popupSlice"


interface EditPopupProps {
    setUpdateTable: Dispatch<SetStateAction<boolean>>

}

const EditForm = ({ setUpdateTable }: EditPopupProps) => {
    const { toast } = useToast()

    const { _id, category, fileKey, imgSrc, name, price }: Product = useAppSelector((state) => state.productReducer)
    const dispatch = useAppDispatch()

    const formSchema = z.object({
        name: z.string(),
        category: z.string(),
        price: z.string()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,
            category,
            price
        }
    })

    const submit = (data: z.infer<typeof formSchema>) => {
        dispatch(setLoading(true))
        axios
            .put(`/api/edit_product/${_id}`, data)
            .then((res) => {
                toast({
                    description: "Product updated successfully"
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
                <h3 className='text-4xl text-center'>Edit Product</h3>
                <p className='text-white/60 text-center'>Get in Touch to Start Your Next Project.</p>

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

export default EditForm;