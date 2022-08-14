import React, { useState, useEffect } from 'react'
import logo from '../logo.png'
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import axios from 'axios'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/daily')
    }
    const fetchUsers = async () => {
      const { data } = await axios.get('/api/v1/users/users')
      setUsers(data)
    }

    fetchUsers()
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }
  return (
    <div>
      {error ? <Message variant='danger'>{error}</Message> : <></>}
      <div className='logincard'>
        <Card className='p-3 mt-5'>
          <div>
            <img
              className='rounded mx-auto d-block'
              src={logo}
              alt='logo'
            ></img>
          </div>
          <div className='my-4'>
            <h1 className='text-center'>منظومة البريد</h1>
          </div>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Select
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              >
                {users.map((user) => (
                  <option value={user.username}>{user.username}</option>
                ))}
              </Form.Select>
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
