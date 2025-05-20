import { handlers } from "i/server/auth";
import { authConfig } from "i/server/auth/config";
import NextAuth from "next-auth";

const handler = NextAuth(authConfig);

export const { GET, POST } = handlers;
