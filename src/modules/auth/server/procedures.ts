import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
})

export const authRouter = createTRPCRouter({
  createAccount: baseProcedure.input(AuthCredentialsValidator).mutation(async ({ ctx, input }) => {
    console.log('Backend: createAccount procedure called with validated input:', input)
    const { db } = ctx
    try {
      await db.create({
        collection: 'users',
        data: { ...input, role: 'customer' },
      })
      console.log('Backend: User created successfully:', input.email)
      return { success: true }
    } catch (error: any) {
      console.error('Backend: Error in createAccount mutation:', error)
      // Check for Payload's validation error for unique fields
      if (error instanceof Error && error.message.includes('The following field is invalid')) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Username or email is already taken.',
        })
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create account.',
      })
    }
  }),

  logIn: baseProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ ctx, input }) => {
      console.log('Backend: logIn procedure called with validated input:', input.email)
      const { db, req } = ctx
      try {
        await db.login({
          collection: 'users',
          data: input,
          req: req,
        })
        console.log('Backend: User logged in successfully:', input.email)
        return { success: true }
      } catch (err) {
        console.error('Backend: Error in logIn mutation:', err)
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password.' })
      }
    }),

  session: baseProcedure.query(({ ctx }) => {
    return ctx.req?.user || null;
  }),
})
