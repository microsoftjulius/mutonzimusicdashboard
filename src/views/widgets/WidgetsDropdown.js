import React, { useState, useEffect } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import utils from 'src/components/constants/utils'
const WidgetsDropdown = () => {
  const [songs, setSongs] = useState(0)
  const [artists, setArtists] = useState(0)
  const [albums, setNumberOfAlbum] = useState(0)
  const [events, setNumberOfEvents] = useState(0)
  const [running_events, setNumberOfRunningEvents] = useState(0)
  const [playlists, setNumberOfPlayLists] = useState(0)
  const [mostPlayedSong, setMostPlayedSong] = useState(0)
  const [genres, setGenres] = useState(0)
  const [numberOfUsers, setNumberOfUsers] = useState(0)

  useEffect(() => {
    fetch(utils.url + 'statistics', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data.number_of_songs)
        setArtists(json.data.number_of_artists)
        setNumberOfAlbum(json.data.number_of_albums)
        setNumberOfPlayLists(json.data.number_of_playlists)
        setMostPlayedSong(json.data.most_played_song.title)
        setGenres(json.data.number_of_genres)
        setNumberOfUsers(json.data.number_of_users)
        setNumberOfEvents(json.data.number_of_events)
        setNumberOfRunningEvents(json.data.number_of_running_events)
      })
  }, [])
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<>{songs}</>}
          title="Number Of Songs"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>{artists}</>}
          title="Number Of Artists"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              {events} ({running_events})
            </>
          }
          title="Number Of Events (Running)"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>{albums}</>}
          title="Number Of Albums"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={<>{playlists}</>}
          title="Number Of Playlists"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="secondary"
          value={<>{mostPlayedSong}</>}
          title="Most Played Song"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>{genres}</>}
          title="Number Of Genres"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>{numberOfUsers}</>}
          title="Number of Users"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
