import Header from './Header'
import useAuth from '../hooks/useAuth'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  useAuth()

  return (
    <div className="px-4">
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default AuthLayout
