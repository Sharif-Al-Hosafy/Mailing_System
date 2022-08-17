import React, { useEffect, useRef, useState } from 'react'
import { Button, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal, Form, Card, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import notificationSound from '../notification.wav'
import { faCropSimple } from '@fortawesome/free-solid-svg-icons'

const DailyScreen = () => {
  let navigate = useNavigate()
  let count = 0
  let cnt = 0
  const audioPlayer = useRef(null)
  const [docs, setDocs] = useState([])
  const [show, setShow] = useState(false)
  const [checkedState, setCheckedState] = useState(new Array(8).fill(false))
  const [selectedFile, setSelectedFile] = useState()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const setRead = async (fileID, depID) => {
    await axios.post(`/api/v1/files/notify/${fileID}/${depID}`)
  }

  const setReadColor = async (fileID, depID) => {
    await axios.post(`/api/v1/files/read/${fileID}/${depID}`)
  }

  const fetchDocs = () => {
    axios.get(`/api/v1/files/daily/show/${userInfo.dep_id}`).then((res) => {
      setDocs(res.data)
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].notify === 1) {
          audioPlayer.current.play()
          setRead(res.data[i].file_no, userInfo.dep_id)
        }
      }
      axios.get(`/api/v1/files/docNo/${userInfo.dep_id}`).then((tata) => {
        count = tata.data[0].docTotal
      })
    })
  }

  useEffect(() => {
    fetchDocs()

    const interval = setInterval(() => {
      fetchDocs()

      console.log(docs)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  let getData = async (id) => {
    await axios.get(`/api/v1/files/open/${id}`)
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
      <h1 className='text-center my-5 title'>المكاتبات اليومية</h1>

      <audio ref={audioPlayer} src={notificationSound} />
      <div className='container text-center'>
        <Card className='p-3'>
          <Container>
            <Table className='table table-hover '>
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
                  <tr
                    key={cnt}
                    className={`docTable ${el.notify_color ? 'unread' : <></>}`}
                  >
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
                                <div>
                                  <Form.Check
                                    inline
                                    type='checkbox'
                                    reverse
                                    label='الإدارة القانونية'
                                    style={{ marginRight: '28px' }}
                                    checked={checkedState[1]}
                                    onChange={() => handleOnChange(1)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='التخطيط و المتابعة'
                                    checked={checkedState[2]}
                                    onChange={() => handleOnChange(2)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div>
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='قسم العقود'
                                    style={{ marginRight: '46px' }}
                                    checked={checkedState[3]}
                                    onChange={() => handleOnChange(3)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='الإدارة المالية'
                                    checked={checkedState[4]}
                                    onChange={() => handleOnChange(4)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div>
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='الأرشيف العام'
                                    style={{ marginRight: '34px' }}
                                    checked={checkedState[5]}
                                    onChange={() => handleOnChange(5)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='المدير العام'
                                    checked={checkedState[6]}
                                    onChange={() => handleOnChange(6)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                                <div>
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='نائب المدير العام'
                                    checked={checkedState[7]}
                                    onChange={() => handleOnChange(7)}
                                    disabled={
                                      userInfo.department === 'المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                  <Form.Check
                                    inline
                                    reverse
                                    type='checkbox'
                                    label='سكرتير المدير العام'
                                    checked={checkedState[8]}
                                    onChange={() => handleOnChange(8)}
                                    disabled={
                                      userInfo.department ===
                                        'سكرتير المدير العام' ||
                                      userInfo.department ===
                                        'نائب المدير العام'
                                        ? true
                                        : false
                                    }
                                  />
                                </div>
                              </Form.Group>
                            </Modal.Body>
                          </div>
                          <div>
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
                          setReadColor(el.file_no, userInfo.dep_id)
                          navigate(`/doc`)
                        }}
                      >
                        عرض
                      </Button>
                      {userInfo.department === 'المدير العام' ||
                      userInfo.department === 'نائب المدير العام' ? (
                        <Button
                          color='warning'
                          onClick={() => {
                            getData(el.file_no)
                            setReadColor(el.file_no, userInfo.dep_id)
                            window.open(
                              'http://localhost:5000/api/v1/files/editor'
                            )
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
                    <td style={{ width: '10%' }}>{++cnt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Card>
      </div>
    </div>
  )
}

export default DailyScreen
