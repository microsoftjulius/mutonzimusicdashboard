import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormLabel,
  CButton,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'

const Eventss = () => {
  const [all_Eventss, setEventss] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})
  const [eventName, seteventName] = useState('')
  const [dateOfEvent, setdateOfEvent] = useState('')
  const [eventsPhoto, seteventsPhoto] = useState(null)
  const [EventsDescription, setEventsDescription] = useState('')

  useEffect(() => {
    fetch(utils.url + 'upcoming-events', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setEventss(json.data)
        setPagination(json.pagination)
      })
  }, [])

  const setPage = (page) => {
    fetch(utils.url + 'upcoming-events?page=' + page, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      mode: 'cors',
      credentials: 'include',
      cache: 'no-cache',
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return await response.json()
      })
      .then((data) => {
        if (data.message) {
          swal({
            title: 'An error Occured',
            text: data.message,
            icon: 'error',
            dangerMode: true,
          })
        }
        setEventss(data.data)
        setPagination(data.pagination)
      })
      .catch((error) =>
        swal({
          title: 'An error Occured',
          text: 'Too Many Requests',
          icon: 'error',
          dangerMode: true,
        }),
      )
  }

  function handleEventName(event) {
    seteventName(event.target.value)
  }

  function handleEventDateOfOccurance(event) {
    setdateOfEvent(event.target.value)
  }

  function handleEventsPhoto(event) {
    const file = event.target.files[0]
    seteventsPhoto(file)
  }

  function handleEventDescription(event) {
    setEventsDescription(event.target.value)
  }

  function submitEvents() {
    const formData = new FormData()
    formData.append('event_name', eventName)
    formData.append('date_of_event', dateOfEvent)
    formData.append('photo', eventsPhoto)
    formData.append('description', EventsDescription)
    formData.append('user_id', JSON.parse(localStorage.getItem('userData')).id)

    fetch(utils.url + 'upcoming-events', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          swal({
            title: 'Events Creation Failed',
            text: json.message,
            icon: 'warning',
            dangerMode: true,
          })
        } else {
          swal({
            title: 'Successful Operation',
            text: json.message,
            icon: 'success',
            dangerMode: true,
          })
        }
      })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Events</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-left">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Event Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Date Of Event</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Photo</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Options</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {all_Eventss ? (
                  all_Eventss.length > 0 ? (
                    <CTableBody>
                      {all_Eventss.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-left">
                            {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 150, textAlign: 'left' }}
                            className="text-wrap"
                          >
                            {item.event_name}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">
                            {item.date_of_event}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">
                            <img
                              src={item.photo}
                              alt={item.event_name}
                              style={{ width: 60, height: 60 }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-left">{item.description}</CTableDataCell>
                          <CTableDataCell
                            className={`text-left ${
                              item.status === 'running' ? 'text-success' : 'text-danger'
                            }`}
                          >
                            {item.status}
                          </CTableDataCell>
                          <CTableDataCell className="text-left" style={{ width: 150 }}>
                            <button className="btn btn-sm btn-primary">edit</button>{' '}
                            <button className="btn btn-sm btn-danger text-white">delete</button>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  ) : (
                    <div className="text-left">No data found</div>
                  )
                ) : (
                  <div className="text-left">Loading...</div>
                )}
              </CTable>
              <div className="mt-2 d-flex justify-content-between">
                <div>
                  <button
                    disabled={pagination.currentPage === 1}
                    onClick={() => setPage(pagination.currentPage - 1)}
                    className="btn btn-sm btn-primary"
                  >
                    Previous
                  </button>
                  <span>
                    {pagination.currentPage} of {pagination.lastPage}
                  </span>
                  <button
                    disabled={pagination.currentPage === pagination.lastPage}
                    onClick={() => setPage(pagination.currentPage + 1)}
                    className="btn btn-sm btn-primary"
                  >
                    Next
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setVisible(!visible)}
                    className="btn btn-sm btn-success text-white"
                  >
                    Add Event
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Enter Event Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormLabel htmlFor="eventName" className="mt-2">
                        Events Name
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleEventName} />
                      <CFormLabel htmlFor="stageName" className="mt-2">
                        Date Of Event
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        className="form-control"
                        onChange={handleEventDateOfOccurance}
                      />
                      <CFormLabel htmlFor="EventsPhoto" className="mt-2">
                        Events Photo
                      </CFormLabel>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleEventsPhoto}
                        accept="image/*"
                      />
                      <CFormLabel htmlFor="EventsDescription" className="mt-2">
                        Brief Description
                      </CFormLabel>
                      <CFormTextarea className="form-control" onChange={handleEventDescription} />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="primary" onClick={submitEvents}>
                        Submit
                      </CButton>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Eventss
