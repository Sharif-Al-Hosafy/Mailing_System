import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const LoginScreen = () => {
  return (
    <div className='container'>
      <Row>
        <Col>
          <h1 className='text-center'>منظومة البريد</h1>
        </Col>
        <Col>
          <Card className='p-3'>
            <form>
              <div className='form-group'>
                <input
                  type='text'
                  class='form-control'
                  id='username'
                  placeholder='Username'
                />
              </div>
              <div className='form-group py-3'>
                <input
                  type='password'
                  class='form-control'
                  id='password'
                  placeholder='Password'
                />
              </div>
              <div className='d-grid gap-2'>
                <button type='submit' className='btn btn-primary my-3'>
                  Login
                </button>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginScreen
