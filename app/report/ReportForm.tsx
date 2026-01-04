'use client'

import { Club, clubActivitySchema } from '@/lib/types/club'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  DatePicker,
  Textarea,
} from '@nextui-org/react'
import { z } from 'zod'
import { CgSpinner } from 'react-icons/cg'
import { SuccessMask } from '@/components/success-mask'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import sleep from '@/lib/sleep'
import { supabase } from '@/lib/supabase/client'

type ClubActivitySchema = z.infer<typeof clubActivitySchema>

export const ReportForm = () => {
  const [clubs, setClubs] = useState<Club[]>()
  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.from('clubs').select('*')
      if (data) {
        setClubs(data)
      }
    }

    run()
  }, [])

  const {
    control,
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ClubActivitySchema>({
    resolver: zodResolver(clubActivitySchema),
  })

  const onSubmit = async (data: ClubActivitySchema) => {
    const formData = new FormData()

    Object.keys(data).forEach((key) => {
      const formValue = data[key as keyof typeof data]
      if (formValue instanceof File) {
        formData.append(key, formValue)
      } else {
        formData.append(key, formValue.toString())
      }
    })

    onSuccess()    
  }

  const router = useRouter()
  const onSuccess = async () => {
    setComplete(true)
    await sleep(2500)
    router.push('/clubs')
  }

  const [isComplete, setComplete] = useState(false)

  return (
    <div className='w-80 flex flex-col p-8 bg-white shadow-2xl rounded-2xl'>
      {isComplete && <SuccessMask>活动打卡成功！</SuccessMask>}

      <div className='mb-4'>
        <h1 className='text-2xl font-semibold'>社团活动打卡🏅</h1>
        <p className='font-light text-gray-500'>ICCU将审核提交的活动信息</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Controller
          name='clubName'
          control={control}
          render={({ field }) => (
            <Autocomplete
              label='选择社团'
              isInvalid={!!errors.clubName}
              errorMessage={errors.clubName?.message}
              scrollShadowProps={{
                isEnabled: false,
              }}
              value={field.value}
              onSelectionChange={(v) => {
                if (v) {
                  console.log(v)
                  field.onChange(v.toString())
                  clearErrors('clubName')
                }
              }}
            >
              {clubs
                ? clubs.map((club) => (
                    <AutocompleteItem key={club.name}>
                      {club.name}
                    </AutocompleteItem>
                  ))
                : []}
            </Autocomplete>
          )}
        />

        <div className='flex gap-2'>
          <Controller
            name='date'
            control={control}
            render={({ field }) => (
              <DatePicker
                label='活动日期'
                isInvalid={!!errors.date}
                errorMessage={errors.date?.message}
                value={field.value}
                onChange={(v) => {
                  if (v) {
                    field.onChange(v)
                    clearErrors('date')
                  }
                }}
              />
            )}
          />

          <Input
            label='人数（大致）'
            isInvalid={!!errors.numOfMembers}
            errorMessage={errors.numOfMembers?.message}
            {...register('numOfMembers')}
          />
        </div>

        <div className='my-4'>
          <Controller
            name='image'
            control={control}
            render={({ field }) => (
              <Input
                label='上传活动照片（拖拽）'
                type='file'
                isInvalid={!!errors.image}
                errorMessage={errors.image?.message}
                onChange={(v) => {
                  const file = v.target.files?.[0]
                  if (file) {
                    field.onChange(file)
                    clearErrors('image')
                  }
                }}
              />
            )}
          />
        </div>

        <Textarea
          isInvalid={!!errors.content}
          errorMessage={errors.content?.message}
          label='活动主题与内容'
          {...register('content')}
        />

        <Button
          color='primary'
          type='submit'
          onClick={() => console.log(getValues('image'))}
        >
          {isSubmitting ? (
            <CgSpinner className='text-3xl animate-spinner-linear-spin' />
          ) : (
            '提交打卡'
          )}
        </Button>
      </form>

      {/* {Object.keys(errors).map((key) => errors[key]?.message + '\n')} */}
    </div>
  )
}
