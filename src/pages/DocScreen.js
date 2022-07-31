import React, { useEffect } from 'react'

const DocScreen = () => {
  useEffect(() => {
    // let script1 = document.createElement('script')
    // let script2 = document.createElement('script')
    // let script3 = document.createElement('script')
    // let script4 = document.createElement('script')
    // let script5 = document.createElement('script')
    // let script6 = document.createElement('script')
    // let script7 = document.createElement('script')
    // let script8 = document.createElement('script')
    // let script9 = document.createElement('script')
    // script1.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'
    // script2.src =
    //   'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js'
    // script2.integrity =
    //   'sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN'
    // script2.crossOrigin = 'anonymous'
    // script3.src =
    //   'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'
    // script3.integrity =
    //   'sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV'
    // script3.crossOrigin = 'anonymous'
    // script4.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js'
    // script5.pdfjsLib.GlobalWorkerOptions.workerSrc =
    //   'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js'
    // script6.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.0/fabric.min.js'
    // script7.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.2.0/jspdf.umd.min.js'
    // script8.src =
    //   'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js'
    // script9.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js'
    // script1.async = true
    // script2.async = true
    // script3.async = true
    // script4.async = true
    // script5.async = true
    // script6.async = true
    // script7.async = true
    // script8.async = true
    // script9.async = true
    // document.body.appendChild(script1)
    // document.body.appendChild(script2)
    // document.body.appendChild(script3)
    // document.body.appendChild(script4)
    // document.body.appendChild(script5)
    // document.body.appendChild(script6)
    // document.body.appendChild(script7)
    // document.body.appendChild(script8)
    // document.body.appendChild(script9)
    ///////////////////
    //////////////////
    //     return () => {
    //       document.body.removeChild(script1)
    //       document.body.removeChild(script2)
    //       document.body.removeChild(script3)
    //       document.body.removeChild(script4)
    //       document.body.removeChild(script5)
    //       document.body.removeChild(script6)
    //       document.body.removeChild(script7)
    //       document.body.removeChild(script8)
    //       document.body.removeChild(script9)
    // }
  })
  return (
    <div>
      <div className='toolbar'>
        <div className='tool'>
          <span>PDFJS + FabricJS + jsPDF</span>
        </div>
        <div className='tool'>
          <label htmlFor=''>Brush size</label>
          <input
            type='number'
            className='htmlForm-control text-right'
            value='1'
            id='brush-size'
            max='50'
          />
        </div>
        <div className='tool'>
          <label htmlFor=''>Font size</label>
          <select id='font-size' className='htmlForm-control' defaultValue='16'>
            <option value='10'>10</option>
            <option value='12'>12</option>
            <option value='16'>16</option>
            <option value='18'>18</option>
            <option value='24'>24</option>
            <option value='32'>32</option>
            <option value='48'>48</option>
            <option value='64'>64</option>
            <option value='72'>72</option>
            <option value='108'>108</option>
          </select>
        </div>
        <div className='tool'>
          <button className='color-tool active'></button>
          <button className='color-tool'></button>
          <button className='color-tool'></button>
          <button className='color-tool'></button>
          <button className='color-tool'></button>
        </div>
        <div className='tool'>
          <button className='tool-button active'>
            <i
              className='fa fa-hand-paper-o'
              title='Free Hand'
              onClick='enableSelector(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button className='tool-button'>
            <i
              className='fa fa-pencil'
              title='Pencil'
              onClick='enablePencil(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button className='tool-button'>
            <i
              className='fa fa-font'
              title='Add Text'
              onClick='enableAddText(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button className='tool-button'>
            <i
              className='fa fa-long-arrow-right'
              title='Add Arrow'
              onClick='enableAddArrow(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button className='tool-button'>
            <i
              className='fa fa-square-o'
              title='Add rectangle'
              onClick='enableRectangle(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button className='tool-button'>
            <i
              className='fa fa-picture-o'
              title='Add an Image'
              onClick='addImage(event)'
            ></i>
          </button>
        </div>
        <div className='tool'>
          <button
            className='btn btn-danger btn-sm'
            onClick='deleteSelectedObject(event)'
          >
            <i className='fa fa-trash'></i>
          </button>
        </div>
        <div className='tool'>
          <button className='btn btn-danger btn-sm' onClick='clearPage()'>
            Clear Page
          </button>
        </div>
        <div className='tool'>
          <button className='btn btn-info btn-sm' onClick='showPdfData()'>
            {}
          </button>
        </div>
        <div className='tool'>
          <button className='btn btn-light btn-sm' onClick='savePDF()'>
            <i className='fa fa-save'></i> Save
          </button>
        </div>
      </div>
      <div id='pdf-container'></div>
      <div
        className='modal fade'
        id='dataModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='dataModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='dataModalLabel'>
                PDF annotation data
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <pre className='prettyprint lang-json linenums'></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocScreen
