import React, { useState, useEffect } from 'react'
import logo from '../logo.png'
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import axios from 'axios'
import { postLog } from '../logger'
import { Col, Row } from 'reactstrap'

const LoginScreen = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [deps, setDeps] = useState([])
  const [department, setDepartment] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate('/daily')
    }
    const fetchDeps = async () => {
      const { data } = await axios.get('/api/v1/users/dep')
      setDeps(data)
    }
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/v1/users/${department}`)
      setUsers(data)
    }
    fetchDeps()
    fetchUsers()
  }, [navigate, userInfo, department])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
    postLog(username, 'دخول', '-')
  }
  return (
    <div>
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
            <h1 className='text-center mainTitle'>منظومة البريد</h1>
          </div>
          {error ? <Message variant='danger'>{error}</Message> : <></>}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Select
                    onChange={(e) => {
                      setDepartment(e.target.value)
                    }}
                  >
                    <option value={''}>{}</option>
                    {deps.map((dep) => (
                      <option key={dep.dep_name} value={dep.dep_name}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  >
                    <option value={''}>{''}</option>
                    {users.map((user) => (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
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
