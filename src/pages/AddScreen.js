import { Button, Container, Row, Col, Card, Table } from "reactstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const AddScreen = () => {
  let navigate = useNavigate();
  let fetch;
  let cnt = 0;
  const [docs, setDocs] = useState([]);
  const [docNum, setDocNum] = useState();

  const fetchDocs = async () => {
    fetch = await axios.get(`/api/v1/files/${docNum}`);
    setDocs(fetch.data);
    console.log(docNum);
  };

  const addDaily = async (id) => {
    fetch = await axios.post(`/api/v1/files/daily/save/${id}`);
  };

  return (
    <div>
      <Button
        color="danger"
        onClick={() => {
          navigate("/daily");
        }}
      >
        رجوع
      </Button>
      <h1 className="text-center my-5"> إضافة مكاتبة</h1>
      <Container style={{ textAlign: "center" }}>
        <Card className="p-3">
          <Container>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>صادر</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="text-right">
                  <Form.Label>وارد</Form.Label>
                  <Form.Control
                    className="text-right"
                    type="number"
                    value={docNum}
                    onChange={(e) => setDocNum(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="my-3">
              <Button
                className="w-50"
                color="info"
                type="button"
                onClick={() => fetchDocs()}
              >
                بحث
              </Button>
            </div>

            <div className="container text-center">
              <Table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">التاريخ</th>
                    <th scope="col">الملخص</th>
                    <th scope="col">اسم المكاتبة</th>
                    <th scope="col">م</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((el) => (
                    <tr
                      onClick={() => {
                        addDaily(el.id);
                        alert("تم إرسال المكاتبة");
                        navigate("/daily");
                      }}
                    >
                      <td>{el.importdate.split("T")[0]}</td>
                      <td style={{ width: "40%" }}>{el.summary}</td>
                      <td style={{ width: "30%" }}>{el.orgname}</td>
                      <th scope="row">{++cnt}</th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </Card>
      </Container>
    </div>
  );
};

export default AddScreen;
