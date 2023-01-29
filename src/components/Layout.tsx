import Header from './Header'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="px-4">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
