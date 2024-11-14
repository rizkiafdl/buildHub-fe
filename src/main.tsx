import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Ideas from '@/pages/Ideas'
import Dummy from '@/pages/Dummy'
import Menu from './pages/Menu'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dummy />
  },
  {
    path: "/ideas",
    element: <Ideas />
  },
  {
    element: <Menu />,
    path: "/menu"
  },
  {
    element: <Dummy />,
    path: "/about"
  },
  {
    element: <Dummy />,
    path: "/services"
  },
  {
    element: <Ideas />,
    path: "/ideas"
  },
  {
    element: <Dummy />,
    path: "/careers"
  },
  {
    element: <Dummy />,
    path: "/contact"
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
