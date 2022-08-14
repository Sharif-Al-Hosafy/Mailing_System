import React from 'react'
import pdf from './sample.pdf'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const DocViewerScreen = () => {
  let navigate = useNavigate()
  return (
    <div>
      <Button
        color='danger'
        onClick={() => {
          navigate('/daily')
        }}
      >
        رجوع
      </Button>
      <object data={pdf} type='application/pdf' width='100%' height='580px'>
        <a href={pdf}></a>
      </object>
    </div>
  )
}

export default DocViewerScreen
