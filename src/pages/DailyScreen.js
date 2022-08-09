import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../actions/userActions'
import { Card, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const DailyScreen = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let cnt = 0
  const [docs, setDocs] = useState([])
  const [show, setShow] = useState(false)
  const [checkedState, setCheckedState] = useState(new Array(8).fill(false))
  const [selectedFile, setSelectedFile] = useState()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await axios.get('/api/v1/files/daily/show')
      setDocs(data)
    }

    fetchDocs()
  }, [])

  let getData = async (id) => {
    const data = await axios.get(`/api/v1/files/open/${id}`)
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((perm, index) =>
      index === position ? !perm : perm
    )

    setCheckedState(updatedCheckedState)
  }

  const submitHandler = (e) => {
    console.log(checkedState, selectedFile)
    let obj = {
      checkedState,
      selectedFile,
    }
    axios.post('/api/v1/files/send', obj).then((res) => {
      console.log('sent')
    })
    setSelectedFile('')
  }

  return (
    <div>
      <div className='userInfo'>
        <h5>{userInfo.department}</h5>
        <h5>{userInfo.name}</h5>
      </div>
      <div className='d-flex justify-content-between'>
        <Button
          className='float-right'
          color='danger'
          onClick={() => dispatch(logout())}
        >
          خروج
        </Button>
        {userInfo.department === 'admin' ? (
          <Button color='info' onClick={() => navigate('/register')}>
            تسجيل حساب
          </Button>
        ) : (
          <></>
        )}

        {userInfo.department === 'الأرشيف العام' ? (
          <Button color='success' onClick={() => navigate('/add')}>
            +
          </Button>
        ) : (
          <></>
        )}
      </div>

      <h1 className='text-center my-5'>المكاتبات اليومية</h1>
      <div className='container text-center'>
        <Table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>الملخص</th>
              <th scope='col'>اسم المكاتبة</th>
              <th scope='col'>م</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((el) => (
              <tr>
                <td style={{ width: '30%' }}>
                  {userInfo.department === 'المدير العام' ||
                  userInfo.department === 'نائب المدير العام' ||
                  userInfo.department === 'الأرشيف العام' ||
                  userInfo.department === 'سكرتير المدير العام' ? (
                    <Button
                      color='success'
                      onClick={() => {
                        handleShow()
                        setSelectedFile(el.file_no)
                      }}
                    >
                      ارسال
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title style={{ alignItems: 'center' }}>
                        الأقسام المرسل إليها
                      </Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={submitHandler}>
                      <div>
                        <Modal.Body>
                          <Form.Group>
                            <div
                              style={{
                                float: 'left',
                                display: '',
                                paddingLeft: '70px',
                              }}
                            >
                              <Form.Check
                                type='checkbox'
                                label='الإدارة القانونية'
                                checked={checkedState[1]}
                                onChange={() => handleOnChange(1)}
                              />
                              <Form.Check
                                type='checkbox'
                                label='التخطيط و المتابعة'
                                checked={checkedState[2]}
                                onChange={() => handleOnChange(2)}
                              />
                              <Form.Check
                                type='checkbox'
                                label='قسم العقود'
                                checked={checkedState[3]}
                                onChange={() => handleOnChange(3)}
                              />
                              <Form.Check
                                type='checkbox'
                                label='الإدارة المالية'
                                checked={checkedState[4]}
                                onChange={() => handleOnChange(4)}
                              />
                            </div>
                            <div
                              style={{
                                float: 'right',
                                display: '',
                                paddingRight: '70px',
                              }}
                            >
                              <Form.Check
                                type='checkbox'
                                label='الأرشيف العام'
                                checked={checkedState[5]}
                                onChange={() => handleOnChange(5)}
                              />
                              <Form.Check
                                type='checkbox'
                                label='المدير العام'
                                checked={checkedState[6]}
                                onChange={() => handleOnChange(6)}
                              />
                              <Form.Check
                                type='checkbox'
                                label='نائب المدير العام'
                                checked={checkedState[7]}
                                onChange={() => handleOnChange(7)}
                              />
                            </div>
                          </Form.Group>
                        </Modal.Body>
                      </div>
                      <div style={{ float: 'right', padding: '20px' }}>
                        <Button
                          color='danger'
                          style={{ margin: '10px' }}
                          onClick={handleClose}
                        >
                          غلق
                        </Button>
                        <Button
                          type='submit'
                          color='success'
                          onClick={handleClose}
                        >
                          إرسال
                        </Button>
                      </div>
                    </Form>
                  </Modal>
                  <Button
                    color='info'
                    onClick={() => {
                      getData(el.file_no)
                      navigate(`/doc`)
                    }}
                  >
                    عرض
                  </Button>
                  {userInfo.department === 'المدير العام' ||
                  userInfo.department === ' نائب المدير العام' ? (
                    <Button
                      color='warning'
                      onClick={() => {
                        getData(el.file_no)
                        window.open('http://localhost:5000/api/v1/files/editor')
                      }}
                    >
                      تعديل
                    </Button>
                  ) : (
                    <></>
                  )}
                </td>
                <td style={{ width: '30%' }}>{el.summary}</td>
                <td style={{ width: '30%' }}>{el.orgname}</td>
                <td style={{ width: '10%' }} scope='row'>
                  {++cnt}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DailyScreen
