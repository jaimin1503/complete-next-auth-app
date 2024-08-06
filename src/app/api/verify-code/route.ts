import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, code } = await request.json();
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 500 }
      );
    }

    const isCodeValid = user.verificationCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;

      return Response.json(
        {
          success: true,
          message: "User verified successfully",
        },
        { status: 201 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Your verification code has expired",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Your verification code is not correct.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 }
    );
  }
}
