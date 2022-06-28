import { Button, Container, Row, Col, Card } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const AddScreen = () => {
  let navigate = useNavigate();
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
                  <Form.Label>عدد الصفحات</Form.Label>
                  <Form.Control type='number' />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='text-right'>
                  <Form.Label>كود المكاتبة</Form.Label>
                  <Form.Control className='text-right' type='number' />
                </Form.Group>
              </Col>
              <Form.Group>
                <Form.Label>اسم المكاتبة</Form.Label>
                <Form.Control disabled />
              </Form.Group>
              <Col className='my-3'>
                <Button className='w-100' color='info' type='submit'>
                  بحث
                </Button>
              </Col>
              <Col className='my-3'>
                <Button
                  color='success'
                  className='w-100'
                  type='submit'
                  onClick={() => navigate('/daily')}
                >
                  حفظ
                </Button>
              </Col>
            </Row>
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
