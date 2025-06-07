import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const QrScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    scanner.render(onScanSuccess);

    return () => {
      scanner.clear().catch((error) => console.error("Failed to clear scanner:", error));
    };
  }, []);

  return <div id="qr-reader"></div>;
};

export default QrScanner;
