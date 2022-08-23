import React from 'react'

const asdfas = () => {
  return (
    <div>
      <ul className='nav nav-tabs' role='tablist'>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link active'
            data-bs-toggle='tab'
            href='#inbox'
            aria-selected='true'
            role='tab'
          >
            inbox
          </a>
        </li>
        <li className='nav-item' role='presentation'>
          <a
            className='nav-link'
            data-bs-toggle='tab'
            href='#sent'
            aria-selected='false'
            tabindex='-1'
            role='tab'
          >
            sent
          </a>
        </li>
      </ul>
      <div id='myTabContent' className='tab-content'>
        <div
          className='tab-pane fade show active'
          id='inbox'
          role='tabpanel'
        ></div>
        <div className='tab-pane fade' id='sent' role='tabpanel'></div>
      </div>
    </div>
  )
}

export default asdfas
