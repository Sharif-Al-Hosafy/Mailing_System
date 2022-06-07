import React from 'react'
import { Table } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

const DailyScreen = () => {
  let navigate = useNavigate()

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <h1 className='text-center my-5'>المكاتبات اليومية</h1>
      <div className='container text-center'>
        <Table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>م</th>
              <th scope='col'>اسم المكاتبة</th>
              <th scope='col'>وقت الارسال</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => navigate('/')}>
              <th scope='row'>1</th>
              <td>placeholder name</td>
              <td>2:59PM</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyScreen
