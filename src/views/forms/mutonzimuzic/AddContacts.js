import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

import { DocsExample } from 'src/components'
import utils from 'src/components/constants/utils'
import swal from 'sweetalert'

const AddContacts = () => {
  const [groupsArray, setGroupsArray] = useState([])
  const [group_id, setTargetGroupId] = useState([])
  const [contacts, setContacts] = useState([])
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
  function setGroupId(event) {
    setTargetGroupId(event.target.value)
  }
  function handleSetContacts(event) {
    setContacts(event.target.value)
  }
  function submitContacts() {
    fetch(utils.url + 'contacts/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      body: JSON.stringify({
        group_id: group_id,
        phone_number: contacts,
        created_by: JSON.parse(localStorage.getItem('userData')).id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        swal({
          title: 'Contacts Saved Successfuly',
          text: 'Contacts have been saved successfully.',
          icon: 'success',
          dangerMode: true,
        })
      })
  }
  return (
    <CRow>
      <CCol xs={3}></CCol>
      <CCol xs={6}>
        <CCard className="row mb-4">
          <CCardHeader>
            <strong>Saved Contacts</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample>
              <CForm>
                <CFormLabel htmlFor="amount" className="mt-2">
                  Copy and paste contacts
                </CFormLabel>
                <CFormTextarea
                  id="exampleFormControlTextarea2"
                  rows="3"
                  onChange={handleSetContacts}
                />
                <CFormLabel htmlFor="amount">Attach To Group</CFormLabel>
                <CFormSelect className="form-control" id="groupName" onChange={setGroupId}>
                  <option value="">--Please select--</option>
                  {groupsArray.map((group) => (
                    <option value={group.id} key={group.id}>
                      {group.group_name}({group.created_by?.email})
                    </option>
                  ))}
                </CFormSelect>
                <CButton className="mt-2" onClick={submitContacts}>
                  Save Contacts
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

export default AddContacts
