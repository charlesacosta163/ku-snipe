import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord({
    clientId: process.env.AUTH_DISCORD_ID as string,
    clientSecret: process.env.AUTH_DISCORD_SECRET as string,
  })],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
})