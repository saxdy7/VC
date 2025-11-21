import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prevent Prisma initialization during build time
const createPrismaClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('PrismaClient is not supported in the browser')
  }
  
  // During build, return a mock client to prevent errors
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new Proxy({} as PrismaClient, {
      get: () => {
        throw new Error('Prisma is not available during build time')
      }
    })
  }
  
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
