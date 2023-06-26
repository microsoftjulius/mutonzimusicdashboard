import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilMusicNote, cilAlbum, cilList, cilPeople } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Artists',
    to: '/artists',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Songs',
    to: '/songs',
    icon: <CIcon icon={cilMusicNote} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Albums',
    to: '/albums',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Featured Artists',
    to: '/featured-artists',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Upcoming Events',
    to: '/upcoming-events',
    icon: <CIcon icon={cilAlbum} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Playlists',
  //   to: '/playlist-songs',
  //   icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav
