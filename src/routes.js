import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Artists = React.lazy(() => import('./views/base/tables/Artists'))
const Songs = React.lazy(() => import('./views/base/tables/Songs'))
const Albums = React.lazy(() => import('./views/base/tables/Albums'))
const PlayList = React.lazy(() => import('./views/base/tables/PlayLists'))
const Users = React.lazy(() => import('./views/base/tables/Users'))

let routes = []
if (localStorage.getItem('userToken')) {
  routes = [
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/artists', name: 'Artists', element: Artists },
    { path: '/songs', name: 'Songs', element: Songs },
    { path: '/albums', name: 'Albums', element: Albums },
    { path: '/playlist-songs', name: 'PlayList', element: PlayList },
    { path: '/users', name: 'Users', element: Users },
  ]
}
export default routes
