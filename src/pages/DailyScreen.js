import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Modal,
  Form,
  Card,
  Container,
  Button,
  Table,
  Tab,
  Tabs,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import notificationSound from '../notification.wav'
import { postLog } from '../logger'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const DailyScreen = () => {
  //vars
  let cnt = 0
  let cnt2 = 0
  //states
  const audioPlayer = useRef(null)
  const [docs, setDocs] = useState([])
  const [sent, setSent] = useState([])
  const [show, setShow] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [checkedState, setCheckedState] = useState(new Array(8).fill(false))
  const [selectedFile, setSelectedFile] = useState()
  //other hooks
  let navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  //methods
  const handleClose = () => setShow(false)
  const handleConfirmClose = () => setConfirm(false)
  const handleShow = () => setShow(true)
  const handleConfirmShow = () => {
    setConfirm(true)
    console.log(confirm)
  }
  const setRead = async (depID) => {
    audioPlayer.current.play()
    await axios.post(`/api/v1/files/notify/${depID}`)
    Notification.requestPermission()
    new Notification('تم إرسال مكاتبة جديدة')
  }

  const setReadColor = async (fileID, depID) => {
    await axios.post(`/api/v1/files/read/${fileID}/${depID}`)
  }

  const removeDoc = async (fileId, depId) => {
    await axios.delete(`/api/v1/files/remove/${fileId}/${depId}`)
  }

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
    axios
      .post('/api/v1/files/send', {
        checkedState,
        selectedFile: selectedFile.file_no,
      })
      .then((res) => {})
    setSelectedFile()
  }

  useEffect(() => {
    const fetchDocs = () => {
      axios
        .get(`/api/v1/files/daily/show/${userInfo.dep_id}`)
        .then(async (res) => {
          setDocs(res.data)
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].notify === 1) {
              await setRead(userInfo.dep_id)
            }
          }
        })
    }

    const fetchSent = () => {
      axios
        .get(`/api/v1/files/daily/sent/${userInfo.dep_id}`)
        .then(async (res) => {
          setSent(res.data)
        })
    }

    fetchSent()
    fetchDocs()

    const interval = setInterval(() => {
      fetchDocs()
    }, 3000)

    return () => clearInterval(interval)
  }, [userInfo.dep_id])

  return (
    <div>
      <h1 className='text-center my-5 title'>المكاتبات اليومية</h1>

      <audio ref={audioPlayer} src={notificationSound} />
      <Container className='text-center'>
        <Tabs defaultActiveKey='home' id='uncontrolled-tab-example'>
          <Tab eventKey='home' title='البريد الوارد'>
            <Card className='p-3'>
              <Container>
                {docs.length ? (
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
                          className={`docTable ${
                            el.notify_color ? 'unread' : <></>
                          }`}
                        >
                          <td>
                            <FontAwesomeIcon
                              className='clickable m-3'
                              color='red'
                              icon={faXmark}
                              onClick={() => {
                                setSelectedFile(el)
                                handleConfirmShow()
                              }}
                            />
                            {selectedFile ? (
                              <Modal show={confirm} onHide={handleConfirmClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>رسالة تأكيد</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  {'هل أنت متـأكد من حذف' +
                                    ' - ' +
                                    selectedFile.orgname +
                                    ' - ' +
                                    selectedFile.file_no}
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant='danger'
                                    onClick={() => {
                                      handleConfirmClose()
                                    }}
                                  >
                                    غلق
                                  </Button>
                                  <Button
                                    variant='success'
                                    onClick={() => {
                                      removeDoc(
                                        selectedFile.file_no,
                                        selectedFile.dep_id
                                      )

                                      postLog(
                                        userInfo.name,
                                        'اضافة مكاتبة',
                                        selectedFile.orgname +
                                          ' ' +
                                          selectedFile.file_no
                                      )

                                      handleConfirmClose()
                                    }}
                                  >
                                    تأكيد الحذف
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            ) : (
                              <></>
                            )}
                          </td>
                          <td style={{ width: '30%' }}>
                            {userInfo.department === 'المدير العام' ||
                            userInfo.department === 'نائب المدير العام' ||
                            userInfo.department === 'سكرتير المدير العام' ? (
                              <Button
                                className='m-1'
                                variant='success'
                                onClick={() => {
                                  handleShow()
                                  setSelectedFile(el)
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
                                          label='الإدارة القانونية'
                                          style={{ marginRight: '28px' }}
                                          checked={checkedState[1]}
                                          onChange={() => handleOnChange(1)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
                                            userInfo.department ===
                                              'نائب المدير العام'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Form.Check
                                          inline
                                          type='checkbox'
                                          label='التخطيط و المتابعة'
                                          checked={checkedState[2]}
                                          onChange={() => handleOnChange(2)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
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
                                          type='checkbox'
                                          label='قسم العقود'
                                          style={{ marginRight: '46px' }}
                                          checked={checkedState[3]}
                                          onChange={() => handleOnChange(3)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
                                            userInfo.department ===
                                              'نائب المدير العام'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Form.Check
                                          inline
                                          type='checkbox'
                                          label='الإدارة المالية'
                                          checked={checkedState[4]}
                                          onChange={() => handleOnChange(4)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
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
                                          type='checkbox'
                                          label='الأرشيف العام'
                                          style={{ marginRight: '34px' }}
                                          checked={checkedState[5]}
                                          onChange={() => handleOnChange(5)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
                                            userInfo.department ===
                                              'نائب المدير العام'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Form.Check
                                          inline
                                          type='checkbox'
                                          label='المدير العام'
                                          checked={checkedState[6]}
                                          onChange={() => handleOnChange(6)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
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
                                          type='checkbox'
                                          label='نائب المدير العام'
                                          checked={checkedState[7]}
                                          onChange={() => handleOnChange(7)}
                                          disabled={
                                            userInfo.department ===
                                              'المدير العام' ||
                                            userInfo.department ===
                                              'نائب المدير العام'
                                              ? true
                                              : false
                                          }
                                        />
                                        <Form.Check
                                          inline
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
                                    variant='danger'
                                    style={{ margin: '10px' }}
                                    onClick={handleClose}
                                  >
                                    غلق
                                  </Button>
                                  <Button
                                    type='submit'
                                    variant='success'
                                    onClick={() => {
                                      handleClose()
                                      postLog(
                                        userInfo.name,
                                        'إرسال مكاتبة',
                                        selectedFile.orgname +
                                          ' ' +
                                          selectedFile.file_no
                                      )
                                      removeDoc(
                                        selectedFile.file_no,
                                        userInfo.dep_id
                                      )
                                    }}
                                  >
                                    إرسال
                                  </Button>
                                </div>
                              </Form>
                            </Modal>
                            <Button
                              variant='info'
                              onClick={() => {
                                getData(el.file_no)
                                setReadColor(el.file_no, userInfo.dep_id)
                                postLog(
                                  userInfo.name,
                                  'عرض مكاتبة',
                                  el.orgname + ' ' + el.file_no
                                )
                                navigate(`/doc`)
                              }}
                            >
                              عرض
                            </Button>
                            {userInfo.department === 'المدير العام' ||
                            userInfo.department === 'نائب المدير العام' ? (
                              <Button
                                variant='warning'
                                onClick={() => {
                                  getData(el.file_no)
                                  setReadColor(el.file_no, userInfo.dep_id)
                                  postLog(
                                    userInfo.name,
                                    'حذف مكاتبة',
                                    el.orgname + ' ' + el.file_no
                                  )
                                  window.open(
                                    //change this
                                    'http://192.168.1.201:5000/api/v1/files/editor'
                                  )
                                }}
                              >
                                التوقيع
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
                ) : (
                  <h4>لا يوجد مكاتبات جديدة</h4>
                )}
              </Container>
            </Card>
          </Tab>
          <Tab eventKey='sent' title='البريدالمُرسَل'>
            <Card className='p-3'>
              <Container>
                {sent.length ? (
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
                      {sent.map((el) => (
                        <tr key={cnt2} className='docTable'>
                          <td>
                            <Button
                              variant='info'
                              onClick={() => {
                                getData(el.file_no)
                                setReadColor(el.file_no, userInfo.dep_id)
                                postLog(
                                  userInfo.name,
                                  'عرض مكاتبة',
                                  el.orgname + ' ' + el.file_no
                                )
                                navigate(`/doc`)
                              }}
                            >
                              عرض
                            </Button>
                          </td>
                          <td style={{ width: '30%' }}>{el.summary}</td>
                          <td style={{ width: '30%' }}>{el.orgname}</td>
                          <td style={{ width: '10%' }}>{++cnt2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4>لم يرسل مكاتبات بعد</h4>
                )}
              </Container>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    </div>
  )
}

export default DailyScreen
