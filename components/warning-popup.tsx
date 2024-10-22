'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface WarningPopupProps {
  children: React.ReactNode
  isOpen: boolean
}

export default function WarningPopup({ children, isOpen }: WarningPopupProps) {
  return (
    <Dialog open={isOpen} >
      <AnimatePresence>
        {isOpen && (
          <DialogContent
            className='max-w-[400px] p-0 bg-transparent border-none shadow-none'
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className='bg-red-100 border-2 rounded-lg p-6 shadow-lg'
            >
              <div className='flex items-center space-x-2 text-red-600 mb-4'>
                <AlertTriangle className='h-6 w-6' />
                <h2 className='text-lg font-semibold'>Warning</h2>
              </div>
              <div className='text-red-600'>{children}</div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
