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

const Artists = () => {
  const [all_artists, setArtists] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})
  const [artistName, setArtistName] = useState('')
  const [artistStageName, setArtistStageName] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [artistBiography, setArtistBiography] = useState('')
  const [artistDateOfBirth, setArtistDateOfBirth] = useState('')
  const [artistNationality, setArtistNationality] = useState('')
  const [artistPlaceOfBirth, setArtistPlaceOfBirth] = useState('')

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
    setArtistName(event.target.value)
  }

  function handleArtistsStageName(event) {
    setArtistStageName(event.target.value)
  }

  function handleArtistsPhoto(event) {
    const file = event.target.files[0]
    setSelectedPhoto(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleArtistsBiography(event) {
    setArtistBiography(event.target.value)
  }

  function handleArtistsDateOfBirth(event) {
    setArtistDateOfBirth(event.target.value)
  }

  function handleArtistsNationality(event) {
    setArtistNationality(event.target.value)
  }

  function handleArtistsPlaceOfBirth(event) {
    setArtistPlaceOfBirth(event.target.value)
  }

  function submitArtists() {
    const formData = new FormData()
    formData.append('artist_name', artistName)
    formData.append('stage_name', artistStageName)
    formData.append('artist_photo', selectedPhoto)
    formData.append('biography', artistBiography)
    formData.append('date_of_birth', artistDateOfBirth)
    formData.append('nationality', artistNationality)
    formData.append('place_of_birth', artistPlaceOfBirth)
    formData.append('user_id', JSON.parse(localStorage.getItem('userData')).id)

    fetch(utils.url + 'artists', {
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
                    <CTableHeaderCell className="text-left">Nationality</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Place Of Birth</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Songs Count</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Photo</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Biography</CTableHeaderCell>
                    <CTableHeaderCell className="text-left">Options</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {all_artists ? (
                  all_artists.length > 0 ? (
                    <CTableBody>
                      {all_artists.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-left">
                            {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 150, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.artist_name}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">{item.stage_name}</CTableDataCell>
                          <CTableDataCell className="text-left">{item.nationality}</CTableDataCell>
                          <CTableDataCell className="text-left">
                            {item.place_of_birth}
                          </CTableDataCell>
                          <CTableDataCell className="text-left">{item.songs_count}</CTableDataCell>
                          <CTableDataCell className="text-left">
                            <img
                              src={item.artist_photo}
                              alt={item.stage_name}
                              style={{ width: 60, height: 60 }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-justify" style={{ width: 250 }}>
                            {item.biography}
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
                    Add Artist
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Enter Artist Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormLabel htmlFor="artistName" className="mt-2">
                        Artist Name
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsAdd} />
                      <CFormLabel htmlFor="stageName" className="mt-2">
                        Stage Name
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsStageName} />
                      <CFormLabel htmlFor="artistPhoto" className="mt-2">
                        Artist Photo
                      </CFormLabel>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleArtistsPhoto}
                        accept="image/*"
                      />
                      <CFormLabel htmlFor="artistBiography" className="mt-2">
                        Biography
                      </CFormLabel>
                      <CFormTextarea className="form-control" onChange={handleArtistsBiography} />
                      <CFormLabel htmlFor="artistDOB" className="mt-2">
                        Date Of Birth
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        className="form-control"
                        onChange={handleArtistsDateOfBirth}
                      />
                      <CFormLabel htmlFor="artistDOB" className="mt-2">
                        Nationality
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsNationality} />
                      <CFormLabel htmlFor="placeOfBirth" className="mt-2">
                        Place Of Birth
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleArtistsPlaceOfBirth} />
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
