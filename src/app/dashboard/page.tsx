'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

const page = () => {
	return (
		<div>page
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	)
}
export default page