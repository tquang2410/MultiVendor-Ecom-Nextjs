"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { trpc } from '@/trpc/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormValues = z.infer<typeof FormSchema>

export default function Page() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = trpc.auth.logIn.useMutation({
    onSuccess: () => {
      toast.success('Logged in successfully!')
      router.push('/')
      router.refresh() // Important: to make the server recognize the cookie
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onSubmit = (data: FormValues) => {
    mutate(data)
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Log In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm">
          <p>
            Dont have an account?{' '}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
