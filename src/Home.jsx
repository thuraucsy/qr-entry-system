import { Box, Typography, Card, CardContent } from "@mui/material";
import QrScanner from "./QrScanner.jsx";
import { useState } from "react";
import { fetchSheetData } from "./utils.js";
import Swal from "sweetalert2";

export default function Home() {
    const [decodedText, setDecodedText] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [rows, setRows] = useState([]);
    const [qrRow, setQrRow] = useState([]);

    const handleScan = (decodedText) => {
        if (!isVisible) {
            setDecodedText(decodedText);
            setIsVisible(true);

            fetchSheetData().then((rows) => {
                setRows(rows);
                const filterQrRow = rows.filter(row => row.includes(decodedText))
                setQrRow(filterQrRow);
                if (filterQrRow[0][1] && filterQrRow[0][1] === 'yes') {
                    Swal.fire({
                        text: "Already checked in",
                        icon: "warning",
                    });
                }
            });

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

                        {
                            qrRow.length > 0 ? (
                                <Box>
                                    <Typography variant="h5" component="div">
                                        No{bull}{qrRow[0][0]}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Check In: {(!qrRow[0][1] || qrRow[0][1] == 'no') ? "OK" : "NG"}</Typography>
                                    {qrRow[0][3] && <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Buyer name: {qrRow[0][3]}</Typography>}
                                    {qrRow[0][4] && <Typography variant="body2">
                                        No. of persons: {qrRow[0][4]}<br />
                                    </Typography>}
                                    {qrRow[0][5] && <Typography variant="body2">
                                        Total Price: {qrRow[0][5]}<br />
                                    </Typography>}
                                </Box>
                            ) : (
                                <Typography variant="h5" component="div">
                                    "{decodedText}" is not found in the database.
                                </Typography>
                            )
                        }

                    </CardContent>
                </Card>

                <button onClick={backToScan} className="btnBack">Back</button>
                <Typography><b>Back</b> ခလုတ်ကိုနှိပ်တဲ့အချိန် ကင်မရာက QR area ကိုပဲ ဆက်ချိန်ထားမယ်ဆိုရင် ဒီစာမျက်နှာကိုပဲ ချက်ချင်းပြန်ရောက်လာပါလိမ့်မယ်။</Typography>
            </Box>
        </Box>
    );
}

