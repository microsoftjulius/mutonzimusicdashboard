import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormCheck,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

import { DocsExample } from 'src/components'
import utils from 'src/components/constants/utils'
import swal from 'sweetalert'

const SendMessage = () => {
  const [selectedRadio, setSelectedRadio] = useState('')
  const [contactsInputsValue, setContactsInputValue] = useState('')
  const [messageInputValue, setMessageInputValue] = useState('')
  const [groupsArray, setGroupsArray] = useState([])
  const [checkedItems, setCheckedItems] = useState({})
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value)
  }

  function countChars() {
    const textarea = document.getElementById('toSend')
    const count = document.getElementById('charCount')
    let toConcatenate = ''
    const charCount = parseInt(count.textContent)
    if (charCount < 160) {
      toConcatenate = ' - 1 Message'
    } else if (charCount < 320) {
      toConcatenate = ' - 2 Messages'
    } else if (charCount < 480) {
      toConcatenate = ' - 3 Messages'
    } else if (charCount < 640) {
      toConcatenate = ' - 4 Messages'
    }
    count.textContent = textarea.value.length + toConcatenate
    setMessageInputValue(textarea.value)
  }

  function handleContactsInput() {
    const contactsInput = document.getElementById('contactsInput').value
    setContactsInputValue(contactsInput)
  }

  useEffect(() => {
    fetch(utils.url + 'contacts-group/' + JSON.parse(localStorage.getItem('userData')).id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setGroupsArray(json.data)
      })
  }, [])

  function handleSendMessage() {
    fetch(utils.url + 'messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      body: JSON.stringify({
        contact: contactsInputsValue,
        message_content: messageInputValue,
        created_by: JSON.parse(localStorage.getItem('userData')).id,
        group_id: checkedItems,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          swal({
            title: 'Message Sending Failed',
            text: 'The groups or contacts are required, Message body is required',
            icon: 'error',
            dangerMode: true,
          })
        } else {
          swal({
            title: 'Message Sending Successful',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            dangerMode: true,
          })
        }
      })
  }

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    })
  }
  return (
    <CRow>
      <CCol xs={3}></CCol>
      <CCol xs={6}>
        <CCard className="row mb-4">
          <CCardHeader>
            <strong>To send a message, select an option and proceed</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample>
              <CForm>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="messageType"
                      value="type1"
                      checked={selectedRadio === 'type1'}
                      onChange={handleRadioChange}
                    />
                    <CFormLabel htmlFor="exampleFormControlTextarea1">
                      Copy and Paste Contacts
                    </CFormLabel>
                  </div>
                  {selectedRadio === 'type1' && (
                    <>
                      <CFormLabel htmlFor="exampleFormControlTextarea2" className="text-primary">
                        Copy and Paste comma separated numbers
                      </CFormLabel>
                      <CFormTextarea
                        id="contactsInput"
                        rows="3"
                        onChange={handleContactsInput}
                        required
                      />
                      <CFormLabel htmlFor="exampleFormControlTextarea2" className="text-primary">
                        Message
                      </CFormLabel>
                      <CFormTextarea
                        id="toSend"
                        rows="3"
                        onInput={countChars}
                        maxLength={640}
                        required
                      />
                      <div className="row">
                        <span className="mt-2 text-danger">
                          Character count: <span id="charCount">0</span>
                        </span>
                      </div>
                      <CButton className="mt-2" onClick={handleSendMessage}>
                        Send Message
                      </CButton>
                    </>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="messageType"
                      value="type2"
                      checked={selectedRadio === 'type2'}
                      onChange={handleRadioChange}
                    />
                    <CFormLabel htmlFor="exampleFormControlTextarea2">Send To Groups</CFormLabel>
                  </div>
                  {selectedRadio === 'type2' ? (
                    <>
                      <CFormLabel htmlFor="exampleFormControlTextarea2">
                        <span className="text-primary">Select One or More Groups</span>
                      </CFormLabel>
                      {groupsArray.map((group) => (
                        <CFormCheck
                          type="checkbox"
                          key={group.id}
                          name={group.id}
                          label={group.group_name}
                          checked={checkedItems[group.id] || false}
                          onChange={handleChange}
                        />
                      ))}
                      <CFormLabel htmlFor="exampleFormControlTextarea2" className="text-primary">
                        Message
                      </CFormLabel>
                      <CFormTextarea id="toSend" rows="3" onInput={countChars} maxLength={480} />
                      <div className="row">
                        <span className="mt-2 text-danger">
                          Character count: <span id="charCount">0</span>
                        </span>
                      </div>
                      <CButton className="mt-2" onClick={handleSendMessage}>
                        Send Message
                      </CButton>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={3}></CCol>
    </CRow>
  )
}

export default SendMessage
