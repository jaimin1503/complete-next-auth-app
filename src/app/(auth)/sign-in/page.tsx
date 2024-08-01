// 'use client'

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useDebounceValue } from "usehooks-ts"
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"
// import axios from "axios"
// import { ApiResponse } from "@/types/apiResponse"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Loader2 } from "lucide-react"

// const page = () => {

// 	const [username, setUsername] = useState('')
// 	const [usernameMessage, setUsernameMessage] = useState('')
// 	const [isCheckingUsername, setIsCheckingUsername] = useState(false)
// 	const [isSubmitting, setIsSubmitting] = useState(false)
// 	const debouncedUsername = useDebounceValue(username, 300)
// 	const { toast } = useToast()
// 	const router = useRouter()

// 	//zod implementation

// 	const form = useForm<z.infer<typeof signUpSchema>>({
// 		resolver: zodResolver(signUpSchema),
// 		defaultValues: {
// 			username: '',
// 			email: '',
// 			password: ''
// 		}
// 	})

// 	//to-do check username unique
// 	useEffect(() => {
// 		const checkUsernameUnique = async () => {
// 			if (debouncedUsername) {
// 				setIsCheckingUsername(true)
// 				setUsernameMessage('')
// 				try {
// 					const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
// 					setUsernameMessage(response.data.message)
// 				} catch (error) {
// 					console.error(error)
// 					setUsernameMessage("Axios Error")
// 				}
// 				finally {
// 					setIsCheckingUsername(false)
// 				}
// 			}
// 		}
// 		checkUsernameUnique()
// 	}, [debouncedUsername])

// 	const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
// 		setIsSubmitting(true)
// 		try {
// 			const response = await axios.post<ApiResponse>('/api/sign-up', data)
// 			toast({
// 				title: "Success",
// 				description: response.data.message

// 			})
// 			router.replace(`/verify/${username}`)
// 			setIsSubmitting(false)
// 		} catch (error) {
// 			console.error("Error signing up user", error)
// 			toast({
// 				title: "Signup Failed",
// 				description: "Error while signing up",
// 				variant: 'destructive'
// 			})
// 			setIsSubmitting(false)
// 		}
// 	}

// 	return (
// 		<div className=" flex justify-center items-center min-h-screen bg-gray-100">
// 			<div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
// 				<div className=" text-center">
// 					<h1 className=" text-4xl font-extrabold lg:text-5xl mb-6">Join our company</h1>
// 					<p className=" mb-4">Sign up to start</p>
// 				</div>
// 				<Form {...form}>
// 					<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
// 						<FormField
// 							name="username"
// 							control={form.control}
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Username</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Username" {...field}
// 											onChange={(e) => {
// 												field.onChange(e)
// 												setUsername(e.target.value)
// 											}} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							name="email"
// 							control={form.control}
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Email</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Username" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							name="password"
// 							control={form.control}
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Password</FormLabel>
// 									<FormControl>
// 										<Input type="password" placeholder="Password" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<Button type="submit" disabled={isSubmitting}>
// 							{
// 								isSubmitting ? (
// 									<>
// 										<Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please wait</>
// 								) : ('Signup')
// 							}
// 						</Button>
// 					</form>
// 				</Form>
// 				<div className=" text-center mt-4">
// 					<p>
// 						Already a member?
// 						<Link href="/sign-in" className=" text-blue-600 hover:text-blue-800">Sign in</Link>
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
// export default page