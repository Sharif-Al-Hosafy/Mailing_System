import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faArrowRightFromBracket,
  faUserPlus,
  faHouse,
  faBook,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { Col, Row } from 'reactstrap'
import { postLog } from '../logger'

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  let navigate = useNavigate()
  let dispatch = useDispatch()
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light '>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarColor03'
            aria-controls='navbarColor03'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          {userInfo ? (
            <Row>
              <Col
                onClick={() => {
                  dispatch(logout())
                  postLog(userInfo.name, 'خروج', '-')
                }}
              >
                <Row>
                  <span className='text-center'>
                    <FontAwesomeIcon
                      className='clickable'
                      color='red'
                      icon={faArrowRightFromBracket}
                    />
                  </span>
                </Row>
                <Row>
                  <h6>خروج</h6>
                </Row>
              </Col>
              <Col onClick={() => navigate('/')}>
                <Row>
                  <span className='text-center'>
                    <FontAwesomeIcon
                      className='clickable'
                      color='#282c34'
                      icon={faHouse}
                    />
                  </span>
                </Row>
                <Row>
                  <h6>الرئيسة</h6>
                </Row>
              </Col>
              {userInfo.department === 'admin' ? (
                <Col onClick={() => navigate('/register')}>
                  <Row>
                    <span className='text-center'>
                      <FontAwesomeIcon
                        className='clickable'
                        color='skyblue'
                        icon={faUserPlus}
                      />
                    </span>
                  </Row>
                  <Row>
                    <h6>تسجيل</h6>
                  </Row>
                </Col>
              ) : (
                <></>
              )}

              {userInfo.department === 'الأرشيف العام' ? (
                <Col onClick={() => navigate('/add')}>
                  <Row>
                    <span className='text-center'>
                      <FontAwesomeIcon
                        className='clickable'
                        color='green'
                        icon={faFileCirclePlus}
                      />
                    </span>
                  </Row>
                  <Row>
                    <h6>إضافة</h6>
                  </Row>
                </Col>
              ) : (
                <></>
              )}

              {userInfo.department === 'admin' ? (
                <Col onClick={() => navigate('/log')}>
                  <Row>
                    <span className='text-center'>
                      <FontAwesomeIcon
                        className='clickable'
                        color='Navy'
                        icon={faBook}
                      />
                    </span>
                  </Row>
                  <Row>
                    <h6>المتابعة</h6>
                  </Row>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          ) : (
            <></>
          )}

          <div className='collapse navbar-collapse' id='navbarColor03'>
            <ul className='navbar-nav ms-auto'>
              <div className='mx-3'>
                {userInfo ? (
                  <h5>{userInfo.department + ' / ' + userInfo.name}</h5>
                ) : (
                  <></>
                )}
              </div>
            </ul>
            <div className='d-flex'></div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
