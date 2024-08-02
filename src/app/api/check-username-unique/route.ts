import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("No username provided", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return new Response("Username already taken", { status: 400 });
  }

  return new Response("Username is available", { status: 200 });
}
