import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import logo from '../logo.png'
import mail from '../mail.png'
import bell from '../bell.png'
import add from '../add.png'

const HomeScreen = () => {
  let navigate = useNavigate()
  return (
    <div>
      <div>
        <Button color='danger' onClick={() => navigate('/')} className=''>
          log out
        </Button>
      </div>
      <div className='d-flex justify-content-between '>
        <div className='rounded mx-auto d-blocka'>
          <img className='' src={logo} alt='logo'></img>
        </div>
      </div>
      <div className='my-4'>
        <h1 className='text-center'>منظومة البريد</h1>
      </div>
      <div className='d-flex justify-content-around'>
        <Row className='text-center'>
          <Col>
            <Card style={{ width: '14rem' }}>
              <Card.Body>
                <Card.Img variant='top' src={add} fluid />
                <Button
                  onClick={() => navigate('/add')}
                  color='primary'
                  className='my-3'
                >
                  إضافة مكاتبة
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '14rem' }}>
              <Card.Body>
                <Card.Img variant='top' src={bell} fluid />
                <Button
                  onClick={() => navigate('/home')}
                  color='primary'
                  className='my-3'
                >
                  الإشعارات
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '14rem' }}>
              <Card.Body>
                <Card.Img src={mail} />
                <Button
                  onClick={() => navigate('/daily')}
                  color='primary'
                  className='my-3'
                >
                  المكاتبات اليومية
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default HomeScreen
