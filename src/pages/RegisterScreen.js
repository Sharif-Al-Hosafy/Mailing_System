import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/formContainer'
import { Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register, logout } from '../actions/userActions'
import axios from 'axios'
import Message from '../components/Message'

const RegisterScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [depId, setDepId] = useState('1')
  const [depName, setDepName] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let cnt = 0

  const userLogin = useSelector((state) => state.userLogin)
  const { error } = userLogin

  useEffect(() => {
    const fetchDep = async () => {
      const { data } = await axios.get('/api/v1/users/dep')
      setDepName(data)
    }

    fetchDep()
  }, [])

  const submitHandler = (e) => {
    dispatch(register(username, password, depId))
    if (error) {
      alert(error)
    } else {
      alert('user registered')
      dispatch(logout())
      navigate('/')
    }
  }
  console.log(depName)
  return (
    <div>
      <Button
        variant='danger'
        onClick={() => {
          navigate('/daily')
        }}
      >
        رجوع
      </Button>
      <FormContainer className='text-center'>
        <h1 className='mt-5 text-center'>تسجيل حساب</h1>
        {error ? <Message variant='danger'>{error}</Message> : <></>}
        <Card className='p-3 mt-3'>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='username'>
              <Form.Label className='my-2'>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label className='my-2'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='department'>
              <Form.Label className='my-2'>Department</Form.Label>
              <Form.Select
                value={depId}
                onChange={(e) => setDepId(e.target.value)}
              >
                {depName.map((dep) => (
                  <option value={++cnt}>{dep.dep_name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button className='my-3' type='submit' variant='success'>
              Register
            </Button>
          </Form>
        </Card>
      </FormContainer>
    </div>
  )
}

export default RegisterScreen
