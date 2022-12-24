import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const App = React.lazy(() => import('./App'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <React.Suspense fallback={<div>Loading...</div>}><App /></React.Suspense>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
