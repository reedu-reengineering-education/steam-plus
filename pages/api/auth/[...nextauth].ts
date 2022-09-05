import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import FusionAuthProvider from 'next-auth/providers/fusionauth'
import NextAuth from 'next-auth'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    FusionAuthProvider({
      id: 'fusionauth',
      name: 'FusionAuth',
      issuer: process.env.FUSIONAUTH_ISSUER,
      clientId: process.env.FUSIONAUTH_CLIENT_ID || '',
      clientSecret: process.env.FUSIONAUTH_SECRET || '',
      tenantId: process.env.FUSIONAUTH_TENANT_ID, // Only required if you're using multi-tenancy
    }),
  ],
  session: {
    strategy: 'jwt',
  },
})
