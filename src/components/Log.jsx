import React, { useState, useEffect } from 'react'
import { Card, Container, Table } from 'react-bootstrap'
import axios from 'axios'

const Log = () => {
  const [logs, setLogs] = useState([])
  let cnt = 0

  const fetchLogs = async () => {
    let res = await axios.get('/api/v1/users/admin/monitor')
    setLogs(res.data)
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <Container className='text-center'>
      <h1 className=' my-5 title'>Monitoring Logs</h1>
      <Card className='p-3'>
        <Table>
          <thead>
            <tr>
              <th>اليوم</th>
              <th>التوقيت</th>
              <th> المكاتبة</th>
              <th>العملية</th>
              <th>الإسم</th>
              <th>م</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={cnt}>
                <td>{log.date}</td>
                <td>{log.time}</td>
                <td>{log.file_name}</td>
                <td>{log.action}</td>
                <td>{log.username}</td>
                <td>{++cnt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default Log
