import QrScanner from "./QrScanner.jsx";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [decodedText, setDecodedText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const handleScan = (decodedText) => {
    if (!isVisible) {
      console.log("Scanned QR Code:", decodedText);
      setDecodedText(decodedText);
      setIsVisible(true);
    }
  };

  const backToScan = () => {
    // setIsVisible(false);
    window.location.reload()
  }

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div className={isVisible ? "hidden" : "visible"}>
        <QrScanner onScanSuccess={handleScan} />
      </div>

      <div className={isVisible ? "visible" : "hidden"}>
        <p> {decodedText} <br /> <button onClick={backToScan}>Back</button></p>
      </div>
    </div>
  );
};

export default App;
