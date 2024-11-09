'use server'
import { db } from '@/public/utils/db'
import { redirect } from 'next/navigation'
import 'server-only'
interface RegisterFormData {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  repassword?: string
}
export async function registerAction(
  currentState: unknown,
  formData: FormData
) {
  //get data from form
  const data: RegisterFormData = {
    firstName: formData.get('firstName')?.toString(),
    lastName: formData.get('lastName')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    repassword: formData.get('repassword')?.toString()
  }
  console.log(data)

  db.push(data)
  redirect('/login')
  //validate
  //if validation error then return validation message else redirect to login page

  //send data to db

  //redirect to login

  return 'validationMessages'
}
