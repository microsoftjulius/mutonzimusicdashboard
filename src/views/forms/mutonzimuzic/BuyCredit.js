import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

import { DocsExample } from 'src/components'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'

const BuyCredit = () => {
  const [creditAmount, setCreditAmount] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  function handleCreditAmount(event) {
    setCreditAmount(event.target.value)
  }
  function handlePhoneNumber(event) {
    setPhoneNumber(event.target.value)
  }
  function initiateCredit() {
    if (creditAmount < 3000) {
      swal({
        title: 'Amount Error',
        text: 'Amount should not be less that 3000',
        icon: 'error',
        dangerMode: true,
      })
    } else {
      fetch(utils.url + 'transactions', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
          amount: creditAmount,
          created_by: JSON.parse(localStorage.getItem('userData')).id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.message === 'Wait for the previous transaction to finish and try again.') {
            swal({
              title: 'Initiation Failed',
              text: 'Wait for the previous transaction to finish and try again.',
              icon: 'warning',
              dangerMode: true,
            })
          } else {
            if (json.errors) {
              swal({
                title: 'Initiation Failed',
                text: 'An error occured, Confirm your phone number and the amount should be greater than 3000',
                icon: 'error',
                dangerMode: true,
              })
            } else {
              swal({
                title: 'A prompt has been sent to your phone',
                text: 'Your message has been sent successfully.',
                icon: 'success',
                dangerMode: true,
              })
            }
          }
        })
    }
  }
  return (
    <CRow>
      <CCol xs={3}></CCol>
      <CCol xs={6}>
        <CCard className="row mb-4">
          <CCardHeader>
            <strong>Buy Credit</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample>
              <CForm>
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <CFormInput className="form-control" onChange={handleCreditAmount} />
                <CFormLabel htmlFor="amount" className="mt-2">
                  Phone Number
                </CFormLabel>
                <CFormInput className="form-control" onChange={handlePhoneNumber} />
                <CButton className="mt-2" onClick={initiateCredit}>
                  Buy Credit
                </CButton>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={3}></CCol>
    </CRow>
  )
}

export default BuyCredit
