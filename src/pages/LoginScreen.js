import React, { useState, useEffect } from 'react'
import logo from '../logo.png'
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/daily')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div>
      <div>
        <img className='rounded mx-auto d-block' src={logo} alt='logo'></img>
      </div>
      <div className='my-4'>
        <h1 className='text-center'>منظومة البريد</h1>
      </div>
      {error ? <Message variant='danger'>{error}</Message> : <></>}
      <div className='logincard'>
        <Card className='p-3'>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='form-group py-3'>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className='d-grid gap-2'>
              <Button type='submit' className='btn btn-primary my-3'>
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default LoginScreen
