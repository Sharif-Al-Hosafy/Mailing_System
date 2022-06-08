import React from 'react'
import { Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const DailyScreen = () => {
  let navigate = useNavigate()

  return (
    <div>
      <Button color='danger' onClick={() => navigate('/home')}>
        رجوع
      </Button>
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
            <tr onClick={() => navigate('/')}>
              <th scope='row'>2</th>
              <td>placeholder name</td>
              <td>12:25PM</td>
            </tr>
            <tr onClick={() => navigate('/')}>
              <th scope='row'>3</th>
              <td>placeholder name</td>
              <td>2:52PM</td>
            </tr>
            <tr onClick={() => navigate('/')}>
              <th scope='row'>4</th>
              <td>placeholder name</td>
              <td>4:31PM</td>
            </tr>
            <tr onClick={() => navigate('/')}>
              <th scope='row'>5</th>
              <td>placeholder name</td>
              <td>1:29PM</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyScreen
