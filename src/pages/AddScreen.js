import { Button, Container, Card, Table, Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { postLog } from '../logger'
import Message from '../components/Message'

const AddScreen = () => {
  const [docs, setDocs] = useState([])
  const [docNum, setDocNum] = useState('')
  const [imp, setImp] = useState(true)
  const [show, setShow] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [error, setError] = useState()

  let fetch
  let cnt = 0

  let navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  const fetchDocs = async () => {
    try {
      if (imp) fetch = await axios.get(`/api/v1/files/imp/${docNum}`)
      else fetch = await axios.get(`/api/v1/files/exp/${docNum}`)
      setDocs(fetch.data)
    } catch (error) {
      setError('لا يوجد مكاتبة بهذا الرقم')
    }
  }

  const addDaily = async (id) => {
    if (imp) fetch = await axios.post(`/api/v1/files/daily/save/imp/${id}`)
    else fetch = await axios.post(`/api/v1/files/daily/save/exp/${id}`)
  }

  let getData = async (id) => {
    await axios.get(`/api/v1/files/openFileSearch/${id}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setError()
    fetchDocs()
  }
  try {
    return (
      <div>
        <h1 className='text-center my-5 title'> إضافة مكاتبة</h1>
        <Container className='text-center'>
          <Card className='p-3'>
            <Container>
              {error ? <Message variant='danger'>{error}</Message> : <></>}
              <Form onSubmit={submitHandler}>
                <Form.Group className='text-right'>
                  <Form.Label>رقم المكاتبة</Form.Label>
                  <Form.Control
                    className='text-right'
                    type='number'
                    value={docNum}
                    onChange={(e) => setDocNum(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='my-3'>
                  <div key='inline-radio'>
                    <Form.Check
                      inline
                      name='group1'
                      type='radio'
                      label='وارد'
                      checked={imp}
                      onChange={() => setImp(!imp)}
                    />
                    <Form.Check
                      inline
                      name='group1'
                      type='radio'
                      label='صادر'
                      checked={!imp}
                      onChange={() => setImp(!imp)}
                    />
                  </div>
                </Form.Group>

                <div className='my-3'>
                  <Button className='w-50' color='info' type='submit'>
                    بحث
                  </Button>
                </div>
              </Form>

              <div>
                {docs.length ? (
                  <Card className='p-3'>
                    <Container>
                      <Table className='table table-hover'>
                        <thead>
                          <tr>
                            <th scope='col'></th>
                            <th scope='col'>التاريخ</th>
                            <th scope='col'>الملخص</th>
                            <th scope='col'>اسم المكاتبة</th>
                            <th scope='col'>م</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs.map((el) => (
                            <tr
                              key={cnt}
                              className='docTable'
                              onClick={() => {
                                setSelectedFile(el)
                              }}
                            >
                              <td>
                                <Button
                                  className='m-1'
                                  variant='success'
                                  onClick={handleShow}
                                >
                                  ارسال
                                </Button>
                                {selectedFile ? (
                                  <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>رسالة تأكيد</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      {'هل أنت متـأكد من إرسال' +
                                        ' - ' +
                                        selectedFile.orgname +
                                        ' - ' +
                                        selectedFile.id}
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant='danger'
                                        onClick={() => {
                                          handleClose()
                                        }}
                                      >
                                        غلق
                                      </Button>
                                      <Button
                                        variant='success'
                                        onClick={() => {
                                          addDaily(selectedFile.id)
                                          postLog(
                                            userInfo.name,
                                            'اضافة مكاتبة',
                                            selectedFile.orgname +
                                              ' ' +
                                              selectedFile.id
                                          )
                                          alert('تم إرسال المكاتبة')
                                          navigate('/daily')
                                          handleClose()
                                        }}
                                      >
                                        تأكيد الإرسال
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                ) : (
                                  <></>
                                )}
                                <Button
                                  variant='info'
                                  onClick={() => {
                                    console.log(el)
                                    getData(el.id)
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
                              <td>
                                {imp
                                  ? el.importdate.split('T')[0]
                                  : el.exportdate.split('T')[0]}
                              </td>

                              <td style={{ width: '40%' }}>{el.summary}</td>
                              <td style={{ width: '30%' }}>{el.orgname}</td>
                              <th scope='row'>{++cnt}</th>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Container>
                  </Card>
                ) : (
                  <></>
                )}
              </div>
            </Container>
          </Card>
        </Container>
      </div>
    )
  } catch (error) {
    setDocs([])
    fetchDocs()
  }
}

export default AddScreen
