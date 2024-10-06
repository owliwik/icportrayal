'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { CgSpinner } from 'react-icons/cg'
import { FaCircleCheck } from 'react-icons/fa6'
import { FaEnvelope } from 'react-icons/fa6'
import { FaLock } from 'react-icons/fa6'

import { LoginSchema, loginSchema } from '../schema'
import { useState } from 'react'
import sleep from '@/lib/sleep'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Models } from 'appwrite'
import { Profile } from '@/lib/types/profile'
import { useProfile } from '@/components/ProfileContext'
import { useLanguage } from '@/components/LanguageContext'
import { MultiLang } from '@/lib/types/lang'
import { SuccessMask } from '@/components/success-mask'

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { profile, updateProfile } = useProfile()
  const { language } = useLanguage()

  const [errMsg, setErrMsg] = useState<MultiLang>()
  const [isComplete, setComplete] = useState(false)

  const onSubmit = async ({ email, password }: LoginSchema) => {
    try {
      const sessionData = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })
      if (sessionData.status !== 200) {
        const { error } = await sessionData.json()
        setErrMsg(error)
        console.log(error)
        return
      }
      const session: Models.Session = await sessionData.json()

      const profileData = await fetch(`/api/profile`, {
        method: 'GET',
      })
      if (profileData.status !== 200) {
        const { error } = await profileData.json()
        setErrMsg(error)
        return
      }
      const profile: Profile = await profileData.json()

      updateProfile(profile)
      onSuccess()
    } catch (error: any) {
      return
    }
  }

  const router = useRouter()
  const onSuccess = async () => {
    setComplete(true)
    await sleep(1500)
    router.push('/home')
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-[20rem] p-10 bg-white rounded-2xl shadow-2xl relative'>
        {isComplete && (
          <SuccessMask>{profile?.name}，欢迎回来！</SuccessMask>
        )}

        <form onSubmit={handleSubmit(onSubmit)} onChange={() => setErrMsg(undefined)}>
          <div>
            <h1 className='text-[1.7rem] font-semibold'>欢迎回来</h1>
            <div className='text-gray-400 text-md'>
              第一次来吗？
              <Link
                href='/auth/signup'
                className='text-md link-animated text-secondary'
              >
                注册账号
              </Link>
            </div>
          </div>

          <div className='my-8 flex flex-col'>
            <div className='flex flex-col gap-4'>
              <div>
                <Input
                  label='你的邮箱'
                  isInvalid={!!errors.email}
                  endContent={
                    <FaEnvelope className='self-center p-0 my-0 mt-1 mr-2 text-2xl text-gray-400' />
                  }
                  {...register('email')}
                />
                {/* <span className='text-small text-red-500'>
                  {errors.email?.message}
                </span> */}
              </div>

              <div>
                <Input
                  type='password'
                  label='密码'
                  isInvalid={!!errors.password}
                  endContent={
                    <FaLock className='self-center p-0 my-0 mt-1 mr-2 text-2xl text-gray-400' />
                  }
                  {...register('password')}
                />
                {/* <span className='text-small text-red-500'>
                  {errors.password?.message}
                </span> */}
              </div>
            </div>

            {errMsg && (
              <div className='self-end mr-2 mb-[-0.5rem] relative top-2 text-sm text-red-500'>
                {errMsg[language]}
              </div>
            )}
          </div>

          <Button
            variant='solid'
            color='primary'
            type='submit'
            className='w-full'
          >
            {isSubmitting ? (
              <CgSpinner className='text-3xl animate-spinner-linear-spin' />
            ) : (
              '前往Portrayal！'
            )}
          </Button>

          <div className='mt-3 text-center text-gray-500'>
            <Link href='/auth/forgot' className='link-animated'>
              我忘记了密码
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
