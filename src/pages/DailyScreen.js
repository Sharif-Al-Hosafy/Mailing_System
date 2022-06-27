import React from 'react';
import { Button, Container, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const DailyScreen = () => {
  let navigate = useNavigate();

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
              <th scope='col'>وقت الارسال</th>
              <th scope='col'>اسم المكاتبة</th>
              <th scope='col'>م</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => navigate('/doc')}>
              <td>2:59PM</td>
              <td>placeholder name</td>
              <th scope='row'>1</th>
            </tr>
            <tr onClick={() => navigate('/doc')}>
              <td>12:25PM</td>
              <td>placeholder name</td>
              <th scope='row'>2</th>
            </tr>
            <tr onClick={() => navigate('/doc')}>
              <td>2:52PM</td>
              <td>placeholder name</td>
              <th scope='row'>3</th>
            </tr>
            <tr onClick={() => navigate('/doc')}>
              <td>4:31PM</td>
              <td>placeholder name</td>
              <th scope='row'>4</th>
            </tr>
            <tr onClick={() => navigate('/doc')}>
              <td>1:29PM</td>
              <td>placeholder name</td>
              <th scope='row'>5</th>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DailyScreen;
