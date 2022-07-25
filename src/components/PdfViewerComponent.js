import { useEffect, useRef } from 'react'

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    let instance, PSPDFKit
    ;(async function () {
      PSPDFKit = await import('pspdfkit')
      //const documentBlobObjectUrl = URL.createObjectURL(props.blob)
      console.log(props.blob)
      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        //document: props.document,
        document: props.blob,
      }).then((instance) => {
        // Make sure we revoke the object URL so the browser doesn't hold on to the blob object, not needed any more.
        URL.revokeObjectURL(props.blob)
      })
    })()

    return () => PSPDFKit && PSPDFKit.unload(container)
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
}
