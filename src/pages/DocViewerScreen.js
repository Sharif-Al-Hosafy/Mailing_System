import React from 'react'
import pdf from './sample.pdf'

const DocViewerScreen = () => {
  return (
    <div>
      <object data={pdf} type='application/pdf' width='100%' height='580px'>
        <a href={pdf}>pdf</a>
      </object>
    </div>
  )
}

export default DocViewerScreen
