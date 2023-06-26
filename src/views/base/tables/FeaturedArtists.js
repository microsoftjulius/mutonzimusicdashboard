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
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'

const Artists = () => {
  const [featuredArtistsData, setFeaturedArtists] = useState([])
  const [artists, setArtists] = useState([])
  const [artistId, setArtistId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    const featuredArtists = fetch(utils.url + 'featured-artists', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    const artists = fetch(utils.url + 'artists', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    Promise.all([featuredArtists, artists])
      .then(([featuredArtists, artistsResponse]) => {
        setFeaturedArtists(featuredArtists.data)
        setArtists(artistsResponse.data)
        setPagination(artistsResponse.pagination)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const setPage = (page) => {
    fetch(utils.url + 'featured-artists?page=' + page, {
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
        setFeaturedArtists(data.data)
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

  function handleArtistAdd(event) {
    setArtistId(event.target.value)
  }

  function handlStartDateAdd(event) {
    setStartDate(event.target.value)
  }

  function handlEndDateAdd(event) {
    setEndDate(event.target.value)
  }

  function submitArtists() {
    const formData = new FormData()
    formData.append('artist_id', artistId)
    formData.append('from', startDate)
    formData.append('to', endDate)
    formData.append('user_id', JSON.parse(localStorage.getItem('userData')).id)

    fetch(utils.url + 'featured-artists', {
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
            title: 'Artist Creation Failed',
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
            <CCardHeader>Artists</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-left">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Stage Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Artist Photo</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Featured From</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Featured To</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Options</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {featuredArtistsData ? (
                  featuredArtistsData.length > 0 ? (
                    <CTableBody>
                      {featuredArtistsData.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-left">
                            {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 150, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.artist.artist_name}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">
                            {item.artist.stage_name}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">
                            <img
                              src={item.artist.artist_photo}
                              alt={item.stage_name}
                              style={{ width: 60, height: 60 }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-left">{item.from}</CTableDataCell>
                          <CTableDataCell className="text-left">{item.to}</CTableDataCell>
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
                    Feature Artist
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Feature Artist</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormSelect value={artistId} onChange={handleArtistAdd} required>
                        <option value="">Select Artist</option>
                        {artists.map((artist) => (
                          <option key={artist.artist_name} value={artist.id}>
                            {artist.artist_name}
                          </option>
                        ))}
                      </CFormSelect>
                      <CFormLabel htmlFor="stageName" className="mt-2">
                        Start Date
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        className="form-control"
                        onChange={handlStartDateAdd}
                      />
                      <CFormLabel htmlFor="artistPhoto" className="mt-2">
                        End Date
                      </CFormLabel>
                      <CFormInput type="date" className="form-control" onChange={handlEndDateAdd} />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="primary" onClick={submitArtists}>
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

export default Artists
