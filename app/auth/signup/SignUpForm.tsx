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

const signUpSchema = z
  .object({
    nickname: z.string().min(1, '请输入昵称').max(8, '昵称最多8位'),
    email: z.string().min(1, '请输入邮箱').email('请检查邮箱格式'),
    password: z
      .string({ message: '请设置一个密码' })
      .min(6, '密码长度不小于6位')
      .max(64, '密码长度不大于64位'),
    confirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm
    },
    { message: '密码和确认密码不一致', path: ['confirm'] }
  )

interface SignUpSchema extends z.infer<typeof signUpSchema> {}

export default function SignUpForm() {
  const [success, setSuccess] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (formData: SignUpSchema) => {
    console.log(formData)
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          display_name: formData.nickname,
        },
      },
    })

    if (data.user?.identities && !data.user.identities.length) {
      toast({
        title: '你的邮箱已经注册😢',
        variant: 'destructive',
        duration: 3000,
      })
    } else if (error) {
      toast({
        title: error.message,
        variant: 'destructive',
        duration: 3000,
      })
    } else {
      console.log(data.user)
      setSuccess(true)
    }
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      {success && (
        <SuccessMask>
          <div className='flex flex-col items-center'>
            <div>提交成功！请查看邮箱并点击确认链接</div>
            <div>（别忘了查看垃圾邮件！）</div>
          </div>
        </SuccessMask>
      )}

      <div className='flex m-4 md:w-[50rem] w-[25rem] bg-white rounded-xl shadow-2xl overflow-hidden'>
        {/* Left half - Background */}
        <div className='hidden w-1/2 from-primary md:block'>
          <img
            src='/auth-bg.jpg'
            alt='A background'
            className='w-full h-full object-fit'
          />
        </div>

        {/* Right half - Form */}
        <div className='w-full md:w-1/2 p-12 pb-10 flex items-center justify-center'>
          <div className='w-full space-y-6'>
            <div className='text-left'>
              <h2 className='text-3xl font-semibold'>加入Portrayal 🙋🏻</h2>
              <p className='mt-2 text-sm text-muted-foreground'>
                建立一个账户以获得最佳体验
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2'>
                <div className='flex gap-4'>
                  <div className='space-y-1 w-[6rem]'>
                    <Label htmlFor='name'>你的名字</Label>
                    <Input
                      id='name'
                      placeholder='John Doe'
                      {...register('nickname')}
                    />
                    <div className='text-sm text-red-500'>
                      {errors.nickname?.message}
                    </div>
                  </div>

                  <div className='space-y-1 flex-1'>
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
                </div>

                <div className='space-y-1'>
                  <Label htmlFor='password'>密码</Label>
                  <Input
                    id='password'
                    type='password'
                    {...register('password')}
                  />
                  <div className='text-sm text-red-500'>
                    {errors.password?.message}
                  </div>
                </div>

                <div className='space-y-1'>
                  <Label htmlFor='confirm-password'>确认密码</Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    {...register('confirm')}
                  />
                  <div className='text-sm text-red-500'>
                    {errors.confirm?.message}
                  </div>
                </div>
              </div>

              <div className='mt-4'>
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
                  已经有账号了？
                  <a className='link-animated text-blue-600' href='/auth/login'>
                    立即登录
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
