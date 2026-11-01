import AuthForm from '@/components/auth/auth-form'

export const metadata = {
  title: 'Create account',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return <AuthForm mode="signup" />
}
