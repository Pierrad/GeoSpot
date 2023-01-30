import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateSpot from './pages/spot/CreateSpot'
import CreatedSpot from './pages/spot/CreatedSpot'
import DiscoveredSpot from './pages/spot/DiscoveredSpot'
import Explore from './pages/Explore'
import { appTheme } from './themes/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/create',
    element: <CreateSpot />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/created/:id',
    element: <CreatedSpot />,
  },
  {
    path: '/discovered/:id',
    element: <DiscoveredSpot />,
  },
])

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
