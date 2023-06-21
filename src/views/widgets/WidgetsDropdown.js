import React, { useState, useEffect } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import utils from 'src/components/constants/utils'
const WidgetsDropdown = () => {
  const [districts, setDistricts] = useState(0)
  const [healthyCenters, setHealthyCenters] = useState(0)
  const [numberOfMps, setNumberOfMps] = useState(0)
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
        setDistricts(json.data.number_of_districts)
        setHealthyCenters(json.data.number_of_healthy_centers)
        setNumberOfMps(json.data.number_of_members_of_parliament)
        setNumberOfUsers(json.data.number_of_users)
      })
  }, [])
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={<>{districts}</>}
          title="Number Of Songs"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>{healthyCenters}</>}
          title="Number Of Artisits"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={<>{numberOfMps}</>}
          title="Number OF Downloads"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>{numberOfMps}</>}
          title="Number OF Albums"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={<>{numberOfMps}</>}
          title="Number OF Playlists"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="secondary"
          value={<>{numberOfMps}</>}
          title="Most Played Song"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={<>{numberOfMps}</>}
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
