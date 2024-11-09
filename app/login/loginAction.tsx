'use server'
import { db } from '@/public/utils/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'
export async function LoginAction(currentState: unknown, formData: FormData) {
  const userExist = db.find(
    (user: { email: string }) => user.email === formData.get('email')
  )
  if (userExist) {
    const serverCookies = await cookies()
    serverCookies.set('Authorization', JSON.stringify(userExist), {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'strict'
    })
    redirect('/')
  }
  return <div style={{ background: 'red' }}>onur</div>
}
