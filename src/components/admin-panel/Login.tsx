'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import axios from 'axios'
import { User } from "@/lib/types/types"

const Login = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const submit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            const response = await axios.post('/api/auth/login', data)
            const user: User = response.data

        } catch { }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#27272c]">
            <Form {...form}>

                <form className='flex flex-col gap-6 p-10 rounded-xl bg-black/80' onSubmit={form.handleSubmit(submit)}>
                    <h3 className='text-4xl text-accent text-center text-white/80'>Sign In</h3>
                    <p className='text-white/60 text-center'>Get in Touch to Start Your Next Project.</p>

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Email' type="email" />
                                </FormControl>
                                <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} placeholder='Password' type="password" />
                                </FormControl>
                                <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />


                    <Button size="lg" className='w-full' type='submit'>Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login