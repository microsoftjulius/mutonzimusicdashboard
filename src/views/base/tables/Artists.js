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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown'

const Artists = () => {
  const [all_artists, setArtists] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})
  const [districtName, setArtist] = useState('')
  useEffect(() => {
    fetch(utils.url + 'artists', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setArtists(json.data)
        setPagination(json.pagination)
      })
  }, [])
  const setPage = (page) => {
    fetch(utils.url + 'artists?page=' + page, {
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
        setArtists(data.data)
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
  function handleArtistsAdd(event) {
    setArtist(event.target.value)
  }

  function submitArtists() {
    fetch(utils.url + 'artists', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      body: JSON.stringify({
        district_name: districtName,
        user_id: JSON.parse(localStorage.getItem('userData')).id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors && json.errors.district_name) {
          swal({
            title: 'Artist Creation Failed',
            text: 'You either have an existing district with this name or did not enter a district name',
            icon: 'warning',
            dangerMode: true,
          })
        } else {
          swal({
            title: 'Successful Operation',
            text: 'Artist Was Created Successful.',
            icon: 'success',
            dangerMode: true,
          })
        }
      })
  }

  return (
    <>
      <WidgetsDropdown />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>All Artists</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Artist Name</CTableHeaderCell>
                    <CTableHeaderCell>Created By</CTableHeaderCell>
                    <CTableHeaderCell>Options</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {all_artists ? (
                  all_artists.length > 0 ? (
                    <CTableBody>
                      {all_artists.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 400, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.district_name}
                          </CTableDataCell>
                          <CTableDataCell> {item.user?.name} </CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            <button className="btn btn-sm btn-primary">edit</button>{' '}
                            <button className="btn btn-sm btn-danger text-white">delete</button>{' '}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  ) : (
                    <div className="text-center">No data found</div>
                  )
                ) : (
                  <div className="text-center">Loading...</div>
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
                    Add Artist
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Enter A Artist</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Artist Name
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsAdd} />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                      <CButton color="primary" onClick={submitArtists}>
                        Save changes
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

export default Artists
