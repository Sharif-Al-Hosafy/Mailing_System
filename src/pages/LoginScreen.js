import React from 'react'
import logo from '../logo.png'
import { Card, Container } from 'react-bootstrap'

const LoginScreen = () => {
  return (
    <div>
      <div>
        <img className='rounded mx-auto d-block' src={logo}></img>
      </div>
      <div className='my-4'>
        <h1 className='text-center'>منظومة البريد</h1>
      </div>
      <div className='logincard'>
        <Card className='p-3'>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
              />
            </div>
            <div className='form-group py-3'>
              <input
                type='password'
                className='form-control'
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
      </div>
    </div>
  )
}

export default LoginScreen
