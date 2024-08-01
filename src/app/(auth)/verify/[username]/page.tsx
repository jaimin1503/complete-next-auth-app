'use client'

import { useToast } from "@/components/ui/use-toast"
import * as z from "zod"
import { verifySchema } from "@/schemas/verifySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const page = () => {
	const router = useRouter()
	const params = useParams<{ username: string }>()
	const { toast } = useToast()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
		defaultValues: {

		}
	})

	const onSubmit = async (data: z.infer<typeof verifySchema>) => {
		setIsSubmitting(true)
		try {
			const response = await axios.post('/api/verify-code', {
				username: params.username,
				code: data.code
			})
			toast({
				title: "success",
				description: response.data.message
			})
			setIsSubmitting(false)
			router.replace('/sign-in')
		} catch (error) {
			console.error("Error verifying user", error)
			toast({
				title: "Verification failed",
				description: "Error while verifying user",
				variant: 'destructive'
			})
			setIsSubmitting(false)
		}
	}
	return (
		<div className=" flex justify-center items-center min-h-screen bg-gray-100">
			<div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
				<div className=" text-center">
					<h1 className=" text-4xl font-extrabold lg:text-5xl mb-6">Verify your account</h1>
					<p className=" mb-4">Enter the verification code sent to your email.</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
						<FormField
							name="code"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification code</FormLabel>
									<FormControl>
										<Input placeholder="Code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">
							{
								isSubmitting ? (<>
									<Loader2 className=" animate-spin" />
									Please wait
								</>) : ("Verify")
							}
						</Button>
					</form>
				</Form>
			</div>
		</div>

	)
}
export default page