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

  const flagClick = () => {
    window.open("https://docs.google.com/spreadsheets/d/1Eb1IRArcai5KaRhj3CaYIqForxfFifN4R5I91oXtgdo/", "_blank");
  }

  return (
    <div>
      <img src="/okinawa_flag.svg" alt="Okinawa flag" width="30%" onClick={flagClick}/>
      <h1><span class="red">Okinawa</span> QR Entry<span class="red">System</span></h1>
      
      <div className={isVisible ? "hidden" : "visible"}>
        <h4>QR Code Scanner</h4>
        <QrScanner onScanSuccess={handleScan} />
      </div>

      <div className={isVisible ? "visible" : "hidden"}>
        <h4>Result</h4>
        <p> {decodedText}</p>
        <button onClick={backToScan}>Back</button>
        <p><bold>Back</bold> ခလုတ်ကိုနှိပ်တဲ့အချိန် ကင်မရာက QR area ကိုပဲ ဆက်ချိန်ထားမယ်ဆိုရင် ဒီစာမျက်နှာကိုပဲ ချက်ချင်းပြန်ရောက်လာပါလိမ့်မယ်။</p>
      </div>
    </div>
  );
};

export default App;
