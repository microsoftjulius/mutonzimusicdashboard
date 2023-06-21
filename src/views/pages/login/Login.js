import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'
import backgroundImage from '../../../assets/images/banner.jpeg' // Replace with the actual path to your image

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserName = (event) => {
    setUsername(event.target.value)
  }

  const handleUserPassword = (event) => {
    setPassword(event.target.value)
  }

  function loginUser() {
    if (username === '' || password === '') {
      swal('Oops!', 'All Fields are required!', 'error')
      return
    }

    fetch(utils.url + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          localStorage.setItem('userToken', JSON.stringify(json.token))
          localStorage.setItem('userData', JSON.stringify(json.user))
          window.location.href = '/#/dashboard'
        } else {
          swal({
            title: 'Authentication Failed',
            text: 'Invalid login credentials. Please try again.',
            icon: 'error',
            dangerMode: true,
          })
        }
      })
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(128, 0, 128, 0.6)', // Purple color overlay
        }}
      ></div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleUserName}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleUserPassword}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="button" className="px-4" onClick={loginUser}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
