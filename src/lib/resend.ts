import { Resend } from "resend";
import Email from "next-auth/providers/email";

export const resend = new Resend(process.env.RESEND_API_KEY);
