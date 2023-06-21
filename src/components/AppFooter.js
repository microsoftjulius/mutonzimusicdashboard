import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; {new Date().getFullYear()} Mutonzi Muzic.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed By </span>
        <a href="https://ntactitandbusint.com/" target="_blank" rel="noopener noreferrer">
          NtactIT
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
