import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocViewerScreen = () => {
  const [pdfState, setPdfState] = useState([]);
  const getPdf = async () => {
    const { data } = await axios.get('/api/v1/files/sample.pdf');
    let blob = new Blob([data.data], { type: 'application/pdf' });
    setPdfState(blob);
    console.log(blob);
  };
  useEffect(() => {
    getPdf();
  }, []);

  return (
    <div>
      {pdfState ? (
        <object
          data={pdfState}
          type='application/pdf'
          width='100%'
          height='580px'
        >
          <a href={pdfState}>pdf</a>
        </object>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DocViewerScreen;
