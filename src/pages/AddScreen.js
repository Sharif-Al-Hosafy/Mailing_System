import { Button, Container, Card, Table } from 'reactstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { postLog } from '../logger'

const AddScreen = () => {
  let navigate = useNavigate()
  let fetch
  let cnt = 0
  const [docs, setDocs] = useState([])
  const [docNum, setDocNum] = useState()
  const [imp, setImp] = useState(true)
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const fetchDocs = async () => {
    if (imp) fetch = await axios.get(`/api/v1/files/imp/${docNum}`)
    else fetch = await axios.get(`/api/v1/files/exp/${docNum}`)
    setDocs(fetch.data)
  }

  const addDaily = async (id) => {
    if (imp) fetch = await axios.post(`/api/v1/files/daily/save/imp/${id}`)
    else fetch = await axios.post(`/api/v1/files/daily/save/exp/${id}`)
  }

  return (
    <div>
      <h1 className='text-center my-5 title'> إضافة مكاتبة</h1>
      <Container style={{ textAlign: 'center' }}>
        <Card className='p-3'>
          <Container>
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
              <Button
                className='w-50'
                color='info'
                type='button'
                onClick={() => fetchDocs()}
              >
                بحث
              </Button>
            </div>

            <div className='container text-center'>
              {docs.length ? (
                <Table className='table table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>التاريخ</th>
                      <th scope='col'>الملخص</th>
                      <th scope='col'>اسم المكاتبة</th>
                      <th scope='col'>م</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((el) => (
                      <tr
                        className='docTable'
                        onClick={() => {
                          addDaily(el.id)
                          postLog(
                            userInfo.name,
                            'اضافة مكاتبة',
                            el.orgname + ' ' + el.id
                          )
                          alert('تم إرسال المكاتبة')
                          navigate('/daily')
                        }}
                      >
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
              ) : (
                <></>
              )}
            </div>
          </Container>
        </Card>
      </Container>
    </div>
  )
}

export default AddScreen
