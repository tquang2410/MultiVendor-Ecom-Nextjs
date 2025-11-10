import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { z } from 'zod'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
})

export const authRouter = createTRPCRouter({
  createAccount: baseProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const payload = await getPayload({ config: configPromise })

      await payload.create({
        collection: 'users',
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
          role: 'customer',
        },
      })

      return { success: true }
    }),
})
