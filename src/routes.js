import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

let routes = []
if (localStorage.getItem('userToken')) {
  routes = [{ path: '/dashboard', name: 'Dashboard', element: Dashboard }]
}
export default routes
