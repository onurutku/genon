'use client'
import React from 'react'
import Link from 'next/link'
import { LoginAction } from './loginAction'

export default function Login() {
  const [formState, formAction] = React.useActionState(LoginAction, null)
  return (
    <div className='align-center container flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg border-2 bg-white p-8 shadow-lg'>
        <h2 className='text-2xl font-semibold text-gray-900'>Sign in</h2>
        <form action={formAction} className='mt-5 space-y-4'>
          <div>
            <input
              type='text'
              name='email'
              placeholder='Email or Phone'
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
            />
          </div>

          <div className='relative'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
            />
            <a
              href='#'
              className='absolute inset-y-0 right-4 flex items-center text-sm text-blue-500'
            >
              show
            </a>
          </div>

          <div>
            <a href='#' className='text-sm text-blue-500'>
              Forgot password?
            </a>
          </div>

          <button
            type='submit'
            className='mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'
          >
            Sign in
          </button>

          <div className='my-4 flex items-center'>
            <div className='flex-grow border-t border-gray-300'></div>
            <span className='px-2 text-sm text-gray-500'>or</span>
            <div className='flex-grow border-t border-gray-300'></div>
          </div>

          <button
            type='button'
            className='flex w-full items-center justify-center space-x-2 rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-100'
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
              alt='Apple logo'
              className='h-4 w-4'
            />
            <span>Sign in with Apple</span>
          </button>
        </form>

        <p className='mt-6 text-center text-sm text-gray-500'>
          New to GenOn?{' '}
          <Link href='/register' className='font-semibold text-blue-500'>
            Join now
          </Link>
        </p>
      </div>
    </div>
  )
}
