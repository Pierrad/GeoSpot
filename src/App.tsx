import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import CreateSpot from './pages/spot/CreateSpot'
import CreatedSpotDetail from './pages/spot/CreatedSpotDetail'
import DiscoveredSpotDetail from './pages/spot/DiscoveredSpotDetail'
import ExploreList from './pages/explore/ExploreList'
import Explore from './pages/explore/Explore'
import Found from './pages/explore/Found'
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
    element: <ExploreList />,
  },
  {
    path: '/explore/:id',
    element: <Explore />,
  },
  {
    path: '/created/:id',
    element: <CreatedSpotDetail />,
  },
  {
    path: '/discovered/:id',
    element: <DiscoveredSpotDetail />,
  },
  {
    path: '/found/:id',
    element: <Found />,
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
