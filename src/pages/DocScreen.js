import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import PdfViewerComponent from "../components/PdfViewerComponent";
import axios from "axios";
import pdff from "../sample.pdf";

const DocScreen = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  let id;
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <object
        data={pdff}
        type="application/pdf"
        width="100%"
        height="650px"
      ></object>
    </div>
  );
};

export default DocScreen;
