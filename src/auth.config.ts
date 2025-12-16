import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    providers: [], // Providers added in auth.ts
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
                // @ts-ignore
                session.user.role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
    }
} satisfies NextAuthConfig
