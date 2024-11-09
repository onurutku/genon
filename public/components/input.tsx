'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ValidationResult } from '../helpers/validators'
interface Props {
  type: string
  name: string
  placeholder: string
  maxLength?: number
  defaultValue?: string
  validator?: (email?: string) => ValidationResult
}
export default function Input({
  type,
  name,
  placeholder,
  maxLength,
  validator
}: Props) {
  const newRef = useRef<any>(null)
  const [typeState, setTypeState] = useState<string>(type)
  const [value, setValue] = useState<string | boolean | number>()
  const onChange = (e: React.ChangeEvent<any>) => {
    setValue(e.currentTarget.value)
  }
  return (
    <>
      <div className='relative' ref={newRef}>
        <input
          type={typeState}
          name={name}
          placeholder={placeholder}
          className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
          maxLength={maxLength}
          onChange={onChange}
        />
        {type === 'password' && (
          <a
            onClick={() =>
              setTypeState(typeState === 'password' ? 'text' : 'password')
            }
            className='absolute inset-y-0 right-4 flex cursor-pointer items-center text-sm text-blue-500'
          >
            {typeState === 'password' ? 'show' : 'hide'}
          </a>
        )}
      </div>
    </>
  )
}
