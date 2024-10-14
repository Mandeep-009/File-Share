import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the workerSrc to use the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderFile = ({ url }) => {
  // Function to determine if the URL is for an image or a PDF
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
  };

  const isPDF = (url) => {
    return /\.pdf$/i.test(url);
  };

  if (isImage(url)) {
    return <img src={url} alt="Rendered content" style={{ maxWidth: '100%', maxHeight: '100%' }} />;
  }

  if (isPDF(url)) {
    return (
      <Document file={url}>
        <Page pageNumber={1} width={600} />
      </Document>
    );
  }

  return <div>Unsupported file type</div>;
};

export default RenderFile;
