import { me } from '../api/auth'
import { QueryKey } from '../config/keys'
import Header from './Header'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

type AuthLayoutProps = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate()
  const { error } = useQuery(QueryKey.ME, me)
  const token = localStorage.getItem('token')

  if (error || !token) {
    navigate('/signin')
  }

  return (
    <div className="px-4">
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default AuthLayout
