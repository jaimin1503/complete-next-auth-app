import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { username: username },
    });
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "Email address is already regestrated.",
        },
        { status: 400 }
      );
    }
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken.",
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verificationCode,
          verifyCodeExpiry: expiryDate,
        },
      });
    }
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User regestrated successfully, Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error regestrating user", error);
    return Response.json(
      {
        success: false,
        message: "Error regestrating user",
      },
      {
        status: 500,
      }
    );
  }
}
