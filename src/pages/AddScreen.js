import { Button, Container, Card, Table, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { postLog } from "../logger";
import Message from "../components/Message";

const AddScreen = () => {
  const [docs, setDocs] = useState([]);
  const [docNum, setDocNum] = useState("");
  const [imp, setImp] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState();
  const [checkedState, setCheckedState] = useState(new Array(13).fill(false));

  let fetch;
  let cnt = 0;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((perm, index) =>
      index === position ? !perm : perm
    );

    setCheckedState(updatedCheckedState);
    console.log(checkedState);
  };

  const fetchDocs = async () => {
    try {
      if (imp) fetch = await axios.get(`/api/v1/files/list/imp/${docNum}`);
      else fetch = await axios.get(`/api/v1/files/list/exp/${docNum}`);
      setDocs(fetch.data);
    } catch (error) {
      setError("لا يوجد مكاتبة بهذا الرقم");
    }
  };

  let getData = async (id) => {
    await axios.get(`/api/v1/files/openFileSearch/${id}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError();
    fetchDocs();
  };
  const submitHandlerDaily = (e) => {
    e.preventDefault();
    var docType;
    if (imp) docType = "imp";
    else docType = "exp";
    axios
      .post(`/api/v1/files/daily/save/${docType}/${selectedFile.id}`, {
        checkedState,
      })
      .then((res) => {});
    alert("تم إرسال المكاتبة");
    setSelectedFile();
  };

  try {
    return (
      <div>
        <h1 className="text-center my-5 title"> إضافة مكاتبة</h1>
        <Container className="text-center">
          <Card className="p-3">
            <Container>
              {error ? <Message variant="danger">{error}</Message> : <></>}
              <Form onSubmit={submitHandler}>
                <Form.Group className="text-right">
                  <Form.Label>رقم المكاتبة</Form.Label>
                  <Form.Control
                    className="text-right"
                    type="number"
                    value={docNum}
                    onChange={(e) => setDocNum(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="my-3">
                  <div key="inline-radio">
                    <Form.Check
                      inline
                      name="group1"
                      type="radio"
                      label="وارد"
                      checked={imp}
                      onChange={() => setImp(!imp)}
                    />
                    <Form.Check
                      inline
                      name="group1"
                      type="radio"
                      label="صادر"
                      checked={!imp}
                      onChange={() => setImp(!imp)}
                    />
                  </div>
                </Form.Group>

                <div className="my-3">
                  <Button className="w-50" color="info" type="submit">
                    بحث
                  </Button>
                </div>
              </Form>

              <div>
                {docs.length ? (
                  <Card className="p-3">
                    <Container>
                      <Table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">التاريخ</th>
                            <th scope="col">الملخص</th>
                            <th scope="col">اسم المكاتبة</th>
                            <th scope="col">م</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs.map((el) => (
                            <tr
                              key={cnt}
                              className="docTable"
                              onClick={() => {
                                setSelectedFile(el);
                              }}
                            >
                              <td>
                                <Button
                                  className="m-1"
                                  variant="success"
                                  onClick={handleShow}
                                >
                                  ارسال
                                </Button>
                                {selectedFile ? (
                                  <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title
                                        style={{ alignItems: "center" }}
                                      >
                                        الأقسام المرسل إليها
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Form onSubmit={submitHandlerDaily}>
                                      <div>
                                        <Modal.Body>
                                          <Form.Group>
                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="المدير العام"
                                                style={{ marginRight: "63px" }}
                                                checked={checkedState[1]}
                                                onChange={() =>
                                                  handleOnChange(1)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="نائب المدير العام"
                                                checked={checkedState[2]}
                                                onChange={() =>
                                                  handleOnChange(2)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="سكرتير المدير العام"
                                                style={{ marginRight: "16px" }}
                                                checked={checkedState[3]}
                                                onChange={() =>
                                                  handleOnChange(3)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                  "سكرتير المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="الأرشيف العام"
                                                checked={checkedState[4]}
                                                onChange={() =>
                                                  handleOnChange(4)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="الإدارة القانونية"
                                                style={{ marginRight: "42px" }}
                                                checked={checkedState[5]}
                                                onChange={() =>
                                                  handleOnChange(5)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="إدارة التخطيط و المتابعة / الإدارة الفنية"
                                                checked={checkedState[6]}
                                                onChange={() =>
                                                  handleOnChange(6)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="الإدارة المالية"
                                                style={{ marginRight: "54px" }}
                                                checked={checkedState[7]}
                                                onChange={() =>
                                                  handleOnChange(7)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="إدارة العقود"
                                                checked={checkedState[8]}
                                                onChange={() =>
                                                  handleOnChange(8)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>
                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="إدارة الأمن"
                                                style={{ marginRight: "71px" }}
                                                checked={checkedState[9]}
                                                onChange={() =>
                                                  handleOnChange(9)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="الشئون الإدارية"
                                                checked={checkedState[10]}
                                                onChange={() =>
                                                  handleOnChange(10)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                            </div>

                                            <div>
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="إدارة التسويق"
                                                style={{ marginRight: "50px" }}
                                                checked={checkedState[11]}
                                                onChange={() =>
                                                  handleOnChange(11)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <Form.Check
                                                inline
                                                type="checkbox"
                                                label="المستشار البحري"
                                                checked={checkedState[12]}
                                                onChange={() =>
                                                  handleOnChange(12)
                                                }
                                                disabled={
                                                  userInfo.department ===
                                                    "المدير العام" ||
                                                  userInfo.department ===
                                                    "نائب المدير العام"
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
                                          variant="danger"
                                          style={{ margin: "10px" }}
                                          onClick={handleClose}
                                        >
                                          غلق
                                        </Button>
                                        <Button
                                          type="submit"
                                          variant="success"
                                          onClick={() => {
                                            handleClose();
                                            postLog(
                                              userInfo.name,
                                              "اضافة مكاتبة",
                                              selectedFile.orgname +
                                                " " +
                                                selectedFile.id
                                            );
                                          }}
                                        >
                                          إرسال
                                        </Button>
                                      </div>
                                    </Form>
                                  </Modal>
                                ) : (
                                  // <Modal show={show} onHide={handleClose}>
                                  //   <Modal.Header closeButton>
                                  //     <Modal.Title>رسالة تأكيد</Modal.Title>
                                  //   </Modal.Header>
                                  //   <Modal.Body>
                                  //     {"هل أنت متـأكد من إرسال" +
                                  //       " - " +
                                  //       selectedFile.orgname +
                                  //       " - " +
                                  //       selectedFile.id}
                                  //   </Modal.Body>
                                  //   <Modal.Footer>
                                  //     <Button
                                  //       variant="danger"
                                  //       onClick={() => {
                                  //         handleClose();
                                  //       }}
                                  //     >
                                  //       غلق
                                  //     </Button>
                                  //     <Button
                                  //       variant="success"
                                  //       onClick={() => {
                                  //         addDaily(selectedFile.id);
                                  //         postLog(
                                  //           userInfo.name,
                                  //           "اضافة مكاتبة",
                                  //           selectedFile.orgname +
                                  //             " " +
                                  //             selectedFile.id
                                  //         );
                                  //         alert("تم إرسال المكاتبة");
                                  //         handleClose();
                                  //       }}
                                  //     >
                                  //       تأكيد الإرسال
                                  //     </Button>
                                  //   </Modal.Footer>
                                  // </Modal>
                                  <></>
                                )}
                                <Button
                                  variant="info"
                                  onClick={() => {
                                    getData(el.id);
                                    postLog(
                                      userInfo.name,
                                      "عرض مكاتبة",
                                      el.orgname + " " + el.file_no
                                    );
                                    window.open(
                                      "http://localhost:5000/api/v1/files/viewer"
                                    );
                                  }}
                                >
                                  عرض
                                </Button>
                              </td>
                              <td>
                                {imp
                                  ? el.importdate.split("T")[0]
                                  : el.exportdate.split("T")[0]}
                              </td>

                              <td style={{ width: "40%" }}>{el.summary}</td>
                              <td style={{ width: "30%" }}>{el.orgname}</td>
                              <th scope="row">{++cnt}</th>
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
    );
  } catch (error) {
    setDocs([]);
    fetchDocs();
  }
};

export default AddScreen;
