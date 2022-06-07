import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../logo.png'

const HomeScreen = () => {
  return (
    <div>
      <div>
        <img className='rounded mx-auto d-block' src={logo} alt='logo'></img>
      </div>
      <div className='my-4'>
        <h1 className='text-center'>منظومة البريد</h1>
      </div>
      <div className='container'>
        <Row className='text-center'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>المكاتبات اليومية</Card.Title>
                <Card.Text></Card.Text>
                <Button as={Link} to='/daily' variant='primary'>
                  Go To Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Services</Card.Title>
                <Card.Text>Check out our services.</Card.Text>
                <Button as={Link} to='/services' variant='primary'>
                  Go To Services
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Custom Requests</Card.Title>
                <Card.Text>Check out our custom requests.</Card.Text>
                <Button as={Link} to='/requests' variant='primary'>
                  Go To Requests
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
