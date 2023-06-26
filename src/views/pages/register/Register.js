import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'
import backgroundImage from '../../../assets/images/banner.jpeg' // Replace with the actual path to your image

const Register = () => {
  const [names, setNames] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState('')
  const [password_confirm, setPasswordConfirm] = useState('')

  function handleSetName(event) {
    setNames(event.target.value)
  }
  function handleSetUserName(event) {
    setUsername(event.target.value)
  }
  function handlePersonalPhoneNumber(event) {
    setPersonalPhoneNumber(event.target.value)
  }
  function handleSetPassword(event) {
    setPassword(event.target.value)
  }
  function handleSetPasswordConfirm(event) {
    setPasswordConfirm(event.target.value)
  }
  function handleRegisterAccount() {
    if (password !== password_confirm) {
      swal({
        title: 'Account Creation Failed',
        text: 'Make sure the two passwords match.',
        icon: 'error',
        dangerMode: true,
      })
      return
    } else {
      fetch(utils.url + 'register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: names,
          username: username,
          password: password,
          personal_phone_number: personalPhoneNumber,
          password_confirmation: password_confirm,
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
              title: 'An Error Occured',
              text: 'Please Validate your data and try again.',
              icon: 'error',
              dangerMode: true,
            })
          }
        })
    }
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="First Name and Last Name"
                      autoComplete="names"
                      onChange={handleSetName}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      onChange={handleSetUserName}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Personal Phone Number"
                      autoComplete="phonenumber"
                      onChange={handlePersonalPhoneNumber}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={handleSetPassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={handleSetPasswordConfirm}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegisterAccount}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
