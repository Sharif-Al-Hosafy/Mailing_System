import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileCirclePlus,
  faArrowRightFromBracket,
  faUserPlus,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'

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
            <div>
              <span onClick={() => dispatch(logout())}>
                <FontAwesomeIcon
                  className='mx-3 clickable'
                  color='red'
                  icon={faArrowRightFromBracket}
                />
              </span>
              <span onClick={() => navigate('/')}>
                <FontAwesomeIcon
                  className='mx-3 clickable'
                  color='#282c34'
                  icon={faHouse}
                />
              </span>
              {userInfo.department === 'admin' ? (
                <span onClick={() => navigate('/register')}>
                  <FontAwesomeIcon
                    className='mx-3 clickable'
                    color='skyblue'
                    icon={faUserPlus}
                  />
                </span>
              ) : (
                <></>
              )}

              {userInfo.department === 'الأرشيف العام' ? (
                <span onClick={() => navigate('/add')}>
                  <FontAwesomeIcon
                    className='mx-3 clickable'
                    color='green'
                    icon={faFileCirclePlus}
                  />
                </span>
              ) : (
                <></>
              )}
            </div>
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
