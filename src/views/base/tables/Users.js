import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalculator } from '@coreui/icons'
import swal from 'sweetalert'
import utils from 'src/components/constants/utils'
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown'

const Users = () => {
  const [messages_sent_today, setMessagesSentToday] = useState([])
  const [pagination, setPagination] = useState({})
  useEffect(() => {
    fetch(utils.url + 'users', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setMessagesSentToday(json.data)
        setPagination(json.pagination)
      })
  }, [])
  const setPage = (page) => {
    fetch(utils.url + 'users?page=' + page, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')),
      },
      mode: 'cors',
      credentials: 'include',
      cache: 'no-cache',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
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
        setMessagesSentToday(data.data)
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

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>All User Accounts</CCardHeader>
            <CCardBody>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilCalculator} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Names</CTableHeaderCell>
                    <CTableHeaderCell>Username</CTableHeaderCell>
                    <CTableHeaderCell>Phone Number</CTableHeaderCell>
                    <CTableHeaderCell>Date Of Account Creation</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {messages_sent_today ? (
                  messages_sent_today.length > 0 ? (
                    <CTableBody>
                      {messages_sent_today.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 400, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.name}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 400, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.username}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 400, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {item.phone_number}
                          </CTableDataCell>
                          <CTableDataCell
                            style={{ width: 400, textAlign: 'justify' }}
                            className="text-wrap"
                          >
                            {new Date(item.created_at).toLocaleString().replace(/\//g, '-')}
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
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users
