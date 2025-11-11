import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
})

export const authRouter = createTRPCRouter({
  createAccount: baseProcedure.input(AuthCredentialsValidator).mutation(async ({ input, ctx }) => {
    const { db } = ctx
    await db.create({
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

  logIn: baseProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ input, ctx }) => {
      const { db, req } = ctx
      try {
        await db.login({
          collection: 'users',
          data: {
            email: input.email,
            password: input.password,
          },
          req: req,
        })
        return { success: true }
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password.',
        })
      }
    }),
})