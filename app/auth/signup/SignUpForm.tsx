'use client'

import React from 'react'
import { Button, Input, Link, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { Icon } from '@iconify/react'
import { SuccessMask } from '@/components/success-mask'
import { supabase } from '@/lib/supabase/client'

export function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [[page, direction], setPage] = React.useState([0, 0])
  const [isEmailValid, setIsEmailValid] = React.useState(true)
  const [isPasswordValid, setIsPasswordValid] = React.useState(true)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] =
    React.useState(true)

  const [success, setSuccess] = React.useState(false)
  const [isOpen, setOpen] = React.useState(false)

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  const titles = ['加入 Portrayal', '保护你的账户']

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleEmailSubmit = () => {
    if (!email.length) {
      setIsEmailValid(false)

      return
    }
    setIsEmailValid(true)
    paginate(1)
  }

  const handlePasswordSubmit = async () => {
    if (!password.length) {
      setIsPasswordValid(false)

      return
    }
    setIsPasswordValid(true)

    if (!confirmPassword.length || confirmPassword !== password) {
      setIsConfirmPasswordValid(false)

      return
    }
    setIsConfirmPasswordValid(true)

    //console.log(email, password)
    const response = await supabase.auth.signUp({
      email,
      password,
    })

    if (response.data) {
      if (response.data.user?.confirmation_sent_at) {
        setOpen(true)
        alert('邮箱已经注册')
      } else {
        console.log(response)
        setSuccess(true)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (page) {
      case 0:
        handleEmailSubmit()
        break
      case 1:
        handlePasswordSubmit()
        break
      default:
        break
    }
  }

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col gap-2 overflow-hidden rounded-large bg-content1 p-11 shadow-2xl'>
        {success && (
          <SuccessMask>
            <div className='flex flex-col items-center'>
              <div>提交成功！请检查邮箱中的确认链接🫡</div>
              <div>（别忘了查看垃圾邮件）</div>
            </div>
          </SuccessMask>
        )}
        <LazyMotion features={domAnimation}>
          <m.div className='flex items-center gap-2 pb-4'>
            <AnimatePresence initial={false} mode='popLayout'>
              {page >= 1 && (
                <m.div
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  initial={{ opacity: 0, x: -10 }}
                >
                  <Tooltip content='Go back' delay={3000}>
                    <Button
                      isIconOnly
                      size='sm'
                      variant='flat'
                      onPress={() => paginate(-1)}
                    >
                      <Icon
                        className='text-default-500'
                        icon='solar:alt-arrow-left-linear'
                        width={16}
                      />
                    </Button>
                  </Tooltip>
                </m.div>
              )}
            </AnimatePresence>

            <AnimatePresence custom={direction} initial={false} mode='wait'>
              <m.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                initial={{ opacity: 0, x: -100 }}
              >
                {page === 0 ? (
                  <m.div>
                    <m.div className='text-2xl font-semibold'>
                      <m.h1>{titles[0]}</m.h1>
                    </m.div>
                    <m.div className='text-md my-1 text-gray-400'>
                      已经有账户了?&nbsp;
                      <Link
                        href='/auth/login'
                        color='secondary'
                        className='text-md link-animated'
                      >
                        登录
                      </Link>
                    </m.div>
                  </m.div>
                ) : (
                  <m.div>
                    <m.h1 className='text-xl font-medium'>{titles[page]}</m.h1>
                  </m.div>
                )}
              </m.div>
            </AnimatePresence>
          </m.div>

          <AnimatePresence custom={direction} initial={false} mode='wait'>
            <m.form
              key={page}
              animate='center'
              className='flex flex-col gap-3'
              custom={direction}
              exit='exit'
              initial='enter'
              transition={{ duration: 0.2 }}
              variants={variants}
              onSubmit={handleSubmit}
            >
              {page === 0 && (
                <div className='flex flex-col gap-4'>
                  <Input
                    isRequired
                    label='你的名字'
                    name='name'
                    isInvalid={false}
                  />
                  <Input
                    isRequired
                    label='你的邮箱'
                    name='email'
                    type='email'
                    validationState={isEmailValid ? 'valid' : 'invalid'}
                    value={email}
                    onValueChange={(value) => {
                      setIsEmailValid(true)
                      setEmail(value)
                    }}
                  />
                </div>
              )}
              {page === 1 && (
                <div className='flex flex-col gap-4'>
                  <Input
                    isRequired
                    endContent={
                      <button type='button' onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? (
                          <Icon
                            className='pointer-events-none text-2xl text-default-400'
                            icon='solar:eye-closed-linear'
                          />
                        ) : (
                          <Icon
                            className='pointer-events-none text-2xl text-default-400'
                            icon='solar:eye-bold'
                          />
                        )}
                      </button>
                    }
                    label='设置一个密码'
                    name='password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    validationState={isPasswordValid ? 'valid' : 'invalid'}
                    value={password}
                    onValueChange={(value) => {
                      setIsPasswordValid(true)
                      setPassword(value)
                    }}
                  />
                  <Input
                    isRequired
                    endContent={
                      <button
                        type='button'
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {isConfirmPasswordVisible ? (
                          <Icon
                            className='pointer-events-none text-2xl text-default-400'
                            icon='solar:eye-closed-linear'
                          />
                        ) : (
                          <Icon
                            className='pointer-events-none text-2xl text-default-400'
                            icon='solar:eye-bold'
                          />
                        )}
                      </button>
                    }
                    errorMessage={
                      !isConfirmPasswordValid ? '密码不匹配' : undefined
                    }
                    label='确认密码'
                    name='confirmPassword'
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    validationState={
                      isConfirmPasswordValid ? 'valid' : 'invalid'
                    }
                    value={confirmPassword}
                    onValueChange={(value) => {
                      setIsConfirmPasswordValid(true)
                      setConfirmPassword(value)
                    }}
                  />
                </div>
              )}

              <Button fullWidth color='primary' type='submit' className='mt-2'>
                {page === 0 && '继续'}
                {page === 1 && '加入Portrayal！'}
              </Button>
            </m.form>
          </AnimatePresence>
        </LazyMotion>
      </div>
    </div>
  )
}
