import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from "next-auth"
import db from "@/lib/db"

// Define custom types to include 'role'
declare module "next-auth" {
    interface Session {
        user: {
            role?: string
        } & User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: string
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const email = credentials.email as string
                const password = credentials.password as string

                if (!email || !password) return null;

                // 1. Check if user exists in DB
                const user = await db.user.findUnique({
                    where: { email }
                });

                if (!user) return null;

                // 2. Verify Password (Simple check for demo, use bcrypt in production)
                // If user has no password set (from seed), allow 'password123' or their specific pass
                const dbPass = user.password || 'password123';

                if (password === dbPass) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore - user has role from authorize
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: '/login', // Custom login page
    }
})
