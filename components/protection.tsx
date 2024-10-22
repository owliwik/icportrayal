import { Button } from './ui/button';
import { Card, CardContent } from './ui/card'
import { LockIcon } from 'lucide-react';


export default function Protection() {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardContent className='flex flex-col items-center justify-center p-6 space-y-4'>
        <LockIcon className='w-12 h-12 text-gray-400' />
        <h2 className='text-2xl font-semibold text-center text-gray-700'>
          内容仅登录后可见🙈
        </h2>

        <div className='flex gap-4'>
          <a href='/auth/login'>
            <Button>登录Portrayal</Button>
          </a>
          <a href='/auth/signup'>
            <Button variant='outline'>注册新账号</Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
