'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase/client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SuccessMask } from '@/components/success-mask'
import { useUser } from '@/components/context/UserContext'
import sleep from '@/lib/sleep'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z.string({ message: '请输入邮箱' }).email('请检查邮箱格式'),
  password: z.string().min(1, '请输入密码'),
})
interface LoginSchema extends z.infer<typeof loginSchema> {}

export default function LoginForm() {
  const router = useRouter()
  const { user, updateUser } = useUser()
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (formData: LoginSchema) => {
    //console.log(formData)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      if (error.code === 'invalid_credentials') {
        toast({
          title: '邮箱或密码错误😢',
          variant: 'destructive',
          duration: 3000,
        })
      } else {
        toast({
          title: '遇到了未知问题😢',
          variant: 'destructive',
          duration: 3000,
        })
      }
    } else {
      console.log(data.user)
      updateUser(data.user)

      setSuccess(true)
      await sleep(1500)
      router.back()
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='relative flex m-4 md:w-[40rem] w-[20rem] bg-white rounded-xl shadow-2xl overflow-hidden'>
        {success && (
          <SuccessMask>
            <div className='flex flex-col items-center'>
              <div>{user?.user_metadata.display_name}, 欢迎回来！</div>
            </div>
          </SuccessMask>
        )}

        {/* Right half - Form */}
        <div className='w-full md:w-1/2 p-12 pb-6 flex items-center justify-center'>
          <div className='w-full space-y-4'>
            <div className='text-left'>
              <h2 className='text-2xl font-semibold'>登录到Portrayal 🥸</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                用Portrayal账号畅享全部功能！
              </p>
            </div>

            <form className='my-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2'>
                <Label htmlFor='email'>你的邮箱</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  {...register('email')}
                />
                <div className='text-sm text-red-500'>
                  {errors.email?.message}
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>你的密码</Label>
                <Input
                  id='password'
                  type='password'
                  {...register('password')}
                />
                <div className='text-sm text-red-500'>
                  {errors.password?.message}
                </div>
              </div>

              <div className='my-4'>
                {isSubmitting ? (
                  <Button disabled className='w-full'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    正在提交...
                  </Button>
                ) : (
                  <Button type='submit' className='w-full'>
                    立即提交！
                  </Button>
                )}

                <div className='w-full my-2 flex justify-center text-slate-500'>
                  还没有账号？
                  <a
                    className='link-animated text-blue-600'
                    href='/auth/signup'
                  >
                    立即注册
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Left half - Background */}
        <div className='relative hidden w-1/2 from-primary md:block'>
          <img
            src='/auth-bg.jpg'
            alt='A background'
            className='w-full h-full object-fit absolute'
          />
          <div className='absolute z-10 w-full h-full flex justify-center items-center'></div>
        </div>
      </div>
    </div>
  )
}
