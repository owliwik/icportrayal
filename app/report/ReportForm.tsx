'use client'

import { Club, clubActivitySchema } from '@/lib/types/club'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import sleep from '@/lib/sleep'

export const ReportForm = ({ clubs }: { clubs: Club[] }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof clubActivitySchema>>({
    resolver: zodResolver(clubActivitySchema),
  })

  const onSubmit = async (data: z.infer<typeof clubActivitySchema>) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      const formValue = data[key as keyof typeof data]
      if (formValue instanceof File) {
        formData.append(key, formValue)
      } else {
        formData.append(key, formValue.toString())
      }
    })

    const res = await fetch('/api/clubs/report', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      //
      return
    }

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
        <h1 className='text-2xl font-semibold'>社团活动打卡</h1>
        <p className='font-light text-gray-500'>ICCU将审核提交的活动信息</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <Autocomplete
          label='选择社团'
          isInvalid={!!errors.clubName}
          errorMessage={errors.clubName?.message}
          scrollShadowProps={{
            isEnabled: false,
          }}
          value={watch('clubName')}
          onSelectionChange={(v) => {
            if (v) {
              console.log(v)
              setValue('clubName', v.toString())
              clearErrors('clubName')
            }
          }}
        >
          {clubs
            ? clubs.map((club) => (
                <AutocompleteItem key={club.name}>{club.name}</AutocompleteItem>
              ))
            : []}
        </Autocomplete>

        <div className='flex gap-2'>
          <DatePicker
            label='活动日期'
            isInvalid={!!errors.date}
            errorMessage={errors.date?.message}
            value={watch('date')}
            onChange={(v) => {
              setValue('date', v)
              clearErrors('date')
            }}
          />

          <Input
            label='人数（大致）'
            isInvalid={!!errors.numOfMembers}
            errorMessage={errors.numOfMembers?.message}
            {...register('numOfMembers')}
          />
        </div>

        <div className='my-4'>
          <Input
            label='上传活动照片（拖拽）'
            type='file'
            isInvalid={!!errors.image}
            errorMessage={errors.image?.message}
            onChange={(v) => {
              if (v.target.files) {
                setValue('image', v.target.files[0])
                clearErrors('image')
              }
            }}
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
