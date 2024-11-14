'use client'
import React, { useEffect, useState } from 'react'
import { registerAction } from './registerAction'
import Link from 'next/link'
import Input from '@/public/components/input'
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRequired
} from '@/public/helpers/validators'

export default function Register() {
  const [formState, formAction] = React.useActionState(registerAction, null)
  const [submit, setSubmit] = useState<boolean>(false)
  const [formValidation, setFormValidation] = useState<
    { name: string; isValid: boolean }[]
  >([
    { name: 'firstName', isValid: false },
    { name: 'lastName', isValid: false },
    { name: 'email', isValid: false },
    { name: 'password', isValid: false },
    { name: 'repassword', isValid: false }
  ])
  const [isFormValid, setIsFormValid] = useState<boolean>(false)

  const getValidStatus = (validStatus: { name: string; isValid: boolean }) => {
    setFormValidation((prev: { name: string; isValid: boolean }[]) => {
      prev.forEach((input: { name: string; isValid: boolean }) => {
        if (input.name === validStatus.name) {
          return (input.isValid = validStatus.isValid)
        }
      })

      return [...prev]
    })
  }
  useEffect(() => {
    console.log(formValidation)

    if (formValidation.find((input: any) => input.isValid === false)) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [formValidation])

  return (
    <div className='align-center container flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg border-2 bg-white p-8 shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-900'>Join GenOn</h2>

        <form action={formAction} className='mt-5 space-y-4'>
          <Input
            type='text'
            name='firstName'
            placeholder='First Name'
            maxLength={50}
            validator={validateRequired}
            validStatus={getValidStatus}
            isTouchedBySubmit={submit}
          />
          <Input
            type='text'
            name='lastName'
            placeholder='Last Name'
            maxLength={50}
            validator={validateRequired}
            validStatus={getValidStatus}
            isTouchedBySubmit={submit}
          />
          <Input
            type='text'
            name='email'
            placeholder='Email'
            maxLength={100}
            validator={validateEmail}
            validStatus={getValidStatus}
            isTouchedBySubmit={submit}
          />
          <Input
            type={'password'}
            name='password'
            placeholder='Password'
            validator={validatePassword}
            validStatus={getValidStatus}
            isTouchedBySubmit={submit}
          />
          <Input
            type={'password'}
            name='repassword'
            placeholder='Confirm Password'
            validator={validateConfirmPassword}
            validStatus={getValidStatus}
            isTouchedBySubmit={submit}
          />
          {!isFormValid && (
            <button
              type='button'
              onClick={() => setSubmit(true)}
              className='mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
            >
              Agree & Join
            </button>
          )}
          {isFormValid && (
            <button
              type='submit'
              className='mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
            >
              Agree & Join
            </button>
          )}
          <div className='my-4 flex items-center'>
            <div className='flex-grow border-t border-gray-300'></div>
            <span className='px-2 text-sm text-gray-500'>or</span>
            <div className='flex-grow border-t border-gray-300'></div>
          </div>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          Already on GenOn?{' '}
          <Link className='font-semibold text-blue-500' href='/login'>
            Sign In
          </Link>
        </p>
        <h1 className='text-xl text-red-500'>{formState}</h1>
      </div>
    </div>
  )
}
