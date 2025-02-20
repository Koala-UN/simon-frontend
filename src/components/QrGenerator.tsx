import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const QrGenerator: React.FC = () => {
  const [link, setLink] = useState('');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleDownload = async () => {
    if (qrRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    } catch (error) {
      console.error('Error generating QR code image:', error);
    }
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter link"
        value={link}
        onChange={handleChange}
      />
      <div ref={qrRef}>
        {link && <QRCode value={link} />}
      </div>
      {link && <button onClick={handleDownload}>Download QR Code</button>}
    </div>
  );
};

export default QrGenerator;