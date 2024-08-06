import prisma from "@/lib/prisma";
import { usernameValidation } from "@/schemas/signUpSchema";
import * as z from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return new Response("No username provided", { status: 400 });
    }

    const existingVerifiedUser = await prisma.user.findUnique({
      where: { username: username, isVerified: true },
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username",
      },
      { status: 500 }
    );
  }
}
