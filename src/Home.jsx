import { Box, Typography, Card, CardContent } from "@mui/material";
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

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    return (
        <Box>
            <Box className={isVisible ? "hidden" : "visible"}>
                <h4>QR Code Scanner</h4>
                <QrScanner onScanSuccess={handleScan} />
            </Box>

            <Box className={isVisible ? "visible" : "hidden"}>
                <h4>Result</h4>

                <Card variant="outlined">
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            QR Data "{decodedText}"
                        </Typography>
                        <Typography variant="h5" component="div">
                            be{bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Card>

                <button onClick={backToScan} className="btnBack">Back</button>
                <Typography><b>Back</b> ခလုတ်ကိုနှိပ်တဲ့အချိန် ကင်မရာက QR area ကိုပဲ ဆက်ချိန်ထားမယ်ဆိုရင် ဒီစာမျက်နှာကိုပဲ ချက်ချင်းပြန်ရောက်လာပါလိမ့်မယ်။</Typography>
            </Box>
        </Box>
    );
}

