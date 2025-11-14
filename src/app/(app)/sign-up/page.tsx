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
import { Spinner } from '@/components/ui/spinner' // << IMPORT MỚI
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

// 👇 FIX: Cập nhật Zod schema với `refine`
const FormSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Hiển thị lỗi ở trường confirmPassword
  })

type FormValues = z.infer<typeof FormSchema>

export default function Page() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '', // << THÊM DEFAULT VALUE
    },
  })

  const { mutate, isPending } = trpc.auth.createAccount.useMutation({
    onSuccess: () => {
      toast.success('Account created! Please log in.')
      router.push('/sign-in')
    },
    // 👇 FIX: Cập nhật logic onError
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('Email hoặc username đã tồn tại.')
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.')
      }
    },
  })

  // 👇 FIX: Cập nhật onSubmit để lọc bỏ `confirmPassword`
  const onSubmit = (data: FormValues) => {
    // Chỉ gửi những gì backend cần
    const { confirmPassword, ...serverData } = data
    mutate(serverData)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)] p-4 md:p-8">
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Enter your details to get started.</CardDescription>
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
                        <Input
                          type="email" // << FIX: Thêm type
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="yourusername" {...field} />
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
                {/* 👇 MỚI: Thêm field "Confirm Password" */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* 👇 FIX: Thêm Spinner */}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Spinner /> : 'Create Account'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-sm">
            <p>
              Already have an account?{' '}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="hidden md:flex flex-col space-y-4">
        <Skeleton className="h-24 w-full bg-background border" />
        <Skeleton className="h-24 w-full bg-background border" />
        <Skeleton className="h-24 w-full bg-background border" />
        <Skeleton className="h-24 w-full bg-background border" />
      </div>
    </div>
  )
}