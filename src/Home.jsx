import { Box, Typography } from "@mui/material";
import QrScanner from "./QrScanner.jsx";
import { useState } from "react";

export default function Home() {
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
        window.location.reload(); // old way to reset the page
    }

    return (
        <Box>
            <Box className={isVisible ? "hidden" : "visible"}>
                <h4>QR Code Scanner</h4>
                <QrScanner onScanSuccess={handleScan} />
            </Box>

            <Box className={isVisible ? "visible" : "hidden"}>
                <h4>Result</h4>
                <Typography>{decodedText}</Typography>
                <button onClick={backToScan} className="btnBack">Back</button>
                <Typography><b>Back</b> ခလုတ်ကိုနှိပ်တဲ့အချိန် ကင်မရာက QR area ကိုပဲ ဆက်ချိန်ထားမယ်ဆိုရင် ဒီစာမျက်နှာကိုပဲ ချက်ချင်းပြန်ရောက်လာပါလိမ့်မယ်။</Typography>
            </Box>
        </Box>
    );
}

