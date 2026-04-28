'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function DocumentsPage() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [signature, setSignature] = useState('');
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/documents', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setDocs(data);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/documents/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    fetchDocs();
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const captureSignature = () => {
    const canvas = canvasRef.current;
    setSignature(canvas.toDataURL());
  };

  const saveSignature = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/documents/${selectedDoc._id}/signature`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ signature })
    });
    alert('Signature saved');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Document Processing Chamber</h1>
      <input type="file" accept=".pdf" onChange={handleUpload} className="mb-4" />
      <ul className="mb-4">
        {docs.map(doc => (
          <li key={doc._id} className="cursor-pointer" onClick={() => setSelectedDoc(doc)}>{doc.filename}</li>
        ))}
      </ul>
      {selectedDoc && (
        <div>
          <h2>Viewing: {selectedDoc.filename}</h2>
          <Document file={`https://your-s3-bucket.s3.amazonaws.com/${selectedDoc.s3Key}`}>
            <Page pageNumber={1} />
          </Document>
          <h3>E-Signature</h3>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            style={{ border: '1px solid black' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <button onClick={captureSignature} className="mr-2">Capture Signature</button>
          <button onClick={saveSignature}>Save Signature</button>
          {signature && <img src={signature} alt="Signature" className="mt-2" />}
        </div>
      )}
    </div>
  );
}