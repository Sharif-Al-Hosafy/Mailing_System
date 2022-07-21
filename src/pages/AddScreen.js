import { Button, Container, Row, Col, Card, Table } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const AddScreen = () => {
  let navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const [docNum, setDocNum] = useState();
  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await axios.get('/api/v1/users/data');
      setDocs(data);
    };

    fetchDocs();
  }, []);

  return (
    <div>
      <Button color='danger' onClick={() => navigate('/daily')}>
        رجوع
      </Button>
      <h1 className='text-center my-5'> إضافة مكاتبة</h1>
      <Container style={{ textAlign: 'center' }}>
        <Card className='p-3'>
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>صادر</Form.Label>
                  <Form.Control type='number' />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='text-right'>
                  <Form.Label>وارد</Form.Label>
                  <Form.Control className='text-right' type='number' />
                </Form.Group>
              </Col>
            </Row>

            <div className='my-3'>
              <Button className='w-50' color='info' type='button'>
                بحث
              </Button>
            </div>

            <div className='container text-center'>
              <Table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>وقت الارسال</th>
                    <th scope='col'>اسم المكاتبة</th>
                    <th scope='col'>م</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.forEach((el) => {
                    <tr onClick={() => navigate('/doc')}>
                      <td>2:59PM</td>
                      <td>{el.orgname}</td>
                      <th scope='row'>1</th>
                    </tr>;
                  })}
                </tbody>
              </Table>
              <Button
                color='success'
                className='w-50'
                type='submit'
                onClick={() => navigate('/daily')}
              >
                حفظ
              </Button>
            </div>
          </Container>
        </Card>
      </Container>

      {/* <div className='container'>
        <br></br>

        <form className='form-group' onSubmit={handlePdfFileSubmit}>
          <input
            type='file'
            className='form-control'
            required
            onChange={handlePdfFileChange}
          />
          {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
          <br></br>
          <button type='submit' className='btn btn-success btn-lg'>
            UPLOAD
          </button>
        </form>
        <br></br>
        <h4>View PDF</h4>
        <div className='pdf-container'>
          {viewPdf && (
            <>
              <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
                <Viewer
                  fileUrl={viewPdf}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </>
          )}
          {!viewPdf && <>No pdf file selected</>}
        </div>
      </div> */}
    </div>
  );
};

export default AddScreen;
