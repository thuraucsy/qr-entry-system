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
      setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Delay to allow the scanner to stop before showing the result 
    }
  };

  const backToScan = () => {
    setIsVisible(false);
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
