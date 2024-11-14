'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ValidationResult } from '../helpers/validators'
import PasswordEye from './password-eye'
interface Props {
  type: string
  name: string
  placeholder: string
  maxLength?: number
  defaultValue?: string
  validator?: (
    isTouched: boolean,
    isDirty: boolean,
    input?: string
  ) => ValidationResult
  validStatus: (status: { name: string; isValid: boolean }) => void
  isTouchedBySubmit: boolean
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
  validator,
  validStatus,
  isTouchedBySubmit
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [typeState, setTypeState] = useState<string>(type)
  const [{ value, isTouched, isDirty }, setValue] = useState<InputValue>({
    value: '',
    isDirty: false,
    isTouched: false
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    setValue((prev: InputValue) => {
      return { ...prev, isTouched: isTouchedBySubmit }
    })
  }, [isTouchedBySubmit])

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
        isDirty: val ? true : false,
        isTouched: true
      }
    })
  }
  useEffect(() => {
    if (!validator) {
      return
    }
    setErrorMessage(validator(isTouched, isDirty, value).message!)
    validStatus({
      name: name,
      isValid: validator(isTouched, isDirty, value).status
    })
  }, [value, isDirty, isTouched, validator])

  const getEyeStatus = (eyeStatus: boolean): void => {
    eyeStatus ? setTypeState('password') : setTypeState('text')
  }
  return (
    <>
      <div className='relative'>
        <input
          ref={inputRef}
          type={typeState}
          name={name}
          placeholder={placeholder}
          className={`${errorMessage ? 'border-rose-500' : 'border-grey-300'} w-full rounded-md border px-4 py-2 ${!errorMessage ? 'focus:border-blue-500' : null} focus:outline-none`}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
        />
        {type === 'password' && <PasswordEye sendEyeStatus={getEyeStatus} />}
        <span className='ms-1 text-xs text-rose-500'>{errorMessage}</span>
      </div>
    </>
  )
}
