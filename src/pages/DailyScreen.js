import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../actions/userActions'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const DailyScreen = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let cnt = 0
  const [docs, setDocs] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await axios.get('/api/v1/files/daily/show')
      setDocs(data)
    }

    fetchDocs()
  }, [])

  let getData = async (id) => {
    const data = await axios.get(`/api/v1/files/open/${id}`)
  }

  return (
    <div>
      <Card className='userInfo'>
        <h5>{userInfo.department}</h5>
        <h5>{userInfo.name}</h5>
      </Card>
      <div className='d-flex justify-content-between'>
        <Button
          className='float-right'
          color='danger'
          onClick={() => dispatch(logout())}
        >
          خروج
        </Button>
        {userInfo.department === 'admin' ? (
          <Button color='info' onClick={() => navigate('/register')}>
            تسجيل حساب
          </Button>
        ) : (
          <></>
        )}

        {userInfo.department === 'الأرشيف العام' ? (
          <Button color='success' onClick={() => navigate('/add')}>
            +
          </Button>
        ) : (
          <></>
        )}
      </div>

      <h1 className='text-center my-5'>المكاتبات اليومية</h1>
      <div className='container text-center'>
        <Table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>الملخص</th>
              <th scope='col'>اسم المكاتبة</th>
              <th scope='col'>م</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((el) => (
              <tr>
                <td style={{ width: '30%' }}>
                  {userInfo.department === 'المدير العام' ||
                  userInfo.department === 'نائب المدير العام' ||
                  userInfo.department === 'الأرشيف العام' ||
                  userInfo.department === 'سكرتير المدير العام' ? (
                    <Button color='success'>ارسال</Button>
                  ) : (
                    <></>
                  )}

                  <Button
                    color='info'
                    onClick={() => {
                      getData(el.file_no)
                      navigate(`/doc`)
                    }}
                  >
                    عرض
                  </Button>
                  {userInfo.department === 'المدير العام' ||
                  userInfo.department === ' نائب المدير العام' ? (
                    <Button
                      color='warning'
                      onClick={() => {
                        getData(el.file_no)
                        window.open('http://localhost:5000/api/v1/files/editor')
                      }}
                    >
                      تعديل
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
                <td style={{ width: '30%' }}>{el.summary}</td>
                <td style={{ width: '30%' }}>{el.orgname}</td>
                <td style={{ width: '10%' }} scope='row'>
                  {++cnt}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyScreen
