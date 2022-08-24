import React from 'react'
import { Table } from 'react-bootstrap'

const DocTable = ({ docs }) => {
  let count = 0
  return (
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
        {docs.map((doc) => (
          <tr
            key={count}
            className={`docTable ${el.notify_color ? 'unread' : <></>}`}
          ></tr>
        ))}
      </tbody>
    </Table>
  )
}

export default DocTable
