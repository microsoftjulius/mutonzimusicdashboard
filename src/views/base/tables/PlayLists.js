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

const Artists = () => {
  const [all_artists, setArtists] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})
  const [districtName, setArtist] = useState('')
  useEffect(() => {
    fetch(utils.url + 'play-list', {
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
    fetch(utils.url + 'play-list?page=' + page, {
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
    fetch(utils.url + 'playlist-songs', {
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
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>PlayList Songs</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Artist</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Artist Photo</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Options</CTableHeaderCell>
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
                            style={{ width: 150, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.title}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {' '}
                            {item.description}{' '}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {' '}
                            {item.artist?.artist_name}{' '}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <img
                              src={item.artist.artist_photo}
                              alt={item.description}
                              style={{
                                width: 60,
                                height: 60,
                              }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
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
                    Add Playlist
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Enter Playlist Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Playlist title
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsAdd} />
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Description
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsAdd} />
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Artist
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
