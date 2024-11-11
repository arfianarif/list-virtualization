import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { NuqsAdapter } from 'nuqs/adapters/react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  </StrictMode>,
)
