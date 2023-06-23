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
import { info } from 'sass'

const Artists = () => {
  const [allArtists, setArtists] = useState([])
  const [allSongs, setSongs] = useState([])
  const [allGenres, setGenres] = useState([])
  const [allAlbums, setAlbums] = useState([])
  const [visible, setVisible] = useState(false)
  const [pagination, setPagination] = useState({})
  const [album_cover_image, setAlbumCoverImage] = useState('')
  const [artistId, setArtistId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [recordLabel, setRecordLabel] = useState('')
  useEffect(() => {
    const fetchSongs = fetch(utils.url + 'songs', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    const fetchArtists = fetch(utils.url + 'artists', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    const fetchGenres = fetch(utils.url + 'genre', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    const fetchAlbums = fetch(utils.url + 'albums', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    }).then((res) => res.json())
    Promise.all([fetchSongs, fetchArtists, fetchGenres, fetchAlbums, fetchAlbums])
      .then(([songsResponse, artistsResponse, genresResponse, albumsResponse]) => {
        setSongs(songsResponse.data)
        setGenres(genresResponse.data)
        setArtists(artistsResponse.data)
        setAlbums(albumsResponse.data)
        setPagination(artistsResponse.pagination)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
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
  function handleArtistAdd(event) {
    setArtistId(event.target.value)
  }
  function handleGenreAdd(event) {
    setGenreId(event.target.value)
  }
  function handleAlbumAdd(event) {
    setAlbumId(event.target.value)
  }
  function handleReleaseDateAdd(event) {
    setReleaseDate(event.target.value)
  }
  function handleAlbumRecordLableAdd(event) {
    setRecordLabel(event.target.value)
  }
  function handleAlbumCoverImage(event) {
    setAlbumCoverImage(event.target.files[0])
  }

  function submitArtists() {
    const formData = new FormData()
    formData.append('artist_id', artistId)
    formData.append('genre', genreId)
    formData.append('title', albumId)
    formData.append('release_date', releaseDate)
    formData.append('record_label', recordLabel)
    formData.append('album_cover_image', album_cover_image)
    // formData.append('user_id', JSON.parse(localStorage.getItem('userData')).id)

    fetch(utils.url + 'albums', {
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
          info(json.errors)
          swal({
            title: 'Album Creation Failed',
            text: json.message,
            icon: 'warning',
            dangerMode: true,
          })
        } else {
          swal({
            title: 'Successful Operation',
            text: 'Album Was Created Successful.',
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
            <CCardHeader>Albums</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Artist</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Record Label</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Cover Image</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Number Of Artists</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Options</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {allAlbums ? (
                  allAlbums.length > 0 ? (
                    <CTableBody>
                      {allAlbums.map((item, index) => (
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
                            {item.artist?.artist_name}{' '}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {' '}
                            {item.record_label}{' '}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <img
                              src={item.album_cover_image}
                              alt={item.record_label}
                              style={{
                                width: 60,
                                height: 60,
                              }}
                            />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {' '}
                            {item.artist_count}{' '}
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
                    Add Album
                  </button>
                  <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Enter Album Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Artist Name
                      </CFormLabel>
                      <CFormSelect value={artistId} onChange={handleArtistAdd} required>
                        <option value="">Select Artist</option>
                        {allArtists.map((artist) => (
                          <option key={artist.artist_name} value={artist.id}>
                            {artist.artist_name}
                          </option>
                        ))}
                      </CFormSelect>
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Genre
                      </CFormLabel>
                      <CFormSelect value={genreId} onChange={handleGenreAdd} required>
                        <option value="">Select Genre</option>
                        {allGenres.map((genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </CFormSelect>
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Album Title
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleAlbumAdd} />
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Record Label
                      </CFormLabel>
                      <CFormInput className="form-control" onChange={handleAlbumRecordLableAdd} />
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Album Cover Image
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        className="form-control"
                        onChange={handleAlbumCoverImage}
                      />
                      <CFormLabel htmlFor="districtName" className="mt-2">
                        Release Date
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        className="form-control"
                        onChange={handleReleaseDateAdd}
                      />
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
