'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ValidationResult } from '../helpers/validators'
interface Props {
  type: string
  name: string
  placeholder: string
  maxLength?: number
  defaultValue?: string
  validator?: (
    isTouched: boolean,
    isDirty: boolean,
    email?: string
  ) => ValidationResult
}
interface InputValue {
  value: string
  isTouched: boolean
  isDirty: boolean
}
export default function Input({
  type,
  name,
  placeholder,
  maxLength,
  validator
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [typeState, setTypeState] = useState<string>(type)
  const [{ value, isTouched, isDirty }, setValue] = useState<InputValue>({
    value: '',
    isDirty: false,
    isTouched: false
  })

  useEffect(() => {
    let firstTimeClicked: boolean = false
    window.document.addEventListener('click', (e: MouseEvent) => {
      if (inputRef.current?.name === (e.target as HTMLInputElement).name) {
        firstTimeClicked = true
      } else {
        if (firstTimeClicked) {
          setValue((prev: InputValue) => {
            return { ...prev, isTouched: true }
          })
        }
      }
    })
    return () => {
      window.document.removeEventListener('click', () => {})
    }
  }, [])

  const onChange = (e: React.ChangeEvent<any>) => {
    const val: string = e.currentTarget.value

    setValue((prev: InputValue) => {
      return {
        ...prev,
        value: val,
        isDirty: val ? true : false
      }
    })
  }
  useEffect(() => {
    console.log(value)
    console.log(isDirty)
    console.log(isTouched)
  }, [value, isDirty, isTouched])
  return (
    <>
      <div className='relative'>
        <input
          ref={inputRef}
          type={typeState}
          name={name}
          placeholder={placeholder}
          className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
          maxLength={maxLength}
          onChange={onChange}
          value={value}
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
      <span className='text:sm text-red-500'>
        {validator ? validator(isTouched, isDirty, value).message : null}
      </span>
    </>
  )
}
