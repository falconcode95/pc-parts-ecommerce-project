import { PrismaClient } from '../app/generated/prisma/client' // Matches your schema's custom output path

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL, 
  })
}

declare global {
    var prismaGlobal: PrismaClient | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
