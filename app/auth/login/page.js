import AuthForm from '@/components/auth/auth-form'

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <AuthForm mode="login" />
}
