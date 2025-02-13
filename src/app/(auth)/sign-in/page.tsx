'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signInSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"


const page = () => {

	const [isSubmitting, setIsSubmitting] = useState(false)
	const { toast } = useToast()
	const router = useRouter()

	//zod implementation

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: '',
			password: ''
		}
	})

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		setIsSubmitting(true)
		const response = await signIn('credentials', {
			redirect: false,
			username: data.username,
			password: data.password,
		})
		console.log(response)
		if (response?.error) {
			toast({
				title: "Login failed",
				description: "Incorrect username or password",
				variant: 'destructive'
			})
		}

		if (response?.url) {
			console.log("inside")
			router.replace('/dashboard')
		}
		setIsSubmitting(false)
	}

	return (
		<div className=" flex justify-center items-center min-h-screen bg-gray-100">
			<div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
				<div className=" text-center">
					<h1 className=" text-4xl font-extrabold lg:text-5xl mb-6">Join "Company name"</h1>
					<p className=" mb-4">Sign in to get started</p>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
						<FormField
							name="username"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isSubmitting} >
							{
								isSubmitting ? (<>
									<Loader2 className=" animate-spin" />
									Please wait
								</>) : ("Sign in")
							}
						</Button>
					</form>
				</Form>
				<div className=" text-center mt-4">
					<p>
						Not a member?
						<Link href="/sign-up" className=" text-blue-600 hover:text-blue-800"> Register </Link>
					</p>
				</div>
			</div>
		</div>
	)
}
export default page