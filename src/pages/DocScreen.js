import React, { useState, useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import PdfViewerComponent from '../components/PdfViewerComponent'
import axios from 'axios'

const DocScreen = () => {
  const [pdf, setPdf] = useState()
  let doc

  const getPdf = async () => {
    const { data } = await axios.get('/api/v1/files/open/1')
    let file = new Blob([data[0].file_data], { type: 'aplication/pdf' })
    let fileURL = URL.createObjectURL(file)
    setPdf(fileURL)
  }
  useEffect(() => {
    getPdf()
  }, [])
  if (!pdf) {
    return <div></div>
  }
  return (
    <div className='PDF-viewer'>
      <PdfViewerComponent blob={pdf} />
    </div>
  )
}

export default DocScreen
