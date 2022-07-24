import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DailyScreen = () => {
  let navigate = useNavigate()
  let cnt = 0
  const [docs, setDocs] = useState()

  useEffect(async () => {
    fetch = await axios.get('/api/v1/files/daily/show')
    setDocs(fetch.data)
  }, [])
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <Button
          className='float-right'
          color='danger'
          onClick={() => navigate('/')}
        >
          خروج
        </Button>
        <Button color='success' onClick={() => navigate('/add')}>
          +
        </Button>
      </div>

      <h1 className='text-center my-5'>المكاتبات اليومية</h1>
      <div className='container text-center'>
        <Table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>التاريخ</th>
              <th scope='col'>الملخص</th>
              <th scope='col'>اسم المكاتبة</th>
              <th scope='col'>م</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((el) => (
              <tr onClick={() => navigate('/doc')}>
                <td>{el.importdate.split('T')[0]}</td>
                <td style={{ width: '40%' }}>{el.summary}</td>
                <td style={{ width: '30%' }}>{el.orgname}</td>
                <th scope='row'>{++cnt}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyScreen
